import { partners } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import PartnersClient from "./PartnersClient"

export const metadata = generateSEOMetadata({
  title: partners.meta.title,
  description: partners.meta.description,
  path: partners.meta.path,
  ogImage: partners.meta.ogImage,
  keywords: partners.meta.keywords ? [...partners.meta.keywords] as string[] : [],
})

export default function Page() {
  return (
    <PartnersClient
      data={{
        hero: partners.hero,
        logos: [...partners.logos],
        affiliate: {
          ...partners.affiliate,
          stats: [...partners.affiliate.stats],        },
        modelsSection: partners.modelsSection,
        models: [...partners.models],
        testimonialsSection: partners.testimonialsSection,
        testimonials: [...partners.testimonials],
        cta: partners.cta,
      }}
    />
  )
}
