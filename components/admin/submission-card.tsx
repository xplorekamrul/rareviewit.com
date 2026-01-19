'use client'

import { updateContactStatus } from '@/actions/contact-status'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { formatDistanceToNow } from 'date-fns'
import { AlertCircle, Ban, Calendar, Check, ChevronDown, Clock, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface SubmissionCardProps {
  submission: {
    id: string
    subject: string
    fullName: string
    email: string
    phone?: string
    message: string
    status: string
    emailSent: boolean
    createdAt: Date | string
    ipAddress?: string
    userAgent?: string
  }
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const createdDate = new Date(submission.createdAt)
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true })

  const handleStatusUpdate = async (newStatus: 'PENDING' | 'RESOLVED' | 'SPAM') => {
    if (newStatus === submission.status) return

    setIsUpdating(true)
    try {
      const result = await updateContactStatus(submission.id, newStatus)
      if (result.success) {
        toast.success(`Status updated to ${newStatus.toLowerCase()}`)
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      toast.error('Failed to update status')
    } finally {
      setIsUpdating(false)
    }
  }

  const getCardBorderColor = () => {
    switch (submission.status) {
      case 'RESOLVED':
        return 'border-l-green-500 dark:border-l-green-400'
      case 'SPAM':
        return 'border-l-red-500 dark:border-l-red-400'
      default:
        return 'border-l-yellow-500 dark:border-l-yellow-400'
    }
  }

  const getStatusIcon = () => {
    switch (submission.status) {
      case 'RESOLVED':
        return <Check className="h-3 w-3" />
      case 'SPAM':
        return <Ban className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  return (
    <Card className={`overflow-hidden border-l-4 ${getCardBorderColor()}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate">{submission.subject}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {submission.fullName}
              </p>
            </div>
            <div className="flex gap-2 items-center flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isUpdating}
                    className="flex items-center gap-1 h-7 px-2 text-xs"
                  >
                    {getStatusIcon()}
                    {submission.status}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleStatusUpdate('PENDING')}
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4 text-yellow-600" />
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusUpdate('RESOLVED')}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4 text-green-600" />
                    Resolved
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusUpdate('SPAM')}
                    className="flex items-center gap-2"
                  >
                    <Ban className="h-4 w-4 text-red-600" />
                    Spam
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {!submission.emailSent && (
                <Badge variant="outline" className="border-red-200 text-red-700 h-7 px-2 text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Email Failed
                </Badge>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Mail className="h-3 w-3" />
              <a href={`mailto:${submission.email}`} className="hover:text-foreground truncate">
                {submission.email}
              </a>
            </div>
            {submission.phone && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Phone className="h-3 w-3" />
                <a href={`tel:${submission.phone}`} className="hover:text-foreground">
                  {submission.phone}
                </a>
              </div>
            )}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {timeAgo}
            </div>
          </div>

          {/* Message Preview - Dynamic Height */}
          <div className="bg-muted/50 rounded p-3 text-sm">
            <p className="text-muted-foreground whitespace-pre-wrap break-words">
              {submission.message}
            </p>
          </div>

          {/* Metadata */}
          {(submission.ipAddress || submission.userAgent) && (
            <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/50">
              {submission.ipAddress && <p>IP: {submission.ipAddress}</p>}
              {submission.userAgent && <p className="truncate">UA: {submission.userAgent}</p>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}