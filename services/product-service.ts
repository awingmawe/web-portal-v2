import { GenericResponseV2, GetListQuery } from '@/constant/types/GeneralProps'
import { City } from '@/constant/types/LocationProps'
import { Package } from '@/constant/types/PackageProps'
import { api } from '@/services/common/http'
import { AxiosResponse } from 'axios'
import qs from 'query-string'

export async function getKotaV2(
  query: GetListQuery
): Promise<AxiosResponse<GenericResponseV2<City>>> {
  return api.get(`/public/product/packages/cities?${qs.stringify(query)}`)
}
export async function getPackageListV2(
  query: GetListQuery
): Promise<AxiosResponse<GenericResponseV2<Package>>> {
  return api.get(`/public/product/packages?${qs.stringify(query)}`)
}
