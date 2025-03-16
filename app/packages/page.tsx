import { metadata } from '@/app/shared-metadata'
import SearchTopbar from '@/components/pages/search-product/1-SearchTopbar/SearchTopbar'
import FilterLeftbar from '@/components/pages/search-product/2-FilterLeftbar'
import Topbar from '@/components/shared/Topbar'
import { getFacilityEnum } from '@/services/general-service'
import { getMinMaxPrice, getTagPackagesEnum } from '@/services/umrah-service'
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
  console.log(awaitedParams)

  // const page = parseInt(awaitedParams.page || '1', 20)
  // const size = parseInt(awaitedParams.size || '10', 20)
  // const query = awaitedParams.query || ''
  // const produk = awaitedParams.produk || ''
  // const tagPackage = awaitedParams.tagPackage || ''
  // const hargaMin = awaitedParams.hargaMin || ''
  // const hargaMax = awaitedParams.hargaMax || ''
  // const lokasi = awaitedParams.lokasi || ''
  // const medinaHotel = awaitedParams.medinaHotel || ''
  // const meccaHotel = awaitedParams.meccaHotel || ''
  // const maskapai = awaitedParams.maskapai || ''
  // const airport = awaitedParams.airport || ''
  // const month = awaitedParams.month || ''
  // const year = awaitedParams.year || ''

  // const dataPackage = await getPackageList({
  //   page,
  //   size,
  //   [`title:likeLower`]: query ? `%${query}%` : undefined,
  //   [`packageType:likeLower`]: produk || undefined,
  //   ...(tagPackage === 'is-last-call'
  //     ? { isLastCall: true }
  //     : { [`tagPackage.tagSlug:likeLower`]: tagPackage || undefined }),
  //   minPrice: hargaMin ? parseInt(hargaMin, 10) : undefined,
  //   maxPrice: hargaMax ? parseInt(hargaMax, 10) : undefined,
  //   organizationInstanceCity: lokasi || undefined,
  //   medinaHotel: medinaHotel || undefined,
  //   meccaHotel: meccaHotel || undefined,
  //   departureAirlineName: maskapai || undefined,
  //   departureFromAirportCode: airport || undefined,
  //   month: month || undefined,
  //   year: year || undefined,
  // })

  const [dataMinMax, dataTagPackages, dataFacility] = await Promise.all([
    getMinMaxPrice(),
    getTagPackagesEnum(),
    getFacilityEnum(),
  ])

  return (
    <Fragment>
      <Topbar type="normal" />
      <SearchTopbar />
      <main className="mt-7.5 mb-7.5 px-20">
        <section className="grid grid-cols-12 gap-5">
          <div className="col-span-4">
            <FilterLeftbar
              dataMinMax={dataMinMax}
              dataTagPackages={dataTagPackages}
              dataFacility={dataFacility}
            />
          </div>
          <div className="col-span-8">sss</div>
        </section>
      </main>
    </Fragment>
  )
}
