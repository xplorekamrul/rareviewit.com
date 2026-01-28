import CtaSection from "@/components/cta-section"
import HeroSection from "@/components/hero-section"
import PortfolioSection from "@/components/portfolio-section"
import ServicesSection from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import TestimonialsSection from "@/components/testimonials-section"
import { homeData } from "@/data/corpus"
import { prisma } from "@/lib/prisma"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import { Suspense } from "react"

export const metadata = generateSEOMetadata({
  title: homeData.meta.title,
  description: homeData.meta.description,
  path: homeData.meta.path,
  ogImage: homeData.meta.ogImage,
  keywords: homeData.meta.keywords ? [...homeData.meta.keywords] : [],
})

async function getFeaturedProjects() {
  "use cache"
  try {
    const projects = await prisma.portfolio.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" }
      ],
      take: 6,
      include: {
        category: {
          select: { name: true },
        },
      },
    })

    return projects.map((project) => ({
      title: project.title,
      category: project.category.name,
      image: project.image,
      tags: project.tags,
    }))
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return []
  }
}

async function PortfolioLoader() {
  const featuredProjects = await getFeaturedProjects()
  // Merge static content with dynamic projects
  // If no dynamic projects found (e.g. database empty/error), fallback to static data or show empty
  const portfolioData = {
    ...homeData.portfolio,
    projects: featuredProjects.length > 0 ? featuredProjects : homeData.portfolio.projects,
  }

  return <PortfolioSection data={portfolioData} />
}

export default function HomePage() {
  // pass only plain JSON to client islands
  return (
    <>
      <HeroSection data={homeData.hero} />
      <StatsSection />
      <Suspense fallback={<div className="py-32 text-center text-muted-foreground">Loading services...</div>}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<div className="py-32 text-center text-muted-foreground">Loading portfolio...</div>}>
        <PortfolioLoader />
      </Suspense>
      <TestimonialsSection />
      <CtaSection data={homeData.cta} />
    </>
  )
}