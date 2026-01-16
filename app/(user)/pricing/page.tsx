// app/pricing/page.tsx
import { pricing } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import PricingClient from "./PricingClient"

export const metadata = generateSEOMetadata({
  title: pricing.meta.title,
  description: pricing.meta.description,
  path: pricing.meta.path,
  ogImage: pricing.meta.ogImage,
  keywords: [...pricing.meta.keywords], 
})

export default function Page() {
  return (
    <PricingClient
      data={{
        hero: pricing.hero,
        toggle: pricing.toggle,
        packages: pricing.packages,
        addons: pricing.addons,
        faqSection: pricing.faqSection,
        cta: pricing.cta,
      }}
    />
  )
}
