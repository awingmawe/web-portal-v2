'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Loader2, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

// Define the possible states for the submission process
type SubmissionState = 'idle' | 'loading' | 'success' | 'error'

interface SubmissionDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  state: SubmissionState
  errorMessage?: string
  onRetry: () => void
  onClose: () => void
}

export function SubmissionDrawer({
  isOpen,
  onOpenChange,
  state,
  errorMessage = 'Terjadi kesalahan saat memperbarui data. Silakan coba lagi.',
  onRetry,
  onClose,
}: SubmissionDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-2">
        <DrawerHeader className="flex flex-col items-center justify-center gap-3 text-center">
          {state === 'loading' && (
            <>
              <div className="bg-primary-100 mx-auto flex h-8 w-8 items-center justify-center rounded-full">
                <Loader2 className="text-primary-500 h-6 w-6 animate-spin" />
              </div>
              <DrawerTitle className="text-l-semibold">
                Menyimpan Data
              </DrawerTitle>
              <DrawerDescription className="text-m-regular text-center text-neutral-600">
                Mohon tunggu sementara kami menyimpan data jemaah Anda...
              </DrawerDescription>
            </>
          )}

          {state === 'success' && (
            <>
              <div className="bg-primary-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full p-3">
                🎉
              </div>
              <DrawerTitle className="text-l-semibold">
                Data Jemaah Berhasil Tersimpan!
              </DrawerTitle>
              <DrawerDescription className="text-m-regular text-center text-neutral-600">
                Data ini akan segera terkirim kepada pihak mitra untuk proses
                administrasi dan keperluan mitra.
              </DrawerDescription>
            </>
          )}

          {state === 'error' && (
            <>
              <div className="bg-error-100 mx-auto flex h-8 w-8 items-center justify-center rounded-full">
                <XCircle className="text-error-500 h-6 w-6" />
              </div>
              <DrawerTitle className="text-l-semibold">
                Gagal Menyimpan
              </DrawerTitle>
              <DrawerDescription className="text-m-regular text-center text-neutral-600">
                {errorMessage}
              </DrawerDescription>
            </>
          )}
        </DrawerHeader>

        <DrawerFooter className="pt-0 pb-6">
          {state === 'loading' && (
            <Button disabled className="w-full py-3">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sedang Memproses
            </Button>
          )}

          {state === 'success' && (
            <Button onClick={onClose} className="bg-primary-500 w-full py-3">
              Tutup
            </Button>
          )}

          {state === 'error' && (
            <div className="flex w-full items-center gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-primary-500 w-full py-3"
              >
                Batal
              </Button>
              <Button onClick={onRetry} className="w-full py-3">
                Coba Lagi
              </Button>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

// Custom hook to manage the submission drawer state
export function useSubmissionDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>()

  // Reset the drawer state when closed
  useEffect(() => {
    if (!isOpen && state !== 'idle') {
      // Delay the state reset to allow the closing animation to complete
      const timeout = setTimeout(() => {
        setState('idle')
        setErrorMessage(undefined)
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [isOpen, state])

  return {
    isOpen,
    setIsOpen,
    state,
    setState,
    errorMessage,
    setErrorMessage,
  }
}
