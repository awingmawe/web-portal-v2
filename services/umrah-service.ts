import { api, apiWithAuth } from '@/services/common/http'
import { Banner } from '@/constant/types/BannerProps'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import {
  Package,
  PackageVariant,
  PriceParams,
} from '@/constant/types/PackageProps'
import qs from 'query-string'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { PackageGalleryImage } from '@/constant/types/GalleryProps'
import { Transaction } from '@/constant/types/Transaction'
import { PaymentStatement } from '@/constant/types/PaymentStatement'
import { PaymentTransaction } from '@/constant/types/PaymentTransaction'

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
      `/public/umrah/v2/package?${qs.stringify(query)}`
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

export async function getManifestDetail(
  query: GetListQuery
): Promise<GenericResponse<Transaction>> {
  try {
    const response = await apiWithAuth.get(
      `/umrah/v1/booking-manifest?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching transaction umrah:', error)
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
