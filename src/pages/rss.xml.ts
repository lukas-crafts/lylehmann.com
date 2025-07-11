import { getRssString } from "@astrojs/rss";

// Statische Werte als Ersatz für astrowind:config
const SITE = { name: "lylehmann.com", trailingSlash: true };
const METADATA = { description: "Blog und Portfolio von Lyle Lehmann" };
const APP_BLOG = { isEnabled: true };

import { fetchPosts } from "~/utils/blog";
import { getPermalink } from "~/utils/permalinks";

export const GET = async () => {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const posts = await fetchPosts();

  const rss = await getRssString({
    title: `${SITE.name}’s Blog`,
    description: METADATA?.description || "",
    site: import.meta.env.SITE,

    items: posts.map((post) => ({
      link: getPermalink(post.permalink, "post"),
      title: post.title,
      description: post.excerpt,
      pubDate: post.publishDate,
    })),

    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
