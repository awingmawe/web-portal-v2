import { metadata } from '@/app/shared-metadata'
import Banner from '@/components/pages/homepage/1-Banner/Banner'
import { CarouselBanner } from '@/components/pages/homepage/2-Carousel/Carousel'
import { CarouselTravel } from '@/components/pages/homepage/3-Travels/Travels'
import {
  PackageListEvent,
  PackageListEvent as PackageListPlus,
} from '@/components/pages/homepage/4-PackageList/PackageListEvent'
import OverscrollTracker from '@/components/pages/homepage/5-ScrollAnimation/AnimationScroll'
import TestimoniSection from '@/components/pages/homepage/6-Testimoni/TestimoniSection'
import ProgramCards from '@/components/pages/homepage/mobile/ProgramCards'
import SubmenuCards from '@/components/pages/homepage/mobile/SubmenuCards'
import Footer from '@/components/shared/Footer'
import BottomNavigation from '@/components/shared/mobile/BottomNavigation'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { mapProductsToCardData } from '@/lib/utils'
import { cookieNames } from '@/services/common/cookie'
import { getGalleryHomepage } from '@/services/general-service'
import { getTravels } from '@/services/identity-service'
import { getBanner, getPackageList } from '@/services/umrah-service'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim 101 | All in One Islamic Digital Platform',
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
    }),
    getPackageList({
      page: 1,
      size: 12,
      section: 'plus',
      order: 'desc',
      orderBy: 'package.createdAt',
    }),
    getPackageList({
      page: 1,
      size: 12,
      section: 'regular',
      order: 'desc',
      orderBy: 'package.createdAt',
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
  ])

  return (
    <Fragment>
      <Topbar type="homepage" token={token} />
      <MobileTopbar
        variant="search"
        showBackButton={false}
        searchPlaceholder="Cari paket, travel, hotel atau airline..."
      />
      <Banner />
      <main className="relative">
        <div className="container mx-auto max-lg:px-4">
          <ProgramCards />
          <SubmenuCards />
          <div className="mb-4 flex flex-col max-lg:flex-col-reverse">
            <CarouselBanner dataBanner={dataBannerCarousel} />

            <CarouselTravel dataTravel={dataTravels} />
          </div>

          <PackageListEvent
            dataPromo={mapProductsToCardData(dataPromo)}
            dataRegular={mapProductsToCardData(dataRegular)}
          />
        </div>
      </main>
      <main
        className={`${!token && 'sticky top-0 max-lg:top-0'} container mx-auto mb-8 max-lg:mt-0 max-lg:px-4`}
      >
        <PackageListPlus dataPlus={mapProductsToCardData(dataPlus)} />
      </main>
      {!token && (
        <Fragment>
          <OverscrollTracker dataGallery={dataGallery.results} />
          <TestimoniSection dataCarousel={dataCarousel.results} />
        </Fragment>
      )}
      <BottomNavigation />
      <Footer className="relative z-2" />
    </Fragment>
  )
}
