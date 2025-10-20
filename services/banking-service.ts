import { GetListQuery } from '@/constant/types/GeneralProps'
import { ResponseProvider } from '@/constant/types/Providers'
import { api, apiWithAuth } from '@/services/common/http'
import { AxiosResponse } from 'axios'
import qs from 'query-string'

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

export async function getProvider(
  query: GetListQuery
): Promise<AxiosResponse<ResponseProvider>> {
  return api.get(`/public/banking/v2/credit/providers?${qs.stringify(query)}`)
}
