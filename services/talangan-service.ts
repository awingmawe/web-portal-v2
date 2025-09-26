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
      console.error('getCreditProviders error:', error.message)
      
      // Return mock data if backend is not ready
      if (error.response?.status === 500 || error.response?.data?.errorMessage?.includes('PRISMA_DATABASE_URL')) {
        console.log('Backend not ready, using mock data')
        const mockProviders = [
          {
            id: 'permata-bank',
            name: 'Permata Bank',
            code: 'PB',
            logo: null,
            description: 'Proses persetujuan 1-2 hari kerja',
            features: ['Proses cepat', 'Bunga kompetitif'],
            terms: {
              minTenor: 12,
              maxTenor: 36,
              minAmount: 5000000,
              maxAmount: 100000000,
              interestRate: 1.5,
              adminFee: 50000
            },
            requirements: [
              'Memiliki rekening Tabungan Permata Bank yang aktif minimal 3 bulan atau kartu kredit dari bank manapun',
              'Jika jumlah talangan yang disetujui lebih kecil dari pengajuan, maka selisihnya akan menjadi DP (Down Payment) atau uang muka'
            ],
            status: 'active'
          },
          {
            id: 'bfi-finance',
            name: 'BFI Finance',
            code: 'BFI',
            logo: null,
            description: 'Khusus untuk mitra travel terpilih',
            features: ['Tenor fleksibel', 'Proses mudah'],
            terms: {
              minTenor: 6,
              maxTenor: 24,
              minAmount: 3000000,
              maxAmount: 75000000,
              interestRate: 2.0,
              adminFee: 75000
            },
            requirements: [
              'Memiliki penghasilan tetap minimal Rp 3.000.000 per bulan',
              'Proses persetujuan maksimal 2 hari kerja setelah dokumen lengkap'
            ],
            status: 'active'
          }
        ]
        return { success: true, data: mockProviders }
      }
      
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  },

  // Submit credit application to production API
  async submitCreditApplication(data: CreditSubmissionRequest) {
    try {
      const response = await apiWithAuth.post('/banking/v2/credit/submissions', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('submitCreditApplication error:', error)
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
      console.error('getCreditSubmissions error:', error)
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
      console.error('checkEligibility error:', error)
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  },

  // Simulate payment calculation
  async simulatePayment(data: SimulationRequest) {
    try {
      const response = await apiWithAuth.post('/api/talangan/simulation', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('simulatePayment error:', error)
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  },

  // Submit application
  async submitApplication(data: ApplicationRequest) {
    try {
      const response = await apiWithAuth.post('/api/talangan/submit-application', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('submitApplication error:', error)
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
      console.log('getUserApplications error:', error)
      // If 404, return empty data instead of error
      if (error.response?.status === 404) {
        return { success: true, data: { applications: [], total: 0 } }
      }
      return { success: false, error: error.response?.data || { message: error.message } }
    }
  }
}