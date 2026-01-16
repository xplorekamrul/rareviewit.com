// src/app/blog/page.tsx
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"
import Image from "next/image"
import { blog, FALLBACK_IMAGE } from "@/data/corpus"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"

export const metadata = generateSEOMetadata({
  title: blog.meta.title,
  description: blog.meta.description,
  path: blog.meta.path,
  ogImage: blog.meta.ogImage,
})

const withFallback = (src?: string) =>
  src && src.trim().length > 0 ? src : FALLBACK_IMAGE

export default function BlogPage() {
  const { hero, featured, postList, posts, cta } = blog

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
          </AnimateInView>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <AnimateInView>
            <Card className="overflow-hidden transition-all hover:shadow-xl">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                  <div className="h-full w-full object-cover">
                    <Image src={withFallback(featured.image)} alt={featured.title} fill />
                  </div>
                </div>
                <CardContent className="flex flex-col justify-center p-6 lg:p-8">
                  <Badge className="mb-4 w-fit" variant="secondary">
                    {featured.badge}
                  </Badge>
                  <h2 className="mb-4 text-3xl font-bold text-foreground text-balance">{featured.title}</h2>
                  <p className="mb-6 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                  <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{featured.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={featured.btnUrl}>
                      {featured.btnText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </AnimateInView>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-20">
        <div className="container px-4">
          <AnimateInView className="mb-12">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">{postList.title}</h2>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <AnimateInView key={i} delay={i * 0.1} direction="up">
                <Card className="group overflow-hidden transition-all hover:shadow-lg h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105">
                      <Image src={withFallback(post.image)} alt={post.title} fill />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-3" variant="outline">
                      {post.category}
                    </Badge>
                    <h3 className="mb-3 text-xl font-bold text-foreground text-balance">{post.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </StaggerContainer>

          <AnimateInView className="mt-12 text-center">
            <Button variant="outline" size="lg">
              {postList.btnText}
            </Button>
          </AnimateInView>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {cta.title}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              {cta.description}
            </p>
            <Link href={cta.btnUrl}><Button type="button">{cta.btnText}</Button></Link>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
