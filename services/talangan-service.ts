import { apiWithAuth } from '@/services/common/http'
import { setAccessToken, getAccessToken } from '@/services/common/auth'
import { 
  CreditProvider, 
  CreditSubmission, 
  TalanganPartner, 
  EligibilityRequest, 
  SimulationRequest, 
  CreditSubmissionRequest, 
  ApplicationRequest 
} from '@/constant/types/TalanganProps'

// Use the existing apiWithAuth client which already handles auth and CORS

// API Services using existing HTTP client
export const talanganService = {
  // Get all available credit providers from production API
  async getCreditProviders() {
    try {
      const response = await apiWithAuth.get('/banking/v2/credit/providers')
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  },

  // Submit credit application to production API
  async submitCreditApplication(data: CreditSubmissionRequest) {
    try {
      const response = await apiWithAuth.post('/banking/v2/credit/submissions', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  },

  // Get user credit submissions
  async getCreditSubmissions(params?: { page?: number; limit?: number; status?: string }) {
    try {
      const queryString = new URLSearchParams(params as any).toString()
      const response = await apiWithAuth.get(`/banking/v2/credit/submissions${queryString ? `?${queryString}` : ''}`)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  },

  // Legacy methods for backward compatibility
  async getPartners() {
    const result = await this.getCreditProviders()
    if (result.success && result.data) {
      // Transform new format to old format if needed
      const partners = result.data.map((provider: CreditProvider) => ({
        id: provider.id,
        name: provider.name,
        logo: provider.logo,
        color: '#3B82F6', // Default color
        abbreviation: provider.code || provider.name.split(' ').map(w => w[0]).join(''),
        isActive: provider.status === 'active',
        tenorOptions: provider.terms ? 
          Array.from({ length: (provider.terms.maxTenor - provider.terms.minTenor) / 6 + 1 }, 
            (_, i) => provider.terms!.minTenor + i * 6) : [12, 24, 36],
        maxLimit: provider.terms?.maxAmount || 100000000,
        minLimit: provider.terms?.minAmount || 5000000,
        interestRate: provider.terms?.interestRate || 1.5,
        adminFee: provider.terms?.adminFee || 50000,
        requirements: provider.requirements || [],
        notes: provider.description
      }))
      return { success: true, data: partners }
    }
    return result
  },

  // Check eligibility for financing
  async checkEligibility(data: EligibilityRequest) {
    try {
      const response = await apiWithAuth.post('/api/talangan/eligibility-check', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  },

  // Simulate payment calculation
  async simulatePayment(data: SimulationRequest) {
    try {
      const response = await apiWithAuth.post('/api/talangan/simulation', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  },

  // Submit application
  async submitApplication(data: ApplicationRequest) {
    try {
      const response = await apiWithAuth.post('/api/talangan/submit-application', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  },

  // Get user applications
  async getUserApplications(page = 1, size = 10) {
    try {
      // Try new credit submissions endpoint first
      const response = await apiWithAuth.get(`/banking/v2/credit/submissions?page=${page}&limit=${size}`)
      return { success: true, data: response.data }
    } catch (error: any) {
      // If 404, return empty data instead of error
      if (error.response?.status === 404) {
        return { success: true, data: { applications: [], total: 0 } }
      }
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  }
}