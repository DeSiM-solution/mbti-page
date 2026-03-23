import { describe, expect, it } from "vitest";
import { extractReferrerLineId } from "../src/services/liffShare";

function buildLineId(suffix: string) {
  return `U${suffix}`;
}

describe("extractReferrerLineId", () => {
  it("returns line user id when ref has valid format", () => {
    const id = buildLineId("0123456789abcdef0123456789abcdef");
    expect(extractReferrerLineId(`/landing?ref=${id}`)).toBe(id);
  });

  it("returns null when ref contains unsupported symbols", () => {
    const idWithSymbol = `${buildLineId("0123456789abcdef0123456789abcd")}_`;
    expect(extractReferrerLineId(`/landing?ref=${idWithSymbol}`)).toBeNull();
  });

  it("returns null for uppercase hex digits", () => {
    const upperHexId = buildLineId("0123456789ABCDEF0123456789ABCDEF");
    expect(extractReferrerLineId(`/landing?ref=${upperHexId}`)).toBeNull();
  });

  it("accepts percent-encoded ref when decoded value is valid", () => {
    const id = buildLineId("fedcba9876543210fedcba9876543210");
    const encoded = encodeURIComponent(id);
    expect(extractReferrerLineId(`/landing?ref=${encoded}`)).toBe(id);
  });
});
