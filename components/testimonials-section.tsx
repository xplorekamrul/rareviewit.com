import { getTestimonials } from '@/actions/testimonials'
import { AnimateInView } from '@/components/animate-in-view'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import type { Testimonial } from '@prisma/client'
import { Suspense } from 'react'

async function TestimonialsList() {
  const testimonials = await getTestimonials()

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No testimonials available at the moment.
        </p>
      </div>
    )
  }

  const transformedTestimonials = testimonials.map((t: Testimonial) => ({
    quote: t.quote,
    name: t.author,
    designation: t.company,
    src: t.logo || '/placeholder.svg',
  }))

  return (
    <AnimateInView className="mx-auto max-w-4xl">
      <AnimatedTestimonials testimonials={transformedTestimonials} autoplay={true} />
    </AnimateInView>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4">
        <AnimateInView className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
            Real feedback from the businesses we've helped transform.
          </p>
        </AnimateInView>

        <Suspense
          fallback={
            <div className="mx-auto max-w-4xl py-12 text-center">
              <p className="text-muted-foreground">Loading testimonials...</p>
            </div>
          }
        >
          <TestimonialsList />
        </Suspense>
      </div>
    </section>
  )
}
