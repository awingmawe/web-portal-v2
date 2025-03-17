import { api } from '@/services/common/http'
import { Banner } from '@/constant/types/BannerProps'
import { GenericResponse, GetListQuery } from '@/constant/types/GeneralProps'
import { Package, PriceParams } from '@/constant/types/PackageProps'
import qs from 'query-string'
import { TagPackages } from '@/constant/types/TagPackageProps'

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
