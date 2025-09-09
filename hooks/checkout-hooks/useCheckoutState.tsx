import {
  CheckoutState,
  DataSK,
  DetailVariant,
  JamaahData,
  PaymentDetails,
  SelectedVariant,
} from '@/constant/types/CheckoutProps'
import { Legal } from '@/constant/types/LegalProps'
import { PreBookingResponse } from '@/constant/types/PaymentCheckout'
import { useAuth } from '@/contexts/auth/context'
import { Profile } from '@/contexts/auth/shared/type'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { RoomType } from '@/contexts/package-variant-context'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

interface CheckoutStateReturn extends CheckoutState {
  // User profile
  profile: Profile

  // Event tracker
  pushEvent: (event: any) => void

  // Router
  router: any

  // Core state
  setToken: (token: string) => void
  setDetailVariant: (variant: DetailVariant) => void
  setSelectedVariant: (variant: SelectedVariant) => void
  setPreBooking: (preBooking: PreBookingResponse) => void
  setSelectedRoomType: (roomType: RoomType) => void
  setPreBookingLoading: (loading: boolean) => void

  // Payment details
  setPaymentDetails: (details: PaymentDetails[]) => void
  setPaymentAmount: (amount: number) => void
  setTotalPrice: (price: number) => void
  setSliderValue: (value: number) => void
  setRawInputValue: (value: string) => void
  setSelectedPayment: (payment: string) => void
  setPaymentToken: (token?: string) => void

  // Referral code
  setReferralCode: (code: string) => void

  // Wukala setting
  setWukalaSetting: (setting: boolean) => void

  // Referral code validation
  setIsReferralValid: (valid: boolean) => void
  setIsReferralCodeChecked: (checked: boolean) => void

  // Use my data
  setUseMyData: (use: boolean) => void

  // Jamaah list
  setJamaahList: React.Dispatch<React.SetStateAction<JamaahData[]>>

  // Nama and no tlpn
  setNama: (nama: string) => void
  setNoTlpn: (noTlpn: string) => void

  // Loading
  setLoading: (loading: boolean) => void

  // Terms accepted
  setTermsAccepted: (accepted: boolean) => void

  // Umrah personal
  setIsUmrahPersonal: (personal: boolean) => void

  // Data SK
  setDataSk: (data: DataSK) => void

  // Data refund policy
  setDataRefundPolicy: (policy: string) => void
  setDataLegal: (legal: Legal) => void

  // Parsed content
  setParsedContent: (
    content: {
      jumlah: string
      berlaku: string
    }[]
  ) => void

  // Should check pre after clear
  setShouldCheckPreAfterClear: (should: boolean) => void

  // Should run check pre
  setShouldRunCheckPre: (should: boolean) => void

  // Refs
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
  const [dataLegal, setDataLegal] = useState<Legal>()

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
    dataLegal: dataLegal as Legal,
    setDataLegal,

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
