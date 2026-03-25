import { toString as mdastToString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return (tree, { data }) => {
    const textOnPage = mdastToString(tree);
    const wordCount = textOnPage.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    // data.astro.frontmatter.readingTime will be available in Astro.props
    data.astro.frontmatter.readingTime = `${readingTimeMinutes} min read`;
  };
}
