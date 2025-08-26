import { toast } from '@/components/ui/sonner'
import { LINKAJA_MAX_LIMIT } from '@/constant/env'
import {
  DetailVariant,
  PaymentActions,
  SelectedVariant,
} from '@/constant/types/CheckoutProps'
import { getLinkAjaTiering } from '@/constant/types/LinkAja'
import { PreBookingResponse } from '@/constant/types/PaymentCheckout'
import { PaymentMethod } from '@/constant/types/PaymentMethod'
import { RoomType } from '@/contexts/package-variant-context'
import {
  bookingCheckout,
  bookingCheckoutUmrahPersonal,
} from '@/services/umrah-service'

interface UsePaymentActionsProps {
  rawInputValue: string
  setRawInputValue: (value: string) => void
  sliderValue: number
  setSliderValue: (value: number) => void
  paymentAmount: number
  setPaymentAmount: (amount: number) => void
  totalQty: number
  preBooking: PreBookingResponse
  totalPrice: number
  debounceTimerRef: React.MutableRefObject<any>
  pendingValueRef: React.MutableRefObject<number | null>
  setShouldRunCheckPre: (should: boolean) => void
  selectedVariant: SelectedVariant
  referralCode: string
  selectedRoomType: RoomType | null
  setLoading: (loading: boolean) => void
  detailVariant: DetailVariant
  setPaymentToken: (token?: string) => void
  handlePushEvent: (eventName: string) => void
  router: any
}

export const usePaymentActions = ({
  rawInputValue,
  setRawInputValue,
  sliderValue,
  setSliderValue,
  paymentAmount,
  setPaymentAmount,
  totalQty,
  preBooking,
  totalPrice,
  debounceTimerRef,
  pendingValueRef,
  setShouldRunCheckPre,
  selectedVariant,
  referralCode,
  selectedRoomType,
  setLoading,
  detailVariant,
  setPaymentToken,
  handlePushEvent,
  router,
}: UsePaymentActionsProps): PaymentActions => {
  const isLinkAja =
    typeof window !== 'undefined' &&
    sessionStorage?.getItem('isLinkAja') === 'true'

  const formatNumber = (value: string): string => {
    const numericValue = value.replace(/\D/g, '')
    if (!numericValue) return ''
    return parseInt(numericValue, 10).toLocaleString('id-ID')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value
    const numeric = input.replace(/\D/g, '')
    setRawInputValue(numeric)
  }

  const handleSliderChange = (e: any) => {
    // Store the value in a ref instead of state to avoid render loops
    const value = parseInt(e.target.value)
    pendingValueRef.current = value

    // Update UI immediately for better responsiveness
    setSliderValue(value)

    // Clear any existing timer for API calls/expensive operations
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer only for expensive operations (API calls, etc)
    debounceTimerRef.current = setTimeout(() => {
      // Update payment amount if we have jamaah
      if (totalQty > 0) {
        const perJamaahAmount = Math.ceil(value / totalQty)
        if (perJamaahAmount !== paymentAmount) {
          setPaymentAmount(perJamaahAmount)
          setShouldRunCheckPre(true)
          // Trigger checkPre only after settling on a value
          // if (!checkPreCalled.current) {
          //   checkPreCalled.current = true
          //   checkPre().finally(() => {
          //     checkPreCalled.current = false
          //   })
          // }
        }
      }

      pendingValueRef.current = null
    }, 500) // Reduced to 100ms for better responsiveness
  }

  const sliderStep = (): number => {
    const max =
      totalQty > 0
        ? isLinkAja
          ? preBooking?.totalPrice >
            LINKAJA_MAX_LIMIT - getLinkAjaTiering(Number(rawInputValue))
            ? LINKAJA_MAX_LIMIT - getLinkAjaTiering(Number(rawInputValue))
            : preBooking?.totalPrice
          : preBooking?.totalPrice || totalPrice * totalQty
        : 0
    const distanceToMax = max - sliderValue

    if (distanceToMax <= 0) return 1
    return distanceToMax < 500_000 ? distanceToMax : 500_000
  }

  const handleCheckout = async (
    paymentMethod?: PaymentMethod
  ): Promise<void> => {
    const netAmount = Math.min(
      paymentAmount * totalQty,
      preBooking?.downPayment
    )
    const payload = {
      packageVariantId: selectedVariant?.variantId,
      referralCode,
      netAmount,
      double: selectedRoomType?.double || 0,
      triple: selectedRoomType?.triple || 0,
      quad: selectedRoomType?.quad || 0,
      paymentMethod,
    }

    const payloadUmrahPersonal = {
      packagePersonalId: selectedVariant?.variantId,
      referralCode,
      netAmount,
      double: selectedRoomType?.double || 0,
      triple: selectedRoomType?.triple || 0,
      quad: selectedRoomType?.quad || 0,
    }

    setLoading(true)
    try {
      const res = detailVariant?.isUmrahPersonal
        ? await bookingCheckoutUmrahPersonal(payloadUmrahPersonal)
        : await bookingCheckout(payload)

      setPaymentToken(res?.data.order.paymentToken)
      setLoading(false)

      handlePushEvent('submit_booking')

      if (paymentMethod?.linkAja) {
        window.location.href = res?.data.order.paymentLink
        return
      } else {
        window.snap.pay(res?.data.order.paymentToken, {
          onSuccess: async () => {
            router.push(`/my/transaction`)
          },
          onPending: async () => {
            router.push(`/my/need-payment`)
          },
          onError: (error: any) => {
            console.log('Payment error', error)
          },
          onClose: () => {
            router.push(`/my/need-payment`)
          },
        })
      }

      localStorage.removeItem('referralCode')
    } catch (error) {
      toast.error('Gagal melakukan checkout [500]')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    formatNumber,
    handleInputChange,
    handleSliderChange,
    sliderStep,
    handleCheckout,
  }
}
