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
import { TagPackages } from '@/constant/types/TagPackageProps'
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
import { AxiosProgressEvent } from 'axios'

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
    const response = await api.get(
      `/public/umrah/v2_1/package?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching package data list:', error)
    throw error
  }
}
export async function getPackageVariantList(
  query: GetListQuery
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

export async function getTagPackagesEnum(): Promise<TagPackages[]> {
  try {
    const response = await api.get(`/public/umrah/v1/tag/stats/count`)
    return response.data
  } catch (error) {
    console.error('Error fetching get tag packages enum:', error)
    throw error
  }
}
export async function getSectionEnum(): Promise<TagPackages[]> {
  try {
    const response = await api.get(`/public/umrah/v2/section/stats/count`)
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

export async function preBookingCheckout(payload: any) {
  try {
    const response = await apiWithAuth.post<any>(
      `/umrah/v2/booking/pre`,
      payload
    )
    return response.data
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
    throw error
  }
}

export async function bookingCheckout(payload: any) {
  try {
    const response = await apiWithAuth.post<any>(`/umrah/v2/booking`, payload)
    return response
  } catch (error) {
    console.error('Error fetching payment transaction:', error)
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
