import { metadata } from '@/app/shared-metadata'
import SearchMobileUmroh from '@/components/pages/search-mobile/SearchPackageUmroh'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { Fragment } from 'react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: any
}) {
  const resolvedSearchParams = await searchParams
  return {
    ...metadata(
      'Muslim101 | Pencarian Paket Umroh Muslim101',
      `Daftar pencarian paket umroh ${resolvedSearchParams.query || ''}`
    ),
  }
}

export default async function SearchGeneral() {
  return (
    <Fragment>
      <main className="fixed my-7.5 mt-auto mb-0 h-[100vh] w-full overflow-hidden bg-transparent">
        <MobileTopbar variant="title" showBackButton title={'Umroh'} />
        <section className="scrollbar-hide absolute top-[55px] bottom-0 z-11 container mx-auto mt-0 flex h-full w-full max-w-full flex-col overflow-y-auto rounded-tl-3xl rounded-tr-3xl bg-white pt-5 pb-[75px] shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]">
          <SearchMobileUmroh />
        </section>
      </main>
    </Fragment>
  )
}
