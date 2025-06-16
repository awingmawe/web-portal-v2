import { metadata } from '@/app/shared-metadata'
import LandingLinkAja from '@/components/pages/linkaja/1-Landing/Landing'
import { PackageResults } from '@/components/pages/search-packages/3-PackageList/PackageList'
import BottomNavigation from '@/components/pages/search-packages/mobile/BottomFilterMobile/BottomFilter'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { getFacilityEnum } from '@/services/general-service'
import { getSectionEnum, getTagPackagesEnum } from '@/services/umrah-service'
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

export default async function LinkAja() {
  //   const cookieStore = await cookies()
  //   const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const [dataMinMax, dataTagPackages, dataFacility, dataSection] =
    await Promise.all([
      { min: '1000000', max: '40000000' },
      getTagPackagesEnum(),
      getFacilityEnum('umrah-facility'),
      getSectionEnum(),
    ])

  return (
    <Fragment>
      <div className="mx-auto w-full max-w-lg ">
        <LandingLinkAja />
        <main
          className="relative mt-auto mb-0 h-[100vh] w-full max-w-lg overflow-hidden bg-transparent"
          id="packageList"
        >
          <MobileTopbar
            variant="filterPermata"
            showBackButton={false}
            forceMobile
          />
          <section className="absolute top-[55px] bottom-0 z-11 mt-0 h-full w-full max-w-full overflow-y-auto rounded-tl-3xl rounded-tr-3xl bg-white px-4 py-7.5 pb-[130px] shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]">
            <div className="col-span-12">
              <PackageResults isCompact />
            </div>
          </section>
        </main>
        <BottomNavigation
          dataMinMax={dataMinMax}
          dataFacility={dataFacility}
          dataTagPackages={dataTagPackages}
          dataSection={dataSection}
          forceMobile
        />
      </div>
    </Fragment>
  )
}
