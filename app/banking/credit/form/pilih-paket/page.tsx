import { metadata } from '@/app/shared-metadata'
import TalanganPackageSelection from '@/components/pages/banking/TalanganForm/TalanganPackageSelection'
import { cookieNames } from '@/services/common/cookie'
import { getFacilityEnum } from '@/services/general-service'
import { getKota } from '@/services/identity-service'
import {
  getMinMaxPrice,
  getSectionEnum,
  getTagPackagesEnum,
} from '@/services/umrah-service'
import { cookies } from 'next/headers'

export async function generateMetadata() {
  return {
    ...metadata(
      'Pilih Paket Umroh - Talangan Muslim101',
      'Pilih paket umroh untuk pengajuan talangan Muslim101'
    ),
  }
}

export default async function TalanganPilihPaketPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const [priceParams, dataTagPackages, dataFacility, dataSection, dataKota] =
    await Promise.all([
      getMinMaxPrice(),
      getTagPackagesEnum(),
      getFacilityEnum('umrah-facility'),
      getSectionEnum(),
      getKota({ page: 1, size: 100, orderBy: 'name', order: 'desc' }),
    ])

  // Keep priceParams as PriceParams for FilterLeftbar compatibility
  const dataMinMax = priceParams

  // Keep original data structure since FilterLeftbar expects it
  const transformedTagPackages = dataTagPackages
  const transformedFacilities = dataFacility
  const transformedSections = dataSection

  return (
    <TalanganPackageSelection
      token={token}
      dataMinMax={dataMinMax}
      dataTagPackages={transformedTagPackages}
      dataFacility={transformedFacilities}
      dataSection={transformedSections}
      dataKota={dataKota}
    />
  )
}
