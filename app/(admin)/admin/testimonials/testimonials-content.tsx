'use client'

import type { Testimonial } from '@prisma/client'
import { useState } from 'react'
import { TestimonialsForm } from './testimonials-form'
import { TestimonialsTable } from './testimonials-table'

interface TestimonialsContentProps {
   initialTestimonials: Testimonial[]
}

export function TestimonialsContent({ initialTestimonials }: TestimonialsContentProps) {
   const [testimonials, setTestimonials] = useState(initialTestimonials)
   const [isFormOpen, setIsFormOpen] = useState(false)
   const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)

   const handleFormClose = () => {
      setIsFormOpen(false)
      setSelectedTestimonial(null)
   }

   const handleEdit = (testimonial: Testimonial) => {
      setSelectedTestimonial(testimonial)
      setIsFormOpen(true)
   }

   const handleSuccess = (newTestimonial: Testimonial | null) => {
      if (newTestimonial) {
         if (selectedTestimonial) {
            // Update existing
            setTestimonials(prev =>
               prev.map(t => (t.id === newTestimonial.id ? newTestimonial : t))
            )
         } else {
            // Add new
            setTestimonials(prev => [newTestimonial, ...prev])
         }
      }
      handleFormClose()
   }

   const handleDelete = (id: string) => {
      setTestimonials(prev => prev.filter(t => t.id !== id))
   }

   return (
      <div className="space-y-6">
         {!isFormOpen ? (
            <TestimonialsTable
               testimonials={testimonials}
               onEdit={handleEdit}
               onDelete={handleDelete}
               onAddNew={() => setIsFormOpen(true)}
            />
         ) : (
            <TestimonialsForm
               testimonial={selectedTestimonial}
               onClose={handleFormClose}
               onSuccess={handleSuccess}
            />
         )}
      </div>
   )
}
