import { getAllTestimonials } from '@/actions/testimonials'
import { TestimonialsContent } from './testimonials-content'

export default async function TestimonialsAdminPage() {
   const testimonials = await getAllTestimonials()

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
               Testimonials
            </h1>
            <p className="text-muted-foreground mt-2">
               Manage customer testimonials and success stories displayed across the website.
            </p>
         </div>

         <TestimonialsContent initialTestimonials={testimonials} />
      </div>
   )
}
