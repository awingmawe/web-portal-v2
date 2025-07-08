import { api } from '@/services/common/http'
import { Airline, GetAirlinesParams } from '@/constant/types/AirlineProps'

import { Airport } from '@/constant/types/AirportProps'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import { Facility } from '@/constant/types/FacilityProps'
import {
  GalleryHomepage,
  HotelGalleryImage,
} from '@/constant/types/GalleryProps'
import qs from 'query-string'
import { GetLegalParams, Legal } from '@/constant/types/LegalProps'
import { Hotel } from '@/constant/types/HotelProps'
import { AxiosResponse } from 'axios'

export async function getAirportsV2(
  query: GetListQuery
): Promise<GenericResponse<Airport>> {
  try {
    const response = await api.get(
      `/public/umrah/v2/package/airport-package?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching airports:', error)
    throw error
  }
}

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

export async function getAirlineV2({
  page = 1,
  size = 10,
  search,
}: GetAirlinesParams): Promise<GenericResponse<Airline>> {
  try {
    const response = await api.get(`/public/umrah/v2/package/airline-package`, {
      params: {
        page,
        size,
        search,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching airline:', error)
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
    const response = await api.get(`/public/general/v1/reference?size=1000`, {
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
export async function getListHotel(
  query: GetListQuery
): Promise<GenericResponse<Hotel>> {
  try {
    const response = await api.get(
      `/public/general/v1/hotel?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching gallery hotel:', error)
    throw error
  }
}

export async function getHotelsWithGallery(
  hotelQuery: GetListQuery,
  galleryQuery: GetListQuery
): Promise<GenericResponse<Hotel>> {
  try {
    // Step 1: Fetch the list of hotels
    const hotelsResponse = await getListHotel(hotelQuery)

    if (!hotelsResponse.results || hotelsResponse.results.length === 0) {
      return hotelsResponse
    }

    // Step 2: Fetch gallery images for all hotels in parallel
    const hotelGalleryPromises = hotelsResponse.results.map(async (hotel) => {
      try {
        const galleryResponse = await getGalleryHotel(galleryQuery, hotel.id)
        return {
          ...hotel,
          hotelGallery: galleryResponse.results || [],
        }
      } catch (error) {
        console.error(`Error fetching gallery for hotel ${hotel.id}:`, error)
        // Return hotel without gallery if gallery fetch fails
        return {
          ...hotel,
          hotelGallery: [],
        }
      }
    })

    // Wait for all gallery requests to complete
    const hotelsWithGallery = await Promise.all(hotelGalleryPromises)

    return {
      ...hotelsResponse,
      results: hotelsWithGallery,
    }
  } catch (error) {
    console.error('Error fetching hotels with gallery:', error)
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

export async function getLegalSyarat(): Promise<GenericResponse<Airline>> {
  try {
    const response = await api.get(
      `/public/general/v1/legal?slug:likeLower=syarat-ketentuan`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching airline:', error)
    throw error
  }
}

export async function getLegalList(
  query: GetLegalParams
): Promise<GenericResponse<Legal>> {
  try {
    const response = await api.get(
      `/public/general/v1/legal?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching airline:', error)
    throw error
  }
}

export async function getGalleryHotelByHotelId(
  hotelId: number
): Promise<AxiosResponse<GenericResponse<HotelGalleryImage>>> {
  return api.get(`/public/general/v1/hotel-gallery/hotel/${hotelId}`)
}
