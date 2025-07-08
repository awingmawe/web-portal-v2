/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { TransactionDetailHeader } from '@/components/pages/my/7-PaketPersonal/Components/Detail/TransactionDetaiHeader'
import TransactionDetailProduct from '@/components/pages/my/7-PaketPersonal/Components/Detail/TransactionDetailProduct'
import TransactionDetailRincian from '@/components/pages/my/7-PaketPersonal/Components/Detail/TransactionDetailRincian'
import TransactionDetailSkeleton from '@/components/pages/my/7-PaketPersonal/Components/Detail/TransactionDetailSkeleton'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  getManifestDetail,
  getTransactionPersonalDetail,
} from '@/services/umrah-service'
import 'dayjs/locale/id'
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'

interface TransactionDetailContentProps {
  bookingId: string
  isFixedLoading: boolean
  onOpenChange?: any
  setOpenBatalkan?: (open: boolean) => void
}

// Declare window with Snap interface
declare global {
  interface Window {
    snap: {
      pay: (token: string, options: any) => void
    }
  }
}

export default function TransactionDetailContent({
  isFixedLoading,
  bookingId,
  onOpenChange,
  setOpenBatalkan,
}: TransactionDetailContentProps) {
  const [loading, setLoading] = useState(true)
  const [transaction, setTransaction] = useState<any>(null)
  const [paymentTransaction, setPaymentTransaction] = useState<any>(null)
  const [manifest, setManifest] = useState<any>(null)
  const [isSnapInitialized, setIsSnapInitialized] = useState(false)
  const router = useRouter()
  const [statusTahapan, setStatusTahapan] = useState('Akan Datang')

  const fetchTransactions = useCallback(async () => {
    setLoading(true)

    try {
      // Fetch data
      const transactionDetail = await getTransactionPersonalDetail(bookingId)
      const manifest = await getManifestDetail({
        bookingId,
        page: 1,
        size: 100,
      })

      // Update state with response data
      setTransaction(transactionDetail)

      setManifest(manifest)

      setLoading(false)
    } catch (err) {
      console.error('Error fetching transactions:', err)
      setLoading(false)
    }
  }, [bookingId])

  useEffect(() => {
    fetchTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (transaction != null) {
      if (
        transaction.status.slug == 'waiting-cancellation' ||
        transaction.status.slug == 'waiting-approval' ||
        transaction.status.slug == 'approved'
      ) {
        setStatusTahapan('Akan Datang')
      } else if (transaction.status.slug == 'waiting-down-payment') {
        setStatusTahapan('Waiting')
      } else if (transaction.status.slug == 'completed') {
        setStatusTahapan('Selesai')
      } else {
        setStatusTahapan('Dibatalkan')
      }
    }
  }, [transaction])
  console.log(transaction)

  return (
    <div>
      <div className={`${loading ? 'block' : 'hidden'} h-[700px]`}></div>
      <MobileTopbar
        showBackButton
        variant="transactionTopbar"
        title="Detail Transaction"
        onBackClick={() => {
          if (window.history.length > 1) {
            window.history.back()
          } else {
            router.push('/my/transaction')
          }
        }}
        showCallCenter
      />

      {loading ? (
        <TransactionDetailSkeleton isFixed={isFixedLoading} />
      ) : (
        <Fragment>
          <div
            className={`${statusTahapan !== 'Selesai' ? 'grid grid-cols-1 lg:grid-cols-[1fr_300px]' : 'grid md:grid-cols-1'} rounded-lg bg-white shadow-md max-lg:h-auto`}
          >
            <div className="scrollbar-hide max-h-[80vh] overflow-y-auto border-r border-neutral-100 py-4 max-lg:max-h-full">
              {/* Header */}
              <TransactionDetailHeader
                status={transaction?.status}
                totalOffers={transaction?.totalOffers}
                createdDate={transaction?.approvedAt}
              />

              <Separator className="mb-4 !h-2 !bg-neutral-100" />

              {/* Product Details */}
              <TransactionDetailProduct
                packageName={transaction?.name}
                arrivalDate={transaction?.arrivalDate}
                departureDate={transaction?.departureDate}
                totalJemaah={transaction?.totalManifest}
                aktifitas={transaction?.activity}
                createVisa={transaction?.createVisa}
                journeyType={transaction?.journeyType}
                useInsurance={transaction?.useInsurance}
                arrival={transaction?.arrival}
                departure={transaction?.departure}
              />
              <Separator className="mb-4 !h-2 !bg-neutral-100" />

              {/* Manifest Data */}
              <div className="mb-6 px-6 max-lg:px-3">
                <h3 className="mb-4 text-lg font-medium max-lg:text-xs">
                  Rincian Permintaan
                </h3>

                <TransactionDetailRincian data={transaction} />
              </div>
            </div>
            {/* Right Sidebar */}
            <div className="flex flex-col gap-3 p-4 max-lg:hidden">
              {transaction.status === 'offers-available' ? (
                <Button
                  className="border-primary-500 w-full border-2 px-8 py-3 text-nowrap"
                  variant="default"
                >
                  Lihat Penawaran
                </Button>
              ) : transaction.status === 'no-offers' ||
                transaction.status === 'offer-expired' ||
                transaction.status === 'canceled' ? (
                <Button
                  className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
                  variant="default"
                >
                  Buat Paket Baru
                </Button>
              ) : transaction.status === 'offer-selected' ? (
                <Button variant="default">Lihat Detail Pilihan</Button>
              ) : null}
              <Button
                className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
                variant="ghost"
              >
                Bantuan
              </Button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}
