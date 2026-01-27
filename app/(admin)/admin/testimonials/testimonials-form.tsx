'use client'

import { createTestimonial, updateTestimonial } from '@/actions/testimonials'
import { testimonialSchema } from '@/lib/validations/testimonials'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Testimonial } from '@prisma/client'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface TestimonialsFormProps {
   testimonial: Testimonial | null
   onClose: () => void
   onSuccess: (testimonial: Testimonial | null) => void
}

interface FormData {
   quote: string
   author: string
   company: string
   logo?: string
   featured: boolean
   status: 'PUBLISHED' | 'DRAFT'
}

export function TestimonialsForm({
   testimonial,
   onClose,
   onSuccess,
}: TestimonialsFormProps) {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [serverError, setServerError] = useState<string | null>(null)
   const isEditMode = !!testimonial

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      resolver: zodResolver(testimonialSchema) as any,
      defaultValues: isEditMode && testimonial
         ? {
            quote: testimonial.quote,
            author: testimonial.author,
            company: testimonial.company,
            logo: testimonial.logo || '',
            featured: testimonial.featured,
            status: (testimonial.status as 'PUBLISHED' | 'DRAFT') || 'PUBLISHED',
         }
         : {
            quote: '',
            author: '',
            company: '',
            logo: '',
            featured: false,
            status: 'PUBLISHED',
         },
   })

   const onSubmit = async (data: FormData) => {
      setIsSubmitting(true)
      setServerError(null)

      try {
         let result

         if (isEditMode && testimonial) {
            result = await updateTestimonial({
               id: testimonial.id,
               ...data,
            } as any)
         } else {
            result = await createTestimonial(data as any)
         }

         if (result.data?.success) {
            onSuccess(result.data.data || null)
         } else {
            setServerError(result.data?.error || 'An error occurred')
         }
      } catch (error) {
         console.error('Form submission error:', error)
         setServerError('Failed to submit form. Please try again.')
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <div className="space-y-6 pb-32">
         <div>
            <h2 className="text-2xl font-bold text-foreground">
               {isEditMode ? 'Edit Testimonial' : 'Create New Testimonial'}
            </h2>
            <p className="text-muted-foreground mt-1">
               {isEditMode
                  ? 'Update the testimonial information below.'
                  : 'Add a new customer testimonial.'}
            </p>
         </div>

         <div className="bg-card border rounded-lg p-6 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               {serverError && (
                  <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                     <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                     <p className="text-sm text-red-800">{serverError}</p>
                  </div>
               )}

               {/* Quote Field */}
               <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                     Quote <span className="text-red-500">*</span>
                  </label>
                  <textarea
                     {...register('quote')}
                     placeholder="Enter the customer testimonial..."
                     rows={4}
                     className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.quote ? 'border-red-500' : 'border-border'
                        }`}
                  />
                  {errors.quote && (
                     <p className="text-sm text-red-500">{errors.quote.message}</p>
                  )}
               </div>

               {/* Author Field */}
               <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                     Author Name <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     {...register('author')}
                     placeholder="John Doe"
                     className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.author ? 'border-red-500' : 'border-border'
                        }`}
                  />
                  {errors.author && (
                     <p className="text-sm text-red-500">{errors.author.message}</p>
                  )}
               </div>

               {/* Company Field */}
               <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                     Company <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     {...register('company')}
                     placeholder="Acme Corp"
                     className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.company ? 'border-red-500' : 'border-border'
                        }`}
                  />
                  {errors.company && (
                     <p className="text-sm text-red-500">{errors.company.message}</p>
                  )}
               </div>

               {/* Logo Field */}
               <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                     Company Logo URL
                  </label>
                  <input
                     type="text"
                     {...register('logo')}
                     placeholder="https://example.com/logo.png"
                     className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.logo ? 'border-red-500' : 'border-border'
                        }`}
                  />
                  {errors.logo && (
                     <p className="text-sm text-red-500">{errors.logo.message}</p>
                  )}
               </div>

               {/* Status Field */}
               <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                     Status
                  </label>
                  <select
                     {...register('status')}
                     className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.status ? 'border-red-500' : 'border-border'
                        }`}
                  >
                     <option value="PUBLISHED">Published</option>
                     <option value="DRAFT">Draft</option>
                  </select>
                  {errors.status && (
                     <p className="text-sm text-red-500">{errors.status.message}</p>
                  )}
               </div>

               {/* Featured Field */}
               <div className="flex items-center gap-3">
                  <input
                     type="checkbox"
                     {...register('featured')}
                     id="featured"
                     className="w-4 h-4 rounded border-border"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-foreground">
                     Featured Testimonial
                  </label>
               </div>
            </form>
         </div>

         {/* Sticky Footer Buttons */}
         <div className="fixed bottom-0 right-0 left-0 bg-background border-t border-border p-4 flex justify-end gap-3 z-50">
            <button
               type="button"
               onClick={onClose}
               disabled={isSubmitting}
               className="px-4 py-2 text-foreground border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
               Cancel
            </button>
            <button
               type="button"
               disabled={isSubmitting}
               onClick={handleSubmit(onSubmit)}
               className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {isSubmitting ? (
                  <span className="flex items-center gap-2">
                     <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                     {isEditMode ? 'Updating...' : 'Saving...'}
                  </span>
               ) : isEditMode ? (
                  'Update'
               ) : (
                  'Save'
               )}
            </button>
         </div>
      </div>
   )
}
