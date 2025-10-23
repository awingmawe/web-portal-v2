import { RoomType } from '@/contexts/package-variant-context'

export interface SelectedPackage {
  // Organization Info
  organizationName: string
  organizationCity: string
  organizationProvince: string
  organizationLocation: string
  organizationThumbnail: string

  // Package Info
  packageName: string
  packageThumbnail: string

  // Schedule Info
  departureDate: string
  arrivalDate: string

  // Departure Airport Info
  departureAirportName: string
  destinationAirportName: string

  // Arrival Airport Info
  arrivalOriginAirportName: string
  arrivalDestinationAirportName: string

  // Airline Info
  departureAirlineName: string
  arrivalAirlineName: string

  // Hotel Info - Mecca
  meccaHotelName: string
  meccaHotelCity: string
  meccaHotelLocation: string

  // Hotel Info - Medina
  medinaHotelName: string
  medinaHotelCity: string
  medinaHotelLocation: string
}

export type FinancingCalculationResponse = {
  loan_amount: number
  totalAmount: number
  down_payment: number
  dpPercentage: number
  admin_fee: number
  upfront_payment: number
  monthly_payment: number
}

export type PembiayaanDataLocalStorage = {
  selectedPackage: SelectedPackage
  selectedRoomType: RoomType
  totalQty: number
  price: number
}
