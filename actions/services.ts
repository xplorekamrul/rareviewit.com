'use server'

import prisma from '@/lib/prisma'
import { adminActionClient } from '@/lib/safe-action/clients'
import { serviceSchema } from '@/lib/validations/services'
import { cacheLife, cacheTag, updateTag } from 'next/cache'
import { z } from 'zod'

const createSchema = serviceSchema.omit({ id: true })
const updateSchema = serviceSchema.extend({ id: z.string() })

export const createService = adminActionClient
   .schema(createSchema)
   .action(async ({ parsedInput: data }) => {
      try {
         // Get the highest order value
         const lastService = await prisma.service.findFirst({
            orderBy: { order: 'desc' },
            select: { order: true },
         })

         const nextOrder = (lastService?.order ?? -1) + 1

         const service = await prisma.service.create({
            data: {
               title: data.title,
               description: data.description,
               icon: data.icon,
               href: data.href,
               order: nextOrder,
            },
         })

         updateTag('services')

         return {
            success: true,
            data: service,
            message: 'Service created successfully',
         }
      } catch (error) {
         console.error('Error creating service:', error)
         return {
            success: false,
            error: 'Failed to create service',
         }
      }
   })

export const updateService = adminActionClient
   .schema(updateSchema)
   .action(async ({ parsedInput: data }) => {
      try {
         const { id, ...updateData } = data

         const service = await prisma.service.update({
            where: { id },
            data: {
               title: updateData.title,
               description: updateData.description,
               icon: updateData.icon,
               href: updateData.href,
               order: updateData.order,
            },
         })

         updateTag('services')

         return {
            success: true,
            data: service,
            message: 'Service updated successfully',
         }
      } catch (error) {
         console.error('Error updating service:', error)
         return {
            success: false,
            error: 'Failed to update service',
         }
      }
   })

export const deleteService = adminActionClient
   .schema(z.object({ id: z.string() }))
   .action(async ({ parsedInput: { id } }) => {
      try {
         await prisma.service.delete({
            where: { id },
         })

         updateTag('services')

         return {
            success: true,
            message: 'Service deleted successfully',
         }
      } catch (error) {
         console.error('Error deleting service:', error)
         return {
            success: false,
            error: 'Failed to delete service',
         }
      }
   })

export const reorderServices = adminActionClient
   .schema(z.object({
      services: z.array(z.object({
         id: z.string(),
         order: z.number().int(),
      })),
   }))
   .action(async ({ parsedInput: { services } }) => {
      try {
         // Update all services with their new order
         await Promise.all(
            services.map(({ id, order }) =>
               prisma.service.update({
                  where: { id },
                  data: { order },
               })
            )
         )

         updateTag('services')

         return {
            success: true,
            message: 'Services reordered successfully',
         }
      } catch (error) {
         console.error('Error reordering services:', error)
         return {
            success: false,
            error: 'Failed to reorder services',
         }
      }
   })

export async function getServices() {
   'use cache'
   cacheLife('hours')
   cacheTag('services')

   try {
      const services = await prisma.service.findMany({
         orderBy: { order: 'asc' },
      })
      return services
   } catch (error) {
      console.error('Error fetching services:', error)
      return []
   }
}
