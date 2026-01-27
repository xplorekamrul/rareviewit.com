'use client'

import { deleteTestimonial } from '@/actions/testimonials'
import type { Testimonial } from '@prisma/client'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface TestimonialsTableProps {
   testimonials: Testimonial[]
   onEdit: (testimonial: Testimonial) => void
   onDelete: (id: string) => void
   onAddNew: () => void
}

export function TestimonialsTable({
   testimonials,
   onEdit,
   onDelete,
   onAddNew,
}: TestimonialsTableProps) {
   const [isDeleting, setIsDeleting] = useState<string | null>(null)

   const handleDelete = async (id: string) => {
      if (!confirm('Are you sure you want to delete this testimonial?')) return

      setIsDeleting(id)
      try {
         const result = await deleteTestimonial({ id })
         if (result.data?.success) {
            onDelete(id)
         }
      } catch (error) {
         console.error('Error deleting testimonial:', error)
      } finally {
         setIsDeleting(null)
      }
   }

   return (
      <div className="space-y-4">
         <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">All Testimonials</h2>
            <button
               onClick={onAddNew}
               className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
               <Plus className="w-4 h-4" />
               Add Testimonial
            </button>
         </div>

         <div className="border rounded-lg overflow-hidden bg-card">
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead className="sticky top-0 bg-muted border-b">
                     <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground min-w-64">
                           Quote
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground min-w-40">
                           Author
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground min-w-40">
                           Company
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground min-w-24">
                           Status
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-foreground w-24">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y max-h-96 overflow-y-auto block">
                     {testimonials.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                              No testimonials found. Create one to get started.
                           </td>
                        </tr>
                     ) : (
                        testimonials.map(testimonial => (
                           <tr key={testimonial.id} className="hover:bg-muted/50 transition-colors">
                              <td className="px-4 py-3 text-sm text-foreground">
                                 <p className="line-clamp-2">{testimonial.quote}</p>
                              </td>
                              <td className="px-4 py-3 text-sm text-foreground">
                                 {testimonial.author}
                              </td>
                              <td className="px-4 py-3 text-sm text-foreground">
                                 {testimonial.company}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                 <span
                                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${testimonial.status === 'PUBLISHED'
                                          ? 'bg-green-100 text-green-800'
                                          : 'bg-yellow-100 text-yellow-800'
                                       }`}
                                 >
                                    {testimonial.status}
                                 </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                 <div className="flex justify-center gap-2">
                                    <button
                                       onClick={() => onEdit(testimonial)}
                                       className="p-1.5 hover:bg-muted rounded transition-colors text-foreground"
                                       title="Edit"
                                    >
                                       <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                       onClick={() => handleDelete(testimonial.id)}
                                       disabled={isDeleting === testimonial.id}
                                       className="p-1.5 hover:bg-red-100 rounded transition-colors text-red-600 disabled:opacity-50"
                                       title="Delete"
                                    >
                                       <Trash2 className="w-4 h-4" />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   )
}
