import liff from "@line/liff";
import { toast } from "vue-sonner";
import { pinia } from "@/stores";
import { useLiffSessionStore } from "@/stores/liffSession";
import { notifyLineShareCompleted } from "./lineShareRewardApi";

const PROFILE_FETCH_ERROR_MESSAGE =
  "LINEプロフィールの取得に失敗しました。もう一度お試しください。";
const SHARE_ERROR_MESSAGE = "シェアに失敗しました。もう一度お試しください。";
const SHARE_UNAVAILABLE_ERROR_MESSAGE =
  "シェア機能を利用できません。LINE内で開いているか、LINE DevelopersのshareTargetPicker設定をご確認ください。";
const DEFAULT_SHARE_TYPE_LABEL = "旅タイプ（MBTI）";

let liffInitPromise: Promise<void> | null = null;
let isLiffInitialized = false;

function resolveLiffId() {
  const liffId = import.meta.env.VITE_LIFF_ID?.trim() ?? "";

  if (!liffId) {
    throw new Error("Missing VITE_LIFF_ID environment variable.");
  }

  return liffId;
}

function getLiffSessionStore() {
  return useLiffSessionStore(pinia);
}

export function extractRefereeUserId(source: string) {
  const match = source.match(/(?:^|[?&])ref=(U[0-9a-f]{32})(?=&|#|$)/);
  return match?.[1] ?? "";
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

function ensureLiffLoggedIn() {
  if (liff.isLoggedIn()) {
    return true;
  }

  liff.login();

  return false;
}

async function fetchCurrentUserIdentity() {
  await ensureLiffInitialized();

  if (!ensureLiffLoggedIn()) {
    return null;
  }

  const context = liff.getContext();
  const profile = await liff.getProfile();
  const userId = context?.userId?.trim() || profile?.userId?.trim() || "";
  const userName = profile?.displayName?.trim() || "";

  if (!userId || !userName) {
    throw new Error("LINE user info is missing.");
  }

  return {
    userId,
    userName,
  };
}

export async function initializeLiffSession(
  source: string,
  refSource: string = source,
) {
  const store = getLiffSessionStore();
  store.clear();

  const refereeUserId = extractRefereeUserId(refSource);
  if (refereeUserId) {
    store.setRefereeUserId(refereeUserId);
  }

  const identity = await fetchCurrentUserIdentity();
  if (!identity) {
    return null;
  }
  store.setIdentity(identity.userId, identity.userName);

  return {
    ...identity,
    refereeUserId,
  };
}

export function buildShareUrl(userId: string) {
  const url = new URL(`https://liff.line.me/${resolveLiffId()}`);
  url.searchParams.set("ref", userId);
  return url.toString();
}

function buildShareMessage(typeLabel: string, shareUrl: string) {
  return `私の旅タイプは「${typeLabel}」✈️
あなたのタイプも診断してみて👇
${shareUrl}
このリンクから診断した方限定で、10％OFFクーポンGETできるよ！（1回限り）🎁`;
}

export async function shareCurrentPage(customShareLabel?: string) {
  const store = getLiffSessionStore();

  try {
    if (!store.userId) {
      toast.error(PROFILE_FETCH_ERROR_MESSAGE);
      return false;
    }

    const shareUrl = buildShareUrl(store.userId);
    const typeLabel = customShareLabel?.trim() || DEFAULT_SHARE_TYPE_LABEL;
    const shareText = buildShareMessage(typeLabel, shareUrl);

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

    try {
      await notifyLineShareCompleted({
        sharerUserId: store.userId,
        shareLabel: typeLabel,
        shareUrl,
      });
    } catch (error) {
      console.error("[LIFF share] notifyLineShareCompleted failed", error);
    }

    return true;
  } catch (error) {
    console.error("[LIFF share] shareCurrentPage failed", error);
    toast.error(
      store.userId ? SHARE_ERROR_MESSAGE : PROFILE_FETCH_ERROR_MESSAGE,
    );
    return false;
  }
}

export function resetLiffStateForDebug() {
  const store = getLiffSessionStore();
  store.clear();
  liffInitPromise = null;
  isLiffInitialized = false;
}
