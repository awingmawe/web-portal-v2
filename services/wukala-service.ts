import { api, apiWithAuth } from '@/services/common/http'

export type WukalaSetting = {
  createdAt: string
  createdBy: string
  discountAmount: number
  discountType: string
  feeAmount: number
  feeType: string
  id: number
  modifiedAt: string
  modifiedBy: string
  referralCode: string
}
export async function checkReferralCode(referralCode: any, aldan) {
  try {
    const response = await apiWithAuth.get<any>(
      `/umrah/v1/wukala-setting/${referralCode}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching referall code:', error)
    throw error
  }
}

export async function checkReferralCodeToken(
  token: string,
  referralCode: string
) {
  try {
    const response = await api.get<WukalaSetting>(
      `/umrah/v1/wukala-setting/${referralCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching referall code:', error)
    throw error
  }
}
