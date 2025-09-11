import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import { Notification } from '@/constant/types/NotificationProps'
import { apiWithAuth, createServerApiClient } from '@/services/common/http'
import qs from 'query-string'

export async function getListNotif(
  query: GetListQuery,
  token: string
): Promise<GenericResponse<Notification>> {
  try {
    let queryString = qs.stringify(query, { encode: false })

    if (query.readAt) {
      queryString = queryString.replace('readAt=isNull', 'readAt:isNull')
    }
    const client = token ? createServerApiClient(token) : apiWithAuth
    const response = await client.get(
      `/notification/v1/user-notification?${queryString}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching article detail:', error)
    throw error
  }
}

export async function postReadNotif(
  notificationId: string,
  token: string
): Promise<string> {
  try {
    const client = token ? createServerApiClient(token) : apiWithAuth
    const response = await client.post(
      `/notification/v1/user-notification/${notificationId}/read`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
    throw error
  }
}
