'use server'

import { generateAdminEmailHTML, generateUserEmailHTML, sendEmail } from '@/lib/mail'
import { headers } from 'next/headers'
import prisma from '../lib/prisma'

interface ContactFormData {
   fullName: string
   email: string
   phone?: string
   subject: string
   message: string
}

export async function submitContactForm(data: ContactFormData) {
   try {
      // Get client IP and user agent
      const headersList = await headers()
      const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
      const userAgent = headersList.get('user-agent') || undefined

      // Validate input
      if (!data.fullName?.trim() || !data.email?.trim() || !data.subject?.trim() || !data.message?.trim()) {
         return { success: false, error: 'Missing required fields' }
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
         return { success: false, error: 'Invalid email address' }
      }

      // Save to database FIRST (priority #1)
      let submission
      try {
         submission = await (prisma as any).contactSubmission.create({
            data: {
               fullName: data.fullName.trim(),
               email: data.email.trim().toLowerCase(),
               phone: data.phone?.trim(),
               subject: data.subject.trim(),
               message: data.message.trim(),
               ipAddress,
               userAgent,
               status: 'PENDING',
               emailSent: false,
            },
         })
      } catch (dbError) {
         console.error('Database error:', dbError)
         return { success: false, error: 'Failed to save submission. Please try again.' }
      }

      // Send emails (secondary - if this fails, data is still saved)
      const submittedAt = new Date(submission.createdAt).toLocaleString()

      // Email to admin
      const adminEmailResult = await sendEmail({
         to: process.env.ADMIN_EMAIL || 'admin@example.com',
         subject: `New Contact Form Submission - ${data.subject}`,
         html: generateAdminEmailHTML({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
            submittedAt,
         }),
         replyTo: data.email,
      })

      // Email to user (auto-reply)
      const userEmailResult = await sendEmail({
         to: data.email,
         subject: `We've received your message - ${process.env.COMPANY_NAME || 'Our Company'}`,
         html: generateUserEmailHTML({
            fullName: data.fullName,
            subject: data.subject,
            companyName: process.env.COMPANY_NAME || 'Our Company',
         }),
      })

      // Update submission with email status
      const emailSent = adminEmailResult.success && userEmailResult.success
      if (emailSent) {
         await (prisma as any).contactSubmission.update({
            where: { id: submission.id },
            data: { emailSent: true },
         })
      } else {
         // Log email failure for admin review
         console.warn('Email send failed for submission:', submission.id, {
            adminEmail: adminEmailResult.success,
            userEmail: userEmailResult.success,
         })
      }

      return {
         success: true,
         message: 'Your message has been sent successfully!',
         submissionId: submission.id,
         emailSent,
      }
   } catch (error) {
      console.error('Contact form error:', error)
      return {
         success: false,
         error: 'An unexpected error occurred. Please try again later.',
      }
   }
}
