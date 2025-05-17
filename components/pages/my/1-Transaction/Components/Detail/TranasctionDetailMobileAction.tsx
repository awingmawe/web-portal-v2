/* eslint-disable @typescript-eslint/no-unused-vars */
import DrawerBatalkan from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerBatalkan'
import { Button } from '@/components/ui/button'
import { getPaymentStatement, postNextPayment } from '@/services/umrah-service'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useRef } from 'react'
export const TransactionDetailMobileAction = ({
  bookingCode,
  statusTahapan,
  bookingId,
  idOrganisasi,
}: {
  bookingCode: string
  statusTahapan: string
  bookingId: any
  idOrganisasi: any
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
  const closeRef = useRef<HTMLButtonElement>(null)

  // const handleClick = () => {
  //   // handleUseMyDataChangeMobile()
  //   closeRef.current?.click() // Tutup drawer
  // }
  return (
    <div className="hidden max-lg:block">
      {statusTahapan == 'Akan Datang' && (
        <div className="fixed right-0 bottom-0 left-0 z-50 flex  h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
          <DrawerBatalkan bookingId={bookingId} idOrganisasi={idOrganisasi}>
            <Button
              className="!rounded-lg border-2 border-neutral-900 px-1 py-1"
              variant="outline"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DrawerBatalkan>

          <Button
            className="w-full py-2"
            onClick={() => {
              fetchPaymentStatement(bookingId)
            }}
          >
            Bayar Pelunasan
          </Button>
          <Link href={`/manifest/${bookingId}`} className="w-full">
            <Button className="w-full py-2">Lengkapi Data Jemaah</Button>
          </Link>
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
