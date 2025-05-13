import slugify from 'limax';

import { SITE, APP_BLOG } from 'astrowind:config';

import { trim } from '~/utils/utils';

// Type definitions for menu objects
export interface MenuLinkItem {
  text?: string;
  href?: string;
  ariaLabel?: string;
  icon?: string;
  active?: boolean;
  type?: 'home' | 'blog' | 'page' | 'post' | 'asset' | 'category' | 'tag';
  url?: string;
}

export type MenuItem = MenuLinkItem | { [key: string]: MenuItem | MenuItem[] };

export type Menu = MenuItem[] | { [key: string]: MenuItem | MenuItem[] };

export const trimSlash = (s: string) => trim(trim(s, '/'));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

const BASE_PATHNAME = SITE.base || '/';

export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || 'tag';

export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`);

/** */
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

/** */
export const getPermalink = (slug = '', type = 'page'): string => {
  let permalink: string;

  if (
    slug.startsWith('https://') ||
    slug.startsWith('http://') ||
    slug.startsWith('://') ||
    slug.startsWith('#') ||
    slug.startsWith('javascript:')
  ) {
    return slug;
  }

  switch (type) {
    case 'home':
      permalink = getHomePermalink();
      break;

    case 'blog':
      permalink = getBlogPermalink();
      break;

    case 'asset':
      permalink = getAsset(slug);
      break;

    case 'category':
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;

    case 'tag':
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;

    case 'post':
      permalink = createPath(trimSlash(slug));
      break;

    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

/** */
export const getHomePermalink = (): string => getPermalink('/');

/** */
export const getBlogPermalink = (): string => getPermalink(BLOG_BASE);

/** */
export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');

/** */
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);

/** */
export const applyGetPermalinks = (menu: Menu = {}): Menu => {
  if (Array.isArray(menu)) {
    return menu.map((item) => applyGetPermalinks(item as Menu)) as Menu;
  } else if (typeof menu === 'object' && menu !== null) {
    const obj: Record<string, MenuItem | MenuItem[]> = {};
    for (const key in menu) {
      const item = (menu as Record<string, MenuItem | MenuItem[]>)[key];

      if (key === 'href') {
        if (typeof item === 'string') {
          obj[key] = { href: getPermalink(item) } as MenuLinkItem;
        } else if (typeof item === 'object') {
          const menuItem = item as MenuLinkItem;
          if (menuItem.type === 'home') {
            obj[key] = { href: getHomePermalink() } as MenuLinkItem;
          } else if (menuItem.type === 'blog') {
            obj[key] = { href: getBlogPermalink() } as MenuLinkItem;
          } else if (menuItem.type === 'asset') {
            obj[key] = { href: getAsset(menuItem.url || '') } as MenuLinkItem;
          } else if (menuItem.url) {
            obj[key] = { href: getPermalink(menuItem.url, menuItem.type) } as MenuLinkItem;
          }
        }
      } else {
        obj[key] = applyGetPermalinks(item as Menu);
      }
    }
    return obj as Menu;
  }
  return menu;
};
