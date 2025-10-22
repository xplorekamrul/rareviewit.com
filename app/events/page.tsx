"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Play } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "Modern Web Design Trends 2025",
      date: "Feb 15, 2025",
      time: "2:00 PM PST",
      format: "Online",
      platform: "Zoom",
      spotsLeft: 12,
      description: "Discover the latest design trends and techniques shaping the web in 2025.",
      speaker: "Sarah Martinez, Creative Director",
    },
    {
      title: "SEO Masterclass: From Zero to Hero",
      date: "Feb 22, 2025",
      time: "1:00 PM PST",
      format: "Online",
      platform: "YouTube Live",
      spotsLeft: 45,
      description: "Learn proven SEO strategies to boost your website's visibility and traffic.",
      speaker: "Michael Chen, SEO Specialist",
    },
    {
      title: "Building Scalable React Applications",
      date: "Mar 5, 2025",
      time: "3:00 PM PST",
      format: "In-Person",
      platform: "San Francisco Office",
      spotsLeft: 8,
      description: "Hands-on workshop covering React best practices and architecture patterns.",
      speaker: "David Kim, Lead Developer",
    },
  ]

  const pastEvents = [
    {
      title: "Digital Marketing in 2024: What Worked",
      date: "Jan 10, 2025",
      views: "1.2K",
      thumbnail: "/event-marketing.jpg",
      duration: "45 min",
    },
    {
      title: "Introduction to Next.js 15",
      date: "Dec 15, 2024",
      views: "2.5K",
      thumbnail: "/event-nextjs.jpg",
      duration: "60 min",
    },
    {
      title: "E-commerce Best Practices",
      date: "Nov 20, 2024",
      views: "980",
      thumbnail: "/event-ecommerce.jpg",
      duration: "50 min",
    },
    {
      title: "Mobile-First Design Workshop",
      date: "Oct 30, 2024",
      views: "1.8K",
      thumbnail: "/event-mobile.jpg",
      duration: "55 min",
    },
  ]

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
              Events & Webinars
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              Workshops, Webinars & Live Events
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              Join our community for expert-led sessions designed to help your business grow.
            </p>
            <Button asChild className="mt-8">
              <Link href="#upcoming">View Upcoming Events</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming" className="py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Upcoming Events
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Register now to secure your spot
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
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
                      <Link href="/contact">Register Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events / Replays */}
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
              Past Events & Replays
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Catch up on sessions you missed
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                      src={event.thumbnail || "/placeholder.svg?height=200&width=400"}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              View All Replays
            </Button>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Don't Miss Our Next Live Session
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              Get notified about upcoming events and exclusive content
            </p>
            <form className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-80"
              />
              <Button type="submit">Notify Me</Button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}
