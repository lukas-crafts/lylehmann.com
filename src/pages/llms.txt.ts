import { getCollection } from "astro:content";

export async function GET() {
  const portfolio = await getCollection("portfolio");
  const siteUrl = "https://lylehmann.com";

  let content = "# lylehmann.com\n\n";
  content += "Personal website and portfolio of Lukas Lehmann.\n\n";

  content += "## Core Pages\n\n";
  content += `- [Home](${siteUrl}/)\n`;
  content += `- [About](${siteUrl}/about)\n`;
  content += `- [Services](${siteUrl}/services)\n`;
  content += `- [Portfolio](${siteUrl}/portfolio)\n`;
  content += `- [Contact](${siteUrl}/contact)\n\n`;

  content += "## Portfolio Projects\n\n";
  for (const item of portfolio) {
    if (item.data.draft) continue;
    content += `- [${item.data.title}](${siteUrl}/portfolio/${item.id}): ${item.data.description}\n`;
  }

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
