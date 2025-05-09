import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

const DrawerCheckAvailibility = React.memo(
  ({
    children,
    statusStock,
    onSubmit,
  }: {
    children: React.ReactNode
    statusStock: any
    onSubmit: any
  }) => {
    const [quotaAmount, setQuotaAmount] = useState('')

    const handleSubmit = () => {
      if (onSubmit) {
        onSubmit(quotaAmount)
        closeRef.current?.click()
        setQuotaAmount('')
      }
      // onOpenChange(false)
    }
    const closeRef = useRef<HTMLButtonElement>(null)

    const handleClick = () => {
      // handleUseMyDataChangeMobile()
      setQuotaAmount('')
      closeRef.current?.click() // Tutup drawer
    }
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="bg-white p-0">
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader className="border-b border-gray-200 px-4 py-3">
              <div
                className={`flex items-center ${statusStock ? 'justify-center' : ''}`}
              >
                <DrawerClose ref={closeRef} className="hidden" />
                <DrawerTitle className=" text-lg font-medium">
                  {statusStock ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                      <X className="h-6 w-6 text-red-600" />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Image
                        src="/images/Icon-check.svg"
                        width={24}
                        height={24}
                        alt="check icon"
                        className="mr-2"
                      />
                      Cek Kuota
                    </div>
                  )}
                </DrawerTitle>
              </div>
            </DrawerHeader>

            <div className="px-4 py-4">
              {statusStock ? (
                <>
                  <p className="mt-1 text-center text-sm text-[#000000]">
                    Anda Sudah Meminta Pengecekan Ketersediaan Kuota Kursi
                  </p>
                  <p className="mt-1 text-center text-sm text-neutral-600">
                    Mohon menunggu 1x24 jam sebelum melakukan pengecekan
                    ketersediaan kembali.
                  </p>
                </>
              ) : (
                <p className="mt-1 text-sm text-neutral-600">
                  Masukkan jumlah kuota yang Anda butuhkan
                </p>
              )}
            </div>
            {statusStock ? (
              <div className="p-1 pt-2">
                <div className="flex gap-3">
                  <Button
                    // variant="outline"
                    className="flex-1 rounded-full border-[#FFC100] bg-[#FFC100] font-medium"
                    onClick={handleClick}
                  >
                    Tutup
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-1 pt-2">
                <Input
                  placeholder="Masukkan jumlah kuota yang anda butuhkan"
                  value={quotaAmount}
                  onChange={(e) => setQuotaAmount(e.target.value)}
                  className="mb-4 rounded-full px-4 py-6"
                  type="number"
                />

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-full border-[#FFC100] font-medium"
                    onClick={handleClick}
                  >
                    Batal
                  </Button>
                  <Button
                    className="flex-1 rounded-full bg-[#FFC100] font-medium hover:bg-amber-600"
                    onClick={handleSubmit}
                  >
                    Kirim
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-2 p-4">
              <div className="mx-auto h-1 w-12 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
)

DrawerCheckAvailibility.displayName = 'DrawerCheckAvailibility'

export default DrawerCheckAvailibility
