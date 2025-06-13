/* eslint-disable @typescript-eslint/no-unused-vars */
import DrawerBatalkan from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerBatalkan'
import { ModalFormRefund } from '@/components/pages/my/1-Transaction/Components/FormRefund'
import SuksesDialog from '@/components/pages/my/1-Transaction/Components/SuksesDialog'
import VerificationDialog from '@/components/pages/my/1-Transaction/Components/VerificationDialog'
import { Button } from '@/components/ui/button'
import { useCanceled } from '@/contexts/canceled-package-context'
import { getPaymentStatement, postNextPayment } from '@/services/umrah-service'
import dayjs from 'dayjs'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useRef } from 'react'
export const TransactionDetailMobileAction = ({
  bookingCode,
  statusTahapan,
  bookingId,
  idOrganisasi,
  transaction,
}: {
  bookingCode: string
  statusTahapan: string
  bookingId: any
  idOrganisasi: any
  transaction?: any
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

  const renderActionButton = () => {
    const isCanceled =
      transaction?.status?.slug === 'canceled-by-user' ||
      transaction?.status?.slug === 'canceled-by-travel'

    switch (true) {
      // Case 1: Proses Refund
      case statusTahapan === 'Dibatalkan' &&
        isCanceled &&
        transaction?.isRefundAvailable === true:
        return (
          <Button
            className="w-full py-2"
            onClick={() => setOpenFormRefund(true)}
          >
            Proses Refund
          </Button>
        )

      // Case 2: Refund sedang diproses (disbursement belum disalurkan)
      case statusTahapan === 'Dibatalkan' &&
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
      case statusTahapan === 'Dibatalkan' &&
        isCanceled &&
        transaction?.bookingCanceled?.disbursementUser !== null &&
        transaction?.bookingCanceled?.disbursementUser?.disbursed === true:
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

      default:
        return null
    }
  }
  console.log(transaction)

  return (
    <div className="hidden max-lg:block">
      {statusTahapan == 'Akan Datang' && (
        <div className="fixed right-0 bottom-0 left-0 z-50 flex  h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
          <DrawerBatalkan
            bookingId={bookingId}
            idOrganisasi={idOrganisasi}
            id={transaction?.bookingCode}
          >
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
      {statusTahapan == 'Dibatalkan' && (
        <div className="fixed right-0 bottom-0 left-0 z-50 flex  h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
          {renderActionButton()}
        </div>
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
    </div>
  )
}
