import {
  api,
  apiWithAuth,
  createFormData,
  createServerApiClient,
} from '@/services/common/http'
import { Banner } from '@/constant/types/BannerProps'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import {
  Package,
  PackageVariant,
  PriceParams,
  ToggleLike,
  TotalLike,
} from '@/constant/types/PackageProps'
import qs from 'query-string'
import { Tag, TagPackages } from '@/constant/types/TagPackageProps'
import { PackageGalleryImage } from '@/constant/types/GalleryProps'
import { Transaction } from '@/constant/types/Transaction'
import { PaymentStatement } from '@/constant/types/PaymentStatement'
import { PaymentTransaction } from '@/constant/types/PaymentTransaction'
import {
  Attachment,
  ManifestPayload,
  ManifestResult,
  ManifestUser,
} from '@/constant/types/ManifestProps'
import { AxiosProgressEvent, AxiosResponse } from 'axios'
import {
  PackagePersonalData,
  PackagePersonalDataResponse,
  RequestFormUmrahPersonal,
} from '@/constant/types/UmrahPersonalProps'
import { PaymentMethod } from '@/constant/types/PaymentMethod'

export async function getBanner(
  query: GetListQuery
): Promise<GenericResponse<Banner>> {
  try {
    const response = await api.get(
      `/public/umrah/v1/banner?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching banner:', error)
    throw error
  }
}

export async function getPackageList(
  query: GetListQuery
): Promise<GenericResponse<Package>> {
  try {
    const headers = {
      'X-Page-Url':
        typeof window === 'undefined'
          ? undefined
          : window.location.origin + '' + window.location.pathname,
    }
    const response = await api.get(
      `/public/umrah/v2.1/package?${qs.stringify(query)}`,
      { headers }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching package data list:', error)
    throw error
  }
}
export async function getPackageVariantList(
  query: any
): Promise<GenericResponse<PackageVariant>> {
  try {
    const response = await api.get(
      `/public/umrah/v1/package-variant?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching package variant data list:', error)
    throw error
  }
}

export async function getPackageDetail(slug: string): Promise<Package> {
  try {
    const response = await api.get(`/public/umrah/v1/package/slug/${slug}`)
    return response.data
  } catch (error) {
    console.error('Error fetching package detail:', error)
    throw error
  }
}

export async function getGalleryPackage(
  packageId: number
): Promise<PackageGalleryImage[]> {
  try {
    const response = await api.get(`/public/umrah/v1/package-gallery`, {
      params: {
        packageId,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching gallery package:', error)
    throw error
  }
}

export async function getMinMaxPrice(): Promise<PriceParams> {
  try {
    const response = await api.get(`/public/umrah/v1/package-variant/opt/price`)
    return response.data
  } catch (error) {
    console.error('Error fetching get min max price:', error)
    throw error
  }
}

export async function getTagPackagesEnum(
  typePackage?: string
): Promise<TagPackages[]> {
  try {
    const response = await api.get(
      `/public/umrah/v1/tag/stats/count?type=${typePackage}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching get tag packages enum:', error)
    throw error
  }
}
export async function getSectionEnum(
  typePackage?: string
): Promise<TagPackages[]> {
  try {
    const response = await api.get(
      `/public/umrah/v2/section/stats/count?type=${typePackage}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching get section packages enum:', error)
    throw error
  }
}

export async function getTransactionListUmrah(
  query: GetListQuery
): Promise<GenericResponse<Transaction>> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v1/booking?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching transaction umrah:', error)
    throw error
  }
}

export async function getTransactionListUmrahPersonal(
  query: GetListQuery
): Promise<GenericResponse<Transaction>> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v2/journey-information?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching transaction umrah:', error)
    throw error
  }
}

export async function getCheckListUmrah(
  query: GetListQuery
): Promise<GenericResponse<Transaction>> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v1/check-availability/data/list?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching transaction umrah:', error)
    throw error
  }
}

export async function getTransactionDetail(
  bookingId: string
): Promise<GenericResponse<Transaction>> {
  try {
    const response = await apiWithAuth.get(`/umrah/v2/booking/${bookingId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching transaction umrah:', error)
    throw error
  }
}

export async function getTransactionPersonalDetail(
  bookingId: string
): Promise<GenericResponse<Transaction>> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v2/journey-information/${bookingId}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching transaction Personal:', error)
    throw error
  }
}

export async function getPaymentStatement(
  bookingId: string
): Promise<PaymentStatement> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v1/booking/${bookingId}/payment-statement`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching payment statement:', error)
    throw error
  }
}

export async function getBookingId(
  bookingId: string,
  token: string
): Promise<any> {
  try {
    const client = token ? createServerApiClient(token) : apiWithAuth
    const response = await client.get(`/umrah/v1/booking/${bookingId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching booking detail:', error)
    throw error
  }
}

export async function getPaymentTransaction(
  bookingId: string
): Promise<PaymentTransaction> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v1/booking/${bookingId}/transaction?order=desc&orderBy=createdAt&size=1`
    )
    return response.data.results[0]
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
    throw error
  }
}

export async function getOrderPayment(
  bookingId: string
): Promise<PaymentTransaction> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v1/booking/${bookingId}/order-payment`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
    throw error
  }
}

export async function preBookingCreateCheckout(payload: {
  packageVariantId: number
  netAmount: number
  double: number
  referralCode: string
  triple: number
  quad: number
  paymentMethod?: PaymentMethod
}) {
  try {
    const response = await apiWithAuth.post<any>(
      `/umrah/v2/booking/pre-create`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
    throw error
  }
}
export async function preBookingCreateHajj(payload: {
  bookingId: number
  double: number
  triple: number
  quad: number
}) {
  try {
    const response = await apiWithAuth.post<any>(
      `/umrah/v2/booking/pre-hajj`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error fetching pre hajj:', error)
    throw error
  }
}
export async function createHajj(payload: {
  bookingId: number
  double: number
  triple: number
  quad: number
}) {
  try {
    const response = await apiWithAuth.post<any>(
      `/umrah/v2/booking/create-hajj`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error fetching create hajj:', error)
    throw error
  }
}
export async function preBookingCreateCheckoutUmrahPersonal(payload: {
  packagePersonalId: number
  netAmount: number
  double: number
  referralCode: string
  triple: number
  quad: number
}) {
  try {
    const response = await apiWithAuth.post<any>(
      `/umrah/v2/booking/personal-pre`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error fetching pre booking checkout umrah personal:', error)
    throw error
  }
}

export async function bookingCheckout(payload: {
  packageVariantId: number
  netAmount: number
  double: number
  referralCode: string
  triple: number
  quad: number
  paymentMethod?: PaymentMethod
}) {
  try {
    const response = await apiWithAuth.post<any>(
      `/umrah/v2/booking/create`,
      payload
    )
    return response
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
    throw error
  }
}
export async function bookingCheckoutUmrahPersonal(payload: {
  packagePersonalId: number
  netAmount: number
  double: number
  referralCode: string
  triple: number
  quad: number
}) {
  try {
    const response = await apiWithAuth.post<any>(
      `/umrah/v2/booking/personal-create`,
      payload
    )
    return response
  } catch (error) {
    console.error('Error fetching booking umrah personal checkout:', error)
    throw error
  }
}

export async function checkAvailibility(payload: any) {
  try {
    const response = await apiWithAuth.post<any>(
      `/umrah/v1/check-availability`,
      payload
    )
    return response
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
  }
}

// Manifest Fetch
export async function getManifestDetail(
  query: GetListQuery,
  token?: string
): Promise<GenericResponse<ManifestUser>> {
  try {
    // Use token if provided (server-side), otherwise use existing client (client-side)
    const client = token ? createServerApiClient(token) : apiWithAuth

    const response = await client.get(
      `/umrah/v1/booking-manifest?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching manifest detail:', error)
    throw error
  }
}

export async function getManifestDetailById(id: number): Promise<ManifestUser> {
  try {
    const response = await apiWithAuth.get(`/umrah/v1/booking-manifest/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching transaction detail:', error)
    throw error
  }
}

export async function updateDataManifest(
  id: number,
  payload: ManifestPayload
): Promise<ManifestResult> {
  try {
    const response = await apiWithAuth.put(
      `/umrah/v1/booking-manifest/${id}`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error fetching transaction detail:', error)
    throw error
  }
}

export async function uploadDokumen(
  file: File,
  type: string,
  bookingManifestId: number,
  onUploadProgress?: (progressEvent: ProgressEvent) => void
): Promise<Attachment> {
  const formData = createFormData([{ key: 'file', file }], {
    type,
    bookingManifestId: bookingManifestId.toString(),
  })

  try {
    const response = await apiWithAuth.post<Attachment>(
      '/umrah/v1/booking-manifest-attachment',
      formData,
      {
        onUploadProgress: onUploadProgress as unknown as (
          progressEvent: AxiosProgressEvent
        ) => void,
      }
    )
    return response.data
  } catch (error) {
    console.error('Error uploading document:', error)
    throw error
  }
}

export async function getWishlistList(
  query: GetListQuery
): Promise<GenericResponse<Package>> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v1/package-wishlist?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching wishlist data:', error)
    throw error
  }
}

export async function getTotalLikedPackage(
  packageId: number
): Promise<TotalLike> {
  const response = await api.get(
    `/public/umrah/v1/package-wishlist/${packageId}/total`
  )
  return response.data
}

export function getStatusLiked(packageId: number) {
  return apiWithAuth.get<boolean>(
    `/umrah/v1/package-wishlist/${packageId}/status`
  )
}

export function toggleLike(packageId: number) {
  return apiWithAuth.post<ToggleLike>('/umrah/v1/package-wishlist/toggle', {
    packageId: packageId,
  })
}

export async function getStatusStock(
  idVariant: any,
  token: string
): Promise<any> {
  const response = await api.get(
    `/umrah/v1/check-availability/checkstatus?idVariant=${idVariant}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data
}

export async function postNextPayment(
  bookingId: string,
  payload: any
): Promise<PaymentTransaction> {
  try {
    const response = await apiWithAuth.post(
      `/umrah/v1/booking/${bookingId}/next-payment`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
    throw error
  }
}
export async function getInvoiceTranasction(
  bookingCode: string
): Promise<string> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v1/invoice-transaction/${bookingCode}/print`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching invoice:', error)
    throw error
  }
}

export async function postManfestCommited(bookingCode: any): Promise<string> {
  try {
    const response = await apiWithAuth.post(
      `/umrah/v2/booking/commit-manifest/${bookingCode}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching invoice:', error)
    throw error
  }
}

export async function getPreCanceled(bookingCode: any): Promise<any> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v2/client/booking-canceled/pre-cancel/${bookingCode}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching invoice:', error)
    throw error
  }
}

export async function getPostCanceled(payload: any): Promise<any> {
  try {
    const response = await apiWithAuth.post(
      `/umrah/v2/client/booking-canceled/cancel-user`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error fetching invoice:', error)
    throw error
  }
}

export async function getPackageVariantById(
  id: any
): Promise<GenericResponse<PackageVariant>> {
  try {
    const response = await api.get(`/public/umrah/v1/package-variant/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching package variant data list:', error)
    throw error
  }
}

export async function getPackageById(
  id: any
): Promise<GenericResponse<Package>> {
  try {
    const response = await api.get(`/public/umrah/v1/package/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching package data list:', error)
    throw error
  }
}

export async function getTag(
  query: GetListQuery
): Promise<GenericResponse<Tag>> {
  try {
    const response = await api.get(
      `/public/umrah/v1/tag?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching tag list:', error)
    throw error
  }
}
export async function getTagById(id: number): Promise<Tag> {
  try {
    const response = await api.get(`/public/umrah/v1/tag/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching tag detail:', error)
    throw error
  }
}

export async function getPostReqRefund(payload: any): Promise<any> {
  try {
    const response = await apiWithAuth.post(
      `/umrah/v2/client/booking-canceled/req-refund`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error fetching invoice:', error)
    throw error
  }
}

export async function umrahPersonalRegister(payload: RequestFormUmrahPersonal) {
  try {
    const response = await apiWithAuth.post<any>(
      `/umrah/v2/journey-information`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error post umrah personal register:', error)
    throw error
  }
}

export async function getOfferUmrahPersonal(
  id: number,
  token: string
): Promise<PackagePersonalDataResponse> {
  try {
    const response = await api.get(
      `/umrah/v2/personal-package/package-by-journey/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error get offer umrah personal:', error)
    throw error
  }
}

export async function getOfferUmrahPersonalById(
  id: number
): Promise<AxiosResponse<PackagePersonalData>> {
  return apiWithAuth.get(`/umrah/v2/personal-package/${id}`)
}
