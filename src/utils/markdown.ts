import { marked } from "marked";

export async function renderMarkdown(md: string): Promise<string> {
  return await marked.parse(md);
}
