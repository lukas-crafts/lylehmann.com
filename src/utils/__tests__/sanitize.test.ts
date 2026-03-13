import { describe, expect, it } from "vitest";
import { sanitize } from "../sanitize";

describe("sanitize utility", () => {
  describe("edge cases", () => {
    it("should return an empty string for null input", () => {
      expect(sanitize(null)).toBe("");
    });

    it("should return an empty string for undefined input", () => {
      expect(sanitize(undefined)).toBe("");
    });

    it("should return an empty string for an empty string input", () => {
      expect(sanitize("")).toBe("");
    });
  });

  describe("allowed formatting tags", () => {
    it("should allow basic formatting tags", () => {
      const input =
        "<b>bold</b> <i>italic</i> <strong>strong</strong> <em>em</em>";
      expect(sanitize(input)).toBe(input);
    });

    it("should allow structural tags", () => {
      const input =
        "<p>paragraph</p> <ul><li>item</li></ul> <ol><li>item</li></ol> <blockquote>quote</blockquote>";
      expect(sanitize(input)).toBe(input);
    });

    it("should allow heading tags", () => {
      const input =
        "<h1>h1</h1> <h2>h2</h2> <h3>h3</h3> <h4>h4</h4> <h5>h5</h5> <h6>h6</h6>";
      expect(sanitize(input)).toBe(input);
    });

    it("should allow code and pre tags", () => {
      const input = "<pre><code>const x = 1;</code></pre>";
      expect(sanitize(input)).toBe(input);
    });

    it("should allow br and span tags", () => {
      const input = "<span>text</span><br>";
      // sanitize-html normalizes <br> to <br />
      expect(sanitize(input)).toBe("<span>text</span><br />");
    });
  });

  describe("links and schemes", () => {
    it("should allow a tags with permitted attributes", () => {
      const input =
        '<a href="https://example.com" name="test" target="_blank" rel="noopener" title="Example">Link</a>';
      expect(sanitize(input)).toBe(input);
    });

    it("should allow permitted URL schemes", () => {
      const schemes = [
        "http://example.com",
        "https://example.com",
        "mailto:test@example.com",
        "tel:+1234567890",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BvAAnMAWkU1pU8AAAAAElFTkSuQmCC",
      ];
      for (const scheme of schemes) {
        const input = `<a href="${scheme}">Link</a>`;
        expect(sanitize(input)).toBe(input);
      }
    });

    it("should strip disallowed URL schemes", () => {
      const input = '<a href="javascript:alert(1)">Link</a>';
      expect(sanitize(input)).toBe("<a>Link</a>");
    });
  });

  describe("SVG support", () => {
    it("should allow svg and child elements with attributes", () => {
      const input =
        '<svg viewbox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg" preserveaspectratio="xMidYMid meet">' +
        '<g fill="red" stroke="blue" stroke-width="2">' +
        '<path d="M10 10 L90 90" fill-rule="evenodd" clip-rule="nonzero" />' +
        '<circle cx="50" cy="50" r="40" />' +
        '<rect x="10" y="10" width="80" height="80" rx="5" ry="5" />' +
        '<line x1="0" y1="0" x2="100" y2="100" />' +
        '<polyline points="0,0 50,50 100,0" />' +
        '<polygon points="0,0 100,0 100,100 0,100" />' +
        '<ellipse cx="50" cy="50" rx="40" ry="30" />' +
        '<defs><clippath id="clip"><rect width="100" height="100" /></clippath></defs>' +
        '<lineargradient><stop offset="0" stop-color="red" /></lineargradient>' +
        "</g>" +
        "</svg>";

      const sanitized = sanitize(input);
      expect(sanitized).toContain("<svg");
      expect(sanitized).toContain('viewbox="0 0 100 100"');
      expect(sanitized).toContain('preserveaspectratio="xMidYMid meet"');
      expect(sanitized).toContain("<path");
      expect(sanitized).toContain('d="M10 10 L90 90"');
      expect(sanitized).toContain("<circle");
      expect(sanitized).toContain("<rect");
      expect(sanitized).toContain("<line");
      expect(sanitized).toContain("<polyline");
      expect(sanitized).toContain("<polygon");
      expect(sanitized).toContain("<ellipse");
      expect(sanitized).toContain("<defs");
      expect(sanitized).toContain("<clippath");
      expect(sanitized).toContain("<lineargradient");
      expect(sanitized).toContain("<stop");
    });

    it("should handle camelCase input by lowercasing it in the output for SVG tags/attributes", () => {
      const input =
        '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"><clipPath>Content</clipPath></svg>';
      const sanitized = sanitize(input);
      expect(sanitized).toContain('viewbox="0 0 100 100"');
      expect(sanitized).toContain('preserveaspectratio="xMidYMid meet"');
      expect(sanitized).toContain("<clippath");
    });
  });

  describe("global attributes", () => {
    it("should allow class, id, aria-hidden, and role on tags", () => {
      const input =
        '<div class="foo" id="bar" aria-hidden="true" role="button">Text</div>';
      // div is NOT in allowedTags, so it should be stripped but content remains
      expect(sanitize(input)).toBe("Text");

      const allowedInput =
        '<p class="foo" id="bar" aria-hidden="true" role="presentation">Text</p>';
      expect(sanitize(allowedInput)).toBe(allowedInput);
    });
  });

  describe("XSS prevention", () => {
    it("should strip disallowed tags and their content if they are risky", () => {
      const input =
        '<script>alert("xss")</script><iframe src="https://evil.com"></iframe>';
      // sanitize-html strips script tags and their content by default
      expect(sanitize(input)).toBe("");
    });

    it("should strip disallowed tags but keep content if they are safe structural tags", () => {
      const input = "<section>Content</section>";
      // section is not allowed, but its content should remain
      expect(sanitize(input)).toBe("Content");
    });

    it("should strip disallowed attributes", () => {
      const input =
        '<b onclick="alert(\'xss\')" onerror="alert(\'xss\')" data-other="foo">Bold</b>';
      expect(sanitize(input)).toBe("<b>Bold</b>");
    });
  });
});
