// app/faq/page.tsx
import { faq } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import FAQClient from "./FAQClient"

export const metadata = generateSEOMetadata({
  title: faq.meta.title,
  description: faq.meta.description,
  path: faq.meta.path,
  ogImage: faq.meta.ogImage,
})

export default function Page() {
  // Pass serializable data only
  return <FAQClient data={{
    hero: faq.hero,
    categories: [...faq.categories],
    faqsByCategory: faq.faqsByCategory,
    cta: faq.cta
  }} />
}
