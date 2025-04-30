interface Attachment {
  bookingManifestId: number
  type: string
  src: string
}

interface Booking {
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
  isCompletedManifest: boolean
  feeWukalaPosted: boolean
  feeWukalaDisbursed: boolean
  roomType: string
  disbursed: boolean
  createdAt: string
  modifiedAt: string
  createdBy: string | null
  modifiedBy: string | null
  invoiceFeeNumber: string | null
  wukalaDisbursementId: string | null
  bdmId: string | null
}

interface ManifestUser {
  id: number
  bookingId: number
  name: string
  phoneNumber: string
  email: string | null
  nik: string | null
  born: string | null
  placeBorn: string | null
  address: string | null
  gender: string | null
  hometown: string | null
  passportNumber: string | null
  passportExpiredAt: string | null
  medicalHistory: string | null
  submitted: boolean
  completed: boolean
  createdAt: string
  modifiedAt: string
  createdBy: string | null
  modifiedBy: string | null
  booking: Booking | undefined
  attachment: Attachment[]
}

type ManifestUsers = ManifestUser[]

export type { ManifestUser, Booking, Attachment, ManifestUsers }
