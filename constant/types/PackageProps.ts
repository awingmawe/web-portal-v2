import { Facility, OthersFacilities } from '@/constant/types/FacilityProps'
import { Hotel } from '@/constant/types/HotelProps'
import { AdditionalCountry } from '@/constant/types/LocationProps'
import { OrganizationInstance, TravelRoute } from '@/constant/types/TravelProps'

export interface PackageVariant {
  soldCount: number
  id: number
  name?: string
  priceQuad: number
  priceDouble: number
  priceTriple: number
  discountType: string
  discountAmount: number | string
  departureDate: string
  arrivalDate: string
  isLastCall: boolean
  releasedAt: string
  originalPriceQuad: number
  originalPriceDouble: number
  originalPriceTriple: number
}

export interface PriceParams {
  min: string
  max: string
}

export interface CardData {
  id: number
  src: string
  discount: string | number
  discountType: string
  title: string
  location: string
  district: string
  organizationName: string
  originalPrice: string
  price: string
  rating: string | number
  slugOrganization: string
  slugPackage: string
  isLastCall: boolean
  isPlus: boolean
  departureDate: string
  arrivalDate: string
  codeCountry?: AdditionalCountry[]
  releasedAt: string
  packageType: string
}

export interface PackageDetail {
  id: number
  packageId: number
  description: string
  termsCondition: string
  facility: string
  additionalInfo: {
    facilities: Facility[]
    otherFacilities: OthersFacilities[]
  }
}

export interface PackageItinerary {
  id: number
  packageId: number
  agenda: Agenda[]
  createdAt: string
  modifiedAt: string
  createdBy: string
  modifiedBy: string
}

export interface Activities {
  time: string
  activity: string
  location: string
  image?: string
}

export interface Agenda {
  title: string
  activities: Activities[]
}

export interface Package {
  id: number
  organizationId: string
  organizationInstanceId: number
  organizationInstanceName: string
  organizationInstance: OrganizationInstance
  packageType: string
  thumbnail: string
  title: string
  slug: string
  description: string
  termsCondition: string
  facility: string
  currency: string
  medinaHotel: Hotel
  meccaHotel: Hotel
  departure: TravelRoute
  arrival: TravelRoute
  published: boolean
  dpType: string
  dpAmount: number
  feeType: string
  feeAmount: number
  deleted: boolean
  createdAt: string
  createdBy: string
  modifiedAt: string
  modifiedBy: string
  isPlus: boolean
  packageVariant: PackageVariant
  tagPackage: null | any
  additionalCountry?: AdditionalCountry[]
  // New attributes
  itinerary?: PackageItinerary
  detail: PackageDetail
  tag?: null | any
}
