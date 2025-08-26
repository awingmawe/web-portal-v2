'use client'

import { useCheckout } from '@/contexts/checkout-context-v2'
import { getLocalReferralCode, setLocalReferralCode } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useCheckoutLogic = () => {
  const isLinkAja =
    typeof window !== 'undefined' &&
    sessionStorage?.getItem('isLinkAja') === 'true'
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenModalPengembalian, setOpenModalPengembalian] = useState(false)
  const [isOpenModalDisclaimer, setOpenModalDisclaimer] = useState(false)
  const [isHaveRefferalCode, setIsHaveReferralCode] = useState(false)
  const [disabledButtonCheckout, setDisabledButtonCheckout] = useState(true)
  const searchParams = useSearchParams()

  const {
    token,
    detailVariant,
    selectedVariant,
    prebookingLoading,
    preBooking,
    paymentDetails,
    referralCode,
    setReferralCode,
    handleCheckReferral,
    setPaymentAmount,
    totalPrice,
    sliderValue,
    setSliderValue,
    handleCheckout,
    termsAccepted,
    setTermsAccepted,
    isReferralValid,
    isReferralCodeChecked,
    wukalaSetting,
    handleRemoveReferralCode,
    loading,
    handleInputChange,
    formatNumber,
    rawInputValue,
    setRawInputValue,
    handleSliderChange,
    dataSK,
    parsedContent,
    dataRefundPolicy,
    isEmptyRoomType,
    setSelectedRoomType,
    setShouldRunCheckPre,
    paymentAmount,
    totalQty,
    selectedPayment,
    setSelectedPayment,
    sliderStep,
    dataLegal,
  } = useCheckout()

  // Handle referral code from URL params
  useEffect(() => {
    const referralCodeFromParams = searchParams.get('referralCode')
    const currentReferralCodeFromStorage = getLocalReferralCode()

    if (referralCodeFromParams) {
      setLocalReferralCode(referralCodeFromParams)
      setReferralCode(referralCodeFromParams)
      setIsHaveReferralCode(true)
    } else if (currentReferralCodeFromStorage) {
      setReferralCode(currentReferralCodeFromStorage)
      setIsHaveReferralCode(true)
    }
  }, [searchParams, setReferralCode])

  // Handle selected room type changes
  useEffect(() => {
    setSelectedRoomType(selectedVariant?.roomType)
  }, [selectedVariant, setSelectedRoomType])

  // Handle button disabled state
  useEffect(() => {
    if (loading || isEmptyRoomType || !termsAccepted) {
      setDisabledButtonCheckout(true)
    } else {
      if (isLinkAja) {
        if (
          selectedPayment === 'linkAjaSyariah' ||
          selectedPayment === 'linkAja'
        ) {
          setDisabledButtonCheckout(false)
        } else {
          setDisabledButtonCheckout(true)
        }
      } else {
        setDisabledButtonCheckout(false)
      }
    }
  }, [
    selectedVariant,
    isEmptyRoomType,
    loading,
    termsAccepted,
    isLinkAja,
    selectedPayment,
  ])

  return {
    token,
    isLinkAja,
    isOpenModal,
    setOpenModal,
    isOpenModalPengembalian,
    setOpenModalPengembalian,
    isHaveRefferalCode,
    disabledButtonCheckout,
    // Export all checkout context values
    detailVariant,
    selectedVariant,
    prebookingLoading,
    preBooking,
    paymentDetails,
    referralCode,
    setReferralCode,
    handleCheckReferral,
    setPaymentAmount,
    totalPrice,
    sliderValue,
    setSliderValue,
    handleCheckout,
    termsAccepted,
    setTermsAccepted,
    isReferralValid,
    isReferralCodeChecked,
    wukalaSetting,
    handleRemoveReferralCode,
    loading,
    handleInputChange,
    formatNumber,
    rawInputValue,
    setRawInputValue,
    handleSliderChange,
    dataSK,
    parsedContent,
    dataRefundPolicy,
    isEmptyRoomType,
    setSelectedRoomType,
    setShouldRunCheckPre,
    paymentAmount,
    totalQty,
    selectedPayment,
    setSelectedPayment,
    sliderStep,
    dataLegal,
    setOpenModalDisclaimer,
    isOpenModalDisclaimer,
  }
}
