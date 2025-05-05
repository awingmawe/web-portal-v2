import { api } from '@/services/common/http'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import qs from 'query-string'
import { Travel } from '@/constant/types/TravelProps'
import { City } from '@/constant/types/LocationProps'

export async function getTravels(
  query: GetListQuery
): Promise<GenericResponse<Travel>> {
  try {
    const response = await api.get(
      `/public/identity/v1/organization-instance-selected/published?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching travel:', error)
    throw error
  }
}

export async function getKota(
  query: GetListQuery
): Promise<GenericResponse<City>> {
  try {
    const response = await api.get(
      `/public/identity/location/city?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching kota:', error)
    throw error
  }
}
export async function checkRefundPolicy(id: any) {
  try {
    const response = await api.get(`/public/identity/refund-policy/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching kota:', error)
    throw error
  }
}
