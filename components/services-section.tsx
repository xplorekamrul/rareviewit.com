import { AnimateInView } from "@/components/animate-in-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { homeData } from "@/data/corpus"
import { Service } from "@prisma/client"
import { ArrowRight, Palette, Search, Smartphone, TrendingUp } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"

const ICONS = { Palette, TrendingUp, Search, Smartphone } as const

export default async function ServicesSection() {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const apiUrl = `${protocol}://${host}/api/services`

  let servicesList: Service[] = []
  try {
    const res = await fetch(apiUrl, {
      next: { tags: ['services'] },
      cache: 'force-cache'
    })

    if (res.ok) {
      const json = await res.json()
      if (json.success) {
        servicesList = json.data
      }
    }
  } catch (error) {
    console.error("Failed to fetch services:", error)
  }

  const data = {
    ...homeData.services,
    items: servicesList.length > 0 ? servicesList.map(s => ({
      icon: s.icon as keyof typeof ICONS,
      title: s.title,
      description: s.description,
      href: s.href
    })) : homeData.services.items
  }

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <AnimateInView className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            {data.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
            {data.subtitle}
          </p>
        </AnimateInView>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((service, index) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Palette
            return (
              <div key={index}>
                <Card animated={false} className="group h-full transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" asChild className="group/btn">
                      <Link href={service.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
