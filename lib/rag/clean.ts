//lib/rag/clean.ts


export function htmlToText(html: string): string {
  // Remove script and style tags
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")

  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, " ")

  // Decode HTML entities
  text = text.replace(/&nbsp;/g, " ")
  text = text.replace(/&amp;/g, "&")
  text = text.replace(/&lt;/g, "<")
  text = text.replace(/&gt;/g, ">")
  text = text.replace(/&quot;/g, '"')

  // Normalize whitespace
  text = text.replace(/\s+/g, " ").trim()

  return text
}

export function markdownToText(markdown: string): string {
  // Remove code blocks
  let text = markdown.replace(/```[\s\S]*?```/g, "")

  // Remove inline code
  text = text.replace(/`[^`]+`/g, "")

  // Remove links but keep text
  text = text.replace(/\[([^\]]+)\]$$[^)]+$$/g, "$1")

  // Remove images
  text = text.replace(/!\[([^\]]*)\]$$[^)]+$$/g, "")

  // Remove headers
  text = text.replace(/^#+\s+/gm, "")

  // Remove bold/italic
  text = text.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1")

  // Normalize whitespace
  text = text.replace(/\s+/g, " ").trim()

  return text
}
