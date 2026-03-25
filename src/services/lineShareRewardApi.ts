import { apiClient } from "./apiClient";

type ApiEnvelope<T> = {
  code: number;
  msg: string;
  data: T;
};

type SaveLineShareTestResultPayload = {
  sharerUserId: string;
  testResult: string;
  answerContent?: string;
};

export type SaveLineShareTestResultResponse = {
  id: number;
  sharerUserId: string;
  testResult: string;
  savedAt: string;
};

type ConfirmLineShareRewardPayload = {
  sharerUserId: string;
  inviteeUserId: string;
};

export type ConfirmLineShareRewardResponse = {
  shareRecorded: boolean;
  successShareCount: number;
  inviteeCouponCode: string | null;
  inviteeCouponSent: boolean;
  rewardGranted: boolean;
  rewardRedeemCode: string | null;
  rewardExpireTime: string | null;
};

export type LineShareRewardStatusResponse = {
  sharerUserId: string;
  successShareCount: number;
  rewardGranted: boolean;
  redeemCode: string | null;
  expireTime: string | null;
  expired: boolean;
  productGroupId: number | null;
  productGroupName: string | null;
};

function unwrapResponse<T>(response: ApiEnvelope<T>) {
  if (response.code !== 200) {
    throw new Error(response.msg || "请求失败");
  }

  return response.data;
}

export async function saveLineShareTestResult(payload: SaveLineShareTestResultPayload) {
  const { data } = await apiClient.post<ApiEnvelope<SaveLineShareTestResultResponse>>(
    "/business/lineShareReward/testResult",
    payload,
  );

  return unwrapResponse(data);
}

export async function confirmLineShareReward(payload: ConfirmLineShareRewardPayload) {
  const { data } = await apiClient.post<ApiEnvelope<ConfirmLineShareRewardResponse>>(
    "/business/lineShareReward/confirm",
    payload,
  );

  return unwrapResponse(data);
}

export async function getLineShareRewardStatus(userId: string) {
  const { data } = await apiClient.get<ApiEnvelope<LineShareRewardStatusResponse>>(
    "/business/lineShareReward/status",
    {
      params: { userId },
    },
  );

  return unwrapResponse(data);
}
