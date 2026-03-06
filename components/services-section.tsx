import { getServices } from "@/actions/services"
import { AnimateInView } from "@/components/animate-in-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { homeData } from "@/data/corpus"
import { ArrowRight, Palette, Search, Smartphone, TrendingUp } from "lucide-react"
import Link from "next/link"

const ICONS = { Palette, TrendingUp, Search, Smartphone } as const

export default async function ServicesSection() {
  const servicesList = await getServices()

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
    <section className="py-12 md:py-20">
      <div className="container px-4">
        <AnimateInView className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {data.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {data.subtitle}
          </p>
        </AnimateInView>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((service, index) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Palette

            // 1. Split by new lines to get individual rows
            const lines = service.description.split('\n').filter(line => line.trim() !== '');

            // 2. The first line is the "Intro"
            const intro = lines[0];

            // 3. Everything after the first line is a "Feature"
            const features = lines.slice(1);

            return (
              <div key={index}>
                <Card className="group h-full flex flex-col border-none shadow-sm hover:shadow-md transition-all duration-300 bg-card">
                  <CardHeader className="pb-">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>

                    <CardTitle className="text-2xl font-bold mb-4">{service.title}</CardTitle>

                    {/* Render Intro */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {intro}
                    </p>

                    {/* Render Universal Features */}
                    {features.length > 0 && (
                      <ul className="space-y-4">
                        {features.map((feature, fIdx) => {
                          // Extract the first word/emoji as the icon
                          const words = feature.trim().split(' ');
                          const bulletIcon = words[0];
                          const bulletText = words.slice(1).join(' ');

                          return (
                            <li key={fIdx} className="flex items-start gap-3">
                              <span className="text-lg leading-none shrink-0">{bulletIcon}</span>
                              <span className="text-sm text-foreground/80 leading-snug">{bulletText}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </CardHeader>

                  <CardContent className="mt-auto pt-6">
                    <Button className="p-2  h-auto bg-primary/10 hover:bg-primary/20 text-primary font-bold group/btn" asChild>
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
