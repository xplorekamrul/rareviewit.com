import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnimateInView } from "@/components/animate-in-view"
import { StaggerContainer } from "@/components/stagger-container"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import { blogCta, blogHero, blogPost, featured, posts } from "@/data/corpus"
import Image from "next/image"



export const metadata = generateSEOMetadata({
  title: "Blog - Insights & Resources",
  description: "Expert advice, industry trends, and practical tips to help you succeed in the digital world.",
  path: "/blog",
})

export default function BlogPage() {

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6" variant="secondary">
              {blogHero.badge}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              {blogHero.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-balance">
              {blogHero.description}
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <AnimateInView >
            <Card className="overflow-hidden transition-all hover:shadow-xl">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                  <div className="h-full w-full object-cover">
                    <Image
                      src={featured.image || "/placeholder.svg"}
                      alt={featured.title}
                      fill
                    />
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

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-20">
        <div className="container px-4">
          <AnimateInView className="mb-12">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">{blogPost.title}</h2>
          </AnimateInView>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <AnimateInView key={index} delay={index * 0.1} direction="up">
                <Card className="group overflow-hidden transition-all hover:shadow-lg h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                      />
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
              {blogPost.btnText}
            </Button>
          </AnimateInView>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4">
          <AnimateInView className="mx-auto max-w-2xl text-center" >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {blogCta.title}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-balance">
              {blogCta.description}
            </p>

            <Link href={blogCta.btnUrl}>
              <Button type="submit" >{blogCta.btnText}</Button>
            </Link>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
