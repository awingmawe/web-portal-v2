import { HotelGalleryImage } from '@/constant/types/GalleryProps'

export interface Hotel {
  id: number
  logo: string
  name: string
  cityId: number
  rating: number
  address: string
  cityName: string
  latitude: string
  longitude: string
  hotelDestination: HotelDestination[]
  hotelGallery?: HotelGalleryImage[]
}

export interface HotelDestination {
  id: number
  hotelId: number
  distance: number
  priority: boolean
  createdAt: string
  createdBy: string
  modifiedAt: string
  modifiedBy: string | null
  destinationName: string
}
