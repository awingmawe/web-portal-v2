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

  const [dataMinMax, dataTagPackages, dataFacility, dataSection] =
    await Promise.all([
      getMinMaxPrice(),
      getTagPackagesEnum(),
      getFacilityEnum('umrah-facility'),
      getSectionEnum(),
    ])

  return (
    <TalanganPackageSelection
      token={token}
      dataMinMax={dataMinMax}
      dataTagPackages={dataTagPackages}
      dataFacility={dataFacility}
      dataSection={dataSection}
    />
  )
}