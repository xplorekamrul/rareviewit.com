// app/privacy/page.tsx
import { privacy } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import PrivacyClient from "./PrivacyClient"

export const metadata = generateSEOMetadata({
  title: privacy.meta.title,
  description: privacy.meta.description,
  path: privacy.meta.path,
  ogImage: privacy.meta.ogImage,
  keywords: [...privacy.meta.keywords],
})

export default function Page() {
  return (
    <PrivacyClient
      data={{
        hero: privacy.hero,
        lastUpdated: privacy.meta.lastUpdated,
        sections: [...privacy.sections],
        consent: privacy.consent,
      }}
    />
  )
}
