import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes HTML strings to prevent XSS while allowing safe formatting tags.
 * Used across Astro components that render content with set:html.
 * @param html The HTML string to sanitize.
 * @returns The sanitized HTML string.
 */
export const sanitize = (html: string | undefined | null): string => {
  if (!html) return "";

  return sanitizeHtml(html, {
    allowedTags: [
      "b",
      "i",
      "strong",
      "em",
      "a",
      "span",
      "br",
      "p",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "code",
      "pre",
      "svg",
      "path",
      "circle",
      "rect",
      "line",
      "polyline",
      "polygon",
      "ellipse",
      "g",
      "defs",
      "clippath",
      "lineargradient",
      "stop",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel", "title"],
      svg: [
        "viewbox",
        "width",
        "height",
        "fill",
        "stroke",
        "stroke-width",
        "xmlns",
        "preserveaspectratio",
      ],
      path: ["d", "fill", "stroke", "stroke-width", "clip-rule", "fill-rule"],
      circle: ["cx", "cy", "r", "fill", "stroke"],
      rect: ["x", "y", "width", "height", "fill", "stroke", "rx", "ry"],
      line: ["x1", "y1", "x2", "y2", "stroke", "stroke-width"],
      polyline: ["points", "fill", "stroke", "stroke-width"],
      polygon: ["points", "fill", "stroke", "stroke-width"],
      ellipse: ["cx", "cy", "rx", "ry", "fill", "stroke"],
      g: ["fill", "stroke", "stroke-width"],
      "*": ["class", "id", "aria-hidden", "role"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel", "data"],
  });
};
