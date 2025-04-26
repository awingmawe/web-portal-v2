import { metadata } from '@/app/shared-metadata'
import SearchTopbar from '@/components/pages/search-packages/1-SearchTopbar/SearchTopbar'
import FilterLeftbar from '@/components/pages/search-packages/2-FilterLeftbar'
import { PackageResults } from '@/components/pages/search-packages/3-PackageList/PackageList'
import BottomNavigation from '@/components/pages/search-packages/mobile/BottomFilter'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { mapProductsToCardData } from '@/lib/utils'
import { cookieNames } from '@/services/common/cookie'
import { getFacilityEnum } from '@/services/general-service'
import {
  getMinMaxPrice,
  getPackageList,
  getTagPackagesEnum,
} from '@/services/umrah-service'
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

export default async function SearchGeneral({
  searchParams,
}: {
  searchParams: any
}) {
  const awaitedParams = await searchParams
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const [dataMinMax, dataTagPackages, dataFacility] = await Promise.all([
    getMinMaxPrice(),
    getTagPackagesEnum(),
    getFacilityEnum('umrah-facility'),
  ])

  const page = parseInt(awaitedParams.page || '1', 10)
  const size = parseInt(awaitedParams.size || '9', 10)
  const query = awaitedParams.query || undefined
  const endDate = awaitedParams.eD || undefined
  const startDate = awaitedParams.sD || undefined
  const departureFromAirportCode = awaitedParams.dptArpt || undefined
  const arrivalFromAirportCode = awaitedParams.arrArpt || undefined
  const departureAirlineName = awaitedParams.trvl || undefined
  const minPrice = awaitedParams.prMin || undefined
  const maxPrice = awaitedParams.prMax || undefined
  const hotelRating = awaitedParams.hR || undefined
  const facilityCode = awaitedParams.fC || undefined
  const section = awaitedParams.section || undefined
  const tagSlug = awaitedParams.tS || undefined

  // Order Filter
  // Handle sorting options
  let orderBy = 'packageVariant.priceQuad' // Default sort field
  let order = 'asc' // Default sort order

  // Price sorting
  if (awaitedParams.sort === 'price-low') {
    orderBy = 'packageVariant.priceQuad'
    order = 'asc'
  } else if (awaitedParams.sort === 'price-high') {
    orderBy = 'packageVariant.priceDouble'
    order = 'desc'
  }
  // Departure date sorting
  else if (awaitedParams.sort === 'depart-early') {
    orderBy = 'packageVariant.departureDate'
    order = 'asc'
  } else if (awaitedParams.sort === 'depart-late') {
    orderBy = 'packageVariant.departureDate'
    order = 'desc'
  }

  const dataPackage = await getPackageList({
    page,
    size,
    orderBy,
    order,
    [`search`]: query ? `%${query}%` : undefined,
    startDate,
    endDate,
    departureFromAirportCode,
    arrivalFromAirportCode,
    departureAirlineName,
    minPrice,
    maxPrice,
    hotelRating,
    facilityCode,
    section,
    tagSlug,
  })

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
            <PackageResults
              total={dataPackage?.total}
              dataPackages={mapProductsToCardData(dataPackage)}
              currentPage={page}
              pageSize={size}
            />
          </div>
        </section>
      </main>
      <BottomNavigation dataMinMax={dataMinMax} dataFacility={dataFacility} />
    </Fragment>
  )
}
