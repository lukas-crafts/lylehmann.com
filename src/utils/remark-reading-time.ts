import type { Root } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import type { VFile } from "vfile";

export function remarkReadingTime() {
  return (tree: Root, file: VFile) => {
    // If file is undefined, we can't inject frontmatter, so we skip
    if (!file?.data) return;

    const textOnPage = mdastToString(tree);
    const wordCount = textOnPage.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200);

    const data = file.data as {
      astro?: {
        frontmatter?: {
          readingTime?: string;
        };
      };
    };

    if (!data.astro) data.astro = {};
    if (!data.astro.frontmatter) data.astro.frontmatter = {};

    data.astro.frontmatter.readingTime = `${readingTimeMinutes} min read`;
  };
}
