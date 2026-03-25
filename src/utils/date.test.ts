import { describe, expect, it } from "vitest";
import { formatDate } from "./date";

describe("formatDate", () => {
  it("formats a Date object correctly", () => {
    const date = new Date("2026-03-25T12:00:00Z");
    expect(formatDate(date)).toBe("March 25, 2026");
  });

  it("formats a date string correctly", () => {
    expect(formatDate("2024-01-01")).toBe("January 1, 2024");
  });

  it("handles valid ISO strings", () => {
    expect(formatDate("2023-12-31T23:59:59Z")).toBe("December 31, 2023");
  });
});
