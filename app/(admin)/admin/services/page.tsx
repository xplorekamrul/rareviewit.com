import { getServices } from '@/actions/services'
import { ServicesContent } from './services-content'

export default async function ServicesAdminPage() {
   const services = await getServices()

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground text-primary">
               Services
            </h1>
            <p className="text-muted-foreground mt-2">
               Manage the services displayed on the home page.
            </p>
         </div>

         <ServicesContent initialServices={services} />
      </div>
   )
}
