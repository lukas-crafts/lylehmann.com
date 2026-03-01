import { describe, expect, it } from "vitest";
import { sanitize } from "../sanitize";

describe("sanitize utility", () => {
  it("should return an empty string for null or undefined input", () => {
    expect(sanitize(null)).toBe("");
    expect(sanitize(undefined)).toBe("");
  });

  it("should allow safe HTML tags", () => {
    const input = "<strong>Bold</strong> <em>Italic</em> <a href='https://example.com'>Link</a>";
    const result = sanitize(input);
    expect(result).toContain("<strong>Bold</strong>");
    expect(result).toContain("<em>Italic</em>");
    expect(result).toContain("<a href=\"https://example.com\">Link</a>");
  });

  it("should remove malicious script tags", () => {
    const input = "Hello <script>alert('XSS')</script> world";
    const result = sanitize(input);
    expect(result).toBe("Hello  world");
    expect(result).not.toContain("<script>");
  });

  it("should remove event handlers", () => {
    const input = "<img src='x' onerror='alert(1)'>";
    const result = sanitize(input);
    expect(result).not.toContain("onerror");
    // sanitize-html might remove the img tag entirely if not in allowedTags
    // Based on src/utils/sanitize.ts, 'img' is NOT in allowedTags
    expect(result).toBe("");
  });

  it("should allow safe SVG elements", () => {
    const input = "<svg viewBox='0 0 24 24'><path d='M12 2L2 22h20L12 2z' /></svg>";
    const result = sanitize(input);
    expect(result).toContain("<svg");
    // sanitize-html lowercases attributes
    expect(result).toContain("viewbox=\"0 0 24 24\"");
    expect(result).toContain("<path");
    expect(result).toContain("d=\"M12 2L2 22h20L12 2z\"");
  });

  it("should allow class and id attributes on all allowed tags", () => {
    const input = "<p class='text-muted' id='desc'>Description</p>";
    const result = sanitize(input);
    expect(result).toContain("class=\"text-muted\"");
    expect(result).toContain("id=\"desc\"");
  });
});
