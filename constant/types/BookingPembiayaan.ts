/**
 * Interface untuk sub-object 'status' di dalam booking response.
 */
interface BookingStatus {
  id: number
  level: number
  name: string
  slug: string
}

/**
 * Interface untuk sub-object 'roomTypeQuantity'.
 */
interface RoomTypeQuantity {
  quad: number
  double: number
  triple: number
}

/**
 * Interface untuk sub-object 'orderStatus' di dalam 'order'.
 */
interface OrderStatus {
  id: number
  name: string
  slug: string
  level: number
  createdAt: string // ISO Date String
  modifiedAt: string // ISO Date String
  createdBy: string
  modifiedBy: string | null
}

/**
 * Interface untuk item di dalam array 'orderPurchasedItems'.
 */
interface OrderPurchasedItem {
  id: number
  orderId: number
  productId: string // ID produk dalam bentuk string
  productName: string
  productDesc: string
  price: string
  quantity: number
  totalPrice: string
  createdAt: string // ISO Date String
  modifiedAt: string // ISO Date String
  createdBy: string
  modifiedBy: string | null
}

/**
 * Interface untuk sub-object 'orderPayment' di dalam 'order'.
 */
interface OrderPayment {
  id: number
  orderId: number
  paymentMethod: string | null
  paymentChannel: string | null
  paymentDetails: string
  paymentAmount: number
  createdAt: string // ISO Date String
  modifiedAt: string // ISO Date String
  createdBy: string
  modifiedBy: string | null
}

/**
 * Interface untuk sub-object 'order' yang utama.
 */
interface OrderDetails {
  id: number
  issuerId: number
  orderStatusId: number
  invoice: string
  customerNote: string | null
  referenceCode: string
  referralCode: string
  paymentToken: string
  baseAmount: string
  netAmount: string
  totalTax: string
  totalDiscount: string
  totalFeeWukala: string
  totalFeePlatform: string
  createdAt: string // ISO Date String
  modifiedAt: string // ISO Date String
  createdBy: string
  modifiedBy: string | null
  paymentLink: string // URL
  directEvidence: string | null
  partnerReferenceNo: string | null
  totalMdrTax: string
  totalAdminTax: string
  transactionTaxId: number
  orderStatus: OrderStatus
  orderPurchasedItems: OrderPurchasedItem[]
  orderPayment: OrderPayment
}

/**
 * Interface utama untuk keseluruhan response 'BookingCreateResponse'.
 */
export interface BookingCreateResponse {
  id: number
  packageId: number
  packageVariantId: number
  packagePersonalId: number | null
  organizationId: string
  organizationInstanceId: number
  statusLevel: number
  bookingCode: string
  referralCode: string
  additionalFeePayment: string
  additionalTax: string
  originalPrice: string
  quantity: string
  discountOrg: string
  discountWukala: string
  totalDiscount: string
  totalPrice: string
  subtotalPrice: string
  isPaidOff: boolean
  isCompletedManifest: boolean
  invoiceFeeNumber: string | null
  wukalaDisbursementId: number | null
  bdmId: string
  roomType: string | null
  isManifestCommitted: boolean
  status: BookingStatus
  roomTypeQuantity: RoomTypeQuantity
  createdAt: string
  createdBy: string
  modifiedAt: string
  modifiedBy: string | null
  creditId: number
  order: OrderDetails
  discountMuslim: string
  disbursed: boolean
  additionalMdr: string
}
