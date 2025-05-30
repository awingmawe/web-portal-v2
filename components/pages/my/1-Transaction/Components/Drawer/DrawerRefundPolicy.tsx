import DrawerSukses from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerSukses'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { getPostCanceled } from '@/services/umrah-service'
import React, { useRef, useState } from 'react'
import renderHTML from 'react-render-html'

const DrawerRefundPolicy = React.memo(
  ({
    bookingId,
    dataRefundPolicy,
    parsedContent,
    description,
    reason,
    open,
    setOpen,
    setOpenForm,
    setDescription,
    setReason,
  }: {
    bookingId: any
    dataRefundPolicy: any
    parsedContent: any
    description: any
    reason: any
    open: any
    setOpen: any
    setOpenForm: any
    setDescription: any
    setReason: any
  }) => {
    const closeRef = useRef<HTMLButtonElement>(null)
    const [openSukses, setOpenSukses] = useState(false)
    const submitData = async () => {
      try {
        const payload = {
          bookingId: bookingId,
          reason: description === '' ? reason : description,
        }
        // console.log(payload)
        await getPostCanceled(payload)
        setOpen(false) // tutup drawer refund
        setDescription('')
        setReason('')
        setTimeout(() => {
          setOpenSukses(true) // buka drawer sukses
        }, 300)

        // onOpenChange(false)
        // setOpenModalSukses(true)
      } catch (error) {
        console.log(error)
      }
    }
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
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader className="border-gray-200 px-4 py-3">
                <div className="flex items-center">
                  <DrawerClose ref={closeRef} className="hidden" />
                  <DrawerTitle className="flex text-lg font-medium">
                    Syarat Ketentuan Pengembalian Dana
                  </DrawerTitle>
                </div>
              </DrawerHeader>

              <div className="mt-4 max-h-[440px] overflow-y-auto pr-1">
                <div className="text-[14px] leading-relaxed font-[400] text-[#8E8E8B]">
                  {renderHTML(dataRefundPolicy?.content || '')}
                </div>

                {parsedContent && parsedContent.length > 0 ? (
                  <div className="mt-6">
                    <table className="w-full table-auto border border-gray-300 text-sm text-neutral-800">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                            Jumlah
                          </th>
                          <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                            Berlaku
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedContent.map((item: any, index: number) => (
                          <tr
                            key={index}
                            className="odd:bg-white even:bg-gray-50"
                          >
                            <td className="border border-gray-300 px-4 py-2">
                              {item.jumlah}%
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              H-{item.berlaku} Hari
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
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <Button
                  className=" h-9 w-[200px] rounded-full border border-gray-300 bg-white text-black hover:bg-gray-100"
                  onClick={() => {
                    setOpen(false)
                    setOpenForm(true)
                  }}
                >
                  Kembali
                </Button>
                <Button
                  onClick={submitData}
                  className="h-9 w-1/2 rounded-full bg-yellow-400 px-3 py-1.5 text-xs font-medium text-black hover:bg-yellow-500"
                >
                  Setujui dan Batalkan
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

DrawerRefundPolicy.displayName = 'DrawerRefundPolicy'

export default DrawerRefundPolicy
