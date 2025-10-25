// app/terms/page.tsx
import { terms } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import TermsClient from "./TermsClient"

export const metadata = generateSEOMetadata({
  title: terms.meta.title,
  description: terms.meta.description,
  path: terms.meta.path,
  ogImage: terms.meta.ogImage,
  keywords: [...terms.meta.keywords], 
})

export default function Page() {
  return (
    <TermsClient
      data={{
        hero: terms.hero,
        lastUpdated: terms.meta.lastUpdated,
        sections: [...terms.sections],
        agreement: terms.agreement,
      }}
    />
  )
}
