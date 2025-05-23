/* eslint-disable @typescript-eslint/no-unused-vars */
import DrawerSukses from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerSukses'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { X } from 'lucide-react'
import React, { useState } from 'react'

const DrawerAlreadyHave = React.memo(
  ({ open, setOpen, text }: { open: any; setOpen: any; text: any }) => {
    // const closeRef = useRef<HTMLButtonElement>(null)
    const [openSukses, setOpenSukses] = useState(false)

    return (
      <>
        <Drawer open={open} onOpenChange={setOpen}>
          {/* <DrawerTrigger
            className="h-[40px] w-1/2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
            disabled={reason === '' ? true : false}
          >
            {children}
          </DrawerTrigger> */}
          <DrawerContent className="bg-white p-4">
            <DrawerTitle className="hidden"></DrawerTitle>
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader className="border-gray-200 px-4 py-3">
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-lg bg-red-100">
                      <div className="flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-[#F0143E]">
                        <X className="h-[30px] w-[30px] text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerHeader>

              <div className=" text-center text-[24px] font-[600] text-black">
                Tidak Dapat Mengajukan {text}
              </div>
              <div className="mt-2 text-center text-sm text-neutral-700">
                Terdapat proses pengajuan yang masih berjalan. Harap menunggu
                proses pengajuan selesai sebelum mengajukan kembali.
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  className="w-[50%] rounded-full bg-yellow-400 text-sm font-semibold text-black hover:bg-yellow-500"
                  onClick={() => setOpen(false)}
                >
                  Lihat Pendanaan Aktif
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <DrawerSukses open={openSukses} onOpenChange={setOpenSukses} />
      </>
    )
  }
)

DrawerAlreadyHave.displayName = 'DrawerAlreadyHave'

export default DrawerAlreadyHave
