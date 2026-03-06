'use client'

import { deleteService, reorderServices } from '@/actions/services'
import type { Service } from '@prisma/client'
import { Edit2, GripVertical, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface ServicesTableProps {
   services: Service[]
   onEdit: (service: Service) => void
   onDelete: (id: string) => void
   onAddNew: () => void
}

export function ServicesTable({
   services,
   onEdit,
   onDelete,
   onAddNew,
}: ServicesTableProps) {
   const [isDeleting, setIsDeleting] = useState<string | null>(null)
   const [draggedItem, setDraggedItem] = useState<string | null>(null)
   const [isReordering, setIsReordering] = useState(false)
   const [localServices, setLocalServices] = useState(services)

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

      const draggedIndex = localServices.findIndex(s => s.id === draggedItem)
      const targetIndex = localServices.findIndex(s => s.id === targetId)

      if (draggedIndex === -1 || targetIndex === -1) return

      // Reorder locally
      const newServices = [...localServices]
      const [draggedService] = newServices.splice(draggedIndex, 1)
      newServices.splice(targetIndex, 0, draggedService)

      // Update order values
      const reorderedServices = newServices.map((service, index) => ({
         ...service,
         order: index,
      }))

      setLocalServices(reorderedServices)
      setDraggedItem(null)

      // Save to server
      setIsReordering(true)
      try {
         const result = await reorderServices({
            services: reorderedServices.map(s => ({ id: s.id, order: s.order })),
         })
         if (!result.data?.success) {
            // Revert on error
            setLocalServices(services)
         }
      } catch (error) {
         console.error('Error reordering services:', error)
         setLocalServices(services)
      } finally {
         setIsReordering(false)
      }
   }

   const handleDelete = async (id: string) => {
      if (!confirm('Are you sure you want to delete this service?')) return

      setIsDeleting(id)
      try {
         const result = await deleteService({ id })
         if (result.data?.success) {
            onDelete(id)
            setLocalServices(prev => prev.filter(s => s.id !== id))
         }
      } catch (error) {
         console.error('Error deleting service:', error)
      } finally {
         setIsDeleting(null)
      }
   }

   return (
      <div className="space-y-4">
         <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">All Services</h2>
            <button
               onClick={onAddNew}
               className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
               <Plus className="w-4 h-4" />
               Add Service
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
                        <th className="px-6 py-4 text-sm font-semibold text-foreground w-[20%] min-w-[150px]">
                           Title
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-foreground w-[50%] min-w-[300px]">
                           Description
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-foreground w-[15%] min-w-[120px]">
                           Icon
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-foreground w-[10%] min-w-[100px]">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y relative">
                     {localServices.length === 0 ? (
                        <tr>
                           <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                              No services found. Create one to get started.
                           </td>
                        </tr>
                     ) : (
                        localServices.map((service, index) => (
                           <tr
                              key={service.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, service.id)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, service.id)}
                              className={`group transition-colors cursor-move ${draggedItem === service.id ? 'opacity-50 bg-primary/20' : 'odd:bg-white even:bg-primary/5 hover:bg-primary/10'
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
                              <td className="px-6 py-4 text-sm font-medium text-foreground align-top">
                                 {service.title}
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground align-top">
                                 <p className="line-clamp-2 md:line-clamp-3">{service.description}</p>
                              </td>
                              <td className="px-6 py-4 text-sm align-top">
                                 <code className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono border border-primary/20">
                                    {service.icon}
                                 </code>
                              </td>
                              <td className="px-6 py-4 text-sm align-top">
                                 <div className="flex justify-center gap-2">
                                    <button
                                       onClick={() => onEdit(service)}
                                       className="p-2 hover:bg-background/80 rounded-md transition-colors text-muted-foreground hover:text-foreground shadow-sm"
                                       title="Edit"
                                    >
                                       <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                       onClick={() => handleDelete(service.id)}
                                       disabled={isDeleting === service.id}
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
