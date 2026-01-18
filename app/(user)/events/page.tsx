// app/events/page.tsx
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, Play } from "lucide-react"
import { AnimateInView } from "@/components/animate-in-view" // client island for animations
import { events } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"

export const metadata = generateSEOMetadata({
  title: events.meta.title,
  description: events.meta.description,
  path: events.meta.path,
  ogImage: events.meta.ogImage,
})

// Server Action for newsletter signup (no client JS needed)
async function subscribeAction(formData: FormData) {
  "use server"
  const email = String(formData.get("email") || "")
  // TODO: push to your ESP / DB
  console.log("Newsletter subscribe:", email)
}

export default function EventsPage() {
  const { hero, upcomingSection, upcomingEvents, pastSection, pastEvents, newsletter } = events

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">{hero.badge}</Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              {hero.description}
            </p>
            <Button asChild className="mt-8">
              <a href={hero.ctaHref}>{hero.ctaText}</a>
            </Button>
          </AnimateInView>
        </div>
      </section>

      {/* Upcoming */}
      <section id="upcoming" className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {upcomingSection.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {upcomingSection.subtitle}
            </p>
          </AnimateInView>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, i) => (
              <AnimateInView key={i} delay={i * 0.1}>
                <Card className="h-full transition-all hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant={event.format === "Online" ? "default" : "secondary"}>
                        {event.format === "Online" ? "🖥️ Online" : "🏢 In-Person"}
                      </Badge>
                      {event.spotsLeft < 15 && (
                        <Badge variant="outline" className="text-accent">
                          {event.spotsLeft} spots left
                        </Badge>
                      )}
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-foreground text-balance">{event.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{event.description}</p>

                    <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.platform}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.speaker}</span>
                      </div>
                    </div>

                    <Button asChild className="w-full">
                      <a href="/contact">Register Now</a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Past / Replays */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {pastSection.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {pastSection.subtitle}
            </p>
          </AnimateInView>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pastEvents.map((event, i) => (
              <AnimateInView key={i} delay={i * 0.1}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={event.thumbnail || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <Badge className="absolute bottom-2 right-2" variant="secondary">
                      {event.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-bold text-foreground text-balance">{event.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{event.date}</span>
                      <span>{event.views} views</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </div>

          <AnimateInView className="mt-12 text-center">
            <Button variant="outline" size="lg">
              {pastSection.btnText}
            </Button>
          </AnimateInView>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {newsletter.title}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              {newsletter.description}
            </p>
            <form action={subscribeAction} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                name="email"
                type="email"
                placeholder={newsletter.placeholder}
                required
                className="flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-80"
              />
              <Button type="submit">{newsletter.btnText}</Button>
            </form>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
