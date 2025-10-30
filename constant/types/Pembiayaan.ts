import { SubmissionStep1FormValues } from '@/constant/schema/pembiayaan-schema/pembiayaan'
import { RoomType } from '@/contexts/package-variant-context'

// --------------------------------------- SELECTED PACKAGE ------------------------------------ //
export interface SelectedPackage {
  // Organization Info
  organizationId: number
  organizationName: string
  organizationCity: string
  organizationProvince: string
  organizationLocation: string
  organizationThumbnail: string

  // Package Info
  packageVariantId: number
  packageId: number
  packageName: string
  packageThumbnail: string

  // Schedule Info
  departureDate: string
  arrivalDate: string

  // Departure Airport Info
  departureAirportName: string
  departureAirpotCode: string
  departureDestinationAirportCode: string
  destinationAirportName: string

  // Arrival Airport Info
  arrivalOriginAirportName: string
  arrivalOriginAirportCode: string
  arrivalDestinationAirportCode: string
  arrivalDestinationAirportName: string

  // Airline Info
  departureAirlineName: string
  departureAirlineThumbnail: string
  arrivalAirlineName: string
  arrivalAirlineThumbnail: string

  // Hotel Info - Mecca
  meccaHotelName: string
  meccaHotelCity: string
  meccaHotelLocation: string

  // Hotel Info - Medina
  medinaHotelName: string
  medinaHotelCity: string
  medinaHotelLocation: string
}
// --------------------------------------- END OF SELECTED PACKAGE ------------------------------------ //

// --------------------------------------- FINANCING CALCULATION ------------------------------------ //
export type FinancingCalculationResponse = {
  loan_amount: number
  totalAmount: number
  down_payment: number
  dpPercentage: number
  admin_fee: number
  upfront_payment: number
  monthly_payment: number
}
// --------------------------------------- END OF FINANCING CALCULATION ------------------------------------ //

// --------------------------------------- PROVIDER LOCAL STORAGE ------------------------------------ //
export type ProvidersLocaStorage = {
  id: number
  providerName: string
  logo: string
  tenor: number
}
// --------------------------------------- END OF FINANCING CALCULATION ------------------------------------ //

// --------------------------------------- PEMBIAYAAN DATA LOCAL STORAGE ------------------------------------ //
export type PembiayaanDataLocalStorage = {
  selectedPackage: SelectedPackage
  selectedRoomType: RoomType
  totalQty: number
  price: number
  tenor: string
  formData?: SubmissionStep1FormValues
  provider?: ProvidersLocaStorage[]
}
// --------------------------------------- END OF PEMBIAYAAN DATA LOCAL STORAGE ------------------------------------ //

// --------------------------------------- SUBMISSION PEMBIAYAAN ------------------------------------ //
// Request Types
export interface ProviderSubmission {
  id: number
  tenor: number
}

export interface ManifestItem {
  name: string
  phone_number: string
}

export interface RequestSubmissionPembiayaan {
  name: string
  email: string
  phone_number: string
  born: string // format: "YYYY-MM-DD"
  gender: 'L' | 'P' // L = Laki-laki, P = Perempuan
  job: string
  providers: ProviderSubmission[]
  organization_instance_id: string
  total_price: number
  jumlah_jemaah: number
  package_name: string
  package_id: number
  package_variant_id: number
  tenor: number
  manifest: ManifestItem[]
}

// Response Success Types
export interface ApplicationCreated {
  id: number
  provider_id: number
  provider_name: string
  provider_type: string
  status: number
}

export interface ResponseSubmissionPembiayaan {
  id: number
  status: number
  applications_created: ApplicationCreated[]
  message: string
}

// Response Error Types
export interface ErrorSubmissionPembiayaan {
  error: string
  message: string
  code: number
}
// --------------------------------------- END OF SUBMISSION PEMBIAYAAN ------------------------------------ //

// --------------------------------------- PRE CREATE PEMBIAYAAN ------------------------------------ //
// Request Types
export interface RequestPrePembiayaan {
  packageVariantId: number
  double: number
  triple: number
  quad: number
}

// Response Types
export interface AmountDetail {
  amountLabel: string
  style: 'small' | 'medium' | 'large' // atau bisa pakai string saja jika ada variasi lain
  color: string // hex color code
}

export interface PaymentDetail {
  label: string
  amount?: AmountDetail[] // optional karena ada item dengan label "divider" tanpa amount
}

export interface ResponsePrePembiayaan {
  paymentDetails: PaymentDetail[]
}
// -------------------------------------------- END OF PRE CREATE PEMBIAYAAN -------------------------------- //
