import { apiWithAuth } from '@/services/common/http'

export async function postSaving(payload: any): Promise<any> {
  try {
    const response = await apiWithAuth.post(
      `/banking/v1/submission/savings`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error create saving:', error)
    throw error
  }
}

export async function getSaving(): Promise<any> {
  try {
    const response = await apiWithAuth.get(
      `/banking/v1/submission/savings/current`
    )
    return response.data
  } catch (error) {
    console.error('Error create saving:', error)
    throw error
  }
}

export async function bankCredit(payload: any): Promise<any> {
  try {
    const response = await apiWithAuth.post(
      `/banking/v1/submission/credit`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error create credit:', error)
    throw error
  }
}

export async function getbankCredit(): Promise<any> {
  try {
    const response = await apiWithAuth.get(
      `/banking/v1/submission/credit/current`
    )
    return response.data
  } catch (error) {
    console.error('Error create credit:', error)
    throw error
  }
}
