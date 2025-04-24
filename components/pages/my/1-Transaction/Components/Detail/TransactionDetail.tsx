import { ChecklistCircleActive } from '@/components/icons/checkbox'
import { TransactionDetailHeader } from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetaiHeader'
import TransactionDetailManifest from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailManifest'
import TransactionDetailPayment from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailPayment'
import TransactionDetailProduct from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailProduct'
import TransactionDetailSkeleton from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailSkeleton'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  getManifestDetail,
  getPaymentStatement,
  getTransactionDetail,
} from '@/services/umrah-service'
import dayjs from 'dayjs'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

interface TransactionDetailProps {
  open: boolean
  bookingId: string
  statusTahapan: string
  onOpenChange: (open: boolean) => void
}

export function TransactionDetail({
  open,
  statusTahapan,
  bookingId,
  onOpenChange,
}: TransactionDetailProps) {
  const [loading, setLoading] = useState(true)
  const [transaction, setTransaction] = useState<any>(null)
  const [paymentStatement, setPaymentStatement] = useState<any>(null)
  const [manifest, setManifest] = useState<any>(null)

  const fetchTransactions = useCallback(async () => {
    setLoading(true)

    try {
      // Build query parameters
      // Fetch data
      const transactionDetail = await getTransactionDetail(bookingId)
      const paymentStatement = await getPaymentStatement(bookingId)
      const manifest = await getManifestDetail({
        bookingId,
        page: 1,
        size: 100,
      })

      // Update state with response data
      setTransaction(transactionDetail)
      setPaymentStatement(paymentStatement)
      setManifest(manifest)

      setLoading(false)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    }
  }, [bookingId])

  useEffect(() => {
    fetchTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl gap-0 overflow-hidden rounded-3xl border-0 p-0">
        <DialogTitle className="hidden px-5">Detail Transaksi</DialogTitle>
        {loading ? (
          <TransactionDetailSkeleton />
        ) : (
          <div className="flex items-center justify-between border-b border-neutral-100 px-8 py-4">
            <h2 className="text-xl font-medium">Detail Transaksi {loading}</h2>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div
          className={`${statusTahapan !== 'Selesai' ? 'grid md:grid-cols-[1fr_300px]' : 'grid md:grid-cols-1'}`}
        >
          <div className="scrollbar-hide max-h-[80vh] overflow-y-auto border-r border-neutral-100 py-4">
            {/* Header */}
            <TransactionDetailHeader
              statusTahapan={statusTahapan}
              status={transaction?.status.slug}
              isPaidOff={transaction?.isPaidOff}
              isCompletedManifest={transaction?.isCompletedManifest}
            />

            {/* Transaction Info */}
            <div className="mb-6 px-6">
              <div className="flex items-center justify-between">
                <p className="text-s-regular text-neutral-500">
                  Kategori Produk
                </p>
                <p className="text-m-semibold">Umroh</p>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-s-regular text-neutral-500">ID Transaksi</p>
                <p className="text-m-semibold">{transaction?.bookingCode}</p>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-s-regular text-neutral-500">
                  Tanggal Pembelian
                </p>
                <p className="text-m-semibold">
                  {dayjs(transaction?.createdAt)
                    .locale('id')
                    .format('DD MMMM YYYY, HH:mm')}
                </p>
              </div>
            </div>

            <Separator className="mb-4 !h-2 !bg-neutral-100" />

            {/* Product Details */}
            <TransactionDetailProduct
              travelName={
                transaction?.packageSnapshot?.snapshot.package
                  .organizationInstance.name || ''
              }
              traveSlug={
                transaction?.packageSnapshot?.snapshot.package
                  .organizationInstance.slug || ''
              }
              packageName={
                transaction?.packageSnapshot?.snapshot.package.title || ''
              }
              packageSlug={
                transaction?.packageSnapshot?.snapshot.package.slug || ''
              }
              packageCover={
                transaction?.packageSnapshot?.snapshot.package.thumbnail || ''
              }
              arrivalDate={
                transaction?.packageSnapshot?.snapshot.arrivalDate || ''
              }
              departureDate={
                transaction?.packageSnapshot?.snapshot.departureDate || ''
              }
              totalJemaah={transaction?.quantity || ''}
              roomType={transaction?.roomType || ''}
            />
            <Separator className="mb-4 !h-2 !bg-neutral-100" />

            {/* Payment Details */}
            <TransactionDetailPayment
              bookingCode={transaction?.bookingCode || ''}
              totalJemaah={transaction?.quantity || ''}
              totalPayment={paymentStatement?.totalPrice}
              remainigPayment={paymentStatement?.remainingPayment}
            />
            <Separator className="mb-4 !h-2 !bg-neutral-100" />

            {/* Manifest Data */}
            <div className="mb-6 px-6">
              <h3 className="mb-4 text-lg font-medium">Data Jemaah</h3>
              <TransactionDetailManifest members={manifest?.results} />
            </div>
          </div>

          {/* Right Sidebar */}
          {statusTahapan !== 'Selesai' && (
            <div className="flex flex-col gap-3 p-4">
              {transaction?.status.slug !== 'canceled-by-user' &&
                transaction?.status.slug !== 'canceled-by-travel' &&
                transaction?.status.slug !== 'expired' && (
                  <div className="flex flex-col gap-3">
                    {transaction?.isPaidOff ? (
                      <div className="flex flex-col gap-2">
                        <div className="bg-success-100 flex items-center justify-center rounded-3xl px-3 py-2 pb-13">
                          <ChecklistCircleActive />
                          <span className="text-success-700 text-s-regular ml-1">
                            Pembayaran Lunas
                          </span>
                        </div>
                        <Button
                          className="-mt-13 !opacity-100 shadow-[0px_-2px_4.8px_0px_#A4883033]"
                          disabled
                        >
                          <span className="text-primary-900 font-medium opacity-50">
                            Bayar Pelunasan
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div
                          className={`${dayjs(transaction?.createdAt).subtract(21, 'day') > dayjs() ? 'bg-warning-100' : 'bg-error-100'} flex items-center justify-center rounded-3xl px-3 py-2 pb-13`}
                        >
                          {dayjs(transaction?.createdAt).subtract(21, 'day') >
                          dayjs() ? (
                            <span className="text-warning-700 text-s-regular">
                              Lunasi sebelum{' '}
                              {dayjs(transaction?.createdAt)
                                .subtract(21, 'day')
                                .format('DD MMM YYYY')}
                            </span>
                          ) : (
                            <span className="text-error-700 text-s-regular">
                              {' '}
                              Segera lunasi pembayaran paket!
                            </span>
                          )}
                        </div>
                        <Button className="-mt-13 shadow-[0px_-2px_4.8px_0px_#A4883033]">
                          <span className="font-medium">Bayar Pelunasan</span>
                        </Button>
                      </div>
                    )}

                    {transaction?.isCompletedManifest ? (
                      <div className="flex flex-col gap-2">
                        <div className="bg-success-100 flex items-center justify-center rounded-3xl px-3 py-2 pb-13">
                          <ChecklistCircleActive />
                          <span className="text-success-700 text-s-regular ml-1">
                            Data Lengkap
                          </span>
                        </div>
                        <Button
                          className="-mt-13 !opacity-100 shadow-[0px_-2px_4.8px_0px_#A4883033]"
                          disabled
                        >
                          <span className="text-primary-900 font-medium opacity-50">
                            Lengkapi Data Jemaah
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div
                          className={`flex items-center justify-center rounded-3xl px-3 py-2 pb-13 ${dayjs(transaction?.createdAt).add(3, 'day') > dayjs() ? 'bg-warning-100' : 'bg-error-100'}`}
                        >
                          {dayjs(transaction?.createdAt).add(3, 'day') >
                          dayjs() ? (
                            <span className="text-s-regular text-warning-700">
                              Lengkapi sebelum{' '}
                              {dayjs(transaction?.createdAt)
                                .add(3, 'day')
                                .format('DD MMM YYYY')}
                            </span>
                          ) : (
                            <span className="text-s-regular text-error-700">
                              Segera lengkapi manifest
                            </span>
                          )}
                        </div>
                        <Button className="-mt-13 shadow-[0px_-2px_4.8px_0px_#A4883033]">
                          <span className="font-medium">
                            Lengkapi Data Jemaah
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                )}

              <Link
                href={`https://wa.me/628888755101?text=Assalamualaikum,+maaf+saya+ingin+bertanya+mengenai+pesanan+saya+dengan+kode+${transaction?.bookingCode}`}
                target="_blank"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="border-primary-500 w-full border-2"
                >
                  <span className="font-medium">Bantuan</span>
                </Button>
              </Link>

              {transaction?.status.slug !== 'canceled-by-user' &&
                transaction?.status.slug !== 'canceled-by-travel' &&
                transaction?.status.slug !== 'expired' && (
                  <Link
                    href={`https://wa.me/628888755101?text=Assalamualaikum,+maaf+saya+ingin+membatalkan+pesanan+saya+dengan+kode+${transaction?.bookingCode}`}
                    target="_blank"
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="border-error-500  block w-full border-2"
                    >
                      <span className="text-error-500 font-medium">
                        Batalkan Pesanan
                      </span>
                    </Button>
                  </Link>
                )}
              <div className="relative mt-auto">
                <Image
                  src="/images/kabbah.svg"
                  alt="Kaaba illustration"
                  width={200}
                  height={200}
                  className="absolute -right-5 bottom-0"
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
