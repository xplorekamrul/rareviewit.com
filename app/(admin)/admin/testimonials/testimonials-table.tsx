'use client'

import { deleteTestimonial, reorderTestimonials } from '@/actions/testimonials'
import type { Testimonial } from '@prisma/client'
import { Edit2, GripVertical, Plus, Trash2 } from 'lucide-react'
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
   const [draggedItem, setDraggedItem] = useState<string | null>(null)
   const [isReordering, setIsReordering] = useState(false)
   const [localTestimonials, setLocalTestimonials] = useState(testimonials)

   const handleDragStart = (e: React.DragEvent, id: string) => {
      setDraggedItem(id)
      e.dataTransfer.effectAllowed = 'move'
   }

   const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
   }

   const handleDrop = async (e: React.DragEvent, targetId: string) => {
      e.preventDefault()
      if (!draggedItem || draggedItem === targetId) return

      const draggedIndex = localTestimonials.findIndex(t => t.id === draggedItem)
      const targetIndex = localTestimonials.findIndex(t => t.id === targetId)

      if (draggedIndex === -1 || targetIndex === -1) return

      // Reorder locally
      const newTestimonials = [...localTestimonials]
      const [draggedTestimonial] = newTestimonials.splice(draggedIndex, 1)
      newTestimonials.splice(targetIndex, 0, draggedTestimonial)

      // Update order values
      const reorderedTestimonials = newTestimonials.map((testimonial, index) => ({
         ...testimonial,
         order: index,
      }))

      setLocalTestimonials(reorderedTestimonials)
      setDraggedItem(null)

      // Save to server
      setIsReordering(true)
      try {
         const result = await reorderTestimonials({
            testimonials: reorderedTestimonials.map(t => ({ id: t.id, order: t.order })),
         })
         if (!result.data?.success) {
            // Revert on error
            setLocalTestimonials(testimonials)
         }
      } catch (error) {
         console.error('Error reordering testimonials:', error)
         setLocalTestimonials(testimonials)
      } finally {
         setIsReordering(false)
      }
   }

   const handleDelete = async (id: string) => {
      if (!confirm('Are you sure you want to delete this testimonial?')) return

      setIsDeleting(id)
      try {
         const result = await deleteTestimonial({ id })
         if (result.data?.success) {
            onDelete(id)
            setLocalTestimonials(prev => prev.filter(t => t.id !== id))
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

         {isReordering && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
               Saving order...
            </div>
         )}

         <div className="border rounded-lg overflow-hidden bg-card flex flex-col h-[600px]">
            <div className="overflow-auto flex-1">
               <table className="w-full text-left">
                  <thead className="sticky top-0 bg-muted/90 backdrop-blur border-b z-10 shadow-sm">
                     <tr>
                        <th className="px-4 py-4 text-sm font-semibold text-foreground w-[5%] min-w-[50px]">
                           Order
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-foreground w-[40%] min-w-[250px]">
                           Quote
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-foreground w-[20%] min-w-[150px]">
                           Author
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-foreground w-[20%] min-w-[150px]">
                           Company
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-foreground w-[10%] min-w-[100px]">
                           Status
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-foreground w-[5%] min-w-[100px]">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y relative">
                     {localTestimonials.length === 0 ? (
                        <tr>
                           <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                              No testimonials found. Create one to get started.
                           </td>
                        </tr>
                     ) : (
                        localTestimonials.map((testimonial, index) => (
                           <tr
                              key={testimonial.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, testimonial.id)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, testimonial.id)}
                              className={`group transition-colors cursor-move ${draggedItem === testimonial.id ? 'opacity-50 bg-primary/20' : 'odd:bg-white even:bg-primary/5 hover:bg-primary/10'
                                 }`}
                           >
                              <td className="px-4 py-4 text-sm font-medium text-foreground align-top">
                                 <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono">
                                       {index}
                                    </span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-foreground align-top">
                                 <p className="line-clamp-2 md:line-clamp-3">{testimonial.quote}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-foreground align-top font-medium">
                                 {testimonial.author}
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground align-top">
                                 {testimonial.company}
                              </td>
                              <td className="px-6 py-4 text-sm align-top">
                                 <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${testimonial.status === 'PUBLISHED'
                                       ? 'bg-green-50 text-green-700 border-green-200'
                                       : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                       }`}
                                 >
                                    {testimonial.status}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-sm align-top">
                                 <div className="flex justify-center gap-2">
                                    <button
                                       onClick={() => onEdit(testimonial)}
                                       className="p-2 hover:bg-background/80 rounded-md transition-colors text-muted-foreground hover:text-foreground shadow-sm"
                                       title="Edit"
                                    >
                                       <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                       onClick={() => handleDelete(testimonial.id)}
                                       disabled={isDeleting === testimonial.id}
                                       className="p-2 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors text-muted-foreground disabled:opacity-50"
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
