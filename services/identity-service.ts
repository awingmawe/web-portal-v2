import { api, apiWithAuth } from '@/services/common/http'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import qs from 'query-string'
import { Organization, Travel } from '@/constant/types/TravelProps'
import { City } from '@/constant/types/LocationProps'
import { Profile } from '@/contexts/auth/shared/type'

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

export async function getTravelById(id: number): Promise<Organization> {
  try {
    const response = await api.get(
      `/public/identity/v1/organization-instance/${id}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching travel by id:', error)
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
export async function getProvince(
  query: GetListQuery
): Promise<GenericResponse<any>> {
  try {
    const response = await api.get(
      `/public/identity/location/province?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching kota:', error)
    throw error
  }
}
export async function updateProfile(payload: Profile): Promise<Profile> {
  try {
    const response = await apiWithAuth.put(`/identity/my-profile`, payload)
    return response.data
  } catch (error) {
    console.error('Error update profile:', error)
    throw error
  }
}

export async function changeBankOtp(): Promise<string> {
  try {
    const response = await apiWithAuth.get(
      `/identity/verification/otp/change-bank`
    )
    return response.data
  } catch (error) {
    console.error('Error update bank:', error)
    throw error
  }
}
export async function changeBank(payload: {
  otp: string
  bankLogo: string
  accountBank: string
  accountNumber: string
  accountName: string
}): Promise<string> {
  try {
    const response = await apiWithAuth.post(
      `/identity/verification/verify-change-bank`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error update bank:', error)
    throw error
  }
}

export async function addPasswordOtp(): Promise<string> {
  try {
    const response = await apiWithAuth.get(
      `/identity/verification/otp/add-password`
    )
    return response.data
  } catch (error) {
    console.error('Error get password otp:', error)
    throw error
  }
}

export async function changePassword(payload: {
  newPassword: string
  oldPassword: string
}): Promise<string> {
  try {
    const response = await apiWithAuth.put(
      `/identity/my-profile/change-password`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error update password:', error)
    throw error
  }
}

export async function firstSetPassword(payload: {
  newPassword: string
  otp: string
}): Promise<string> {
  try {
    const response = await apiWithAuth.put(
      `/identity/my-profile/first-set-password`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error update password:', error)
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

export async function verifyEmailOtp(): Promise<string> {
  try {
    const response = await apiWithAuth.get(
      `/identity/verification/otp/email-verification`
    )
    return response.data
  } catch (error) {
    console.error('Error get otp verify email:', error)
    throw error
  }
}

export async function verifyEmail(payload: {
  otp: string
  purpose: string | null
  email: string | null
}): Promise<string> {
  try {
    const response = await apiWithAuth.post(
      `/identity/verification/verify-email`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error get otp verify email:', error)
    throw error
  }
}

export async function changeEmailOtp(payload: {
  email: string
}): Promise<string> {
  try {
    const response = await apiWithAuth.post(
      `/identity/verification/otp/change-email`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error get otp verify email:', error)
    throw error
  }
}

export async function changePhoneOtp(payload: {
  phoneNumber: string
}): Promise<string> {
  try {
    const response = await apiWithAuth.post(
      `/identity/verification/otp/change-phonenumber`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error get otp change phone number:', error)
    throw error
  }
}

export async function updatePhoneNumber(payload: {
  otp: string
  phoneNumber: string
}): Promise<string> {
  try {
    const response = await apiWithAuth.post(
      `/identity/verification/verify-change-phonenumber`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error get otp change phone number:', error)
    throw error
  }
}

export async function getUserById(id: number): Promise<Profile> {
  try {
    const response = await api.get(`/public/identity/user-account/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching profile detail:', error)
    throw error
  }
}

export async function verifyEmailOtpBookingCanceled(): Promise<string> {
  try {
    const response = await apiWithAuth.get(
      `/identity/verification/otp/booking-canceled`
    )
    return response.data
  } catch (error) {
    console.error('Error get otp verify email:', error)
    throw error
  }
}
