import { useState, useRef } from 'react'
import { useAuth } from '@/contexts/auth/context'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { useRouter } from 'next/navigation'
import { Profile } from '@/contexts/auth/shared/type'
import {
  CheckoutState,
  DataSK,
  DetailVariant,
  JamaahData,
  PaymentDetails,
  SelectedVariant,
} from '@/constant/types/CheckoutProps'
import { PreBookingResponse } from '@/constant/types/PaymentCheckout'
import { RoomType } from '@/contexts/package-variant-context'

interface CheckoutStateReturn extends CheckoutState {
  profile: Profile
  pushEvent: (event: any) => void
  router: any
  setToken: (token: string) => void
  setDetailVariant: (variant: DetailVariant) => void
  setSelectedVariant: (variant: SelectedVariant) => void
  setPreBooking: (preBooking: PreBookingResponse) => void
  setSelectedRoomType: (roomType: RoomType) => void
  setPreBookingLoading: (loading: boolean) => void
  setPaymentDetails: (details: PaymentDetails[]) => void
  setPaymentAmount: (amount: number) => void
  setTotalPrice: (price: number) => void
  setSliderValue: (value: number) => void
  setRawInputValue: (value: string) => void
  setSelectedPayment: (payment: string) => void
  setPaymentToken: (token?: string) => void
  setReferralCode: (code: string) => void
  setWukalaSetting: (setting: boolean) => void
  setIsReferralValid: (valid: boolean) => void
  setIsReferralCodeChecked: (checked: boolean) => void
  setUseMyData: (use: boolean) => void
  setJamaahList: React.Dispatch<React.SetStateAction<JamaahData[]>>
  setNama: (nama: string) => void
  setNoTlpn: (noTlpn: string) => void
  setLoading: (loading: boolean) => void
  setTermsAccepted: (accepted: boolean) => void
  setIsUmrahPersonal: (personal: boolean) => void
  setDataSk: (data: DataSK) => void
  setDataRefundPolicy: (policy: string) => void
  setParsedContent: (
    content: {
      jumlah: string
      berlaku: string
    }[]
  ) => void
  setShouldCheckPreAfterClear: (should: boolean) => void
  setShouldRunCheckPre: (should: boolean) => void
  checkPreCalled: React.MutableRefObject<boolean>
  isInitialRender: React.MutableRefObject<boolean>
  debounceTimerRef: React.MutableRefObject<any>
  pendingValueRef: React.MutableRefObject<number>
}

export const useCheckoutState = (): CheckoutStateReturn => {
  const { profile } = useAuth()
  const { pushEvent } = useEventTracker()
  const router = useRouter()

  // Core state
  const [token, setToken] = useState<string>('')
  const [detailVariant, setDetailVariant] = useState<DetailVariant>()
  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>()
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType>()

  // Payment state
  const [preBooking, setPreBooking] = useState<PreBookingResponse>()
  const [prebookingLoading, setPreBookingLoading] = useState<boolean>(false)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails[]>([])
  const [paymentAmount, setPaymentAmount] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [sliderValue, setSliderValue] = useState<number>(0)
  const [rawInputValue, setRawInputValue] = useState<string>('')
  const [selectedPayment, setSelectedPayment] = useState<string>('')
  const [paymentToken, setPaymentToken] = useState<string>()

  // Referral state
  const [referralCode, setReferralCode] = useState<string>('')
  const [wukalaSetting, setWukalaSetting] = useState<boolean>()
  const [isReferralValid, setIsReferralValid] = useState<boolean>(false)
  const [isReferralCodeChecked, setIsReferralCodeChecked] =
    useState<boolean>(false)

  // Jamaah state
  const [useMyData, setUseMyData] = useState<boolean>(false)
  const [jamaahList, setJamaahList] = useState<JamaahData[]>([
    { id: 1, name: '', phone: '' },
  ])
  const [nama, setNama] = useState<string>('')
  const [noTlpn, setNoTlpn] = useState<string>('')

  // UI state
  const [loading, setLoading] = useState<boolean>(false)
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
  const [isUmrahPersonal, setIsUmrahPersonal] = useState<boolean>(false)

  // Legal data state
  const [dataSK, setDataSk] = useState<DataSK>()
  const [dataRefundPolicy, setDataRefundPolicy] = useState<string>()
  const [parsedContent, setParsedContent] = useState<
    {
      jumlah: string
      berlaku: string
    }[]
  >([])

  // Control flags
  const [shouldCheckPreAfterClear, setShouldCheckPreAfterClear] =
    useState<boolean>(false)
  const [shouldRunCheckPre, setShouldRunCheckPre] = useState<boolean>(false)

  // Refs for optimization
  const checkPreCalled = useRef<boolean>(false)
  const isInitialRender = useRef<boolean>(true)
  const debounceTimerRef = useRef<any>(null)
  const pendingValueRef = useRef<number>(0)

  return {
    // External dependencies
    profile: profile ?? {},
    pushEvent,
    router,

    // Core state
    token,
    setToken,
    detailVariant: detailVariant as DetailVariant,
    setDetailVariant,
    selectedVariant: selectedVariant as SelectedVariant,
    setSelectedVariant,
    selectedRoomType: selectedRoomType as RoomType,
    setSelectedRoomType,

    // Payment state
    preBooking: preBooking as PreBookingResponse,
    setPreBooking,
    prebookingLoading,
    setPreBookingLoading,
    paymentDetails,
    setPaymentDetails,
    paymentAmount,
    setPaymentAmount,
    totalPrice,
    setTotalPrice,
    sliderValue,
    setSliderValue,
    rawInputValue,
    setRawInputValue,
    selectedPayment,
    setSelectedPayment,
    paymentToken,
    setPaymentToken,

    // Referral state
    referralCode,
    setReferralCode,
    wukalaSetting: wukalaSetting as boolean,
    setWukalaSetting,
    isReferralValid,
    setIsReferralValid,
    isReferralCodeChecked,
    setIsReferralCodeChecked,

    // Jamaah state
    useMyData,
    setUseMyData,
    jamaahList,
    setJamaahList,
    nama,
    setNama,
    noTlpn,
    setNoTlpn,

    // UI state
    loading,
    setLoading,
    termsAccepted,
    setTermsAccepted,
    isUmrahPersonal,
    setIsUmrahPersonal,

    // Legal data state
    dataSK: dataSK as DataSK,
    setDataSk,
    dataRefundPolicy: dataRefundPolicy as string,
    setDataRefundPolicy,
    parsedContent,
    setParsedContent,

    // Control flags
    shouldCheckPreAfterClear,
    setShouldCheckPreAfterClear,
    shouldRunCheckPre,
    setShouldRunCheckPre,

    // Refs
    checkPreCalled,
    isInitialRender,
    debounceTimerRef,
    pendingValueRef,
  }
}
