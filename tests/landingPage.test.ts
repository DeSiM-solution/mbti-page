// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import LandingPage from "../src/views/LandingPage/index.vue";
import { useLiffSessionStore } from "../src/stores/liffSession";

const { mockConfirmLineShareReward, mockToastError, mockToastSuccess } = vi.hoisted(() => ({
  mockConfirmLineShareReward: vi.fn(),
  mockToastError: vi.fn(),
  mockToastSuccess: vi.fn(),
}));

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("vue-sonner", () => ({
  toast: {
    error: mockToastError,
    success: mockToastSuccess,
  },
}));

vi.mock("../src/services/lineShareRewardApi", () => ({
  confirmLineShareReward: mockConfirmLineShareReward,
}));

vi.mock("../src/services/liffShare", () => ({
  shareCurrentPage: vi.fn(),
}));

describe("LandingPage share reward toast", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    sessionStorage.clear();
    mockConfirmLineShareReward.mockReset();
    mockToastError.mockReset();
    mockToastSuccess.mockReset();
  });

  it("prefers the API error message from unwrapResponse", async () => {
    const store = useLiffSessionStore();
    store.setIdentity("U0123456789abcdef0123456789abcdef", "Tester");
    store.setRefereeUserId("Ufedcba9876543210fedcba987654321");
    mockConfirmLineShareReward.mockRejectedValueOnce(new Error("クーポンは既に受け取り済みです"));

    shallowMount(LandingPage);
    await Promise.resolve();

    expect(mockToastError).toHaveBeenCalledWith("クーポンは既に受け取り済みです");
  });
});
