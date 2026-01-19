'use client'

import { submitContactForm } from '@/actions/contact'
import { ConfettiAnimation } from '@/components/confetti-animation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Mail, MessageSquare, Phone, Sparkles, User } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface FormState {
   fullName: string
   email: string
   phone: string
   subject: string
   message: string
}

interface SubmissionState {
   status: 'idle' | 'loading' | 'success' | 'error'
   message?: string
   showConfetti: boolean
}

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1,
         delayChildren: 0.2,
      },
   },
}

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
   },
}

export function ContactForm() {
   const [formData, setFormData] = useState<FormState>({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
   })

   const [submission, setSubmission] = useState<SubmissionState>({
      status: 'idle',
      showConfetti: false,
   })

   const [errors, setErrors] = useState<Partial<FormState>>({})
   const [focusedField, setFocusedField] = useState<string | null>(null)

   const validateForm = (): boolean => {
      const newErrors: Partial<FormState> = {}

      if (!formData.fullName.trim()) {
         newErrors.fullName = 'Full name is required'
      }

      if (!formData.email.trim()) {
         newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = 'Please enter a valid email'
      }

      if (!formData.subject.trim()) {
         newErrors.subject = 'Subject is required'
      }

      if (!formData.message.trim()) {
         newErrors.message = 'Message is required'
      } else if (formData.message.trim().length < 10) {
         newErrors.message = 'Message must be at least 10 characters'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
      if (errors[name as keyof FormState]) {
         setErrors((prev) => ({ ...prev, [name]: undefined }))
      }
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!validateForm()) {
         toast.error('Please fix the errors in the form')
         return
      }

      setSubmission({ status: 'loading', showConfetti: false })

      try {
         const result = await submitContactForm({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
         })

         if (result.success) {
            setSubmission({
               status: 'success',
               message: result.message,
               showConfetti: true,
            })

            setFormData({
               fullName: '',
               email: '',
               phone: '',
               subject: '',
               message: '',
            })

            setTimeout(() => {
               setSubmission({ status: 'idle', showConfetti: false })
            }, 5000)
         } else {
            setSubmission({
               status: 'error',
               message: result.error,
               showConfetti: false,
            })
         }
      } catch (error) {
         setSubmission({
            status: 'error',
            message: 'An unexpected error occurred. Please try again.',
            showConfetti: false,
         })
      }
   }

   const formFields = [
      {
         name: 'fullName',
         label: 'Full Name',
         type: 'text',
         placeholder: 'John Doe',
         icon: User,
         required: true,
      },
      {
         name: 'email',
         label: 'Email Address',
         type: 'email',
         placeholder: 'john@example.com',
         icon: Mail,
         required: true,
      },
      {
         name: 'phone',
         label: 'Phone Number',
         type: 'tel',
         placeholder: '+1 (555) 000-0000',
         icon: Phone,
         required: false,
      },
      {
         name: 'subject',
         label: 'Subject',
         type: 'text',
         placeholder: 'What is this about?',
         icon: MessageSquare,
         required: true,
      },
   ]

   return (
      <>
         <AnimatePresence>
            {submission.showConfetti && <ConfettiAnimation />}
         </AnimatePresence>

         <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
         >
            {/* Success Message */}
            <AnimatePresence>
               {submission.status === 'success' && (
                  <motion.div
                     initial={{ opacity: 0, y: -20, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -20, scale: 0.95 }}
                     className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 flex items-start gap-4 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-900/50"
                  >
                     <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                     >
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                     </motion.div>
                     <div>
                        <h3 className="font-semibold text-green-900 dark:text-green-200 text-lg">Thank you! Message sent!</h3>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">{submission.message}</p>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
               {submission.status === 'error' && (
                  <motion.div
                     initial={{ opacity: 0, y: -20, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -20, scale: 0.95 }}
                     className="rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 p-6 flex items-start gap-4 dark:from-red-950/30 dark:to-rose-950/30 dark:border-red-900/50"
                  >
                     <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                     <div>
                        <h3 className="font-semibold text-red-900 dark:text-red-200 text-lg">Error</h3>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">{submission.message}</p>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Form Fields */}
            <div className="space-y-5">
               {formFields.map((field, idx) => {
                  const Icon = field.icon
                  const hasError = !!errors[field.name as keyof FormState]
                  const isFocused = focusedField === field.name

                  return (
                     <motion.div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name} className="text-sm font-medium text-foreground flex items-center gap-2">
                           <Icon className="h-4 w-4 text-primary" />
                           {field.label}
                           {field.required && <span className="text-red-500">*</span>}
                        </Label>
                        <motion.div
                           animate={{
                              scale: isFocused ? 1.02 : 1,
                           }}
                           transition={{ duration: 0.2 }}
                           className="relative"
                        >
                           <Input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              placeholder={field.placeholder}
                              value={formData[field.name as keyof FormState]}
                              onChange={handleChange}
                              onFocus={() => setFocusedField(field.name)}
                              onBlur={() => setFocusedField(null)}
                              disabled={submission.status === 'loading'}
                              className={`border-1 border-bg-primary ${hasError ? 'destructive' : ''}`}
                           />
                        </motion.div>
                        <AnimatePresence>
                           {hasError && (
                              <motion.p
                                 initial={{ opacity: 0, y: -10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, y: -10 }}
                                 className="text-sm text-red-500 font-medium"
                              >
                                 {errors[field.name as keyof FormState]}
                              </motion.p>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  )
               })}

               {/* Message Field */}
               <motion.div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                     <MessageSquare className="h-4 w-4 text-primary" />
                     Message <span className="text-red-500">*</span>
                  </Label>
                  <motion.div
                     animate={{
                        scale: focusedField === 'message' ? 1.02 : 1,
                     }}
                     transition={{ duration: 0.2 }}
                     className="relative"
                  >
                     <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        disabled={submission.status === 'loading'}
                        className={`border-1 border-bg-primary ${errors.message ? 'destructive' : ''}`}
                     />
                  </motion.div>
                  <div className="flex items-center justify-between">
                     <AnimatePresence>
                        {errors.message && (
                           <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-sm text-red-500 font-medium"
                           >
                              {errors.message}
                           </motion.p>
                        )}
                     </AnimatePresence>
                     <p className="text-xs text-muted-foreground">Minimum 10 characters</p>
                  </div>
               </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
               <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1 text-primary-foreground font-semibold"
                  disabled={submission.status === 'loading'}
               >
                  {submission.status === 'loading' ? (
                     <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground mr-2"></div>
                        Sending...
                     </div>
                  ) : (
                     <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Send Message
                     </>
                  )}
               </Button>
            </motion.div>

            {/* Privacy Notice */}
            <motion.p className="text-xs text-muted-foreground text-center">
               We respect your privacy. Your information will never be shared with third parties.
            </motion.p>
         </motion.form>
      </>
   )
}
