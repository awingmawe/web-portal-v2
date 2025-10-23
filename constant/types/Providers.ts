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
  logo: string | null
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
}

// Pagination metadata
export interface ResponseProvider {
  total: number
  page: number
  size: number
  totalPages: number
  data: Provider[]
}
