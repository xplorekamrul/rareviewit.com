'use server'

import prisma from '@/lib/prisma'
import { adminActionClient } from '@/lib/safe-action/clients'
import { testimonialSchema } from '@/lib/validations/testimonials'
import { cacheTag, updateTag } from 'next/cache'
import { z } from 'zod'

const createSchema = testimonialSchema.omit({ id: true })
const updateSchema = testimonialSchema.extend({ id: z.string() })

export const createTestimonial = adminActionClient
   .schema(createSchema)
   .action(async ({ parsedInput: data }) => {
      try {
         const testimonial = await prisma.testimonial.create({
            data: {
               quote: data.quote,
               author: data.author,
               company: data.company,
               logo: data.logo || null,
               featured: data.featured,
               status: data.status,
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

export async function getTestimonials() {
   'use cache'
   cacheTag('testimonials')

   try {
      const testimonials = await prisma.testimonial.findMany({
         where: { status: 'PUBLISHED' },
         orderBy: { createdAt: 'desc' },
      })
      return testimonials
   } catch (error) {
      console.error('Error fetching testimonials:', error)
      return []
   }
}

export async function getAllTestimonials() {
   'use cache'
   cacheTag('testimonials')

   try {
      const testimonials = await prisma.testimonial.findMany({
         orderBy: { createdAt: 'desc' },
      })
      return testimonials
   } catch (error) {
      console.error('Error fetching all testimonials:', error)
      return []
   }
}
