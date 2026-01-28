'use client'

import { createService, updateService } from '@/actions/services'
import { serviceSchema } from '@/lib/validations/services'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Service } from '@prisma/client'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ServicesFormProps {
   service: Service | null
   onClose: () => void
   onSuccess: (service: Service | null) => void
}

interface FormData {
   title: string
   description: string
   icon: string
   href: string
}

const AVAILABLE_ICONS = ['Palette', 'TrendingUp', 'Search', 'Smartphone']

export function ServicesForm({
   service,
   onClose,
   onSuccess,
}: ServicesFormProps) {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [serverError, setServerError] = useState<string | null>(null)
   const isEditMode = !!service

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      resolver: zodResolver(serviceSchema),
      defaultValues: isEditMode && service
         ? {
            title: service.title,
            description: service.description,
            icon: service.icon,
            href: service.href,
         }
         : {
            title: '',
            description: '',
            icon: 'Palette',
            href: '#',
         },
   })

   const onSubmit = async (data: FormData) => {
      setIsSubmitting(true)
      setServerError(null)

      try {
         let result

         if (isEditMode && service) {
            result = await updateService({
               id: service.id,
               ...data,
            })
         } else {
            result = await createService(data)
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
      <div className="max-w-5xl mx-auto pb-32">
         <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
               {isEditMode ? 'Edit Service' : 'Create New Service'}
            </h2>
            <p className="text-muted-foreground mt-1">
               {isEditMode
                  ? 'Update the service details below.'
                  : 'Add a new service offering.'}
            </p>
         </div>

         <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               {serverError && (
                  <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                     <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                     <p className="text-sm text-red-800">{serverError}</p>
                  </div>
               )}

               {/* Title Field */}
               <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                     Title <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     {...register('title')}
                     placeholder="e.g. Web Design"
                     className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.title ? 'border-red-500' : 'border-border'
                        }`}
                  />
                  {errors.title && (
                     <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
               </div>

               {/* Description Field */}
               <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                     Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                     {...register('description')}
                     placeholder="Service description..."
                     rows={4}
                     className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.description ? 'border-red-500' : 'border-border'
                        }`}
                  />
                  {errors.description && (
                     <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
               </div>

               {/* Icon Field */}
               <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                     Icon <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                     <select
                        {...register('icon')}
                        className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none ${errors.icon ? 'border-red-500' : 'border-border'
                           }`}
                     >
                        {AVAILABLE_ICONS.map(icon => (
                           <option key={icon} value={icon}>
                              {icon}
                           </option>
                        ))}
                     </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                           <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                     </div>
                  </div>
                  {errors.icon && (
                     <p className="text-sm text-red-500">{errors.icon.message}</p>
                  )}
               </div>

               {/* HREF Field */}
               <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                     Link (Href) <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     {...register('href')}
                     placeholder="e.g. /services/web-design"
                     className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.href ? 'border-red-500' : 'border-border'
                        }`}
                  />
                  {errors.href && (
                     <p className="text-sm text-red-500">{errors.href.message}</p>
                  )}
               </div>
            </form>
         </div>

         {/* Sticky Footer Buttons */}
         <div className="fixed bottom-0 right-0 left-0 bg-background border-t border-border p-4 flex justify-end gap-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
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
               className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
