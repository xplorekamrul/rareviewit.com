'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateContactStatus(id: string, status: 'PENDING' | 'RESOLVED' | 'SPAM') {
   try {
      await (prisma as any).contactSubmission.update({
         where: { id },
         data: { status },
      })

      revalidatePath('/admin/contact-submissions')
      return { success: true }
   } catch (error) {
      console.error('Failed to update contact status:', error)
      return { success: false, error: 'Failed to update status' }
   }
}