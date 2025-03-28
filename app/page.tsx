import { metadata } from '@/app/shared-metadata'
import Banner from '@/components/pages/homepage/1-Banner/Banner'
import { CarouselBanner } from '@/components/pages/homepage/2-Carousel/Carousel'
import { CarouselTravel } from '@/components/pages/homepage/3-Travels/Travels'
import { PackageListEvent } from '@/components/pages/homepage/4-PackageList/PackageListEvent'
import { PackageListPlus } from '@/components/pages/homepage/4-PackageList/PackageListPlus'
import OverscrollTracker from '@/components/pages/homepage/5-ScrollAnimation/AnimationScroll'
import BankingSection from '@/components/pages/homepage/6-Banking/BankingSection'
import PreparationSection from '@/components/pages/homepage/7-Preparation/PreparationSection'
import TestimoniSection from '@/components/pages/homepage/8-Testimoni/TestimoniSection'
import ProgramCards from '@/components/pages/homepage/mobile/ProgramCards'
import SubmenuCards from '@/components/pages/homepage/mobile/SubmenuCards'
import Footer from '@/components/shared/Footer'
import BottomNavigation from '@/components/shared/mobile/BottomNavigation'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { mapProductsToCardData } from '@/lib/utils'
import { cookieNames } from '@/services/common/cookie'
import { getTravels } from '@/services/identity-service'
import { getBanner, getPackageList } from '@/services/umrah-service'
import { cookies } from 'next/headers'
import { Fragment, Suspense } from 'react'

// Skeleton loaders for the carousels
const BannerCarouselSkeleton = () => (
  <div className="mt-16 mb-7">
    <div className="heading-2-bold mb-0.5 h-8 w-48 animate-pulse rounded bg-neutral-200"></div>
    <div className="text-l-regular mb-7 h-6 w-64 animate-pulse rounded bg-neutral-200"></div>
    <div className="flex space-x-5">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="aspect-2/1 h-auto w-full animate-pulse rounded-xl bg-neutral-200"
        ></div>
      ))}
    </div>
  </div>
)

const TravelCarouselSkeleton = () => (
  <div className="mt-16 mb-7">
    <div className="heading-2-bold mb-0.5 h-8 w-48 animate-pulse rounded bg-neutral-200"></div>
    <div className="text-l-regular mb-7 h-6 w-64 animate-pulse rounded bg-neutral-200"></div>
    <div className="flex space-x-5">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-[80px] w-32 animate-pulse rounded bg-neutral-200"
        ></div>
      ))}
    </div>
  </div>
)

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

  const [dataBannerCarousel, dataTravels, dataPromo, dataPlus, dataRegular] =
    await Promise.all([
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
          <div className="flex flex-col max-lg:flex-col-reverse">
            <Suspense fallback={<BannerCarouselSkeleton />}>
              <CarouselBanner dataBanner={dataBannerCarousel} />
            </Suspense>

            <Suspense fallback={<TravelCarouselSkeleton />}>
              <CarouselTravel dataTravel={dataTravels} />
            </Suspense>
          </div>

          <PackageListEvent
            dataPromo={mapProductsToCardData(dataPromo)}
            dataRegular={mapProductsToCardData(dataRegular)}
            dataPlus={mapProductsToCardData(dataPlus)}
          />
        </div>
      </main>
      <main className="sticky top-30 container mx-auto max-lg:px-4">
        <PackageListPlus dataPlus={mapProductsToCardData(dataPlus)} />
      </main>
      <OverscrollTracker></OverscrollTracker>
      <BankingSection />
      <PreparationSection />
      <TestimoniSection />
      <BottomNavigation />
      <Footer className="relative z-2" />
    </Fragment>
  )
}
