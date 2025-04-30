import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
export const TransactionDetailMobileAction = ({
  bookingCode,
  statusTahapan,
}: {
  bookingCode: string
  statusTahapan: string
}) => {
  return (
    <div className="hidden max-lg:block">
      {statusTahapan == 'Akan Datang' && (
        <div className="fixed right-0 bottom-0 left-0 z-50 flex  h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                className="!rounded-lg border-2 border-neutral-900 px-1 py-1"
                variant="outline"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="z-100 border-0 outline-0">
              <DrawerHeader className="p-3">
                <DrawerTitle className="flex items-center">
                  <p className="text-m-semibold ml-2 font-semibold">Lainnya</p>
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex w-full px-3 pt-3 pb-5">
                <Link
                  href={`https://wa.me/628888755101?text=Assalamualaikum,+maaf+saya+ingin+membatalkan+pesanan+saya+dengan+kode+${bookingCode}`}
                  target="_blank"
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    type="button"
                    className="border-error-500 w-full border-2 py-3"
                  >
                    Batalkan Pesanan
                  </Button>
                </Link>
              </div>
            </DrawerContent>
          </Drawer>

          <Button className="w-full py-2">Bayar Pelunasan</Button>
          <Button className="w-full py-2">Lengkapi Data Jemaah</Button>
        </div>
      )}
      {statusTahapan == 'Waiting' && (
        <div className="fixed right-0 bottom-0 left-0 z-50 flex  h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
          <Button className="w-full py-2">Bayar</Button>
        </div>
      )}
    </div>
  )
}
