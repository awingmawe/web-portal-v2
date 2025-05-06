'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ConfirmationDrawerProps {
  onConfirm: () => void
  onCancel: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function ConfirmationDrawer({
  onConfirm,
  onCancel,
  isOpen,
  setIsOpen,
}: ConfirmationDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="max-h-[90%] px-4">
        <DrawerHeader className="text-center">
          <div className="bg-warning-100 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <AlertTriangle className="text-warning-500 h-6 w-6" />
          </div>
          <DrawerTitle className="text-xl-medium">
            Yakin untuk keluar?
          </DrawerTitle>
          <DrawerDescription className="text-m-regular mt-2 text-center text-neutral-600">
            Data yang kamu masukkan akan hilang jika kamu keluar sekarang
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row gap-2 pt-2 pb-8">
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="border-primary-500 flex-1"
              onClick={onCancel}
            >
              Batal
            </Button>
          </DrawerClose>
          <Button
            variant="default"
            className="bg-warning-500 hover:bg-warning-600 flex-1"
            onClick={onConfirm}
          >
            Ya, Keluar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

// Custom hook to handle confirmation drawer logic with responsive behavior
export function useConfirmationDrawer() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const router = useRouter()
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const { lg } = useTailwindBreakpoint()

  useEffect(() => {
    // Handler for beforeunload event
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only prevent navigation on mobile screens
      if (!lg) {
        e.preventDefault()
        e.returnValue = true
      }
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [lg])

  const handleNavigationAttempt = (url: string) => {
    // Only intercept on mobile
    if (!lg) {
      setPendingUrl(url)
      setIsConfirmationOpen(true)
      return false // Prevent navigation
    }
    return true // Allow navigation on desktop
  }

  const handleConfirmNavigation = () => {
    if (pendingUrl) {
      router.push(pendingUrl)
    } else {
      window.history.back()
    }
    setIsConfirmationOpen(false)
  }

  const handleCancelNavigation = () => {
    setPendingUrl(null)
    setIsConfirmationOpen(false)
  }

  return {
    isConfirmationOpen,
    setIsConfirmationOpen,
    pendingUrl,
    handleNavigationAttempt,
    handleConfirmNavigation,
    handleCancelNavigation,
    isMobile: !lg,
  }
}
