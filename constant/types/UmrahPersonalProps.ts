import { Airline } from '@/constant/types/AirlineProps'
import { HotelDestination } from '@/constant/types/HotelProps'
import { City } from '@/constant/types/LocationProps'

type FlightClass = 'economic' | 'business' | 'first-class'

type FlightRoute = 'direct' | 'transit'

type JourneyType = 'umrah-regular' | 'umrah-plus-trip'

type ActivityType = 'mecca' | 'mecca-medina'

export type JourneyStatus =
  | 'offers-available'
  | 'waiting-offers'
  | 'no-offers'
  | 'offer-expired'
  | 'waiting-payment'
  | 'offer-selected'
  | 'canceled'

export interface ExtendedHotel {
  id: number
  city: {
    id: number
    name: string
  }
  name: string
  country: {
    id: number
    name: string
  }
  latitude: string
  longitude: string
  hotelDestination: HotelDestination[]
}

export interface ExtendedFlight {
  id: number
  code: string
  logo: string
  name: string
  countryId: number
  createdAt: string
  createdBy: string
  modifiedAt: string
  modifiedBy: string
  countryName: string
  cityName: string
}

export interface HotelSelection {
  rating: number
  selectedHotel: ExtendedHotel
}

export interface Vehicle {
  code: string
  name: string
}

export interface MarketingFee {
  quad: number
  double: number
  triple: number
}

export interface RequestFormUmrahPersonal {
  journeyType: string
  activity: string
  createVisa: boolean
  useInsurance: boolean
  departureDate: string
  arrivalDate: string
  totalManifest: number
  departure: {
    from: number
    to: number
    airline: number
    flightClass: FlightClass
    flightRoute: FlightRoute
  }
  arrival: {
    from: number
    to: number
    airline: number
    flightClass: FlightClass
    flightRoute: FlightRoute
  }
  meccaHotel: number
  medinaHotel: number
  transportation: number
}

export interface FlightInfo {
  to: ExtendedFlight
  from: ExtendedFlight
  airline: Airline
  flightClass: FlightClass
  flightRoute: FlightRoute
}

export interface JourneyInformation {
  id: number
  name: string
  journeyCode: string
  journeyType: JourneyType
  activity: ActivityType
  createVisa: boolean
  useInsurance: boolean
  departureDate: string
  arrivalDate: string
  totalManifest: number
  departure: FlightInfo
  arrival: FlightInfo
  meccaHotel: HotelSelection
  medinaHotel: HotelSelection
  transportation: { vehicle: Vehicle }
  status: JourneyStatus
  approved: boolean
  approvedAt: string
  expiresAt: string | null
  note: string | null
  createdAt: string
  createdBy: string
  modifiedAt: string
  modifiedBy: string
}

// Package personal data interface
export interface PackagePersonalData {
  id: number
  journeyInformationId: number
  organizationId: string
  organizationInstanceId: number
  departure: FlightInfo
  arrival: FlightInfo
  meccaHotel: HotelSelection
  medinaHotel: HotelSelection
  transportation: { vehicle: Vehicle }
  marketingFee: MarketingFee
  currency: string
  priceDouble: string
  priceTriple: string
  priceQuad: string
  originalPriceDouble: string | null
  originalPriceTriple: string | null
  originalPriceQuad: string | null
  expiredDate: string
  note: string
  dpAmount: number
  published: boolean
  createdBy: string
  modifiedBy: string
  modifiedAt: string
  JourneyInformation: JourneyInformation
  createdAt: string
  isExpired: boolean
  orgThumbnail: string | null
  orgName: string
  orgCity: City
  image: string
  isBooked?: boolean
}

// Main response interface
export interface PackagePersonalDataResponse {
  packagePersonalData: PackagePersonalData[]
  totalOffers: number
}
