import {
  LOCAL_STORAGE_DETAIL_VARIANT,
  LOCAL_STORAGE_SELECTED_VARIANT,
  PACKAGE_TYPE,
} from '@/constant/env'
import { DetailVariant, SelectedVariant } from '@/constant/types/CheckoutProps'
import { RoomType } from '@/contexts/package-variant-context'
import { getLocalReferralCode, setLocalReferralCode } from '@/lib/utils'
import { cookieNames } from '@/services/common/cookie'
import cookie from 'cookie-cutter'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface UseCheckoutEffectsProps {
  setToken: (token: string) => void
  setDetailVariant: (variant: DetailVariant) => void
  setSelectedVariant: (variant: SelectedVariant) => void
  setPaymentAmount: (amount: number) => void
  setTotalPrice: (price: number) => void
  setReferralCode: (code: string) => void
  setSelectedRoomType: (roomType: RoomType) => void
  selectedVariant: SelectedVariant
  isInitialRender: React.MutableRefObject<boolean>
  totalQty: number
  paymentAmount: number
  setSliderValue: (value: number) => void
  sliderValue: number
  setShouldRunCheckPre: (should: boolean) => void
  shouldRunCheckPre: boolean
  checkPreCalled: React.MutableRefObject<boolean>
  checkPre: () => Promise<void>
  selectedRoomType: RoomType
  setRawInputValue: (value: string) => void
  shouldCheckPreAfterClear: boolean
  referralCode: string
  setShouldCheckPreAfterClear: (should: boolean) => void
  rawInputValue: string
  getLegal: () => Promise<void>
  detailVariant: DetailVariant
  getRefundPolicy: () => Promise<void>
  debounceTimerRef: React.MutableRefObject<any>
  getLegalByVariant: (variantType: string) => Promise<void>
}

export const useCheckoutEffects = ({
  setToken,
  setDetailVariant,
  setSelectedVariant,
  setPaymentAmount,
  setTotalPrice,
  setReferralCode,
  setSelectedRoomType,
  selectedVariant,
  isInitialRender,
  totalQty,
  paymentAmount,
  setSliderValue,
  sliderValue,
  setShouldRunCheckPre,
  shouldRunCheckPre,
  checkPreCalled,
  checkPre,
  selectedRoomType,
  setRawInputValue,
  shouldCheckPreAfterClear,
  referralCode,
  setShouldCheckPreAfterClear,
  rawInputValue,
  getLegal,
  detailVariant,
  getRefundPolicy,
  debounceTimerRef,
  getLegalByVariant,
}: UseCheckoutEffectsProps): void => {
  const searchParams = useSearchParams()

  // Initialize data from storage and URL params
  useEffect(() => {
    const storedToken = cookie.get(cookieNames.USER_ACCESS_TOKEN)
    setToken(storedToken || null)

    const detailVariantString = localStorage.getItem(
      LOCAL_STORAGE_DETAIL_VARIANT
    )
    const selectedVariantString = localStorage.getItem(
      LOCAL_STORAGE_SELECTED_VARIANT
    )

    if (detailVariantString) {
      setDetailVariant(JSON.parse(detailVariantString))
    }

    if (selectedVariantString) {
      const parsed = JSON.parse(selectedVariantString)
      setSelectedVariant(parsed)
      setPaymentAmount(parsed.netAmount)
      setTotalPrice(Number(parsed.price))
    }
  }, [
    setToken,
    setDetailVariant,
    setSelectedVariant,
    setPaymentAmount,
    setTotalPrice,
  ])

  // Handle referral code from URL params
  useEffect(() => {
    const referralCodeFromParams = searchParams.get('referralCode')
    const currentReferralCodeFromStorage = getLocalReferralCode()

    if (referralCodeFromParams) {
      setLocalReferralCode(referralCodeFromParams)
      setReferralCode(referralCodeFromParams)
    } else if (currentReferralCodeFromStorage) {
      setReferralCode(currentReferralCodeFromStorage)
    }
  }, [searchParams])

  // Handle selected room type changes
  useEffect(() => {
    setSelectedRoomType(selectedVariant?.roomType)
  }, [selectedVariant])

  // Handle quantity and payment amount changes
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (totalQty !== 0) {
      const newSliderValue = paymentAmount * totalQty
      if (newSliderValue !== sliderValue) {
        setSliderValue(newSliderValue)
      }
      setShouldRunCheckPre(true)
    }
  }, [totalQty, paymentAmount])

  // Handle pre-booking checks
  useEffect(() => {
    if (shouldRunCheckPre && !checkPreCalled.current) {
      checkPreCalled.current = true
      checkPre().finally(() => {
        checkPreCalled.current = false
      })
      setShouldRunCheckPre(false)
    }
  }, [shouldRunCheckPre])

  // Handle room type changes and raw input updates
  useEffect(() => {
    setRawInputValue(String(paymentAmount * totalQty))
  }, [selectedRoomType])

  // Handle referral code clearing
  useEffect(() => {
    if (shouldCheckPreAfterClear && referralCode === '') {
      setShouldCheckPreAfterClear(false)
      setShouldRunCheckPre(true)
    }
  }, [referralCode, shouldCheckPreAfterClear])

  // Handle slider value changes for input formatting
  useEffect(() => {
    const formattedValue = sliderValue.toLocaleString('id-ID')
    const currentNumericValue = rawInputValue.replace(/\D/g, '')

    if (parseInt(currentNumericValue || '0', 10) !== sliderValue) {
      setRawInputValue(formattedValue)
    }
  }, [sliderValue])

  // Get legal by variant package documents on mount
  useEffect(() => {
    const variantType = detailVariant?.package?.variantType
    if (!detailVariant && variantType === PACKAGE_TYPE.UMRAH) return

    getLegalByVariant(detailVariant?.package?.variantType)
  }, [detailVariant])

  // Get legal documents on mount
  useEffect(() => {
    getLegal()
  }, [])

  // Get refund policy when detail variant changes
  useEffect(() => {
    if (detailVariant) {
      getRefundPolicy()
    }
  }, [detailVariant])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])
}
