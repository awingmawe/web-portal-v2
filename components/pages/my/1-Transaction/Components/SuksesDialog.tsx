'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { X } from 'lucide-react'
import Image from 'next/image'

interface SuksesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SuksesDialog({
  open,

  onOpenChange,
}: SuksesDialogProps) {
  const { lg } = useTailwindBreakpoint()
  const onClickButton = () => {
    window.location.reload()
    onOpenChange(false)
  }
  const formContent = (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 flex h-[106px] w-[106px] items-center justify-center rounded-full !bg-[#BDFFEA]">
        <Image
          src="/images/icon-sukses-refund.svg"
          width={80}
          height={80}
          alt="refund"
        />
      </div>
      <h2 className="mb-1 text-center text-lg font-semibold">
        Pengembalian Dana Diajukan
      </h2>
      <p className="mb-6 text-center text-sm text-gray-500">
        Harap melakukan pengecekan secara berkala. <br />
        Proses ini selesai paling lambat 3x24 jam hari kerja.
      </p>
      <Button
        type="button"
        className="w-full rounded-full bg-yellow-400 py-3 text-sm font-medium text-black hover:bg-yellow-500"
        onClick={onClickButton}
      >
        Lihat Detail Transaksi
      </Button>
    </div>
  )

  const headerContent = (
    <div>
      {lg ? (
        <DrawerTitle className="hidden"></DrawerTitle>
      ) : (
        <div className="mb-6 flex hidden items-center">
          <DialogClose asChild>
            <Button className="absolute top-3 right-3 h-6 w-6 bg-[#E5E5E5] py-0 hover:bg-neutral-500">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
      )}
    </div>
  )

  if (lg) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="z-[999] px-4 pb-6 ">
          <DrawerHeader className="gap-3 px-0 pb-2">
            {headerContent}
            <DrawerClose asChild>
              <Button
                className="absolute top-3 right-3 h-6 w-6  py-0 hover:bg-neutral-500"
                variant={'ghost'}
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          {formContent}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-0 sm:max-w-xl">
        <DialogHeader className="gap-3 pb-2">
          {headerContent}
          <DialogClose asChild>
            <Button className="absolute top-3 right-3 h-6 w-6 bg-[#E5E5E5] py-0 hover:bg-neutral-500">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  )
}
