import { ViewCta } from '@/components/pages/my/5-Banking/constants'
import { toast } from '@/components/ui/sonner'
import { BookingCreateResponse } from '@/constant/types/BookingPembiayaan'
import { PaymentTransaction } from '@/constant/types/PaymentTransaction'
import {
  useChangePaymentMethodBanking,
  useCreateBanking,
} from '@/services/hooks/umrah-service/booking-api'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
interface UseBankingPaymentHandlerProps {
  cta: ViewCta
  submissionId: number
  bookingId?: number
  orderPayment?: PaymentTransaction | null // Data dari useGetOrderPayment
  isOrderPaymentLoading: boolean
}

/**
 * Hook reusable untuk menangani logika pembayaran banking.
 * Mengelola state loading dan alur pembayaran untuk CTA yang berbeda.
 */
export function useBankingPaymentHandler({
  cta,
  submissionId,
  orderPayment,
  bookingId,
  isOrderPaymentLoading,
}: UseBankingPaymentHandlerProps) {
  const router = useRouter()
  const { create: createBanking, isLoading: isCreatingBanking } =
    useCreateBanking()
  const {
    create: changePaymentMethod,
    isLoading: isChangePaymentMethodLoading,
  } = useChangePaymentMethodBanking()

  const isProcessing = isCreatingBanking || isChangePaymentMethodLoading

  const isLoading = useMemo(() => {
    if (cta === 'waiting-payment') return isOrderPaymentLoading
    if (cta === 'ready-to-checkout') return isProcessing
    return false
  }, [cta, isOrderPaymentLoading, isProcessing])

  const handlePayment = async () => {
    if (!window.snap) {
      toast.error('Layanan pembayaran sedang tidak tersedia.')
      return
    }

    try {
      let paymentToken: string | undefined

      if (cta === 'waiting-payment') {
        if (orderPayment?.orderStatus?.name === 'EXPIRED') {
          const response = await changePaymentMethod(submissionId)
          paymentToken = response?.paymentToken
        } else {
          paymentToken = orderPayment?.paymentToken
        }
      } else if (cta === 'ready-to-checkout') {
        const response: BookingCreateResponse | undefined =
          await createBanking(submissionId)
        paymentToken = response?.order?.paymentToken
      }

      if (paymentToken) {
        window.snap.pay(paymentToken, {
          onSuccess: () => router.refresh(),
          onPending: () => router.refresh(),
          onError: () => toast.error('Pembayaran gagal, silakan coba lagi.'),
        })
      }
    } catch (error) {
      console.error('Payment handling failed:', error)
      toast.error('Terjadi kesalahan saat memproses pembayaran.')
    }
  }

  const changePayment = async () => {
    if (!window.snap) {
      toast.error('Layanan pembayaran sedang tidak tersedia.')
      return
    }

    try {
      const response = await changePaymentMethod(bookingId)

      if (response?.paymentToken) {
        window.snap.pay(response?.paymentToken, {
          onSuccess: () => router.refresh(),
          onPending: () => router.refresh(),
          onError: () => toast.error('Pembayaran gagal, silakan coba lagi.'),
        })
      }
    } catch (error) {
      console.error('Payment handling failed:', error)
      toast.error('Terjadi kesalahan saat memproses pembayaran.')
    }
  }

  return { handlePayment, changePayment, isLoading }
}
