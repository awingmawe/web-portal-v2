'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { DialogTitle } from '@radix-ui/react-dialog'
// import { useTailwindBreakpoint } from '@/lib/hooks/useTailwindBreakpoint' // sesuaikan pathnya
import { useRouter } from 'next/navigation'
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
  onClose,
}: SubmissionDrawerProps) {
  const router = useRouter()
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-2">
        <DrawerHeader className="flex flex-col items-center justify-center gap-3 text-center">
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
        </DrawerHeader>

        <DrawerFooter className="pt-0 pb-6">
          {state === 'success' && (
            <Button
              onClick={() => {
                router.push(
                  '/my/transaction?type=upcoming&page=1&query=&status=all&date='
                )
                onClose()
              }}
              className="bg-primary-500 w-full py-3"
            >
              Tutup
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

// Komponen baru: SubmissionDialogOrDrawer
export function SubmissionDialogOrDrawer(props: SubmissionDrawerProps) {
  const { lg } = useTailwindBreakpoint()
  const router = useRouter()

  const handleClose = () => {
    props.onOpenChange(false)
    props.onClose()
  }

  const handleButtonClick = () => {
    router.push('/my/transaction?type=upcoming&page=1&query=&status=all&date=')
    handleClose()
  }

  const contentSuccess = (
    <>
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div className="bg-primary-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full p-3">
          🎉
        </div>
        <h3 className="text-l-semibold text-gray-900">
          Data Jemaah Berhasil Tersimpan!
        </h3>
        <p className="text-m-regular max-w-xs text-neutral-600">
          Data ini akan segera terkirim kepada pihak mitra untuk proses
          administrasi dan keperluan mitra.
        </p>
      </div>
      <div className="mt-6">
        <Button
          onClick={handleButtonClick}
          className="bg-primary-500 hover:bg-primary-600 w-full py-3 text-white"
        >
          Tutup
        </Button>
      </div>
    </>
  )

  if (!lg) {
    // Desktop: pakai Dialog
    return (
      <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
        <DialogContent className="mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl bg-white p-6">
          <DialogTitle className="hidden" />
          <DialogHeader>
            {props.state === 'success' && contentSuccess}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  // Mobile: pakai Drawer (gunakan komponen lama)
  return <SubmissionDrawer {...props} />
}

// Custom hook untuk mengelola drawer/dialog
export function useSubmissionDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>()

  // Reset the drawer/dialog state saat ditutup
  useEffect(() => {
    if (!isOpen && state !== 'idle') {
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
