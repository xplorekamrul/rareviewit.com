"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

// Icon registry (client-side)
import {
  Book, FileText, MessageCircle, Video, HelpCircle, Mail, Phone, Search
} from "lucide-react"

const ICONS = {
  Book,
  FileText,
  MessageCircle,
  Video,
  HelpCircle,
  Mail,
  Phone,
  Search,
} as const

type IconKey = keyof typeof ICONS

type HelpCategory = {
  icon: IconKey
  title: string
  description: string
  articles: number
  link: string
}
type HelpData = {
  hero: { badge: string; title: string; description: string; searchPlaceholder: string }
  categoriesSection: { title: string; subtitle: string }
  categories: HelpCategory[]
  popularSection: { title: string; subtitle: string }
  popularArticles: { title: string; category: string; views: string }[]
  contactSection: {
    title: string
    subtitle: string
    options: { icon: IconKey; title: string; description: string; action: string; available: string }[]
  }
  quickLinksSection: {
    title: string
    primary: { text: string; href: string }
    secondary: { text: string; href: string }
    tertiary: { text: string; href: string }
  }
}

export default function ClientHelpPage({ data }: { data: HelpData }) {
  const { hero, categoriesSection, categories, popularSection, popularArticles, contactSection, quickLinksSection } = data

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              {hero.badge}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              {hero.title}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              {hero.description}
            </p>

            {/* Search */}
            <div className="relative mx-auto max-w-2xl">
              <ICONS.Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={hero.searchPlaceholder}
                className="h-14 pl-12 pr-4 text-base"
              />
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {categoriesSection.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {categoriesSection.subtitle}
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = ICONS[category.icon] ?? ICONS.HelpCircle
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

      {/* Popular Articles */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {popularSection.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {popularSection.subtitle}
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
                          <ICONS.HelpCircle className="h-5 w-5 shrink-0 text-primary mt-1" />
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

      {/* Contact Support */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {contactSection.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {contactSection.subtitle}
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {contactSection.options.map((option, index) => {
              const Icon = ICONS[option.icon] ?? ICONS.HelpCircle
              return (
                <AnimateInView key={index} delay={index * 0.1}>
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

      {/* Quick Links */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {quickLinksSection.title}
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href={quickLinksSection.primary.href}>{quickLinksSection.primary.text}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={quickLinksSection.secondary.href}>{quickLinksSection.secondary.text}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={quickLinksSection.tertiary.href}>{quickLinksSection.tertiary.text}</Link>
              </Button>
            </div>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
