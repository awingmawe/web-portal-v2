import { metadata } from '@/app/shared-metadata'
import { ArrowIcon } from '@/components/icons/arrow'
import FaqContent from '@/components/pages/faq/FaqContent'
import Banner from '@/components/pages/homepage/1-Banner/Banner'
import { CarouselBanner } from '@/components/pages/homepage/2-Carousel/Carousel'
import { CarouselTravel } from '@/components/pages/homepage/3-Travels/Travels'
import { PackageListEvent } from '@/components/pages/homepage/4-PackageList/PackageListEvent'
import OverscrollTracker from '@/components/pages/homepage/5-ScrollAnimation/AnimationScrollV2'
import TestimoniSection from '@/components/pages/homepage/6-Testimoni/TestimoniSection'
import ArtikelSection from '@/components/pages/homepage/7-Artikel/ArtikelSection'
import UmrahPersonalBanner from '@/components/pages/homepage/8-UmrahPersonalBanner'
import LocationPermissionSection from '@/components/pages/homepage/9-LocationPermission/LocationPersmissionSection'
import ProgramCards from '@/components/pages/homepage/mobile/ProgramCards'
import SubmenuCards from '@/components/pages/homepage/mobile/SubmenuCards'
import Footer from '@/components/shared/Footer'
import BottomNavigation from '@/components/shared/mobile/BottomNavigation'
import Topbar from '@/components/shared/Topbar'
import TopbarNotif from '@/components/shared/Topbar/TopbarNotification'
import { Card, CardContent } from '@/components/ui/card'
import { NODE_ENV, URL } from '@/constant/env'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { mapProductsToCardData } from '@/lib/utils'
import FaqImage from '@/public/images/faq-homepage.png'
import { getArticleList } from '@/services/article-service'
import { cookieNames } from '@/services/common/cookie'
import { getGalleryHomepage } from '@/services/general-service'
import { getTravels } from '@/services/identity-service'
import { getPackageListV2 } from '@/services/product-service'
import { getBanner } from '@/services/umrah-service'
import { CircleChevronRight, Search } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
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
    getPackageListV2({
      page: 1,
      size: 12,
      section: 'promo',
      order: 'desc',
      orderBy: 'package.createdAt',
      packageType: 'umrah',
    }),
    getPackageListV2({
      page: 1,
      size: 12,
      section: 'plus',
      order: 'desc',
      orderBy: 'package.createdAt',
      packageType: 'umrah',
    }),
    getPackageListV2({
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
    getPackageListV2({
      page: 1,
      size: 12,
      order: 'desc',
      orderBy: 'package.createdAt',
      packageType: 'hajj',
    }),
  ])

  // --- JSON-LD for WebSite and Organization Schema ---
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Muslim101',
    url: URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${URL}/search?query={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Muslim101',
    url: URL,
    logo: `${URL}/images/logo.png`,
    sameAs: [
      'https://web.facebook.com/muslim101.id',
      'https://www.instagram.com/muslim101.id/',
    ],
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
    ],
  }
  // --- End JSON-LD ---

  return (
    <Fragment>
      {/* JSON-LD Scripts */}
      {NODE_ENV === 'production' && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd),
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
      {/* End JSON-LD Scripts */}
      <Topbar type="homepage" token={token} />
      <div className="absolute top-3.5 right-0 left-0 z-999 flex items-center px-4 lg:hidden">
        <Link
          href="/search-mobile-package"
          className={`flex-1 outline-none focus-within:outline-none focus-visible:outline-0 ${
            token ? 'max-w-[calc(100%-60px)]' : 'w-full'
          }`}
        >
          <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-4 py-1.5">
            <Search size={16} className="text-neutral-300" />
            <p className="text-m-regular truncate text-neutral-300">
              Cari paket, travel, hotel atau airlines...
            </p>
          </div>
        </Link>

        {token && (
          <div className="ml-4">
            <TopbarNotif token={token} />
          </div>
        )}
      </div>

      <Banner />
      <main className="relative">
        <div className="container mx-auto max-xl:px-0">
          <LocationPermissionSection />
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
            dataPromo={mapProductsToCardData(dataPromo.data)}
            dataRegular={mapProductsToCardData(dataRegular.data)}
            dataPlus={mapProductsToCardData(dataPlus.data)}
            eventCategory="home"
          />
        </div>
      </main>
      <main
        className={`${!token && 'sticky top-0 max-lg:top-0'} container mx-auto mb-8 max-lg:mt-0`}
      >
        <PackageListEvent
          dataHaji={mapProductsToCardData(dataHaji.data)}
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

      {/* FAQ */}
      <div className="bg-neutral-0 relative z-6 w-full pt-[70px] pb-[70px] max-xl:px-0">
        <div className="container mx-auto">
          <Card className="rounded-md border-0 bg-neutral-50 p-8 shadow-none max-md:bg-white max-md:p-2">
            <CardContent className="max-lg:px-3">
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <h2 className="text-4xl font-bold max-lg:text-[32px] max-lg:leading-10 max-sm:text-[32px] max-sm:leading-10">
                    Pertanyaan yang Sering Ditanyakan
                  </h2>
                  <Link
                    href="/faq"
                    className="max-lg:text-m-regular mt-4 flex items-center gap-2 max-lg:leading-5 max-sm:text-sm max-sm:leading-5"
                  >
                    Lihat lebih banyak
                    <ArrowIcon className="max-lg:hidden" size={24} />
                    <CircleChevronRight className="lg:hidden" size={14} />
                  </Link>
                  <div className="flex justify-center max-md:hidden">
                    <Image
                      className="mx-auto mt-4"
                      src={FaqImage}
                      alt="illustration-not-found"
                      width={400}
                      height={400}
                      style={{ width: '278px' }}
                    />
                  </div>
                </div>
                <div>
                  <FaqContent highlight={true} limit={5} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
