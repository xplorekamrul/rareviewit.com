'use server'

import prisma from '@/lib/prisma'
import { adminActionClient } from '@/lib/safe-action/clients'
import { testimonialSchema } from '@/lib/validations/testimonials'
import { cacheLife, cacheTag, updateTag } from 'next/cache'
import { z } from 'zod'

const createSchema = testimonialSchema.omit({ id: true })
const updateSchema = testimonialSchema.extend({ id: z.string() })

export const createTestimonial = adminActionClient
   .schema(createSchema)
   .action(async ({ parsedInput: data }) => {
      try {
         // Get the highest order value
         const lastTestimonial = await prisma.testimonial.findFirst({
            orderBy: { order: 'desc' },
            select: { order: true },
         })

         const nextOrder = (lastTestimonial?.order ?? -1) + 1

         const testimonial = await prisma.testimonial.create({
            data: {
               quote: data.quote,
               author: data.author,
               company: data.company,
               logo: data.logo || null,
               featured: data.featured,
               status: data.status,
               order: nextOrder,
            },
         })

         updateTag('testimonials')

         return {
            success: true,
            data: testimonial,
            message: 'Testimonial created successfully',
         }
      } catch (error) {
         console.error('Error creating testimonial:', error)
         return {
            success: false,
            error: 'Failed to create testimonial',
         }
      }
   })

export const updateTestimonial = adminActionClient
   .schema(updateSchema)
   .action(async ({ parsedInput: data }) => {
      try {
         const { id, ...updateData } = data

         const testimonial = await prisma.testimonial.update({
            where: { id },
            data: {
               quote: updateData.quote,
               author: updateData.author,
               company: updateData.company,
               logo: updateData.logo || null,
               featured: updateData.featured,
               status: updateData.status,
               order: updateData.order,
            },
         })

         updateTag('testimonials')

         return {
            success: true,
            data: testimonial,
            message: 'Testimonial updated successfully',
         }
      } catch (error) {
         console.error('Error updating testimonial:', error)
         return {
            success: false,
            error: 'Failed to update testimonial',
         }
      }
   })

export const deleteTestimonial = adminActionClient
   .schema(z.object({ id: z.string() }))
   .action(async ({ parsedInput: { id } }) => {
      try {
         await prisma.testimonial.delete({
            where: { id },
         })

         updateTag('testimonials')

         return {
            success: true,
            message: 'Testimonial deleted successfully',
         }
      } catch (error) {
         console.error('Error deleting testimonial:', error)
         return {
            success: false,
            error: 'Failed to delete testimonial',
         }
      }
   })

export const reorderTestimonials = adminActionClient
   .schema(z.object({
      testimonials: z.array(z.object({
         id: z.string(),
         order: z.number().int(),
      })),
   }))
   .action(async ({ parsedInput: { testimonials } }) => {
      try {
         // Update all testimonials with their new order
         await Promise.all(
            testimonials.map(({ id, order }) =>
               prisma.testimonial.update({
                  where: { id },
                  data: { order },
               })
            )
         )

         updateTag('testimonials')

         return {
            success: true,
            message: 'Testimonials reordered successfully',
         }
      } catch (error) {
         console.error('Error reordering testimonials:', error)
         return {
            success: false,
            error: 'Failed to reorder testimonials',
         }
      }
   })

export async function getTestimonials() {
   'use cache'
   cacheLife('hours')
   cacheTag('testimonials')

   try {
      const testimonials = await prisma.testimonial.findMany({
         where: { status: 'PUBLISHED' },
         orderBy: { order: 'asc' },
      })
      return testimonials
   } catch (error) {
      console.error('Error fetching testimonials:', error)
      return []
   }
}

export async function getAllTestimonials() {
   'use cache'
   cacheLife('hours')
   cacheTag('testimonials')

   try {
      const testimonials = await prisma.testimonial.findMany({
         orderBy: { order: 'asc' },
      })
      return testimonials
   } catch (error) {
      console.error('Error fetching all testimonials:', error)
      return []
   }
}
