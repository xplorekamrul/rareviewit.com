// lib/rag/clean.ts

/** Convert HTML to plain text */
export function htmlToText(html: string): string {
  // Remove script and style tags
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, " ");

  // Decode a few common entities
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Normalize whitespace
  return text.replace(/\s+/g, " ").trim();
}

/** Convert Markdown to plain text */
export function markdownToText(markdown: string): string {
  let text = markdown;

  // Remove fenced code blocks
  text = text.replace(/```[\s\S]*?```/g, "");

  // Remove inline code
  text = text.replace(/`[^`]+`/g, "");

  // Images ![alt](url) -> remove entirely
  text = text.replace(/!\[[^\]]*]\([^)]+\)/g, "");

  // Links [label](url) -> keep label only
  text = text.replace(/\[([^\]]+)]\([^)]+\)/g, "$1");

  // Headers: drop the hashes
  text = text.replace(/^#{1,6}\s+/gm, "");

  // Bold / italic
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2");
  text = text.replace(/(\*|_)(.*?)\1/g, "$2");
  text = text.replace(/~~(.*?)~~/g, "$1");

  // Blockquotes, lists, tables décor
  text = text.replace(/^\s{0,3}>\s?/gm, "");
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");
  text = text.replace(/\|/g, " ");

  // Normalize whitespace
  return text.replace(/\s+/g, " ").trim();
}
