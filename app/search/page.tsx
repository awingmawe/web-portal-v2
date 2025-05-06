import { metadata } from '@/app/shared-metadata'
import SearchTopbar from '@/components/pages/search-packages/1-SearchTopbar/SearchTopbar'
import FilterLeftbar from '@/components/pages/search-packages/2-FilterLeftbar'
import { PackageResults } from '@/components/pages/search-packages/3-PackageList/PackageList'
import BottomNavigation from '@/components/pages/search-packages/mobile/BottomFilterMobile/BottomFilter'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { getFacilityEnum } from '@/services/general-service'
import { getMinMaxPrice, getTagPackagesEnum } from '@/services/umrah-service'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: any
}) {
  const resolvedSearchParams = await searchParams
  return {
    ...metadata(
      'Muslim 101 | Daftar Paket Muslim101',
      `Daftar pencarian paket ${resolvedSearchParams.query || ''}`
    ),
  }
}

export default async function SearchGeneral() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const [dataMinMax, dataTagPackages, dataFacility] = await Promise.all([
    getMinMaxPrice(),
    getTagPackagesEnum(),
    getFacilityEnum('umrah-facility'),
  ])

  return (
    <Fragment>
      <Topbar type="normal" token={token} />
      <SearchTopbar />
      <main className="my-7.5 max-lg:fixed max-lg:mt-auto max-lg:mb-0 max-lg:h-[100vh] max-lg:w-full max-lg:overflow-hidden max-lg:bg-transparent">
        <MobileTopbar variant="filter" showBackButton />
        <section className="scrollbar-hide container mx-auto grid grid-cols-12 gap-5 max-lg:absolute max-lg:top-[55px] max-lg:bottom-0 max-lg:z-11 max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:overflow-y-auto max-lg:rounded-tl-3xl max-lg:rounded-tr-3xl max-lg:bg-white max-lg:px-4 max-lg:py-7.5 max-lg:pb-[130px] max-lg:shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]">
          <div className="col-span-4 max-lg:hidden">
            <FilterLeftbar
              dataMinMax={dataMinMax}
              dataTagPackages={dataTagPackages}
              dataFacility={dataFacility}
            />
          </div>
          <div className="col-span-8 max-lg:col-span-12">
            <PackageResults />
          </div>
        </section>
      </main>
      <BottomNavigation
        dataMinMax={dataMinMax}
        dataFacility={dataFacility}
        dataTagPackages={dataTagPackages}
      />
    </Fragment>
  )
}
