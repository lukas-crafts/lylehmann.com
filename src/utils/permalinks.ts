import slugify from "limax";

import { APP_BLOG, SITE } from "../generated/astrowind-config";

import { trim } from "../utils/utils";

export const trimSlash = (s: string) => trim(trim(s, "/"));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
  return `/${paths}${SITE.trailingSlash && paths ? "/" : ""}`;
};

const BASE_PATHNAME = SITE.base || "/";

export const cleanSlug = (text = "") =>
  trimSlash(text)
    .split("/")
    .map((slug) => slugify(slug))
    .join("/");

export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || "tag";

export const POST_PERMALINK_PATTERN = trimSlash(
  APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`,
);

/** */
export const getCanonical = (path = ""): string | URL => {
  try {
    const url = String(new URL(path, SITE.site));
    if (SITE.trailingSlash === false && path && url.endsWith("/")) {
      return url.slice(0, -1);
    }
    if (SITE.trailingSlash === true && path && !url.endsWith("/")) {
      return `${url}/`;
    }
    return url;
  } catch (error) {
    console.error("Error creating URL:", { path, site: SITE.site, error });
    return SITE.site || "https://lylehmann.com";
  }
};

/** */
export const getPermalink = (slug = "", type = "page"): string => {
  let permalink: string;

  if (
    slug.startsWith("https://") ||
    slug.startsWith("http://") ||
    slug.startsWith("://") ||
    slug.startsWith("#") ||
    slug.startsWith("javascript:")
  ) {
    return slug;
  }

  switch (type) {
    case "home":
      permalink = getHomePermalink();
      break;

    case "blog":
      permalink = getBlogPermalink();
      break;

    case "asset":
      permalink = getAsset(slug);
      break;

    case "category":
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;

    case "tag":
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;

    case "post":
      permalink = createPath(trimSlash(slug));
      break;

    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

/** */
export const getHomePermalink = (): string => getPermalink("/");

/** */
export const getBlogPermalink = (): string => getPermalink(BLOG_BASE);

/** */
export const getAsset = (path: string): string => {
  const parts = [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
  return `/${parts}`;
};

/** */
const definitivePermalink = (permalink: string): string =>
  createPath(BASE_PATHNAME, permalink);

/** */
export const applyGetPermalinks = (menu: object) => {
  const finalMenu = menu || {};
  if (Array.isArray(finalMenu)) {
    return finalMenu.map((item) => applyGetPermalinks(item));
  }
  if (typeof finalMenu === "object" && finalMenu !== null) {
    const obj = {};
    for (const key in finalMenu) {
      if (key === "href") {
        if (typeof finalMenu[key] === "string") {
          obj[key] = getPermalink(finalMenu[key]);
        } else if (typeof finalMenu[key] === "object") {
          if (finalMenu[key].type === "home") {
            obj[key] = getHomePermalink();
          } else if (finalMenu[key].type === "blog") {
            obj[key] = getBlogPermalink();
          } else if (finalMenu[key].type === "asset") {
            obj[key] = getAsset(finalMenu[key].url);
          } else if (finalMenu[key].url) {
            obj[key] = getPermalink(finalMenu[key].url, finalMenu[key].type);
          }
        }
      } else {
        obj[key] = applyGetPermalinks(finalMenu[key]);
      }
    }
    return obj;
  }
  return finalMenu;
};
