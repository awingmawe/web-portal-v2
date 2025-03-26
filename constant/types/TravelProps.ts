import { Airline } from '@/constant/types/AirlineProps'
import { AirportReference } from '@/constant/types/AirportProps'
import { City, Country, Province } from '@/constant/types/LocationProps'

export interface Travel {
  id: number
  organizationInstance: {
    id: number
    thumbnail: string
    name: string
    city: {
      name: string
    }
    legalInformation: {
      pihk: string
      ppiu: string
    }
    tagline: string
    directContact: false
    bdm: any
    phoneNumber: string
    slug: any
    description: string
  }
}

export interface OrganizationInstance {
  id: number
  name: string
  slug: string
  type: string
  email: string
  cityId: string
  address: string
  tagline: string
  isActive: boolean
  createdAt: string
  phoneNumber: string
  countryId: string
  provinceId: string
  thumbnail: string
  description: string
  organizationId: string
  directContact: boolean
  legalInformation: LegalInformation
  bdm?: UserBdm
  city: City
  province: Province
  country: Country
  agreement?: Agreement
  organization: Organization
}

export interface Agreement {
  id: number
  fileName: string
  signedAt: string
  signedBy: string
  validUntil: string
  isCanceled: boolean
  organizationInstanceId: number
}

export interface LegalInformation {
  pihk: string
  ppiu: string
}
export interface Organization {
  id: string
  name: string
  slug: string
  isActive: boolean
  thumbnail: string | null
  description: string
}

export interface TravelRoute {
  from: AirportReference
  to: AirportReference
  airline: Airline
  airlineId: number
}

export interface GetTravelParams {
  page?: number
  size?: number
}

export interface UserBdm {
  id: string
  name: string
  username: string
  email: string
  role: string
  isActive: boolean
  emailVerified: boolean
  avatar: string | null
  avatarProvider: string | null
  provider: string
  createdAt: string
  modifiedAt: string
  createdBy: string | null
  modifiedBy: string | null
  googleId: string | null
  persona: {
    id: string
    gender: string
    born: string
    phoneNumber: string
    modifiedAt: string
    modifiedBy: string | null
    address: string | null
    job: string | null
    travelId: string | null
    desc: string | null
    code: string | null
    fee: number | null
    webVisit: number | null
    activatedAt: string | null
    discount: number | null
    parentId: string | null
    feeType: string | null
    discountType: string | null
    bdmUserId: string | null
    alias: string | null
    identityNumber: string
    instagram: string | null
    accountBank: string | null
    accountNumber: string | null
    accountName: string | null
    approvedBy: string | null
    approvedAt: string | null
    nik: string | null
    provinceId: string | null
    cityId: string | null
  }
}
