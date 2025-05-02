'use client'
import { ChecklistCircleActive } from '@/components/icons/checkbox'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import { TransactionDetailMobileAction } from '@/components/pages/my/1-Transaction/Components/Detail/TranasctionDetailMobileAction'
import { TransactionDetailHeader } from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetaiHeader'
import TransactionDetailManifest from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailManifest'
import TransactionDetailPayment from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailPayment'
import TransactionDetailProduct from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailProduct'
import TransactionDetailSkeleton from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailSkeleton'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MIDTRANS_CLIENT_KEY, SNAP_URL } from '@/constant/env'
import {
  getManifestDetail,
  getPaymentStatement,
  getPaymentTransaction,
  getTransactionDetail,
  postNextPayment,
} from '@/services/umrah-service'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Fragment, useCallback, useEffect, useState } from 'react'

interface TransactionDetailContentProps {
  bookingId: string
  isFixedLoading: boolean
  onOpenChange?: any
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
}: TransactionDetailContentProps) {
  const [loading, setLoading] = useState(true)
  const [transaction, setTransaction] = useState<any>(null)
  const [paymentTransaction, setPaymentTransaction] = useState<any>(null)
  const [manifest, setManifest] = useState<any>(null)
  const [isSnapInitialized, setIsSnapInitialized] = useState(false)
  const router = useRouter()
  const [statusTahapan, setStatusTahapan] = useState('Akan Datang')

  // Initialize Snap
  useEffect(() => {
    // Check if Snap is already available
    if (window.snap) {
      setIsSnapInitialized(true)
      return
    }

    // Load Snap.js
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'
    const myMidtransClientKey = 'your-client-key' // Replace with your actual client key

    const scriptTag = document.createElement('script')
    scriptTag.src = midtransScriptUrl
    scriptTag.setAttribute('data-client-key', myMidtransClientKey)
    scriptTag.onload = () => {
      setIsSnapInitialized(true)
    }

    document.body.appendChild(scriptTag)

    return () => {
      // Clean up script tag on unmount if needed
      document.body.removeChild(scriptTag)
    }
  }, [])

  const fetchTransactions = useCallback(async () => {
    setLoading(true)

    try {
      // Fetch data
      const transactionDetail = await getTransactionDetail(bookingId)
      const paymentTransaction = await getPaymentTransaction(bookingId)
      const manifest = await getManifestDetail({
        bookingId,
        page: 1,
        size: 100,
      })

      // Update state with response data
      setTransaction(transactionDetail)
      setPaymentTransaction(paymentTransaction)
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

  const handleSnapPayment = useCallback(
    (token: string) => {
      if (!isSnapInitialized || !window.snap) {
        console.error('Snap is not initialized yet')
        return
      }

      window.snap.pay(token, {
        onSuccess: async (result: any) => {
          console.log(result)
          window.location.reload()
        },
        onPending: async (result: any) => {
          console.log('Payment pending', result)
          window.location.reload()
        },
        onError: (error: any) => {
          console.log(error)
          setLoading(false)
        },
        onClose: () => {
          setLoading(false)
        },
      })
    },
    [router, isSnapInitialized]
  )

  const fetchPaymentStatement = useCallback(
    async (id: any) => {
      if (!isSnapInitialized) {
        console.error('Snap is not initialized yet')
        return
      }

      setLoading(true)
      try {
        // Build query parameters
        const response = await getPaymentStatement(id)
        const payload = {
          amount: response.remainingPayment,
        }
        const responseNext = await postNextPayment(id, payload)

        if (responseNext?.paymentToken) {
          onOpenChange()
          handleSnapPayment(responseNext.paymentToken)
        } else {
          console.error('No payment token received')
          setLoading(false)
        }
      } catch (err) {
        console.error('Error processing payment:', err)
        setLoading(false)
      }
    },
    [handleSnapPayment, isSnapInitialized]
  )

  const handleDirectPayment = useCallback(() => {
    if (!isSnapInitialized) {
      console.error('Snap is not initialized yet')
      return
    }

    setLoading(true)
    onOpenChange()
    if (paymentTransaction?.paymentToken) {
      handleSnapPayment(paymentTransaction.paymentToken)
    } else {
      console.error('No payment token available')
      setLoading(false)
    }
  }, [paymentTransaction, handleSnapPayment, isSnapInitialized])

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
            className={`${statusTahapan !== 'Selesai' ? 'grid md:grid-cols-[1fr_300px]' : 'grid md:grid-cols-1'} rounded-lg bg-white shadow-md max-lg:h-auto`}
          >
            <div className="scrollbar-hide max-h-[80vh] overflow-y-auto border-r border-neutral-100 py-4 max-lg:max-h-full">
              {/* Header */}
              <TransactionDetailHeader
                createdDate={transaction?.createdAt}
                statusTahapan={statusTahapan}
                status={transaction?.status.slug}
                isPaidOff={transaction?.isPaidOff}
                isCompletedManifest={transaction?.isCompletedManifest}
              />

              {/* Transaction Info */}
              <div className="mb-6 px-6 max-lg:px-3">
                <div className="flex items-center justify-between">
                  <p className="text-s-regular text-neutral-500">
                    Kategori Produk
                  </p>
                  <p className="text-sm font-semibold max-lg:text-xs max-lg:font-medium">
                    Umroh
                  </p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-s-regular text-neutral-500">
                    ID Transaksi
                  </p>
                  <p className="text-sm font-semibold max-lg:text-xs max-lg:font-medium">
                    {transaction?.bookingCode}
                  </p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-s-regular text-neutral-500">
                    Tanggal Pembelian
                  </p>
                  <p className="text-sm font-semibold max-lg:text-xs max-lg:font-medium">
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
                paymentDetails={transaction?.paymentDetails || ''}
                statusTahapan={statusTahapan}
                createdAt={transaction?.createdAt || ''}
                startDate={
                  transaction?.packageSnapshot?.snapshot?.departureDate
                }
                isPaidOff={transaction?.isPaidOff}
              />
              <Separator className="mb-4 !h-2 !bg-neutral-100" />

              {/* Manifest Data */}
              <div className="mb-6 px-6 max-lg:px-3">
                <h3 className="mb-4 text-lg font-medium max-lg:text-xs">
                  Data Jemaah
                </h3>

                {transaction.isCompletedManifest ? (
                  <div className="bg-success-100 mb-3 hidden rounded-full px-3 py-2 max-lg:block">
                    <div className="flex items-center gap-1">
                      <ChecklistCircleActive />
                      <p className="text-s-regular text-success-700 ">
                        Data Lengkap
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${dayjs(transaction.createdAt).add(3, 'day') > dayjs() ? 'bg-warning-100' : 'bg-error-100'}  mb-3 hidden rounded-full px-3 py-2 max-lg:block`}
                  >
                    <div
                      className={`${dayjs(transaction.createdAt).add(3, 'day') > dayjs() ? 'text-warning-700' : 'text-error-700'} flex items-center gap-1`}
                    >
                      <InfoCircleIcon />
                      <p className="text-s-regular text-current">
                        {dayjs(transaction.createdAt).add(3, 'day') >
                        dayjs() ? (
                          <span className="text-current">
                            Lengkapi sebelum{' '}
                            {dayjs(transaction.createdAt)
                              .add(3, 'day')
                              .locale('id')
                              .format('DD MMM YYYY')}
                          </span>
                        ) : (
                          <span className="text-current">
                            Segera lengkapi manifest
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                <TransactionDetailManifest members={manifest?.results} />
              </div>
            </div>
            {/* Right Sidebar */}
            {statusTahapan !== 'Selesai' && (
              <div className="flex flex-col gap-3 p-4 max-lg:hidden">
                {transaction?.status.slug !== 'waiting-down-payment' &&
                  transaction?.status.slug !== 'canceled-by-user' &&
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
                            className={`${dayjs(transaction?.packageSnapshot?.snapshot?.departureDate).subtract(21, 'day') > dayjs() ? 'bg-warning-100' : 'bg-error-100'} flex items-center justify-center rounded-3xl px-3 py-2 pb-13`}
                          >
                            {dayjs(
                              transaction?.packageSnapshot?.snapshot
                                ?.departureDate
                            ).subtract(21, 'day') > dayjs() ? (
                              <span className="text-warning-700 text-s-regular">
                                Lunasi sebelum{' '}
                                {dayjs(
                                  transaction?.packageSnapshot?.snapshot
                                    ?.departureDate
                                )
                                  .subtract(21, 'day')
                                  .locale('id')
                                  .format('DD MMM YYYY')}
                              </span>
                            ) : (
                              <span className="text-error-700 text-s-regular">
                                {' '}
                                Segera lunasi pembayaran paket!
                              </span>
                            )}
                          </div>
                          <Button
                            className="-mt-13 shadow-[0px_-2px_4.8px_0px_#A4883033]"
                            onClick={() => fetchPaymentStatement(bookingId)}
                            disabled={!isSnapInitialized || loading}
                          >
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
                                  .locale('id')
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

                {statusTahapan === 'Waiting' && (
                  <Button
                    className="border-primary-500 w-full border-2"
                    disabled={!isSnapInitialized || loading}
                    onClick={handleDirectPayment}
                  >
                    <span className="font-medium">Bayar</span>
                  </Button>
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
        </Fragment>
      )}

      <TransactionDetailMobileAction
        bookingCode={transaction?.bookingCode}
        bookingId={bookingId}
        statusTahapan={statusTahapan}
      />

      <Script
        src={SNAP_URL}
        data-client-key={MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onLoad={() => {}}
        onError={() => {}}
      />
    </div>
  )
}
