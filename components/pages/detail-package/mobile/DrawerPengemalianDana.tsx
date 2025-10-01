import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import React, { useRef } from 'react'
import renderHTML from 'react-render-html'

const DrawerPengembalianDana = React.memo(
  ({
    children,
    parsedContent,
    dataRefundPolicy,
  }: {
    children: React.ReactNode
    parsedContent: any
    dataRefundPolicy: any
  }) => {
    const closeRef = useRef<HTMLButtonElement>(null)

    const handleClick = () => {
      // handleUseMyDataChangeMobile()
      closeRef.current?.click() // Tutup drawer
    }
    const convertDaysToWeeks = (days: number) => {
      const weeks = Math.floor(days / 7) // Menghitung jumlah minggu
      const remainingDays = days % 7 // Menghitung sisa hari yang tidak mencapai satu minggu

      if (weeks > 0) {
        return `H-${weeks} minggu` // Jika ada minggu, tampilkan dalam format "h-X minggu"
      }

      return `H-${remainingDays} hari` // Jika tidak ada minggu, tampilkan dalam format "h-X hari"
    }
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="bg-white p-2 ">
          <div className="mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto">
            <DrawerHeader className="border-b border-gray-200 px-4 py-3">
              <div className="flex items-center">
                <DrawerClose ref={closeRef} className="hidden" />
                <DrawerTitle className="flex text-lg font-medium">
                  {/* <User className="mr-5 h-5 w-5 text-gray-600" /> */}
                  Pengembalian Dana
                </DrawerTitle>
              </div>
            </DrawerHeader>

            <div className="h-[1px] w-full bg-[#c9c9c9] max-lg:hidden" />
            <div className="mt-4 text-sm text-neutral-700">
              {renderHTML(dataRefundPolicy?.content || '')}
            </div>
            {parsedContent && parsedContent.length > 0 ? (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full table-auto border border-gray-300 text-sm text-neutral-800">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Jumlah
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Berlaku
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedContent.map((item: any, index: number) => (
                      <tr key={index} className="odd:bg-white even:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">
                          {item.jumlah}%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {convertDaysToWeeks(item.berlaku)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-4 text-sm text-neutral-700">
                Tidak ada informasi pengembalian dana yang tersedia.
              </div>
            )}

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

DrawerPengembalianDana.displayName = 'DrawerPengembalianDana'

export default DrawerPengembalianDana
