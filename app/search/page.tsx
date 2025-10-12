import { metadata } from '@/app/shared-metadata'
import SearchTopbar from '@/components/pages/search-packages/1-SearchTopbar/SearchTopbar'
import FilterLeftbar from '@/components/pages/search-packages/2-FilterLeftbar'
import { PackageResults } from '@/components/pages/search-packages/3-PackageList/PackageList'
import HorizontalFilterBar from '@/components/pages/search-packages/mobile/UT-TopbarFilter/TopbarTrigger'
import ScrollShadowWrapper from '@/components/pages/search-packages/ScrollWrapperShadow'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { NODE_ENV, URL } from '@/constant/env'
import { cookieNames } from '@/services/common/cookie'
import { getFacilityEnum } from '@/services/general-service'
import { getKota } from '@/services/identity-service'
import {
  getMinMaxPrice,
  getPackageList,
  getSectionEnum,
  getTagPackagesEnum,
} from '@/services/umrah-service'
import { cookies } from 'next/headers'
import queryString from 'query-string'
import { Fragment } from 'react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: any
}) {
  const resolvedSearchParams = await searchParams
  return {
    ...metadata(
      'Muslim101 | Daftar Paket Muslim101',
      `Daftar pencarian paket ${resolvedSearchParams.query || ''}`
    ),
  }
}

export default async function SearchGeneral({
  searchParams,
}: {
  searchParams: any
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  const awaitedParams = await searchParams

  const [dataMinMax, dataTagPackages, dataFacility, dataSection, dataKota] =
    await Promise.all([
      getMinMaxPrice(),
      getTagPackagesEnum(awaitedParams.type || 'umrah'),
      getFacilityEnum(`${awaitedParams.type || 'umrah'}-facility`),
      getSectionEnum(awaitedParams.type || 'umrah'),
      getKota({ page: 1, size: 100, orderBy: 'name', order: 'desc' }),
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
  const minDpAmount = awaitedParams.dpMin || undefined
  const maxDpAmount = awaitedParams.dpMax || undefined
  const packageType = awaitedParams.packageType || 'umrah'
  const organizationInstanceCity = awaitedParams.lC || undefined

  // Order Filter
  // Handle sorting options
  let orderBy = 'package.createdAt' // Default sort field
  let filterPrice
  let order = 'asc' // Default sort order

  // Price sorting
  if (awaitedParams.sort === 'price-low') {
    filterPrice = 'lowest-price'
  } else if (awaitedParams.sort === 'price-high') {
    filterPrice = 'highest-price'
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
    filterPrice,
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
    minDpAmount,
    maxDpAmount,
    packageType,
    organizationInstanceCity,
  })

  // --- JSON-LD for CollectionPage/WebPage Schema ---
  const searchPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: `Daftar Paket Muslim101 ${query ? `untuk "${query}"` : ''}`,
    description: `Temukan berbagai pilihan paket umrah dan haji terbaik di Muslim101. ${query ? `Hasil pencarian untuk "${query}".` : ''}`,
    url: `${URL}/search${awaitedParams ? `?${queryString.stringify(awaitedParams)}` : ''}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement:
        dataPackage?.results?.map((pkg, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: pkg.title,
            url: `${URL}/${pkg.packageType}/${pkg.organizationInstance.slug}/${pkg.slug}`,
            image: pkg.thumbnail,
            offers: {
              '@type': 'Offer',
              priceCurrency: pkg.currency,
              price: pkg.price.toString(),
            },
          },
        })) || [],
    },
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Paket',
        item: `${URL}/search`,
      },
    ],
  }
  // --- End JSON-LD ---
  return (
    <Fragment>
      {/* JSON-LD Script */}
      {NODE_ENV === 'production' && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(searchPageJsonLd),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbJsonLd),
            }}
          />
        </>
      )}
      {/* End JSON-LD Script */}

      <Topbar token={token} scrolled />
      <SearchTopbar />
      <main className="my-7.5 max-lg:fixed max-lg:mt-auto max-lg:mb-0 max-lg:h-dvh max-lg:w-full max-lg:overflow-hidden max-lg:bg-transparent">
        <MobileTopbar variant="filter" showBackButton />
        <ScrollShadowWrapper
          // Mobile Horizontal Filter
          mobileTopbarFilter={
            <HorizontalFilterBar
              dataTagPackages={dataTagPackages}
              dataFacility={dataFacility}
              dataMinMax={dataMinMax}
              dataSection={dataSection}
              dataKota={dataKota}
            />
          }
        >
          <div className="col-span-4 max-lg:hidden max-lg:px-4">
            <FilterLeftbar
              dataMinMax={dataMinMax}
              dataTagPackages={dataTagPackages}
              dataFacility={dataFacility}
              dataSection={dataSection}
            />
          </div>
          <div className="col-span-8 max-lg:col-span-12 max-lg:px-4">
            <PackageResults />
          </div>
        </ScrollShadowWrapper>
      </main>
      {/* <BottomNavigation
        dataMinMax={dataMinMax}
        dataFacility={dataFacility}
        dataTagPackages={dataTagPackages}
        dataSection={dataSection}
      /> */}
    </Fragment>
  )
}
