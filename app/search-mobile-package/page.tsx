import { metadata } from '@/app/shared-metadata'
import { PackageListEvent } from '@/components/pages/homepage/4-PackageList/PackageListEvent'
import SearchMobileUmroh from '@/components/pages/search-mobile/SearchPackageMobile'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { mapProductsToCardData } from '@/lib/utils'
import { getPackageList } from '@/services/umrah-service'
import { Fragment } from 'react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: any
}) {
  const resolvedSearchParams = await searchParams
  return {
    ...metadata(
      'Muslim 101 | Pencarian Paket Muslim101',
      `Daftar pencarian paket ${resolvedSearchParams.query || ''}`
    ),
  }
}

export default async function SearchPackageMobile() {
  const dataPromo = await getPackageList({
    page: 1,
    size: 12,
    section: 'promo',
    order: 'desc',
    orderBy: 'package.createdAt',
  })
  return (
    <Fragment>
      <main className="fixed my-7.5 mt-auto mb-0 h-[100vh] w-full overflow-hidden bg-transparent">
        <MobileTopbar
          variant="search"
          showBackButton={false}
          searchPlaceholder="Cari paket, travel, hotel atau airline..."
        />
        <section className="scrollbar-hide absolute top-[55px] bottom-0 z-11 container mx-auto mt-0 flex h-full w-full max-w-full flex-col overflow-y-auto rounded-tl-3xl rounded-tr-3xl bg-white pt-5 pb-[75px] shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]">
          <SearchMobileUmroh />

          {/* Package list */}
          <PackageListEvent
            dataPromo={mapProductsToCardData(dataPromo)}
            header={false}
          />
        </section>
      </main>
    </Fragment>
  )
}
