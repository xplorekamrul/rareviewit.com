import CtaSection from "@/components/cta-section"
import HeroSection from "@/components/hero-section"
import PortfolioSection from "@/components/portfolio-section"
import ServicesSection from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import TestimonialsSection from "@/components/testimonials-section"
import { homeData } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"

export const metadata = generateSEOMetadata({
  title: homeData.meta.title,
  description: homeData.meta.description,
  path: homeData.meta.path,
  ogImage: homeData.meta.ogImage,
  keywords: homeData.meta.keywords ? [...homeData.meta.keywords] : [],
})

import { Suspense } from "react"

export default async function HomePage() {
  // pass only plain JSON to client islands
  return (
    <>
      <HeroSection data={homeData.hero} />
      <StatsSection />
      <Suspense fallback={<div className="py-32 text-center text-muted-foreground">Loading services...</div>}>
        <ServicesSection />
      </Suspense>
      <PortfolioSection data={homeData.portfolio} />
      <TestimonialsSection />
      <CtaSection data={homeData.cta} />
    </>
  )
}