import { getCollection } from "astro:content";

export async function GET() {
  const portfolio = await getCollection("portfolio");
  const siteUrl = "https://lylehmann.com";

  let content = "# lylehmann.com - Full Content\n\n";
  content +=
    "This file contains the full content for lylehmann.com to assist AI processing.\n\n";

  content += "## Portfolio Items\n\n";

  for (const item of portfolio) {
    if (item.data.draft) continue;

    // We try to render the content to get the text, but for simple LLM consumption,
    // the raw body is usually enough if it's Markdown.
    content += `### Project: ${item.data.title}\n`;
    content += `URL: ${siteUrl}/portfolio/${item.id}\n`;
    content += `Description: ${item.data.description}\n\n`;

    if (item.body) {
      content += "#### Content\n\n";
      content += item.body;
      content += "\n\n---\n\n";
    }
  }

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
