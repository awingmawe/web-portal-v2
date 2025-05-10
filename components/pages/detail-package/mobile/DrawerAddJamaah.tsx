import CheckoutDrawerFormJamaah from '@/components/pages/detail-package/mobile/DrawerFormAddJamaah'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ChevronRight, User } from 'lucide-react'
import React, { useRef } from 'react'

const CheckoutDrawerAddJamaah = React.memo(
  ({
    children,
    handleUseMyDataChangeMobile,
    setNoTlpn,
    setNama,
    nama,
    noTlpn,
    handleSimpanMobile,
  }: {
    children: React.ReactNode
    handleUseMyDataChangeMobile: any
    setNoTlpn: any
    setNama: any
    nama: any
    noTlpn: any
    handleSimpanMobile: any
  }) => {
    const closeRef = useRef<HTMLButtonElement>(null)

    const handleClick = () => {
      handleUseMyDataChangeMobile()
      closeRef.current?.click() // Tutup drawer
    }
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="bg-white p-0">
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader className="border-b border-gray-200 px-4 py-3">
              <div className="flex items-center">
                <DrawerClose ref={closeRef} className="hidden" />
                <DrawerTitle className="flex text-lg font-medium">
                  <User className="mr-5 h-5 w-5 text-gray-600" />
                  Tambah Jemaah
                </DrawerTitle>
              </div>
            </DrawerHeader>

            <div className="px-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 py-3">
                  <div className="flex items-center space-x-3">
                    <div onClick={handleClick}>
                      <span className="text-base font-medium">
                        Tambahkan Data Saya Sebagai Data Jemaah
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between border-b border-gray-200 py-3">
                  <div className="flex items-center space-x-3">
                    <div>
                      <CheckoutDrawerFormJamaah
                        setNoTlpn={setNoTlpn}
                        text={'Tambah'}
                        setNama={setNama}
                        nama={nama}
                        data={{}}
                        noTlpn={noTlpn}
                        handleSimpanMobile={() => {
                          handleSimpanMobile()
                          closeRef.current?.click() // Tutup drawer
                          setNama('')
                          setNoTlpn('')
                        }}
                      >
                        <button className="text-base font-medium">
                          Tambahkan Data Jemaah Baru
                        </button>
                      </CheckoutDrawerFormJamaah>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
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

CheckoutDrawerAddJamaah.displayName = 'CheckoutDrawerAddJamaah'

export default CheckoutDrawerAddJamaah
