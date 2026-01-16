// app/portfolio/page.tsx
import { portfolio } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import PortfolioClient from "./PortfolioClient"

export const metadata = generateSEOMetadata({
  title: portfolio.meta.title,
  description: portfolio.meta.description,
  path: portfolio.meta.path,
  ogImage: portfolio.meta.ogImage,
  keywords: portfolio.meta.keywords ? [...portfolio.meta.keywords] as string[] : [],
})

export default function Page() {
  return (
    <PortfolioClient
      data={{
        hero: portfolio.hero,
        filters: [...portfolio.filters],
        projects: [...portfolio.projects],
        cta: portfolio.cta,
      }}
    />
  )
}
