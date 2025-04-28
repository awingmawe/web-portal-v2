/* eslint-disable @typescript-eslint/no-unused-vars */
import TransactionDetailContent from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailContent'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { MIDTRANS_CLIENT_KEY, SNAP_URL } from '@/constant/env'
import {
  getManifestDetail,
  getPaymentStatement,
  getPaymentTransaction,
  getTransactionDetail,
  postNextPayment,
} from '@/services/umrah-service'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
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
  const [paymentTransaction, setPaymentTransaction] = useState<any>(null)
  const [manifest, setManifest] = useState<any>(null)
  const [snapReady, setSnapReady] = useState(false)
  const router = useRouter()

  const fetchTransactions = useCallback(async () => {
    setLoading(true)

    try {
      // Build query parameters
      // Fetch data
      const transactionDetail = await getTransactionDetail(bookingId)
      const paymentStatement = await getPaymentStatement(bookingId)
      const paymentTransaction = await getPaymentTransaction(bookingId)
      const manifest = await getManifestDetail({
        bookingId,
        page: 1,
        size: 100,
      })

      // Update state with response data
      setTransaction(transactionDetail)
      setPaymentStatement(paymentStatement)
      setPaymentTransaction(paymentTransaction)
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

  const fetchPaymentStatement = useCallback(async (id: any) => {
    try {
      // Build query parameters
      const response = await getPaymentStatement(id)
      const payload = {
        amount: response.remainingPayment,
      }
      onOpenChange(false)
      const responseNext = await postNextPayment(id, payload)
      window.snap.pay(responseNext?.paymentToken, {
        onSuccess: async (result: any) => {
          console.log(result)
          // router.replace('/my/transaction') // replace & refresh
          window.location.reload()
        },
        onPending: async (result: any) => {
          console.log('Payment pending', result)
          router.push(`/my/need-payment`)
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
      console.log(responseNext)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    } finally {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl gap-0 overflow-hidden rounded-3xl border-0 p-0">
        <DialogTitle className="hidden px-5">Detail Transaksi</DialogTitle>
        <TransactionDetailContent
          bookingId={bookingId}
          statusTahapan={statusTahapan}
          isFixedLoading={true}
        />

        <div className={`${loading ? 'block' : 'hidden'} h-[700px]`}></div>
      </DialogContent>
      <Script
        src={SNAP_URL}
        data-client-key={MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onLoad={() => setSnapReady(true)}
        onError={() => {}}
      />
    </Dialog>
  )
}
