import { PaymentDetails } from '@/constant/types/CheckoutProps'

export interface PaymentTransaction {
  id: number
  issuerId: number
  orderStatusId: number
  invoice: string
  customerNote: string | null
  referenceCode: string
  paymentToken: string
  baseAmount: string
  netAmount: string
  totalTax: string
  totalDiscount: string
  totalFeeWukala: string
  totalFeePlatform: string
  createdAt: string
  modifiedAt: string
  createdBy: string
  modifiedBy: string | null
  paymentLink: string
  directEvidence: string | null
  orderStatus: {
    id: number
    name: string
    slug: string
    level: number
    createdAt: string
    modifiedAt: string
    createdBy: string
    modifiedBy: string | null
  }
  orderPurchasedItems: {
    id: number
    orderId: number
    productId: string
    productName: string
    productDesc: string
    price: string
    quantity: number
    totalPrice: string
    createdAt: string
    modifiedAt: string
    createdBy: string
    modifiedBy: string | null
  }[]
  orderPayment: {
    id: number
    orderId: number
    paymentMethod: string
    paymentChannel: string
    paymentDetails: string
    paymentAmount: number
    createdAt: string
    modifiedAt: string
    createdBy: string
    modifiedBy: string | null
  }
}

export interface PrePaymentTransactionHajj {
  doublePrice: number
  originalDoublePrice: number
  originalQuadPrice: number
  originalTriplePrice: number
  paymentDetails: PaymentDetails[]
  quadPrice: number
  roomInfo: {
    double: RoomTypeDetail | null
    triple: RoomTypeDetail | null
    quad: RoomTypeDetail | null
  }
  totalPrice: number
  travelCurrencyRate: number
  triplePrice: number
}

export interface RoomTypeDetail {
  quantity: number
  price: number
}
