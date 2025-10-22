"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { booking, FALLBACK_IMAGE } from "@/data/corpus"

const withFallback = (src?: string) =>
  src && src.trim().length > 0 ? src : FALLBACK_IMAGE

export default function BookingClient() {
  const {
    hero,
    meetingTypesSection,
    meetingTypes,
    calendarSection,
    expectationsSection,
    expectations,
    faqSection,
    faqs,
    cta,
  } = booking

  return (
    <>
      {/* Hero Section */}
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
            <Button asChild className="mt-8" size="lg">
              <Link href={hero.btnUrl}>{hero.btnText}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Meeting Types */}
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
              {meetingTypesSection.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {meetingTypesSection.subtitle}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {meetingTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full transition-all hover:shadow-xl">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-foreground">{type.title}</h3>
                      <div className="mb-4 text-sm font-medium text-accent">{type.duration}</div>
                      <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                        {type.description}
                      </p>
                      <ul className="mb-6 space-y-2 text-left">
                        {type.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full">
                        <Link href="#calendar">Select This</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Calendar Integration */}
      <section id="calendar" className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                {calendarSection.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                {calendarSection.subtitle}
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="aspect-video flex items-center justify-center rounded-lg bg-muted">
                  <div className="text-center text-muted-foreground">
                    <div className="mb-2 text-4xl">{calendarSection.embedNoteTitle}</div>
                    <div>{calendarSection.embedNoteLine1}</div>
                    <div className="mt-4 text-sm">{calendarSection.embedNoteLine2}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl"
          >
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                {expectationsSection.title}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {expectations.map((expectation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="flex items-center gap-4 p-6">
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-accent" />
                      <span className="text-foreground">{expectation}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl"
          >
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                {faqSection.title}
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-bold text-foreground">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              {cta.description}
            </p>
            <Button size="lg" asChild>
              <Link href={cta.btnUrl}>{cta.btnText}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
