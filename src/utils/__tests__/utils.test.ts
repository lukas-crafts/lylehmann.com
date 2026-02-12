import { describe, expect, it } from "vitest";
import { toUiAmount } from "../utils";

describe("toUiAmount", () => {
  it("should handle 0 correctly", () => {
    expect(toUiAmount(0)).toBe("0"); // Expect string "0"
  });

  it("should format numbers < 1000 correctly", () => {
    expect(toUiAmount(100)).toBe("100");
    expect(toUiAmount(999)).toBe("999");
  });

  it("should format thousands correctly", () => {
    expect(toUiAmount(1000)).toBe("1K");
    expect(toUiAmount(1500)).toBe("1.5K");
  });

  it("should format millions correctly", () => {
    expect(toUiAmount(1000000)).toBe("1M");
    expect(toUiAmount(1500000)).toBe("1.5M");
  });

  it("should format billions correctly", () => {
    expect(toUiAmount(1000000000)).toBe("1B");
    expect(toUiAmount(1500000000)).toBe("1.5B");
  });

  it("should handle negative numbers correctly", () => {
    expect(toUiAmount(-1000)).toBe("-1K");
    expect(toUiAmount(-1500000)).toBe("-1.5M");
  });

  it("should handle rounding edge cases consistently", () => {
    expect(toUiAmount(999.5)).toBe("999.5"); // Rounds up to 1K
  });
});
