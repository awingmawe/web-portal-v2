'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
// import { useTailwindBreakpoint } from '@/lib/hooks/useTailwindBreakpoint'
import { AlertCircle } from 'lucide-react'
import Image from 'next/image'

const CompletionDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isLoading?: boolean
}) => {
  const { lg } = useTailwindBreakpoint()

  const content = (
    <>
      {/* Header */}
      <div className="flex items-start gap-3 p-2 pb-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] bg-yellow-100">
          <Image
            src="/images/Icon-tandatanya.svg"
            alt="Icon Tanya"
            width={36}
            height={36}
          />
          <AlertCircle className="absolute h-5 w-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900">
            Data jemaah sudah lengkap
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 pb-6 text-sm text-gray-600">
        Seluruh data jemaah sudah terisi, apakah kamu ingin mengirim data jemaah
        kepada mitra?
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 px-6 pb-6">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="flex-1 border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
          disabled={isLoading}
        >
          Belum, Cek lagi
        </Button>
        <Button
          onClick={onConfirm}
          className="flex-1 bg-yellow-500 text-sm text-white hover:bg-yellow-600"
          disabled={isLoading}
        >
          {isLoading ? 'Mengirim...' : 'Ya, Kirim'}
        </Button>
      </div>
    </>
  )

  return !lg ? (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto max-h-[90vh] max-w-lg gap-0 overflow-y-auto rounded-2xl bg-white p-0">
        <DialogHeader />
        {content}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-4 py-2.5">
        <DrawerHeader className="px-6">
          <DrawerTitle />
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>
  )
}

export default CompletionDialog
