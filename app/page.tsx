import CtaSection from "@/components/cta-section"
import HeroSection from "@/components/hero-section"
import PortfolioSection from "@/components/portfolio-section"
import ServicesSection from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import { homeData } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import dynamic from "next/dynamic"

const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"), {
  loading: () => <div className="py-20 md:py-32" />,
})

export const metadata = generateSEOMetadata({
  title: homeData.meta.title,
  description: homeData.meta.description,
  path: homeData.meta.path,
  ogImage: homeData.meta.ogImage,
  keywords: homeData.meta.keywords ? [...homeData.meta.keywords] : [],
})

export default function HomePage() {
  // pass only plain JSON to client islands
  return (
    <>
      <HeroSection data={homeData.hero} />
      <StatsSection />
      <ServicesSection data={homeData.services} />
      <PortfolioSection data={homeData.portfolio} />
      <TestimonialsSection data={homeData.testimonials} />
      <CtaSection data={homeData.cta} />
    </>
  )
}