'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer'
import { X } from 'lucide-react'
import { useState } from 'react'

interface ConfirmSubmitDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function ConfirmSubmitDrawer({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmSubmitDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-4 py-2.5">
        <DrawerHeader className="flex flex-col gap-3 p-0 text-left">
          <div className="flex items-center justify-between">
            <p className="text-m-semibold">Apakah datanya sudah benar?</p>
            <X onClick={onCancel} />
          </div>
          <DrawerDescription className="text-m-regular text-left text-neutral-600">
            Data ini akan segera terkirim kepada pihak mitra untuk proses
            administrasi dan keperluan mitra.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="mt-3 mb-4 flex flex-row gap-2 p-0">
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="border-primary-500 flex-1"
              onClick={onCancel}
              disabled={isLoading}
            >
              Belum, Cek Lagi
            </Button>
          </DrawerClose>
          <Button
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Ya, Simpan dan Kirim
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

// Custom hook to manage confirmation drawer
export function useConfirmSubmitDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  return {
    isOpen,
    setIsOpen,
  }
}
