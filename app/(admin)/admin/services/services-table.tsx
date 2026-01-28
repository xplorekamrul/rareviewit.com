'use client'

import { deleteService } from '@/actions/services'
import type { Service } from '@prisma/client'
import { Edit2, Plus, Trash2 } from 'lucide-react'
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

   const handleDelete = async (id: string) => {
      if (!confirm('Are you sure you want to delete this service?')) return

      setIsDeleting(id)
      try {
         const result = await deleteService({ id })
         if (result.data?.success) {
            onDelete(id)
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

         <div className="border rounded-lg overflow-hidden bg-card flex flex-col h-[600px]">
            <div className="overflow-auto flex-1">
               <table className="w-full text-left">
                  <thead className="sticky top-0 bg-muted/90 backdrop-blur border-b z-10 shadow-sm">
                     <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-foreground w-[20%] min-w-[150px]">
                           Title
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-foreground w-[50%] min-w-[300px]">
                           Description
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-foreground w-[15%] min-w-[120px]">
                           Icon
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-foreground w-[15%] min-w-[100px]">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y relative">
                     {services.length === 0 ? (
                        <tr>
                           <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                              No services found. Create one to get started.
                           </td>
                        </tr>
                     ) : (
                        services.map(service => (
                           <tr
                              key={service.id}
                              className="group transition-colors odd:bg-white even:bg-primary/5 hover:bg-primary/10"
                           >
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
