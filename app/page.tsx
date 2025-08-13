import { metadata } from '@/app/shared-metadata'
import Banner from '@/components/pages/homepage/1-Banner/Banner'
import { CarouselBanner } from '@/components/pages/homepage/2-Carousel/Carousel'
import { CarouselTravel } from '@/components/pages/homepage/3-Travels/Travels'
import { PackageListEvent } from '@/components/pages/homepage/4-PackageList/PackageListEvent'
import OverscrollTracker from '@/components/pages/homepage/5-ScrollAnimation/AnimationScrollV2'
import TestimoniSection from '@/components/pages/homepage/6-Testimoni/TestimoniSection'
import ArtikelSection from '@/components/pages/homepage/7-Artikel/ArtikelSection'
import UmrahPersonalBanner from '@/components/pages/homepage/8-UmrahPersonalBanner'
import ProgramCards from '@/components/pages/homepage/mobile/ProgramCards'
import SubmenuCards from '@/components/pages/homepage/mobile/SubmenuCards'
import Footer from '@/components/shared/Footer'
import BottomNavigation from '@/components/shared/mobile/BottomNavigation'
import Topbar from '@/components/shared/Topbar'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { mapProductsToCardData } from '@/lib/utils'
import { getArticleList } from '@/services/article-service'
import { cookieNames } from '@/services/common/cookie'
import { getGalleryHomepage } from '@/services/general-service'
import { getTravels } from '@/services/identity-service'
import { getBanner, getPackageList } from '@/services/umrah-service'
import { Search } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Fragment } from 'react'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim101 | Semua Ada Semua Berkah',
      'Daftar paket umrah yang ada di Muslim101'
    ),
  }
}

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const [
    dataBannerCarousel,
    dataTravels,
    dataPromo,
    dataPlus,
    dataRegular,
    dataGallery,
    dataCarousel,
    dataArtikel,
    dataHaji,
  ] = await Promise.all([
    getBanner({
      page: 1,
      size: 10,
      order: 'desc',
      orderBy: 'createdAt',
    }),
    getTravels({
      page: 1,
      size: 12,
      order: 'desc',
      orderBy: 'organizationInstance.createdAt',
    }),
    getPackageList({
      page: 1,
      size: 12,
      section: 'promo',
      order: 'desc',
      orderBy: 'package.createdAt',
      packageType: 'umrah',
    }),
    getPackageList({
      page: 1,
      size: 12,
      section: 'plus',
      order: 'desc',
      orderBy: 'package.createdAt',
      packageType: 'umrah',
    }),
    getPackageList({
      page: 1,
      size: 12,
      section: 'regular',
      order: 'desc',
      orderBy: 'package.createdAt',
      packageType: 'umrah',
    }),
    getGalleryHomepage({
      page: 1,
      size: 6,
      [`category:likeLower`]: 'way_us',
    }),
    getGalleryHomepage({
      page: 1,
      size: 6,
      [`category:likeLower`]: 'testi_landing',
    }),
    getArticleList({
      page: 1,
      size: 4,
    }),
    getPackageList({
      page: 1,
      size: 12,
      section: 'regular',
      order: 'desc',
      orderBy: 'package.createdAt',
      packageType: 'hajj',
    }),
  ])

  return (
    <Fragment>
      <Topbar type="homepage" token={token} />
      {/* Input for mobile responsive */}
      <Link
        href={'/search-mobile-package'}
        className="focus-within::outline-none absolute top-3.5 left-1/2 z-9 w-[90%] -translate-x-1/2 py-1.5 outline-none focus-visible:outline-0 lg:hidden"
      >
        <div className="flex items-center gap-1 rounded-full border-1 border-neutral-200 bg-white px-4 py-1.5">
          <Search size={16} className="text-neutral-300" />
          <p className="text-m-regular text-neutral-300">
            Cari paket, travel, hotel atau airlinesee...
          </p>
        </div>
      </Link>
      <Banner />
      <main className="relative">
        <div className="container mx-auto max-xl:px-0">
          <ProgramCards className="absolute -top-19 left-0 z-99 px-4 py-3" />
          <SubmenuCards />
          <UmrahPersonalBanner />
          <div className="mb-4 flex flex-col max-lg:flex-col-reverse">
            <CarouselBanner
              dataBanner={dataBannerCarousel}
              className="max-lg:mt-[30px]"
            />
            {dataTravels.total > 0 && (
              <CarouselTravel dataTravel={dataTravels} />
            )}
          </div>

          <PackageListEvent
            dataPromo={mapProductsToCardData(dataPromo)}
            dataRegular={mapProductsToCardData(dataRegular)}
            dataPlus={mapProductsToCardData(dataPlus)}
            eventCategory="home"
          />
        </div>
      </main>
      <main
        className={`${!token && 'sticky top-0 max-lg:top-0'} container mx-auto mb-8 max-lg:mt-0`}
      >
        <PackageListEvent
          dataHaji={mapProductsToCardData(dataHaji)}
          eventCategory="home"
        />
      </main>
      {!token && (
        <Fragment>
          <OverscrollTracker dataGallery={dataGallery.results} />
          <TestimoniSection dataCarousel={dataCarousel.results} />
          {dataArtikel.total > 0 && (
            <ArtikelSection dataCarousel={dataArtikel.results} />
          )}
        </Fragment>
      )}
      <BottomNavigation />
      <Footer className="footer relative z-10  max-lg:mb-0 max-lg:pb-[108px]" />
      <EventTrackerImpression
        id="home"
        nameDidMount="impression_home"
        nameDidUnmount="exit_home"
        topic="umrah"
        category="home"
      />
    </Fragment>
  )
}
