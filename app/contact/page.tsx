// app/contact/page.tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin as MapPinIcon } from "lucide-react"
import { contact } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import { AnimateInView } from "@/components/animate-in-view" // client island for animations

// ---- Metadata (server)
export const metadata = generateSEOMetadata({
  title: contact.meta.title,
  description: contact.meta.description,
  path: contact.meta.path,
  ogImage: contact.meta.ogImage,
})

// ---- Server Action (no client JS required)
async function submitContact(formData: FormData) {
  "use server"
  const payload = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    company: formData.get("company"),
    service: formData.get("service"),
    message: formData.get("message"),
  }
  console.log("Contact form submission:", payload)
}

export default function ContactPage() {
  const { hero, formSection, infoSection, mapSection } = contact

  return (
    <>
      {/* Hero (server-rendered + animated island) */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              {hero.badge}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              {hero.description}
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <AnimateInView direction="left" className="">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{formSection.title}</h2>
              <form action={submitContact} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{formSection.fields.firstName.label}</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder={formSection.fields.firstName.placeholder}
                      required={Boolean(formSection.fields.firstName.required)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{formSection.fields.lastName.label}</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder={formSection.fields.lastName.placeholder}
                      required={Boolean(formSection.fields.lastName.required)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{formSection.fields.email.label}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={formSection.fields.email.placeholder}
                    required={Boolean(formSection.fields.email.required)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{formSection.fields.company.label}</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder={formSection.fields.company.placeholder}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">{formSection.fields.service.label}</Label>
                  <select
                    id="service"
                    name="service"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue=""
                  >
                    {formSection.fields.service.options.map((opt, i) => (
                      <option key={i} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{formSection.fields.message.label}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={formSection.fields.message.placeholder}
                    rows={formSection.fields.message.rows}
                    required={Boolean(formSection.fields.message.required)}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {formSection.submit.label}
                </Button>
              </form>
            </AnimateInView>

            {/* Contact Information */}
            <AnimateInView direction="right">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{infoSection.title}</h2>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                {infoSection.description}
              </p>

              <div className="space-y-6">
                {infoSection.items.map((info, idx) => {
                  const Icon = info.icon
                  return (
                    <AnimateInView key={idx} delay={idx * 0.1}>
                      <Card>
                        <CardContent className="flex items-start gap-4 p-6">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="mb-1 font-semibold text-foreground">{info.title}</h3>
                            {info.link && info.link !== "#" ? (
                              <a
                                href={info.link}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {info.details}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">{info.details}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </AnimateInView>
                  )
                })}
              </div>

              <AnimateInView delay={0.2}>
                <Card className="mt-8 bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-bold">{infoSection.quickNote.title}</h3>
                    <p className="text-primary-foreground">
                      {infoSection.quickNote.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimateInView>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4">
          <AnimateInView>
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <MapPinIcon className="mr-2 h-6 w-6" />
                <span>{mapSection.placeholderTitle}</span>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
