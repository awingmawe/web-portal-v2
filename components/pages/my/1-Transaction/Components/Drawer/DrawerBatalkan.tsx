import DrawerBatalkanPesanan from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerFormBatalkan'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import React, { useRef, useState } from 'react'

const DrawerBatalkan = React.memo(
  ({
    children,
    bookingId,
    idOrganisasi,
  }: {
    children: React.ReactNode
    bookingId: any
    idOrganisasi: any
  }) => {
    const closeRef = useRef<HTMLButtonElement>(null)
    const [open, setOpen] = useState(false)
    const [openForm, setOpenForm] = useState(false)

    const handleBuka = () => {
      setOpen(false) // tutup drawer refund
      setTimeout(() => {
        setOpenForm(true) // buka drawer sukses
      }, 300)
    }
    return (
      <>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{children}</DrawerTrigger>

          <DrawerContent className="z-[999] border-0 outline-0">
            <DrawerHeader className="p-3">
              <DrawerTitle className="flex items-center">
                <DrawerClose ref={closeRef} className="hidden" />
                <p className="text-m-semibold ml-2 font-semibold">Lainnya</p>
              </DrawerTitle>
            </DrawerHeader>
            <div className="flex w-full px-3 pt-3 pb-5">
              {/* <Link
                    href={`https://wa.me/628888551101?text=Assalamualaikum,+maaf+saya+ingin+membatalkan+pesanan+saya+dengan+kode+${bookingCode}`}
                    target="_blank"
                    className="w-full"
                  > */}

              <Button
                className="border-error-500 w-full rounded-full border-2 bg-white py-3"
                onClick={handleBuka}
              >
                Batalkan Pesanan
              </Button>

              {/* </Link> */}
            </div>
          </DrawerContent>
        </Drawer>
        <DrawerBatalkanPesanan
          bookingId={bookingId}
          idOrganisasi={idOrganisasi}
          openForm={openForm}
          setOpenForm={setOpenForm}
          setOpen={setOpen}
        />
      </>
    )
  }
)

DrawerBatalkan.displayName = 'DrawerBatalkan'

export default DrawerBatalkan
