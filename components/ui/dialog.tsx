'use client'

import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface DialogContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined)

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog')
  }
  return context
}

function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

function DialogTrigger({
  children,
  asChild,
  ...props
}: {
  children: React.ReactNode
  asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useDialog()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        onOpenChange(true)
        children.props.onClick?.(e)
      },
    } as any)
  }

  return (
    <button
      {...props}
      onClick={() => onOpenChange(true)}
    >
      {children}
    </button>
  )
}

function DialogPortal({
  children,
}: {
  children: React.ReactNode
}) {
  const { open } = useDialog()
  const [mounted, setMounted] = React.useState(false)
  const [portalElement, setPortalElement] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    setMounted(true)
    let portal = document.getElementById('dialog-portal')
    if (!portal) {
      portal = document.createElement('div')
      portal.id = 'dialog-portal'
      document.body.appendChild(portal)
    }
    setPortalElement(portal)
  }, [])

  if (!open || !mounted || !portalElement) return null

  return ReactDOM.createPortal(children, portalElement)
}

function DialogClose({
  children,
  ...props
}: {
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useDialog()

  return (
    <button
      {...props}
      onClick={() => onOpenChange(false)}
    >
      {children}
    </button>
  )
}

function DialogOverlay({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { onOpenChange } = useDialog()

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/50',
        className,
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showCloseButton?: boolean
}) {
  const { open, onOpenChange } = useDialog()

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, onOpenChange])

  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        className={cn(
          'relative w-full max-w-[calc(100%-2rem)] rounded-lg border bg-background p-6 shadow-lg sm:max-w-lg',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
}

