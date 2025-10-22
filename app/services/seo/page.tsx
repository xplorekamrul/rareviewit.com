"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Search, TrendingUp, FileText, LinkIcon } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

export default function SEOPage() {
  const services = [
    {
      icon: Search,
      title: "Keyword Research",
      description: "Identify high-value keywords that drive qualified traffic to your site.",
    },
    {
      icon: FileText,
      title: "On-Page SEO",
      description: "Optimize your content, meta tags, and site structure for search engines.",
    },
    {
      icon: LinkIcon,
      title: "Link Building",
      description: "Build high-quality backlinks that boost your domain authority.",
    },
    {
      icon: TrendingUp,
      title: "Technical SEO",
      description: "Improve site speed, mobile-friendliness, and crawlability.",
    },
  ]

  const benefits = [
    "Rank on the first page of Google",
    "Increase organic traffic by 300%+",
    "Generate more qualified leads",
    "Reduce customer acquisition costs",
    "Build long-term sustainable growth",
    "Outrank your competitors",
  ]

  const results = [
    { metric: "First Page Rankings", value: "50+ Keywords", client: "E-commerce Client" },
    { metric: "Organic Traffic Growth", value: "+425%", client: "SaaS Company" },
    { metric: "Lead Generation", value: "+280%", client: "B2B Service" },
    { metric: "Domain Authority", value: "35 → 62", client: "Tech Startup" },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left">
              <Badge className="mb-6" variant="secondary">
                SEO Services
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
                Dominate Search Results & Drive Organic Growth
              </h1>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
                Our proven SEO strategies help businesses rank higher, attract more qualified traffic, and convert
                visitors into customers. Get found by people actively searching for your services.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">Get a Free SEO Audit</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">View Success Stories</Link>
                </Button>
              </div>
            </AnimateInView>
            <AnimateInView direction="right" scale>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img src="/seo-analytics.jpg" alt="SEO analytics" className="h-full w-full object-cover" />
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Real Results for Real Businesses
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              See how we've helped businesses achieve remarkable SEO success
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {results.map((result, index) => (
              <AnimateInView key={index} delay={index * 0.1} scale>
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="mb-2 text-3xl font-bold text-primary">{result.value}</div>
                    <div className="mb-1 font-semibold text-foreground">{result.metric}</div>
                    <div className="text-sm text-muted-foreground">{result.client}</div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Comprehensive SEO Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Everything you need to succeed in search engines
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <AnimateInView key={index} delay={index * 0.1}>
                  <Card className="h-full transition-all hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-foreground">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </AnimateInView>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateInView direction="left">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Why SEO is Essential for Your Business
              </h2>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                SEO is one of the most cost-effective marketing strategies with long-lasting results. Unlike paid ads,
                organic rankings continue to drive traffic and leads over time.
              </p>
              <StaggerContainer className="space-y-3">
                {benefits.map((benefit, index) => (
                  <AnimateInView key={index} delay={index * 0.1} direction="left">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  </AnimateInView>
                ))}
              </StaggerContainer>
            </AnimateInView>
            <AnimateInView direction="right" scale>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img src="/seo-growth.jpg" alt="SEO growth" className="h-full w-full object-cover" />
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground md:py-32">
        <div className="container px-4">
          <AnimateInView scale className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              Ready to Rank Higher on Google?
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              Get a free SEO audit and discover how we can help you dominate search results.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Claim Your Free Audit</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
