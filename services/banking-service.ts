import { GetListQuery } from '@/constant/types/GeneralProps'
import {
  FinancingCalculationResponse,
  RequestPrePembiayaan,
  RequestSubmissionPembiayaan,
  ResponsePrePembiayaan,
  ResponseSubmissionPembiayaan,
} from '@/constant/types/Pembiayaan'
import { CoverageResponse, ResponseProvider } from '@/constant/types/Providers'
import {
  SubmissionCredit,
  SubmissionListResponse,
} from '@/constant/types/SubmissionPembiayaan'
import { RoomType } from '@/contexts/package-variant-context'
import { api, apiWithAuth, createServerApiClient } from '@/services/common/http'
import { AxiosResponse } from 'axios'
import qs from 'query-string'

export async function postSaving(payload: any): Promise<any> {
  try {
    const response = await apiWithAuth.post(
      `/banking/v1/submission/savings`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error create saving:', error)
    throw error
  }
}

export async function getSaving(): Promise<any> {
  try {
    const response = await apiWithAuth.get(
      `/banking/v1/submission/savings/current`
    )
    return response.data
  } catch (error) {
    console.error('Error create saving:', error)
    throw error
  }
}

export async function bankCredit(payload: any): Promise<any> {
  try {
    const response = await apiWithAuth.post(
      `/banking/v1/submission/credit`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error create credit:', error)
    throw error
  }
}

export async function getbankCredit(): Promise<any> {
  try {
    const response = await apiWithAuth.get(
      `/banking/v1/submission/credit/current`
    )
    return response.data
  } catch (error) {
    console.error('Error create credit:', error)
    throw error
  }
}

export async function getProviderPublic(
  query: GetListQuery
): Promise<AxiosResponse<ResponseProvider>> {
  return api.get(`/public/banking/v2/credit/providers?${qs.stringify(query)}`)
}

export async function createCalculateFinancing({
  totalAmount,
  tenor,
}: {
  totalAmount: number
  tenor: number
}): Promise<AxiosResponse<FinancingCalculationResponse>> {
  return api.post(`/public/banking/v2/credit/calculate-financing`, {
    totalAmount,
    tenor,
  })
}

export async function preCreatePembiayaan(
  data: RequestPrePembiayaan
): Promise<AxiosResponse<ResponsePrePembiayaan>> {
  return apiWithAuth.post(`/banking/v2/credit/pre-create`, data)
}

export async function submissionPembiayaan(
  data: RequestSubmissionPembiayaan
): Promise<AxiosResponse<ResponseSubmissionPembiayaan>> {
  return apiWithAuth.post(`/banking/v2/credit/submissions`, data)
}

export async function listSubmissionPembiayaan(
  query: GetListQuery
): Promise<AxiosResponse<SubmissionListResponse>> {
  return apiWithAuth.get(
    `/banking/v2/credit/submissions?${qs.stringify(query)}`
  )
}

export async function getProviders(
  query: GetListQuery
): Promise<AxiosResponse<ResponseProvider>> {
  return apiWithAuth.post(`/banking/v2/credit/providers?${qs.stringify(query)}`)
}

export async function getProviderByCoverage(
  providerId: number,
  query: GetListQuery
): Promise<AxiosResponse<CoverageResponse>> {
  return apiWithAuth.get(
    `/banking/v2/provider-coverage/by-provider/${providerId}?${qs.stringify(query)}`
  )
}

export async function submissionPembiayaanDetail(
  id: number,
  token?: string
): Promise<AxiosResponse<SubmissionCredit>> {
  const client = token ? createServerApiClient(token) : apiWithAuth

  return client.get(`/banking/v2/credit/submissions/${id}`)
}

export async function submissionChangePackage({
  id,
  packageVariantId,
  packageId,
  packageVariantName,
  roomType,
  totalPrice,
  jumlahJemaah,
  packageName,
}: {
  id: number
  packageVariantId: number
  packageName: string
  packageId: number
  packageVariantName: string
  roomType: RoomType
  totalPrice: number
  jumlahJemaah: number
}): Promise<AxiosResponse<any>> {
  return apiWithAuth.put(`/banking/v2/credit/submissions/${id}/edit-package`, {
    package_variant_id: packageVariantId,
    package_id: packageId,
    package_variant_name: packageVariantName,
    room_type: roomType,
    double: roomType?.double,
    triple: roomType?.triple,
    quad: roomType?.quad,
    total_price: totalPrice,
    jumlah_jemaah: jumlahJemaah,
    package_name: packageName,
  })
}
