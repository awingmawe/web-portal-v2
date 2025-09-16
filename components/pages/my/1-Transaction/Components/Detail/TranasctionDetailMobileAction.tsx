'use client'
import DrawerBatalkan from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerBatalkan'
import DrawerPaymentLinkAja from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerPaymentLinkAja'
import { ModalFormRefund } from '@/components/pages/my/1-Transaction/Components/FormRefund'
import TransactionActionButtonHajj from '@/components/pages/my/1-Transaction/Components/PriceConfirmationHajj/ActionButtonHajj'
import SuksesDialog from '@/components/pages/my/1-Transaction/Components/SuksesDialog'
import VerificationDialog from '@/components/pages/my/1-Transaction/Components/VerificationDialog'
import { Button } from '@/components/ui/button'
import { PACKAGE_TYPE, STATUS_BOOKING } from '@/constant/env'
import { useCanceled } from '@/contexts/canceled-package-context'
import { getPaymentStatement, postNextPayment } from '@/services/umrah-service'
import dayjs from 'dayjs'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

export const TransactionDetailMobileAction = ({
  statusTahapan,
  bookingId,
  idOrganisasi,
  transaction,
  paymentLink,
  paymentToken,
}: {
  bookingCode: string
  statusTahapan: string
  bookingId: any
  idOrganisasi: any
  transaction?: any
  paymentLink: string
  paymentToken: string
}) => {
  const [isLinkAja, setIsLinkAja] = useState(false)
  const [openDrawerPaymentLinkAja, setOpenDrawerPaymentLinkAja] =
    useState(false)

  const {
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLinkAja(sessionStorage.getItem('isLinkAja') === 'true')
    }
  }, [])

  // Status validation functions (matching TransactionCardFooter)
  const isCanceled = () => {
    return (
      transaction?.status?.slug === 'canceled-by-user' ||
      transaction?.status?.slug === 'canceled-by-travel'
    )
  }

  const isDibatalkan = () => {
    return statusTahapan === 'Dibatalkan'
  }

  const isRefundAvailable = () => {
    return transaction?.isRefundAvailable === true
  }

  const isRefundInProcess = () => {
    if (!transaction?.bookingCanceled?.disbursementUser) return false
    return transaction.bookingCanceled.disbursementUser.disbursed === false
  }

  const isRefundCompleted = () => {
    if (!transaction?.bookingCanceled?.disbursementUser) return false
    return transaction.bookingCanceled.disbursementUser.disbursed === true
  }

  const isWaitingStatus = () => {
    return (
      (transaction?.status?.slug === 'waiting-approval' &&
        transaction?.packageSnapshot?.snapshot?.package?.packageType ===
          PACKAGE_TYPE.HAJJ) ||
      transaction?.status?.slug === STATUS_BOOKING.WAITING_FOR_BILL ||
      transaction?.status?.slug === STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION ||
      (transaction?.isManifestCommitted && transaction?.isPaidOff)
    )
  }

  const isWaitingHajjStatus = () => {
    return (
      statusTahapan === 'Waiting Hajj' ||
      transaction?.status?.slug === 'waiting-down-payment'
    )
  }

  const shouldShowMainActionButtons = () => {
    const excludedStatuses = [
      STATUS_BOOKING.WAITING_DOWN_PAYMENT_UMRAH,
      STATUS_BOOKING.WAITING_FOR_BILL,
      STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION,
      'waiting-approval',
      'canceled-by-user',
      'canceled-by-travel',
      'expired',
    ]
    return !excludedStatuses.includes(transaction?.status.slug)
  }

  const shouldShowRefundActions = () => {
    return isDibatalkan()
  }

  // API functions
  const fetchPaymentStatement = useCallback(async (id: any) => {
    try {
      // Build query parameters
      const response = await getPaymentStatement(id)
      const payload = {
        amount: response.remainingPayment,
      }
      const responseNext = await postNextPayment(id, payload)

      const paymentTokenValidation = paymentToken
        ? paymentToken
        : responseNext?.paymentToken
      window.snap.pay(paymentTokenValidation, {
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
          window.location.reload()
          // router.push(`/my/need-payment`)
          // Additional logic on close
        },
      })
    } catch (err) {
      console.error('Error fetching transactions:', err)
    } finally {
    }
  }, [])

  // Render functions
  const renderRefundStatus = () => {
    if (isDibatalkan() && isCanceled() && isRefundAvailable()) {
      return (
        <Button className="w-full py-2" onClick={() => setOpenFormRefund(true)}>
          Proses Refund
        </Button>
      )
    }

    if (isDibatalkan() && isCanceled() && isRefundInProcess()) {
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
            Permintaan refund sedang dalam proses, harap tunggu 15–30 hari kerja
          </span>
        </div>
      )
    }

    if (isDibatalkan() && isCanceled() && isRefundCompleted()) {
      return (
        <div className="flex w-full items-center gap-2 rounded-full bg-[#C1FFE9] px-4 py-2 text-sm text-[#007C59]">
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
    }

    return null
  }

  const renderPaymentButton = () => {
    if (isLinkAja) {
      return (
        <Button
          className="w-full py-2"
          onClick={() => setOpenDrawerPaymentLinkAja(true)}
        >
          Bayar Pelunasan
        </Button>
      )
    }

    return (
      <div className="w-full">
        <Button
          className="w-full py-2"
          disabled={transaction?.isPaidOff}
          onClick={() => {
            fetchPaymentStatement(bookingId)
          }}
        >
          Bayar Pelunasan
        </Button>
      </div>
    )
  }

  const renderMainActionButtons = () => {
    return (
      <div className="fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
        <DrawerBatalkan
          bookingId={bookingId}
          idOrganisasi={idOrganisasi}
          id={transaction?.bookingCode}
          status={transaction?.status?.slug}
        >
          <Button
            className="!rounded-lg border-2 border-neutral-900 px-1 py-1"
            variant="outline"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DrawerBatalkan>
        {!transaction?.isPaidOff && renderPaymentButton()}

        {!transaction?.isManifestCommitted && (
          <Link href={`/manifest/${bookingId}`} className="w-full">
            <Button className="w-full py-2">Lengkapi Data Jemaah</Button>
          </Link>
        )}
      </div>
    )
  }

  const renderCancelButton = () => (
    <DrawerBatalkan
      bookingId={bookingId}
      idOrganisasi={idOrganisasi}
      id={transaction?.bookingCode}
      status={transaction?.status?.slug}
    >
      <Button className="border-error-500 w-full py-2" variant="outline">
        Batalkan Pesanan
      </Button>
    </DrawerBatalkan>
  )

  const renderHajjActions = () => {
    return (
      <div className="fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
        {renderCancelButton()}
        {paymentLink ? (
          <Button
            className="w-full py-2"
            disabled={transaction?.isPaidOff}
            onClick={() => {
              fetchPaymentStatement(bookingId)
            }}
          >
            Bayar
          </Button>
        ) : (
          <TransactionActionButtonHajj transaction={transaction} />
        )}
      </div>
    )
  }

  const renderRefundActions = () => {
    const refundStatus = renderRefundStatus()
    if (!refundStatus) return null

    return (
      <div className="fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
        {refundStatus}
      </div>
    )
  }

  return (
    <div className="hidden max-lg:block">
      {isLinkAja && JSON.stringify(isLinkAja)}

      {shouldShowMainActionButtons() && renderMainActionButtons()}

      {isWaitingStatus() && renderCancelButton()}

      {isWaitingHajjStatus() && renderHajjActions()}

      {shouldShowRefundActions() && renderRefundActions()}

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
    </div>
  )
}
