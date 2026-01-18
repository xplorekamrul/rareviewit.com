"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import Link from "next/link"

// Icon registry
import { DollarSign, GraduationCap, Target } from "lucide-react"
const ICONS = { DollarSign, Target, GraduationCap } as const
type IconKey = keyof typeof ICONS

type PartnerLogo = { name: string; logo: string }
type Model = {
  icon: IconKey
  title: string
  description: string
  benefits: ReadonlyArray<string>
  cta: { text: string; href: string }
}
type Testimonial = { quote: string; author: string; company: string; logo: string }

type PartnersData = {
  hero: {
    badge: string
    title: string
    description: string
    primaryCta: { text: string; href: string }
    secondaryCta: { text: string; href: string }
  }
  logos: ReadonlyArray<PartnerLogo>
  affiliate: {
    title: string
    subtitle: string
    stats: ReadonlyArray<{ label: string; value: string }>
    cta: { text: string; href: string }
  }
  modelsSection: { title: string; subtitle: string }
  models: ReadonlyArray<Model>
  testimonialsSection: { title: string }
  testimonials: ReadonlyArray<Testimonial>
  cta: { title: string; description: string; button: { text: string; href: string } }
}

export default function PartnersClient({ data }: { data: PartnersData }) {
  const { hero, logos, affiliate, modelsSection, models, testimonialsSection, testimonials, cta } = data

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-6" variant="secondary">
              {hero.badge}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href={hero.primaryCta.href}>{hero.primaryCta.text}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={hero.secondaryCta.href}>{hero.secondaryCta.text}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="border-y border-border bg-muted/20 py-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Our Partners</h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {logos.map((partner, index) => (
              <motion.div
                key={partner.name + index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <div className="group relative h-20 w-full transition-all hover:scale-110">
                  <img
                    src={partner.logo || "/placeholder.svg?height=80&width=120"}
                    alt={partner.name}
                    className="h-full w-full object-contain opacity-60 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Program */}
      <section id="affiliate" className="py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {affiliate.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {affiliate.subtitle}
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-8 md:p-12">
                <div className="grid gap-8 md:grid-cols-3">
                  {affiliate.stats.map((s, i) => (
                    <motion.div
                      key={s.label + i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
                      className="text-center"
                    >
                      <div className="mb-4 text-4xl font-bold text-primary">{s.value}</div>
                      <div className="text-sm text-muted-foreground">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button size="lg" asChild>
                    <Link href={affiliate.cta.href}>{affiliate.cta.text}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {modelsSection.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {modelsSection.subtitle}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {models.map((model, index) => {
              const Icon = ICONS[model.icon] ?? ICONS.DollarSign
              return (
                <motion.div
                  key={model.title + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-all hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-foreground">{model.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{model.description}</p>
                      <ul className="space-y-2">
                        {model.benefits.map((b, i) => (
                          <li key={b + i} className="flex items-center gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="mt-6 w-full">
                        <Link href={model.cta.href}>{model.cta.text}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {testimonialsSection.title}
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.author + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card animated={true} speed={10} lineLength={80} >
                  <CardContent className="p-6">
                    <Quote className="mb-4 h-8 w-8 text-accent/20" />
                    <p className="mb-6 text-muted-foreground leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                        <img
                          src={t.logo || "/placeholder.svg?height=48&width=48"}
                          alt={t.company}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{t.author}</div>
                        <div className="text-sm text-muted-foreground">{t.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground text-balance">
              {cta.description}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href={cta.button.href}>{cta.button.text}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
