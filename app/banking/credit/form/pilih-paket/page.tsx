import { metadata } from '@/app/shared-metadata'
import TalanganPackageSelection from '@/components/pages/banking/TalanganForm/TalanganPackageSelection'
import { cookieNames } from '@/services/common/cookie'
import { getFacilityEnum } from '@/services/general-service'
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

  const [priceParams, dataTagPackages, dataFacility, dataSection] =
    await Promise.all([
      getMinMaxPrice(),
      getTagPackagesEnum(),
      getFacilityEnum('umrah-facility'),
      getSectionEnum(),
    ])

  // Transform PriceParams to DataMinMax
  const dataMinMax = {
    minAmount: parseInt(priceParams.min) || 0,
    maxAmount: parseInt(priceParams.max) || 100000000,
    minTenor: 6,
    maxTenor: 36,
  }

  // Transform TagPackages to TagPackage (convert id from number to string)
  const transformedTagPackages = dataTagPackages.map(tag => ({
    ...tag,
    id: tag.id.toString(),
  }))

  // Transform facilities and sections similarly
  const transformedFacilities = dataFacility.results?.map(facility => ({
    ...facility,
    id: facility.id.toString(),
  })) || []

  const transformedSections = dataSection.map(section => ({
    ...section,
    id: section.id.toString(),
  }))

  return (
    <TalanganPackageSelection
      token={token}
      dataMinMax={dataMinMax}
      dataTagPackages={transformedTagPackages}
      dataFacility={transformedFacilities}
      dataSection={transformedSections}
    />
  )
}