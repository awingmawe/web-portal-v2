import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import dayjs from 'dayjs'
import React, { useRef } from 'react'

const DrawerSK = React.memo(
  ({ children, dataSk }: { children: React.ReactNode; dataSk: any }) => {
    const closeRef = useRef<HTMLButtonElement>(null)

    const handleClick = () => {
      // handleUseMyDataChangeMobile()
      closeRef.current?.click() // Tutup drawer
    }
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="bg-white p-2">
          <div className="mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto">
            <DrawerHeader className="border-b border-gray-200 px-4 py-3">
              <div className="flex items-center">
                <DrawerClose ref={closeRef} className="hidden" />
                <DrawerTitle className="flex text-lg font-medium">
                  {/* <User className="mr-5 h-5 w-5 text-gray-600" /> */}
                  {dataSk?.title}
                </DrawerTitle>
              </div>
            </DrawerHeader>

            <div className="h-[1px] w-full bg-[#D2D2D1] max-lg:hidden" />
            <div className="mt-4 p-2 text-sm text-neutral-700">
              Terakhir diperbarui:{' '}
              {dayjs(dataSk?.modifiedAt).format('DD MMMM YYYY')}
            </div>
            <div
              className="text-m mt-4 p-2 text-neutral-700"
              dangerouslySetInnerHTML={{ __html: dataSk?.body }}
            ></div>

            <div className="mt-6 flex justify-center">
              <Button
                className="w-[50%] rounded-full bg-yellow-400 text-sm font-semibold text-black hover:bg-yellow-500"
                onClick={handleClick}
              >
                Mengerti
              </Button>
            </div>

            <div className="mt-2 p-4">
              <div className="mx-auto h-1 w-12 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
)

DrawerSK.displayName = 'DrawerSK'

export default DrawerSK
