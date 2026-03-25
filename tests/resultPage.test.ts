// @vitest-environment jsdom
import { describe, expect, it, beforeEach, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ResultPage from "../src/views/ResultPage/index.vue";

const { mockLiffUserId, mockShareCurrentPage } = vi.hoisted(() => ({
  mockLiffUserId: { value: null as string | null },
  mockShareCurrentPage: vi.fn(),
}));

vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: { type: "ESTJ" },
    fullPath: "/result/ESTJ",
  }),
}));

vi.mock("@/services/liffShare", () => ({
  shareCurrentPage: mockShareCurrentPage,
  liffUserId: mockLiffUserId,
}));

describe("ResultPage Shopify link", () => {
  beforeEach(() => {
    mockLiffUserId.value = null;
    mockShareCurrentPage.mockReset();
    vi.restoreAllMocks();
  });

  it("adds agreed UTM params and lineId for plan click", async () => {
    mockLiffUserId.value = "U0123456789abcdef0123456789abcdef";
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    const wrapper = shallowMount(ResultPage);
    await wrapper.find(".plan-name").trigger("click");

    expect(openSpy).toHaveBeenCalledTimes(1);
    const calledUrl = openSpy.mock.calls[0]?.[0];
    expect(typeof calledUrl).toBe("string");
    const url = new URL(String(calledUrl));

    expect(url.searchParams.get("variant")).toBe("50855076692289");
    expect(url.searchParams.get("utm_source")).toBe("line");
    expect(url.searchParams.get("utm_medium")).toBe("referral");
    expect(url.searchParams.get("utm_campaign")).toBe("mbti_result");
    expect(url.searchParams.get("utm_content")).toBe("ESTJ");
    expect(url.searchParams.get("lineId")).toBe("U0123456789abcdef0123456789abcdef");
    expect(openSpy).toHaveBeenCalledWith(String(url), "_blank");
  });

  it("sets content tag for esim showcase click", async () => {
    mockLiffUserId.value = "U0123456789abcdef0123456789abcdef";
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    const wrapper = shallowMount(ResultPage);
    await wrapper.find(".esim-showcase").trigger("click");

    const calledUrl = openSpy.mock.calls[0]?.[0];
    expect(typeof calledUrl).toBe("string");
    const url = new URL(String(calledUrl));

    expect(url.searchParams.get("utm_content")).toBe("ESTJ");
    expect(url.searchParams.get("utm_source")).toBe("line");
    expect(url.searchParams.get("utm_medium")).toBe("referral");
    expect(url.searchParams.get("utm_campaign")).toBe("mbti_result");
  });
});
