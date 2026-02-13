import { describe, expect, it, vi } from "vitest";

// Mock limax
vi.mock("limax", () => ({
  default: (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "-"),
}));

// Mock the config module
vi.mock("../generated/astrowind-config", () => ({
  SITE: {
    site: "https://example.com",
    base: "/",
    trailingSlash: false,
  },
  APP_BLOG: {
    isEnabled: true,
    list: {
      pathname: "portfolio",
    },
    post: {
      permalink: "/portfolio/%slug%",
    },
    category: {
      pathname: "category",
    },
    tag: {
      pathname: "tag",
    },
  },
}));

import { BLOG_BASE, getBlogPermalink, trimSlash, getHomePermalink } from "../permalinks";

describe("trimSlash", () => {
  it("should remove leading and trailing slashes", () => {
    expect(trimSlash("/foo/")).toBe("foo");
    expect(trimSlash("foo/")).toBe("foo");
    expect(trimSlash("/foo")).toBe("foo");
    expect(trimSlash("///foo///")).toBe("foo");
  });

  it("should return empty string if input is only slashes", () => {
    expect(trimSlash("///")).toBe("");
  });

  it("should return empty string for empty input", () => {
    expect(trimSlash("")).toBe("");
  });
});

describe("getHomePermalink", () => {
  it("should return the correct home permalink", () => {
    expect(getHomePermalink()).toBe("/");
  });
});

describe("getBlogPermalink", () => {
// ... existing tests
  it("should return the correct blog permalink", () => {
    // Based on the mock, BLOG_BASE should be "portfolio"
    // and getBlogPermalink() should return "/portfolio"
    expect(BLOG_BASE).toBe("portfolio");
    expect(getBlogPermalink()).toBe("/portfolio");
  });

  it("should return a string", () => {
    expect(typeof getBlogPermalink()).toBe("string");
  });

  it("should start with a slash", () => {
    expect(getBlogPermalink().startsWith("/")).toBe(true);
  });
});
