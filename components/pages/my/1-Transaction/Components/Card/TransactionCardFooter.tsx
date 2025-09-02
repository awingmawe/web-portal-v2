/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { ChecklistCircle, ChecklistCircle2 } from '@/components/icons/checkbox'
import { TransactionDetail } from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetail'
import DrawerPaymentLinkAja from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerPaymentLinkAja'
import { ModalFormRefund } from '@/components/pages/my/1-Transaction/Components/FormRefund'
import { BatalkanPesanan } from '@/components/pages/my/1-Transaction/Components/Modal/ModalBatalkanPesanan'

import ModalPengembalianDanaDetail from '@/components/pages/my/1-Transaction/Components/Modal/modalPengembalianDanaDetail'
import ModalSuccessCanceled from '@/components/pages/my/1-Transaction/Components/Modal/modalSukses'
import SuksesDialog from '@/components/pages/my/1-Transaction/Components/SuksesDialog'
import VerificationDialog from '@/components/pages/my/1-Transaction/Components/VerificationDialog'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  CALL_CENTER,
  MIDTRANS_CLIENT_KEY,
  SNAP_URL,
  STATUS_BOOKING,
} from '@/constant/env'
import { useCanceled } from '@/contexts/canceled-package-context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { formatCurrency } from '@/lib/utils'
import {
  getPaymentStatement,
  getPaymentTransaction,
  postNextPayment,
} from '@/services/umrah-service'
import dayjs from 'dayjs'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Fragment, useCallback, useEffect, useState } from 'react'

export interface TransactionCardFooter {
  detailOnly?: boolean
  isCompletedManifest: boolean
  isManifestCommitted: boolean
  isPaidOff: boolean
  showDpButton?: boolean
  bookingId: string
  id: string
  status: string
  statusTahapanDetail: string
  paymentAmount?: number
  organizationInstanceId?: any
  fetchTransactions?: any
  transaction?: any
  currency: string
  remainingHajjPayment: number
}

export default function TransactionCardFooter({
  detailOnly,
  status,
  statusTahapanDetail,
  isCompletedManifest,
  isManifestCommitted,
  isPaidOff,
  showDpButton,
  bookingId,
  id,
  paymentAmount,
  organizationInstanceId,
  fetchTransactions,
  transaction,
  currency,
  remainingHajjPayment,
}: TransactionCardFooter) {
  const isLinkAja = sessionStorage.getItem('isLinkAja') === 'true'
  const { lg } = useTailwindBreakpoint()
  const [loadingPaymentTransaction, setLoadingPaymentTransaction] =
    useState(false)
  const [paymentTransaction, setPaymentTransaction] = useState<any>(null)
  const [snapReady, setSnapReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openDrawerPaymentLinkAja, setOpenDrawerPaymentLinkAja] =
    useState(false)
  const router = useRouter()
  const fetcPaymentTransaction = useCallback(async () => {
    setLoadingPaymentTransaction(true)

    try {
      // Build query parameters
      const response = await getPaymentTransaction(bookingId)

      // Update state with response data
      setPaymentTransaction(response)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    } finally {
      setLoadingPaymentTransaction(false)
    }
  }, [bookingId])

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
          // router.replace('/my/transaction') // replace & refresh
          window.location.reload()
        },
        onPending: async (result: any) => {
          // console.log('Payment pending', result)
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
    } catch (err) {
      console.error('Error fetching transactions:', err)
    } finally {
    }
  }, [])

  useEffect(() => {
    if (showDpButton) {
      fetcPaymentTransaction()
    }
  }, [fetcPaymentTransaction, showDpButton])

  const {
    open,
    setOpen,
    openBatalkan,
    setOpenBatalkan,
    openModalRefund,
    setOpenModalRefund,
    openModalSukses,
    setOpenModalSukses,
    dataRefundPolicy,
    setDataRefundPolicy,
    parsedContent,
    setParsedContent,
    reason,
    setReason,
    description,
    setDescription,
    openFormRefund,
    setOpenFormRefund,
    openVerifikasiEmail,
    setOpenVerifikasiEmail,
    setSelectedBank,
    selectedBank,
    setAccountNumber,
    accountNumber,
    setAccountName,
    accountName,
    openSuksesRefund,
    setOpenSuksesRefund,
  } = useCanceled()
  const renderActionButton = () => {
    const isCanceled =
      status === 'canceled-by-user' || status === 'canceled-by-travel'

    switch (true) {
      // Case 1: Proses Refund
      case statusTahapanDetail === 'Dibatalkan' &&
        isCanceled &&
        transaction?.isRefundAvailable === true:
        return (
          <Button
            variant="outline"
            className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
            onClick={() => setOpenFormRefund(true)}
          >
            Proses Refund
          </Button>
        )

      // Case 2: Refund sedang diproses (disbursement belum disalurkan)
      case statusTahapanDetail === 'Dibatalkan' &&
        isCanceled &&
        transaction?.bookingCanceled?.disbursementUser !== null &&
        transaction?.bookingCanceled?.disbursementUser?.disbursed === false:
        return (
          <div className="flex items-center gap-2 rounded-full bg-[#FFF7DC] px-4 py-2 text-sm text-[#A17800]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.75 15h-1.5v-1.5h1.5V17zm0-3h-1.5V7h1.5v7z" />
            </svg>
            <span>
              Permintaan refund sedang dalam proses, harap tunggu 15–30 hari
              kerja
            </span>
          </div>
        )
      // Case 2: Refund sedang diproses (disbursement sudah disalurkan)
      case statusTahapanDetail === 'Dibatalkan' &&
        isCanceled &&
        transaction?.bookingCanceled?.disbursementUser !== null &&
        transaction?.bookingCanceled?.disbursementUser?.disbursed === true:
        return (
          <div className="flex items-center gap-2 rounded-full bg-[#C1FFE9] px-4 py-2 text-sm text-[#007C59]">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#007C59]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17 4.83 12 3.41 13.41 9 19 21 7 19.59 5.59z" />
              </svg>
            </div>
            <span>
              Dana telah berhasil di refund pada{' '}
              {dayjs(
                transaction?.bookingCanceled?.disbursementUser?.modifiedAt
              ).format('DD MMMM YYYY, HH:mm')}
            </span>
          </div>
        )
      // Case 3: Selesai manifest tapi belum lunas
      case statusTahapanDetail !== 'Dibatalkan' &&
        isCompletedManifest &&
        !isPaidOff:
        return (
          <>
            {isLinkAja ? (
              <Button
                className="border-primary-500 mt-0 w-full border-2 px-8 py-3 text-nowrap"
                variant="outline"
                disabled={loadingPaymentTransaction}
                onClick={() => setOpenDrawerPaymentLinkAja(true)}
              >
                Bayar Pelunasan
              </Button>
            ) : (
              <Button
                className="border-primary-500 mt-0 w-full border-2 px-8 py-3 text-nowrap"
                variant="outline"
                disabled={loadingPaymentTransaction}
                onClick={() => fetchPaymentStatement(bookingId)}
              >
                Bayar Pelunasan
              </Button>
            )}
            <Button
              className="disabled mt-3 w-full border-2 border-neutral-200 px-8 py-3 font-medium text-nowrap text-neutral-200"
              variant="outline"
              disabled
            >
              <ChecklistCircle2 />
              Data Jemaah Lengkap
            </Button>
          </>
        )

      // Case 4: Sudah lunas, tapi belum manifest
      case statusTahapanDetail !== 'Dibatalkan' &&
        !isCompletedManifest &&
        isPaidOff:
        return (
          <>
            <Link href={`/manifest/${bookingId}`}>
              <Button className="w-full px-8 py-3 text-nowrap">
                Lengkapi Data Jemaah
              </Button>
            </Link>
            <Button
              className="disabled mt-3 w-full border-2 border-neutral-200 px-8 py-3 font-medium text-nowrap text-neutral-200"
              variant="outline"
              disabled
            >
              <ChecklistCircle2 />
              Pelunasan
            </Button>
          </>
        )

      // Case 5: Belum lunas dan belum manifest
      case statusTahapanDetail !== 'Dibatalkan' &&
        !isCompletedManifest &&
        !isPaidOff:
        return (
          <>
            <Link href={`/manifest/${bookingId}`}>
              <Button className="w-full px-8 py-3 text-nowrap">
                Lengkapi Data Jemaah
              </Button>
            </Link>
            {isLinkAja ? (
              <Button
                className="border-primary-500 mt-0 w-full border-2 px-8 py-3 text-nowrap"
                variant="outline"
                disabled={loadingPaymentTransaction}
                onClick={() => setOpenDrawerPaymentLinkAja(true)}
              >
                Bayar Pelunasan
              </Button>
            ) : (
              <Button
                className="border-primary-500 mt-3 w-full border-2 px-8 py-3 text-nowrap"
                variant="outline"
                disabled={loadingPaymentTransaction}
                onClick={() => fetchPaymentStatement(bookingId)}
              >
                Bayar Pelunasan
              </Button>
            )}
          </>
        )

      default:
        return null
    }
  }

  return (
    <Fragment>
      <div className="flex items-center gap-2 max-lg:hidden">
        <Button
          className="text-s-regular mr-1 px-3 font-medium text-nowrap text-gray-900"
          variant="ghost"
          onClick={() => setOpen(true)}
        >
          Lihat Detail Pesanan
        </Button>
        {(status === 'canceled-by-user' || status === 'canceled-by-travel') &&
          transaction.isRefundAvailable === true && (
            <Button
              variant="outline"
              className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
              onClick={() => {
                setOpenFormRefund(true)
              }}
            >
              Proses Refund
            </Button>
          )}
        {!detailOnly && (
          <Fragment>
            {status === 'waiting-cancellation' ? null : status ===
              'expired' ? null : isPaidOff ? (
              <Button
                variant="outline"
                className="w-full rounded-full border-2 px-8 py-3 text-nowrap"
                disabled
              >
                <ChecklistCircle />
                Pelunasan
              </Button>
            ) : (
              status !== 'waiting-approval' &&
              status !== STATUS_BOOKING.WAITING_FOR_BILL &&
              status !== STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION &&
              status !== STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ && (
                <div>
                  {isLinkAja ? (
                    <Button
                      className="border-primary-500 mt-0 w-full border-2 px-8 py-3 text-nowrap"
                      variant="outline"
                      disabled={loadingPaymentTransaction}
                      onClick={() => setOpenDrawerPaymentLinkAja(true)}
                    >
                      Bayar Pelunasan
                    </Button>
                  ) : (
                    <Button
                      className="border-primary-500 mt-0 w-full border-2 px-8 py-3 text-nowrap"
                      variant="outline"
                      disabled={loadingPaymentTransaction}
                      onClick={() => fetchPaymentStatement(bookingId)}
                    >
                      Bayar Pelunasan
                    </Button>
                  )}
                </div>
              )
            )}

            {/* {isPaidOff ? (
              <Button
                variant="outline"
                className="w-full rounded-full border-2 px-8 py-3 text-nowrap"
                disabled
              >
                <ChecklistCircle />
                Pelunasan
              </Button>
            ) : (
              status !== 'waiting-approval' && (
                <Button
                  variant="outline"
                  className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
                  onClick={() => {
                    fetchPaymentStatement(bookingId)
                  }}
                >
                  Bayar Pelunasan
                </Button>
              )
            )} */}

            {!isManifestCommitted &&
              ![
                'waiting-cancellation',
                'expired',
                'waiting-approval',
                STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION,
                STATUS_BOOKING.WAITING_FOR_BILL,
                STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ,
              ].includes(status) && (
                <Link href={`/manifest/${bookingId}`}>
                  <Button className="w-full px-4 py-3 text-nowrap">
                    Lengkapi Data Jemaah
                  </Button>
                </Link>
              )}
            {(status === 'approved' ||
              status === 'waiting-approval' ||
              status === 'waiting-down-payment' ||
              status === STATUS_BOOKING.WAITING_FOR_BILL ||
              status === STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION) && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="cursor-pointer !rounded-md border border-neutral-900 p-1"
                    variant={'outline'}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="rounded-2xl p-0 px-1">
                  <div className="flex flex-col divide-y">
                    <Link
                      href={`https://wa.me/${CALL_CENTER}?text=Assalamualaikum,+maaf+saya+ingin+membatalkan+pesanan+saya+dengan+kode+${id}`}
                      className="cursor-pointer p-3 hover:bg-gray-50"
                      target="_blank"
                      // onClick={() => setOpenBatalkan(true)}
                    >
                      <p className="text-m-regular text-error-500">
                        Batalkan Pesanan
                      </p>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </Fragment>
        )}

        {(showDpButton ||
          status === STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ) && (
          // <a
          //   href={paymentTransaction ? paymentTransaction.paymentLink : ''}
          //   target="_blank"
          // >
          <>
            <Button
              className="w-full px-8 py-3 text-nowrap"
              disabled={loadingPaymentTransaction || loading}
              onClick={async () => {
                setLoading(true)

                try {
                  if (window.snap) {
                    window.snap.pay(paymentTransaction?.paymentToken, {
                      onSuccess: async () => {
                        // router.replace('/my/transaction') // replace & refresh
                        window.location.reload()
                      },
                      onPending: async () => {
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
                    setLoading(false)
                  }
                } catch (error) {
                  console.log(error)
                } finally {
                  setLoading(false)
                }
              }}
            >
              Bayar Uang Muka
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="cursor-pointer !rounded-md border border-neutral-900 p-1"
                  variant={'outline'}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="rounded-2xl p-0 px-1">
                <div className="flex flex-col divide-y">
                  <Link
                    href={`https://wa.me/${CALL_CENTER}?text=Assalamualaikum,+maaf+saya+ingin+membatalkan+pesanan+saya+dengan+kode+${id}`}
                    className="cursor-pointer p-3 hover:bg-gray-50"
                    target="_blank"
                    // onClick={() => setOpenBatalkan(true)}
                  >
                    <p className="text-m-regular text-error-500">
                      Batalkan Pesanan
                    </p>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </>
          // </a>
        )}

        {/* {renderCancelAction()} */}
      </div>
      <div className="hidden max-lg:block">
        {status === 'waiting-down-payment' ||
        status === STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs-medium text-neutral-500">Perlu Dibayar</p>
              <p className="text-s-semibold text-neutral-900">
                {formatCurrency(
                  status === STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ
                    ? remainingHajjPayment
                    : paymentAmount,
                  currency
                )}
              </p>
            </div>
            <div>
              {lg ? (
                <Link href={`/my/transaction/${bookingId}`}>
                  <Button
                    variant="ghost"
                    className="px-3 font-medium text-neutral-900"
                  >
                    Lihat Detail
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  className="px-3 font-medium text-neutral-900"
                  onClick={() => setOpen(true)}
                >
                  Lihat Detail
                </Button>
              )}
              <Link
                href={paymentTransaction ? paymentTransaction.paymentLink : ''}
              >
                <Button className="px-5 py-2 font-medium text-neutral-900">
                  Bayar
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <Fragment>{renderActionButton()}</Fragment>
        )}
      </div>

      <Script
        src={SNAP_URL}
        data-client-key={MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onLoad={() => setSnapReady(true)}
        onError={() => {}}
      />
      {open && (
        <TransactionDetail
          open={open}
          onOpenChange={setOpen}
          bookingId={bookingId}
          statusTahapan={statusTahapanDetail}
          setOpenBatalkan={setOpenBatalkan}
        />
      )}
      {openBatalkan && (
        <BatalkanPesanan
          open={openBatalkan}
          bookingId={bookingId}
          onOpenChange={setOpenBatalkan}
          setParsedContent={setParsedContent}
          setDataRefundPolicy={setDataRefundPolicy}
          organizationInstanceId={organizationInstanceId}
          setOpenModalRefund={setOpenModalRefund}
          setDescription={setDescription}
          description={description}
          setReason={setReason}
          reason={reason}
        />
      )}
      {openModalRefund && (
        <ModalPengembalianDanaDetail
          open={openModalRefund}
          openBatalkan={setOpenBatalkan}
          onOpenChange={setOpenModalRefund}
          dataRefundPolicy={dataRefundPolicy}
          reason={reason}
          setDescription={setDescription}
          setReason={setReason}
          description={description}
          bookingId={bookingId}
          parsedContent={parsedContent}
          setOpenModalSukses={setOpenModalSukses}
        />
      )}
      {openModalSukses && (
        <ModalSuccessCanceled
          open={openModalSukses}
          onOpenChange={setOpenModalSukses}
          fetchTransactions={fetchTransactions}
        />
      )}
      {openFormRefund && (
        <ModalFormRefund
          open={openFormRefund}
          onOpenChange={setOpenFormRefund}
          setOpenVerifikasiEmail={setOpenVerifikasiEmail}
          setSelectedBank={setSelectedBank}
          selectedBank={selectedBank}
          setAccountNumber={setAccountNumber}
          accountNumber={accountNumber}
          setAccountName={setAccountName}
          accountName={accountName}
        />
      )}
      {openVerifikasiEmail && (
        <VerificationDialog
          open={openVerifikasiEmail}
          onOpenChange={setOpenVerifikasiEmail}
          selectedBank={selectedBank}
          accountNumber={accountNumber}
          accountName={accountName}
          transaction={transaction}
          setOpenSuksesRefund={setOpenSuksesRefund}
        />
      )}
      {openSuksesRefund && (
        <SuksesDialog
          open={openSuksesRefund}
          onOpenChange={setOpenSuksesRefund}
        />
      )}
      <DrawerPaymentLinkAja
        open={openDrawerPaymentLinkAja}
        onOpenChange={setOpenDrawerPaymentLinkAja}
        bookingId={bookingId}
      />
    </Fragment>
  )
}
