import { marked } from "marked";

export function renderMarkdown(md: string): string {
  return marked(md);
} 
