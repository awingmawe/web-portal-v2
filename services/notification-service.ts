import { GetListQuery } from '@/constant/types/GeneralProps'
import { Notification } from '@/constant/types/NotificationProps'
import { apiWithAuth } from '@/services/common/http'
import qs from 'query-string'

export async function getListNotif(
  query: GetListQuery
): Promise<Notification[]> {
  try {
    let queryString = qs.stringify(query, { encode: false })

    if (query.readAt) {
      queryString = queryString.replace('readAt=isNull', 'readAt:isNull')
    }
    const response = await apiWithAuth.get(
      `/notification/v1/user-notification?${queryString}`
    )
    return response.data.results
  } catch (error) {
    console.error('Error fetching article detail:', error)
    throw error
  }
}

export async function postReadNotif(notificationId: number): Promise<number> {
  try {
    const response = await apiWithAuth.post(
      `/notification/v1/user-notification/${notificationId}/read`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
    throw error
  }
}
