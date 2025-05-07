import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { getPaymentStatement, postNextPayment } from '@/services/umrah-service'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'
export const TransactionDetailMobileAction = ({
  bookingCode,
  statusTahapan,
  bookingId,
}: {
  bookingCode: string
  statusTahapan: string
  bookingId: any
}) => {
  const fetchPaymentStatement = useCallback(async (id: any) => {
    try {
      // Build query parameters
      const response = await getPaymentStatement(id)
      const payload = {
        amount: response.remainingPayment,
      }
      const responseNext = await postNextPayment(id, payload)
      window.snap.pay(responseNext?.paymentToken, {
        onSuccess: async (result: any) => {
          console.log(result)
          // router.replace('/my/transaction') // replace & refresh
          window.location.reload()
        },
        onPending: async (result: any) => {
          console.log('Payment pending', result)
          // router.push(`/my/need-payment`)
          // Add expiration check logic
        },
        onError: (error: any) => {
          console.log(error)
        },
        onClose: () => {
          // router.push(`/my/need-payment`)
          // Additional logic on close
        },
      })
      // console.log(responseNext)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    } finally {
    }
  }, [])
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
                  href={`https://wa.me/628888551101?text=Assalamualaikum,+maaf+saya+ingin+membatalkan+pesanan+saya+dengan+kode+${bookingCode}`}
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

          <Button
            className="w-full py-2"
            onClick={() => {
              fetchPaymentStatement(bookingId)
            }}
          >
            Bayar Pelunasan
          </Button>
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
