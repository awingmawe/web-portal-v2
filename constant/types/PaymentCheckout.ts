import { PackageVariant } from '@/constant/types/PackageProps'

interface PaymentAmount {
  amountLabel: string
  style: 'small' | 'medium' | 'heavy'
  color: string
}

interface PaymentDetail {
  label: string
  amount: (PaymentAmount | object)[]
}
export interface PreBookingResponse {
  paymentDetails: PaymentDetail[]
  packageVariant: PackageVariant
  originalPrice: number
  quantity: number
  discountWukala: number
  discountOrg: number
  discountMuslim: number
  feePlatform: number
  feeWukala: number
  totalDiscount: number
  totalPrice: number
  downPayment: number
  subtotalPrice: number
  additionalTax: number
  additionalMDR: number
  remainingPayment: number
  globalFeePlatform: number
  globalCurrencyRate: number
}
