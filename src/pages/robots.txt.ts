import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const siteURL = site || "https://lylehmann.com";
  const sitemapURL = new URL("sitemap-index.xml", siteURL);
  return new Response(getRobotsTxt(sitemapURL));
};
