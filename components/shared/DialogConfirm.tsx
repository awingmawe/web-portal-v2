'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode } from 'react'

interface DialogConfirmProps {
  children: ReactNode
  title: string
  content: string | ReactNode
  confirmText?: string
  cancelText?: string
  confirmVariant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
  confirmIntent?: 'primary' | 'secondary' | 'none'
  cancelVariant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
  cancelIntent?: 'primary' | 'secondary' | 'none'
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg'
  onSubmit: () => void
  icon?: ReactNode
  isLoading?: boolean
}

export function DialogConfirm({
  children,
  title,
  content,
  confirmText = 'Ya',
  cancelText = 'Batal',
  confirmVariant = 'default',
  confirmIntent = 'none',
  cancelVariant = 'outline',
  cancelIntent = 'none',
  buttonSize = 'md',
  onSubmit,
  icon,
  isLoading = false,
}: DialogConfirmProps) {
  const handleConfirm = () => {
    onSubmit()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-2xl">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="space-2">
          <div className="flex flex-1 items-center space-y-4">
            {icon && <div className="mr-4 mb-0">{icon}</div>}
            <h2 className="heading-3-regular font-semibold">{title}</h2>
          </div>
          <p className="text-m-regular mt-4 text-neutral-500">{content}</p>
        </div>

        <DialogFooter className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-0">
          <DialogClose asChild>
            <Button
              variant={cancelVariant}
              intent={cancelIntent}
              size={buttonSize}
              type="button"
              className="mr-2 h-9 px-8 py-2"
            >
              {cancelText}
            </Button>
          </DialogClose>
          <Button
            variant={confirmVariant}
            intent={confirmIntent}
            size={buttonSize}
            onClick={handleConfirm}
            isLoading={isLoading}
            className="h-9 px-10 py-2"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
