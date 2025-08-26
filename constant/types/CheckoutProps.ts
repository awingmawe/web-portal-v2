import { Package, PackageVariant } from '@/constant/types/PackageProps'
import { PreBookingResponse } from '@/constant/types/PaymentCheckout'
import { PaymentMethod } from '@/constant/types/PaymentMethod'
import { Profile } from '@/contexts/auth/shared/type'
import { RoomType } from '@/contexts/package-variant-context'

export interface JamaahData {
  id: string | number
  name: string
  phone: string
}

export interface DataSK {
  title?: string
  modifiedAt?: string
  body?: string
}

export interface SelectedVariant {
  currency: string
  name: string
  netAmount: number
  roomType: RoomType
  variant: PackageVariant
  variantId: number
  id: number
  isLastCall: boolean
  departureDate: string
  arrivalDate: string
}

export interface DetailVariant {
  arrivalDate: string
  departureDate: string
  isUmrahPersonal: boolean
  package: Package
  totalManifest: number
  currency: string
}

export interface PaymentDetails {
  label: string
  amount: Array<{
    amountLabel: string
    color?: string
    style?: 'small' | 'medium' | 'large'
  }>
}

export interface CheckoutState {
  token: string
  detailVariant: DetailVariant
  selectedVariant: SelectedVariant
  selectedRoomType: RoomType
  preBooking: PreBookingResponse
  prebookingLoading: boolean
  paymentDetails: PaymentDetails[] | []
  paymentAmount: number
  totalPrice: number
  sliderValue: number
  rawInputValue: string
  selectedPayment: string
  paymentToken?: string
  referralCode: string
  wukalaSetting: boolean
  isReferralValid: boolean
  isReferralCodeChecked: boolean
  useMyData: boolean
  jamaahList: JamaahData[]
  nama: string
  noTlpn: string
  loading: boolean
  termsAccepted: boolean
  isUmrahPersonal: boolean
  dataSK: DataSK
  dataRefundPolicy: string
  parsedContent:
    | {
        jumlah: string
        berlaku: string
      }[]
    | []
  shouldCheckPreAfterClear: boolean
  shouldRunCheckPre: boolean
}

export interface JamaahActions {
  handleAddJamaah: () => void
  handleJamaahNameChange: (id: number, value: string) => void
  handleJamaahPhoneChange: (id: number, value: string) => void
  handleRemoveJamaah: (id: number) => void
  handleUseMyDataChange: (checked: boolean) => void
  handleUseMyDataChangeMobile: () => void
  handleSimpanMobile: () => void
  handleEditMobile: (data: number) => void
  isJamaahDataValid: () => boolean
}

export interface PreBookingActions {
  checkPre: () => Promise<void>
  totalMinimumDownPayment: number
  totalQty: number
  isEmptyRoomType: boolean
}

export interface ReferralActions {
  handleCheckReferral: () => Promise<void>
  handleRemoveReferralCode: () => void
}

export interface PaymentActions {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSliderChange: (e: any) => void
  formatNumber: (value: string) => string
  sliderStep: () => number
  handleCheckout: (paymentMethod?: PaymentMethod) => Promise<void>
}

export interface LegalActions {
  getLegal: () => Promise<void>
  getRefundPolicy: () => Promise<void>
}

export interface CheckoutContextValue
  extends CheckoutState,
    JamaahActions,
    PreBookingActions,
    ReferralActions,
    PaymentActions,
    LegalActions {
  profile: Profile
  pushEvent: (event: any) => void
  router: any
  isLinkAja: boolean
  handlePushEvent: (eventName: string) => void
  setReferralCode: (code: string) => void
  setPaymentAmount: (amount: number) => void
  setSliderValue: (value: number) => void
  setTermsAccepted: (accepted: boolean) => void
  setRawInputValue: (value: string) => void
  setSelectedRoomType: (roomType: RoomType) => void
  setShouldRunCheckPre: (should: boolean) => void
  setSelectedPayment: (payment: string) => void
}
