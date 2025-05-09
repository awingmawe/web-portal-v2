import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { User } from 'lucide-react'
import React from 'react'

const CheckoutDrawerFormJamaah = React.memo(
  ({
    children,
    setNoTlpn,
    setNama,
    nama,
    noTlpn,
    handleSimpanMobile,
  }: {
    children: React.ReactNode
    setNoTlpn: any
    setNama: any
    nama: any
    noTlpn: any
    handleSimpanMobile: any
  }) => {
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="bg-white p-0">
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader className="px-4 py-3">
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5 text-gray-600" />
                <DrawerTitle className="text-lg font-medium">
                  Tambah Jemaah
                </DrawerTitle>
              </div>
            </DrawerHeader>

            <div className="px-4 py-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="namaJemaah"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama Jemaah <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="namaJemaah"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama Jemaah"
                    className="w-full rounded-full border border-gray-300 px-4 py-3 text-gray-500 placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="nomorTelepon"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nomor Telepon Jemaah <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="nomorTelepon"
                    value={noTlpn}
                    onChange={(e) => setNoTlpn(e.target.value)}
                    className="w-full rounded-full border border-gray-300 px-4 py-3 text-gray-500 placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-4 pb-6">
              <DrawerClose className="flex-1">
                <Button className="w-full rounded-full border-2 border-yellow-400 bg-white py-3 font-medium text-gray-800 transition hover:bg-gray-50">
                  Batal
                </Button>
              </DrawerClose>
              <DrawerClose className="flex-1">
                <Button
                  className="w-full rounded-full bg-yellow-400 py-3 font-medium text-gray-800 transition hover:bg-yellow-500"
                  onClick={handleSimpanMobile}
                >
                  Simpan
                </Button>
              </DrawerClose>
            </div>

            <div className="p-4">
              <div className="mx-auto h-1 w-12 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
)

CheckoutDrawerFormJamaah.displayName = 'CheckoutDrawerFormJamaah'

export default CheckoutDrawerFormJamaah
