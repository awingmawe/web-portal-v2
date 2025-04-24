import { apiWithAuth } from '@/services/common/http'

export async function checkReferralCode(referralCode: any) {
  try {
    const response = await apiWithAuth.get<any>(
      `/umrah/v1/wukala-setting/${referralCode}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
    throw error
  }
}
