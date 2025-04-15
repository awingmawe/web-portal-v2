import { api } from '@/services/common/http'
import { Airline, GetAirlinesParams } from '@/constant/types/AirlineProps'

import { Airport, GetAirportsParams } from '@/constant/types/AirportProps'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import { Facility } from '@/constant/types/FacilityProps'
import {
  GalleryHomepage,
  HotelGalleryImage,
} from '@/constant/types/GalleryProps'
import qs from 'query-string'

export async function getAirports({
  page = 1,
  size = 10,
  search,
}: GetAirportsParams): Promise<GenericResponse<Airport>> {
  try {
    const response = await api.get(`/public/general/v1/airport`, {
      params: {
        page,
        size,
        [`cityName|code|name:likeLower`]: search ? `%${search}%` : undefined,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching airports:', error)
    throw error
  }
}

export async function getAirline({
  page = 1,
  size = 10,
  search,
}: GetAirlinesParams): Promise<GenericResponse<Airline>> {
  try {
    const response = await api.get(`/public/general/v1/airline`, {
      params: {
        page,
        size,
        [`code|countryName|name:likeLower`]: search ? `%${search}%` : undefined,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching airline:', error)
    throw error
  }
}

export async function getFacilityEnum(
  type?: string
): Promise<GenericResponse<Facility>> {
  try {
    const response = await api.get(`/public/general/v1/reference`, {
      params: {
        type,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching facility:', error)
    throw error
  }
}

export async function getGalleryHotel(
  query: GetListQuery,
  hotelId: number
): Promise<GenericResponse<HotelGalleryImage>> {
  try {
    const response = await api.get(
      `/public/general/v1/hotel-gallery/hotel/${hotelId}?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching gallery hotel:', error)
    throw error
  }
}

export async function getGalleryHomepage(
  query: GetListQuery
): Promise<GenericResponse<GalleryHomepage>> {
  try {
    const response = await api.get(
      `/public/general/v1/gallery?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching gallery homepage:', error)
    throw error
  }
}
