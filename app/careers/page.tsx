"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"

export default function CareersPage() {
  const benefits = [
    {
      title: "Competitive Salary",
      description: "Industry-leading compensation packages with performance bonuses",
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
    },
    {
      title: "Flexible Work",
      description: "Remote-friendly with flexible hours and work-life balance",
    },
    {
      title: "Professional Growth",
      description: "Continuous learning opportunities and career development",
    },
    {
      title: "Creative Environment",
      description: "Collaborative culture that values innovation and creativity",
    },
    {
      title: "Latest Technology",
      description: "Work with cutting-edge tools and technologies",
    },
  ]

  const openings = [
    {
      title: "Senior Web Designer",
      department: "Design",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description:
        "We're looking for a talented web designer to create beautiful, user-friendly websites for our clients.",
    },
    {
      title: "Digital Marketing Manager",
      department: "Marketing",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "Lead digital marketing campaigns and strategies for diverse clients across multiple industries.",
    },
    {
      title: "Full-Stack Developer",
      department: "Development",
      location: "Remote",
      type: "Full-time",
      description: "Build scalable web applications using modern technologies like React, Node.js, and Next.js.",
    },
    {
      title: "SEO Specialist",
      department: "Marketing",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "Drive organic growth for clients through strategic SEO planning and implementation.",
    },
    {
      title: "Mobile App Developer",
      department: "Development",
      location: "Remote",
      type: "Full-time",
      description: "Create native and cross-platform mobile applications for iOS and Android.",
    },
    {
      title: "Content Strategist",
      department: "Marketing",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "Develop content strategies that engage audiences and drive business results.",
    },
  ]

  const values = [
    {
      title: "Innovation First",
      description: "We embrace new ideas and technologies to stay ahead of the curve.",
    },
    {
      title: "Client Success",
      description: "Our clients' success is our success. We go above and beyond every time.",
    },
    {
      title: "Team Collaboration",
      description: "We believe in the power of teamwork and open communication.",
    },
    {
      title: "Continuous Learning",
      description: "We invest in our team's growth and encourage ongoing education.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              Careers
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              Join Our Creative Team
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              Build your career with a team that values innovation, creativity, and personal growth. We're always
              looking for talented individuals to join our mission.
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Why Work With Us?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              We offer more than just a job - we offer a career where you can grow and make an impact
            </p>
          </AnimateInView>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <AnimateInView key={index} delay={index * 0.1}>
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-lg font-bold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Our Values
            </h2>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <AnimateInView key={index} delay={index * 0.1} className="text-center">
                <h3 className="mb-2 text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Open Positions
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              Explore our current job openings and find your perfect role
            </p>
          </AnimateInView>

          <StaggerContainer className="space-y-6">
            {openings.map((job, index) => (
              <AnimateInView key={index} delay={index * 0.1}>
                <Card className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="mb-2 text-2xl">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                      <Button asChild className="group/btn">
                        <Link href={`/careers/${job.title.toLowerCase().replace(/\s+/g, "-")}`}>
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground md:py-32">
        <div className="container px-4">
          <AnimateInView scale className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              Don't See the Right Role?
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 text-balance">
              We're always interested in hearing from talented individuals. Send us your resume and let's talk about
              future opportunities.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
