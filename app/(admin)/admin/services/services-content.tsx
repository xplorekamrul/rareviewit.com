'use client'

import type { Service } from '@prisma/client'
import { useState } from 'react'
import { ServicesForm } from './services-form'
import { ServicesTable } from './services-table'

interface ServicesContentProps {
   initialServices: Service[]
}

export function ServicesContent({ initialServices }: ServicesContentProps) {
   const [services, setServices] = useState(initialServices)
   const [isFormOpen, setIsFormOpen] = useState(false)
   const [selectedService, setSelectedService] = useState<Service | null>(null)

   const handleFormClose = () => {
      setIsFormOpen(false)
      setSelectedService(null)
   }

   const handleEdit = (service: Service) => {
      setSelectedService(service)
      setIsFormOpen(true)
   }

   const handleSuccess = (newService: Service | null) => {
      if (newService) {
         if (selectedService) {
            // Update existing
            setServices(prev =>
               prev.map(s => (s.id === newService.id ? newService : s))
            )
         } else {
            // Add new
            setServices(prev => [newService, ...prev])
         }
      }
      handleFormClose()
   }

   const handleDelete = (id: string) => {
      setServices(prev => prev.filter(s => s.id !== id))
   }

   return (
      <div className="space-y-6">
         {!isFormOpen ? (
            <ServicesTable
               services={services}
               onEdit={handleEdit}
               onDelete={handleDelete}
               onAddNew={() => setIsFormOpen(true)}
            />
         ) : (
            <ServicesForm
               service={selectedService}
               onClose={handleFormClose}
               onSuccess={handleSuccess}
            />
         )}
      </div>
   )
}
