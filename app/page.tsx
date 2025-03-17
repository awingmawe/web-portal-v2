import { metadata } from '@/app/shared-metadata'
import Banner from '@/components/pages/homepage/1-Banner/Banner'
import { CarouselBanner } from '@/components/pages/homepage/2-Carousel/Carousel'
import { CarouselTravel } from '@/components/pages/homepage/3-Travels/Travels'
import { PackageListEvent } from '@/components/pages/homepage/4-PackageList/PackageListEvent'
import Topbar from '@/components/shared/Topbar'
import { mapProductsToCardData } from '@/lib/utils'
import { getTravels } from '@/services/identity-service'
import { getBanner, getPackageList } from '@/services/umrah-service'
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
      'Muslim 101 | Homepage',
      'Daftar paket umrah yang ada di Muslim101'
    ),
  }
}

export default async function Home() {
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
      <Topbar type="homepage" />
      <Banner />
      <main className="container mx-auto">
        <Suspense fallback={<BannerCarouselSkeleton />}>
          <CarouselBanner dataBanner={dataBannerCarousel} />
        </Suspense>

        <Suspense fallback={<TravelCarouselSkeleton />}>
          <CarouselTravel dataTravel={dataTravels} />
        </Suspense>

        <PackageListEvent
          dataPromo={mapProductsToCardData(dataPromo)}
          dataPlus={mapProductsToCardData(dataPlus)}
          dataRegular={mapProductsToCardData(dataRegular)}
        />
      </main>
    </Fragment>
  )
}
