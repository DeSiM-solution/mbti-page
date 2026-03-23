import { ref } from "vue";
import liff from "@line/liff";
import { toast } from "vue-sonner";

const SHARE_TEXT_PREFIX = "あなたのMBTIを診断してみよう！👉";
const PROFILE_FETCH_ERROR_MESSAGE = "LINEプロフィールの取得に失敗しました。もう一度お試しください。";
const SHARE_ERROR_MESSAGE = "シェアに失敗しました。もう一度お試しください。";
const SHARE_UNAVAILABLE_ERROR_MESSAGE =
  "シェア機能を利用できません。LINE内で開いているか、LINE DevelopersのshareTargetPicker設定をご確認ください。";

let cachedUserId: string | null = null;
let liffInitPromise: Promise<void> | null = null;
let isLiffInitialized = false;

export const liffUserId = ref<string | null>(null);

function resolveLiffId() {
  const liffId = import.meta.env.VITE_LIFF_ID?.trim() ?? "";

  if (!liffId) {
    throw new Error("Missing VITE_LIFF_ID environment variable.");
  }

  return liffId;
}

async function ensureLiffInitialized() {
  if (isLiffInitialized) {
    return;
  }

  if (!liffInitPromise) {
    liffInitPromise = liff
      .init({
        liffId: resolveLiffId(),
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        isLiffInitialized = true;
      })
      .catch((error) => {
        liffInitPromise = null;
        throw error;
      });
  }

  await liffInitPromise;
}

async function fetchCurrentUserId() {
  if (cachedUserId) {
    return cachedUserId;
  }

  await ensureLiffInitialized();

  const profile = await liff.getProfile();
  const userId = profile?.userId?.trim();

  if (!userId) {
    throw new Error("LINE userId is missing from LIFF profile.");
  }

  cachedUserId = userId;
  liffUserId.value = userId;
  return userId;
}

export function buildShareUrl(currentUrl: string, userId: string) {
  const url = new URL(currentUrl);
  url.searchParams.set("ref", userId);
  return url.toString();
}

export function extractReferrerLineId(source: string) {
  const match = source.match(/(?:^|[?&])ref=(U[0-9a-f]{32})(?=&|#|$)/);
  return match?.[1] ?? null;
}

export async function prefetchLiffUserId() {
  try {
    return await fetchCurrentUserId();
  } catch {
    return null;
  }
}

export async function shareCurrentPage() {
  try {
    const userId = cachedUserId ?? (await fetchCurrentUserId());
    const shareUrl = buildShareUrl(window.location.href, userId);
    const shareText = `${SHARE_TEXT_PREFIX} ${shareUrl}`;

    if (!liff.isApiAvailable("shareTargetPicker")) {
      toast.error(SHARE_UNAVAILABLE_ERROR_MESSAGE);
      return false;
    }

    await liff.shareTargetPicker([
      {
        type: "text",
        text: shareText,
      },
    ]);

    return true;
  } catch (error) {
    console.error("[LIFF share] shareCurrentPage failed", error);

    if (cachedUserId) {
      toast.error(SHARE_ERROR_MESSAGE);
    } else {
      toast.error(PROFILE_FETCH_ERROR_MESSAGE);
    }

    return false;
  }
}

export function __resetLiffShareStateForTests() {
  cachedUserId = null;
  liffInitPromise = null;
  isLiffInitialized = false;
  liffUserId.value = null;
}
