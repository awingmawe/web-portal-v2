// Individual simulation entry
export interface Simulation {
  tenor: number
  total_pembiayaan: number
  angsuran_perbulan: number
}

// Provider organization instance
interface ProviderOrganizationInstance {
  organizationInstanceId: string
}

// Main provider data
export interface Provider {
  id: number
  name: string
  isActive: boolean
  logo: string
  description: string
  provider_type: 'Bank' | 'Leasing' | string // Add more types as needed
  provider_credit: boolean
  provider_saving: boolean
  insentif_fee: string
  admin_fee: string | null
  specific_travel: boolean
  tenor_list: number[]
  by_coverage_area: boolean
  createdAt: string // ISO 8601 date string
  modifiedAt: string // ISO 8601 date string
  deleted: boolean | null
  providerOrganizationInstances: ProviderOrganizationInstance[]
  supported_organizations: string[]
  available_tenors: number[]
  simulation: Simulation[]
  coverage_area: boolean
}

// Pagination metadata
export interface ResponseProvider {
  total: number
  page: number
  size: number
  totalPages: number
  data: Provider[]
}

export interface ProviderCoverage {
  id: number
  name: string
  logo: string
  provider_type: string
}

export interface Coverage {
  id: number
  provider_id: number
  city_id: string
  city_name: string
  district_id: string
  district_name: string
  createdAt: string
  modifiedAt: string
  provider: ProviderCoverage
}

export interface CoverageResponse {
  provider: Provider
  coverages: Coverage[]
  total: number
}
