"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Book, MessageCircle, Mail, Phone, FileText, Video, HelpCircle } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

export default function ClientHelpPage() {
  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics and get up to speed quickly",
      articles: 12,
      link: "/help/getting-started",
    },
    {
      icon: FileText,
      title: "Services & Pricing",
      description: "Understand our services, packages, and pricing",
      articles: 8,
      link: "/help/services",
    },
    {
      icon: MessageCircle,
      title: "Project Management",
      description: "How we manage projects and communicate with clients",
      articles: 15,
      link: "/help/projects",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      articles: 6,
      link: "/help/tutorials",
    },
  ]

  const popularArticles = [
    {
      title: "How do I get started with a new project?",
      category: "Getting Started",
      views: "2.5K",
    },
    {
      title: "What's included in your web design packages?",
      category: "Services",
      views: "1.8K",
    },
    {
      title: "How long does a typical project take?",
      category: "Project Management",
      views: "1.6K",
    },
    {
      title: "What payment methods do you accept?",
      category: "Billing",
      views: "1.4K",
    },
    {
      title: "Can I request revisions after project completion?",
      category: "Project Management",
      views: "1.2K",
    },
    {
      title: "Do you offer ongoing support and maintenance?",
      category: "Services",
      views: "1.1K",
    },
  ]

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      available: "Mon-Fri, 9AM-6PM PST",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      action: "Send Email",
      available: "Response within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with an expert",
      action: "Call Us",
      available: "+1 (555) 123-4567",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              Help Center
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              How Can We Help You?
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              Search our knowledge base or browse categories to find answers to your questions
            </p>

            {/* Search Bar */}
            <div className="relative mx-auto max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search for help articles..." className="h-14 pl-12 pr-4 text-base" />
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Browse by Category
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Find the information you need organized by topic
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <AnimateInView key={index} delay={index * 0.1}>
                  <Link href={category.link}>
                    <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-foreground">{category.title}</h3>
                        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                        <Badge variant="secondary">{category.articles} articles</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimateInView>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Popular Articles Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Popular Articles
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Most viewed help articles this month
            </p>
          </AnimateInView>

          <div className="mx-auto max-w-3xl">
            <StaggerContainer className="space-y-4">
              {popularArticles.map((article, index) => (
                <AnimateInView key={index} delay={index * 0.05}>
                  <Link href={`/help/article/${index}`}>
                    <Card className="transition-all hover:shadow-lg hover:border-primary">
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-start gap-4">
                          <HelpCircle className="h-5 w-5 shrink-0 text-primary mt-1" />
                          <div>
                            <h3 className="mb-1 font-semibold text-foreground">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">{article.category}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{article.views} views</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimateInView>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Still Need Help?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Our support team is here to assist you
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {contactOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <AnimateInView key={index} delay={index * 0.1} scale>
                  <Card className="h-full transition-all hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-foreground">{option.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{option.description}</p>
                      <p className="mb-6 text-xs text-muted-foreground">{option.available}</p>
                      <Button className="w-full">{option.action}</Button>
                    </CardContent>
                  </Card>
                </AnimateInView>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView scale className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Explore More Resources
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/faq">View FAQ</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/booking">Book a Call</Link>
              </Button>
            </div>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
