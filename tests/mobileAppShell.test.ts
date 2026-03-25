// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import MobileAppShell from "../src/components/layout/MobileAppShell.vue";

describe("MobileAppShell", () => {
  it("applies the flat state to the device container", () => {
    const wrapper = shallowMount(MobileAppShell, {
      props: {
        flat: true,
      },
    });

    expect(wrapper.find(".device").classes()).toContain("device--flat");
  });
});
