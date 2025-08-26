import { useMemo } from 'react'
import {
  preBookingCreateCheckout,
  preBookingCreateCheckoutUmrahPersonal,
} from '@/services/umrah-service'
import {
  DetailVariant,
  PaymentDetails,
  PreBookingActions,
  SelectedVariant,
} from '@/constant/types/CheckoutProps'
import { PreBookingResponse } from '@/constant/types/PaymentCheckout'
import { RoomType } from '@/contexts/package-variant-context'

interface UsePreBookingActionsProps {
  selectedRoomType: RoomType | null
  selectedVariant: SelectedVariant
  token: string | null
  setPreBookingLoading: (loading: boolean) => void
  referralCode: string
  paymentAmount: number
  setRawInputValue: (value: string) => void
  setPaymentDetails: (details: PaymentDetails[]) => void
  setPreBooking: (booking: PreBookingResponse) => void
  detailVariant: DetailVariant
}

export const usePreBookingActions = ({
  selectedRoomType,
  selectedVariant,
  token,
  setPreBookingLoading,
  referralCode,
  paymentAmount,
  setRawInputValue,
  setPaymentDetails,
  setPreBooking,
  detailVariant,
}: UsePreBookingActionsProps): PreBookingActions => {
  const totalQty = useMemo(() => {
    return (
      (selectedRoomType?.double || 0) +
      (selectedRoomType?.triple || 0) +
      (selectedRoomType?.quad || 0)
    )
  }, [selectedRoomType])

  const isEmptyRoomType = useMemo(() => {
    return (
      (selectedRoomType?.double === 0 ||
        selectedRoomType?.double === undefined) &&
      (selectedRoomType?.triple === 0 ||
        selectedRoomType?.triple === undefined) &&
      (selectedRoomType?.quad === 0 || selectedRoomType?.quad === undefined)
    )
  }, [selectedRoomType])

  const totalMinimumDownPayment = totalQty === 0 ? 0 : paymentAmount * totalQty

  const checkPre = async (): Promise<void> => {
    if (!selectedVariant || !token) return
    setPreBookingLoading(true)

    try {
      let response: any
      if (detailVariant?.isUmrahPersonal) {
        response = await preBookingCreateCheckoutUmrahPersonal({
          packagePersonalId: selectedVariant?.variantId,
          referralCode,
          netAmount: paymentAmount * totalQty,
          double: selectedRoomType?.double || 0,
          triple: selectedRoomType?.triple || 0,
          quad: selectedRoomType?.quad || 0,
        })
      } else {
        response = await preBookingCreateCheckout({
          packageVariantId: selectedVariant?.variantId,
          referralCode,
          netAmount: paymentAmount * totalQty,
          double: selectedRoomType?.double || 0,
          triple: selectedRoomType?.triple || 0,
          quad: selectedRoomType?.quad || 0,
        })
      }

      setRawInputValue(String(response.downPayment))
      setPreBookingLoading(false)
      setPaymentDetails(response.paymentDetails)
      setPreBooking(response)
    } catch (error) {
      setPreBookingLoading(false)
      console.error(error)
    }
  }

  return {
    checkPre,
    totalQty,
    isEmptyRoomType,
    totalMinimumDownPayment,
  }
}
