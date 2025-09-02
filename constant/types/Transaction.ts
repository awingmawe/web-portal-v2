import { Package } from '@/constant/types/PackageProps'

export interface Transaction {
  id: number
  packageId: number
  packageVariantId: number
  organizationId: string
  organizationInstanceId: number
  statusLevel: number
  bookingCode: string
  referralCode: string
  feePlatform: string
  feeWukala: string
  additionalFeePayment: string
  additionalTax: string
  quantity: string
  originalPrice: string
  discountOrg: string
  discountWukala: string
  totalDiscount: string
  totalPrice: string
  subtotalPrice: string
  isPaidOff: boolean
  packagePersonalId: number
  isCompletedManifest: boolean
  isManifestCommitted: boolean
  feeWukalaPosted: boolean
  feeWukalaDisbursed: boolean
  roomType: string
  disbursed: boolean
  createdAt: string
  modifiedAt: string
  createdBy: string
  modifiedBy: string | null
  invoiceFeeNumber: string | null
  wukalaDisbursementId: string | null
  remainingHajjPayment: number
  bdmId: string | null
  status: {
    id: number
    level: number
    name: string
    slug: string
  }
  packageSnapshot: {
    id: number
    snapshot: {
      package: Package
      name: string
      arrivalDate: string
      departureDate: string
      tripDuration: number
      waitingPeriod: string | null
    }
  }
}
