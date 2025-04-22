import { ChecklistCircleActive } from '@/components/icons/checkbox'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import { PaymentTransaction } from '@/constant/types/PaymentTransaction'
import { formatCurrency } from '@/lib/utils'
import {
  getPaymentStatement,
  getPaymentTransaction,
} from '@/services/umrah-service'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'

export interface TransactionCardPayment {
  noLabelNotif?: boolean
  noAmountLeft?: boolean
  isPaidOff: boolean
  bookingId: string
}

function renderLunas(
  isPaidOff: boolean,
  loading: boolean,
  transaction: PaymentTransaction
) {
  if (loading) {
    return <p className="text-s-regular text-warning-700 ">...</p>
  }
  return isPaidOff ? (
    <div className="bg-success-100 w-fit rounded-full px-3 py-1">
      <div className="flex items-center gap-1">
        <ChecklistCircleActive />
        <p className="text-s-regular text-success-700 ">
          Lunas pada{' '}
          {dayjs(transaction?.createdAt)
            .locale('id')
            .format('DD MMM YYYY,HH:mm')}
        </p>
      </div>
    </div>
  ) : (
    <div className="bg-warning-100 mt-1 w-fit rounded-full px-3 py-1">
      <div className="text-warning-700 flex items-center gap-1">
        <InfoCircleIcon />
        <p className="text-s-regular text-warning-700 ">
          Segera lunasi pembayaran kamu
        </p>
      </div>
    </div>
  )
}

export default function TransactionCardPayment({
  noLabelNotif,
  isPaidOff,
  bookingId,
  noAmountLeft,
}: TransactionCardPayment) {
  const [loadingStatement, setLoadingStatement] = useState(false)
  const [paymentStatement, setPaymentStatement] = useState<any>(null)
  const [loadingPaymentTransaction, setLoadingPaymentTransaction] =
    useState(false)
  const [paymentTransaction, setPaymentTransaction] = useState<any>(null)

  const fetchPaymentStatement = useCallback(async () => {
    setLoadingStatement(true)

    try {
      // Build query parameters
      const response = await getPaymentStatement(bookingId)

      // Update state with response data
      setPaymentStatement(response)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    } finally {
      setLoadingStatement(false)
    }
  }, [bookingId])

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

  useEffect(() => {
    fetchPaymentStatement()
    if (isPaidOff) {
      fetcPaymentTransaction()
    }
  }, [fetchPaymentStatement, fetcPaymentTransaction, noAmountLeft, isPaidOff])

  return (
    !noAmountLeft && (
      <div className="flex flex-col border-t border-neutral-100 pt-4 max-lg:hidden md:border-t-0 md:border-l md:pt-0 md:pl-4">
        <p className="text-m-medium text-neutral-500">Sisa Pembayaran</p>
        <p className="text-l-semibold">
          {isPaidOff
            ? '-'
            : loadingStatement
              ? '...'
              : paymentStatement
                ? formatCurrency(paymentStatement.remainingPayment)
                : '-'}
        </p>
        {!noLabelNotif &&
          renderLunas(isPaidOff, loadingPaymentTransaction, paymentTransaction)}
      </div>
    )
  )
}
