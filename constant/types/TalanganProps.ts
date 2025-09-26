export interface CreditProvider {
  id: string
  name: string
  code: string
  logo?: string
  description?: string
  features?: string[]
  terms?: {
    minTenor: number
    maxTenor: number
    minAmount: number
    maxAmount: number
    interestRate: number
    adminFee: number
  }
  requirements?: string[]
  status: 'active' | 'inactive'
  createdAt?: string
  updatedAt?: string
}

export interface CreditSubmission {
  id: string
  userId: string
  providerId: string
  amount: number
  tenor: number
  purpose: string
  status: 'pending' | 'approved' | 'rejected' | 'processing'
  personalData: {
    fullName: string
    email: string
    phoneNumber: string
    ktp: string
    birthDate: string
    address: string
  }
  documents?: {
    ktpUrl?: string
    npwpUrl?: string
    slipGajiUrl?: string
  }
  createdAt: string
  updatedAt: string
}

export interface TalanganPartner {
  id: string
  name: string
  logo?: string
  color?: string
  abbreviation: string
  isActive: boolean
  tenorOptions: number[]
  maxLimit: number
  minLimit: number
  interestRate: number
  adminFee: number
  requirements: string[]
  notes?: string
}

export interface EligibilityRequest {
  travelAgentId: string
  partnerId: string
  packageId?: string
}

export interface SimulationRequest {
  amount: number
  partnerId: string
  tenor: number
}

export interface CreditSubmissionRequest {
  providerId: string
  amount: number
  tenor: number
  purpose: string
  personalData: {
    fullName: string
    email: string
    phoneNumber: string
    ktp: string
    birthDate: string
    address: string
    occupation?: string
    monthlyIncome?: number
  }
  documents?: {
    ktpUrl?: string
    npwpUrl?: string
    slipGajiUrl?: string
  }
  metadata?: {
    packageId?: string
    travelAgentId?: string
    departureDate?: string
  }
}

export interface ApplicationRequest {
  personalData: {
    fullName: string
    email: string
    phoneNumber: string
    birthDate: string // "YYYY-MM-DD"
    gender: "pria" | "wanita"
    job: string
    address: string
    cityId: string
    cityName: string
    provinceId: string
    provinceName: string
    ktpFileUrl?: string
    npwpFileUrl?: string
  }
  packageData: {
    packageId: string
    title: string
    organizationId: string
    organizationName: string
    price: number
    departureDate: string // "YYYY-MM-DD"
    arrivalDate: string   // "YYYY-MM-DD"
  }
  financing: {
    partnerId: string
    requestedAmount: number
    tenor: number
  }
}