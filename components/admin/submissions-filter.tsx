'use client'

import { Button } from '@/components/ui/button'
import { Ban, Check, Clock, Filter } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export function SubmissionsFilter() {
   const router = useRouter()
   const searchParams = useSearchParams()
   const currentFilter = searchParams.get('status') || 'all'

   const handleFilterChange = (status: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (status === 'all') {
         params.delete('status')
      } else {
         params.set('status', status)
      }
      router.push(`?${params.toString()}`)
   }

   const filters = [
      { key: 'all', label: 'All', icon: Filter, count: null },
      { key: 'PENDING', label: 'Pending', icon: Clock, count: null },
      { key: 'RESOLVED', label: 'Resolved', icon: Check, count: null },
      { key: 'SPAM', label: 'Spam', icon: Ban, count: null },
   ]

   return (
      <div className="flex flex-wrap gap-2">
         {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = currentFilter === filter.key

            return (
               <Button
                  key={filter.key}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange(filter.key)}
                  className="flex items-center gap-2"
               >
                  <Icon className="h-4 w-4" />
                  {filter.label}
               </Button>
            )
         })}
      </div>
   )
}