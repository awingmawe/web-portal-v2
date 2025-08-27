'use client'

import { CheckoutContextValue } from '@/constant/types/CheckoutProps'
import { useCheckoutEffects } from '@/hooks/checkout-hooks/useCheckoutEffect'
import { useCheckoutState } from '@/hooks/checkout-hooks/useCheckoutState'
import { useEventTrackerCheckout } from '@/hooks/checkout-hooks/useEventTracker'
import { useJamaahActions } from '@/hooks/checkout-hooks/useJamaahAction'
import { useLegalActions } from '@/hooks/checkout-hooks/useLegalAction'
import { usePaymentActions } from '@/hooks/checkout-hooks/usePaymentAction'
import { usePreBookingActions } from '@/hooks/checkout-hooks/usePreBookingAction'
import { useReferralActions } from '@/hooks/checkout-hooks/useReferralAction'
import { createContext, useContext } from 'react'

export const CheckoutContextV2 = createContext<CheckoutContextValue | null>(
  null
)

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const state = useCheckoutState()

  const preBookingActions = usePreBookingActions({
    selectedRoomType: state.selectedRoomType,
    selectedVariant: state.selectedVariant ?? null,
    token: state.token,
    setPreBookingLoading: state.setPreBookingLoading,
    referralCode: state.referralCode,
    paymentAmount: state.paymentAmount,
    setRawInputValue: state.setRawInputValue,
    setPaymentDetails: state.setPaymentDetails,
    setPreBooking: state.setPreBooking,
    detailVariant: state.detailVariant,
  })

  const referralActions = useReferralActions({
    referralCode: state.referralCode,
    setReferralCode: state.setReferralCode,
    setIsReferralCodeChecked: state.setIsReferralCodeChecked,
    setIsReferralValid: state.setIsReferralValid,
    setWukalaSetting: state.setWukalaSetting,
    setShouldRunCheckPre: state.setShouldRunCheckPre,
    setShouldCheckPreAfterClear: state.setShouldCheckPreAfterClear,
  })

  const legalActions = useLegalActions({
    setDataSk: state.setDataSk,
    detailVariant: state.detailVariant,
    setDataRefundPolicy: state.setDataRefundPolicy,
    setParsedContent: state.setParsedContent,
    setDataLegal: state.setDataLegal,
  })

  const { handlePushEvent } = useEventTrackerCheckout({
    pushEvent: state.pushEvent,
    detailVariant: state.detailVariant,
    selectedVariant: state.selectedVariant,
    preBooking: state.preBooking,
    totalQty: preBookingActions.totalQty,
    referralCode: state.referralCode,
    sliderValue: state.sliderValue,
  })

  const paymentActions = usePaymentActions({
    rawInputValue: state.rawInputValue,
    setRawInputValue: state.setRawInputValue,
    sliderValue: state.sliderValue,
    setSliderValue: state.setSliderValue,
    paymentAmount: state.paymentAmount,
    setPaymentAmount: state.setPaymentAmount,
    totalQty: preBookingActions.totalQty,
    preBooking: state.preBooking,
    totalPrice: state.totalPrice,
    debounceTimerRef: state.debounceTimerRef,
    pendingValueRef: state.pendingValueRef,
    setShouldRunCheckPre: state.setShouldRunCheckPre,
    selectedVariant: state.selectedVariant,
    referralCode: state.referralCode,
    selectedRoomType: state.selectedRoomType,
    setLoading: state.setLoading,
    detailVariant: state.detailVariant,
    setPaymentToken: state.setPaymentToken,
    handlePushEvent,
    router: state.router,
  })

  // Setup effects
  useCheckoutEffects({
    setToken: state.setToken,
    setDetailVariant: state.setDetailVariant,
    setSelectedVariant: state.setSelectedVariant,
    setPaymentAmount: state.setPaymentAmount,
    setTotalPrice: state.setTotalPrice,
    setReferralCode: state.setReferralCode,
    setSelectedRoomType: state.setSelectedRoomType,
    selectedVariant: state.selectedVariant,
    isInitialRender: state.isInitialRender,
    totalQty: preBookingActions.totalQty,
    paymentAmount: state.paymentAmount,
    setSliderValue: state.setSliderValue,
    sliderValue: state.sliderValue,
    setShouldRunCheckPre: state.setShouldRunCheckPre,
    shouldRunCheckPre: state.shouldRunCheckPre,
    checkPreCalled: state.checkPreCalled,
    checkPre: preBookingActions.checkPre,
    selectedRoomType: state.selectedRoomType,
    setRawInputValue: state.setRawInputValue,
    shouldCheckPreAfterClear: state.shouldCheckPreAfterClear,
    referralCode: state.referralCode,
    setShouldCheckPreAfterClear: state.setShouldCheckPreAfterClear,
    rawInputValue: state.rawInputValue,
    getLegal: legalActions.getLegal,
    detailVariant: state.detailVariant,
    getRefundPolicy: legalActions.getRefundPolicy,
    debounceTimerRef: state.debounceTimerRef,
    getLegalByVariant: legalActions.getLegalByVariant,
  })

  const isLinkAja =
    typeof window !== 'undefined' &&
    sessionStorage?.getItem('isLinkAja') === 'true'

  // Update jamaah actions with correct totalQty
  const updatedJamaahActions = useJamaahActions({
    jamaahList: state.jamaahList,
    setJamaahList: state.setJamaahList,
    totalQty: preBookingActions.totalQty,
    profile: state.profile,
    useMyData: state.useMyData,
    setUseMyData: state.setUseMyData,
    nama: state.nama,
    noTlpn: state.noTlpn,
  })

  const value: CheckoutContextValue = {
    // State values
    ...state,

    // Action values
    ...updatedJamaahActions,
    ...preBookingActions,
    ...referralActions,
    ...paymentActions,
    ...legalActions,

    // Computed values
    isLinkAja,
    handlePushEvent,
  }

  return (
    <CheckoutContextV2.Provider value={value}>
      {children}
    </CheckoutContextV2.Provider>
  )
}

export const useCheckout = (): CheckoutContextValue => {
  const context = useContext(CheckoutContextV2)
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}
