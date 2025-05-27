/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { CheckCircle } from 'lucide-react'
import React, { useRef } from 'react'

const DrawerSukses = React.memo(
  ({
    open,
    onOpenChange,
  }: {
    open: boolean
    onOpenChange: (val: boolean) => void
  }) => {
    const closeRef = useRef<HTMLButtonElement>(null)

    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-white p-4">
          {/* <div className="mx-auto w-full max-w-md"> */}
          <DrawerHeader className=" grid justify-center border-gray-200 px-4 py-3">
            {/* <div className="flex items-center">
                <DrawerClose ref={closeRef} className="hidden" /> */}

            <DrawerTitle className="flex h-[106px] w-[106px] items-center justify-center rounded-[60px] bg-green-100">
              <CheckCircle className="h-[52px] w-[52px] text-green-600" />
            </DrawerTitle>
            {/* </div> */}
          </DrawerHeader>
          <div className="mt-4 max-h-[440px] overflow-y-auto pr-1">
            <div className="text-center text-[14px] font-[400] text-[#5F5F5D]">
              Pesanan kamu sebelumnya berhasil dibatalkan, kamu dapat
              melanjutkan proses pengembalian dana atau dapat mengganti paket
              lain.
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              className="h-9 w-full rounded-full bg-yellow-400 px-3 py-1.5 text-xs font-medium text-black hover:bg-yellow-500"
              // onClick={submitData}2
              onClick={() => {
                window.location.reload()
              }}
            >
              Lihat Detail Transaski
            </Button>
          </div>
          {/* </div> */}
        </DrawerContent>
      </Drawer>
    )
  }
)

DrawerSukses.displayName = 'DrawerSukses'

export default DrawerSukses
