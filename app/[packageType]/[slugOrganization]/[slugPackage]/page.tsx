import { metadata } from '@/app/shared-metadata'
import GalleryList from '@/components/pages/detail-package/1-Gallery/GalleryList'
import PackageVariant from '@/components/pages/detail-package/2-PackageVariant/PackageVariant'
import TravelDetail from '@/components/pages/detail-package/3-TravelDetail/TravelDetail'
import DepartureDetail from '@/components/pages/detail-package/4-DepartureDetail/DepartureDetail'
import {
  HotelMecca,
  HotelMedina,
} from '@/components/pages/detail-package/5-HotelMedinaMecca/HotelDisplay'
import TermsCondition from '@/components/pages/detail-package/6-TermsCondition/TermsCondition'
import { Facilities } from '@/components/pages/detail-package/7-Facilities/Facilities'
import { OtherFacilities } from '@/components/pages/detail-package/7-Facilities/Souvenir'
import Itinerary from '@/components/pages/detail-package/8-Itinerary/Itinerary'
import PacakgeDescription from '@/components/pages/detail-package/9-PackageDescription/PacakgeDescription'
import ActionCheckoutMobile from '@/components/pages/detail-package/mobile/ActionCheckout'
import TitlePackageMobile from '@/components/pages/detail-package/mobile/TitlePackage'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { NODE_ENV, PACKAGE_TYPE, URL } from '@/constant/env'
import {
  GalleryImage,
  HotelGalleryImage,
  PackageGalleryImage,
} from '@/constant/types/GalleryProps'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { GalleryProvider } from '@/contexts/gallery-package-context'
import {
  formatCurrency,
  getHotelRating,
  getSlugByVariantPackage,
  getTripDuration,
} from '@/lib/utils'
import { cookieNames } from '@/services/common/cookie'
import { getFacilityEnum, getGalleryHotel } from '@/services/general-service'
import {
  getGalleryPackage,
  getPackageDetail,
  getPackageVariantList,
} from '@/services/umrah-service'
import {
  checkReferralCodeToken,
  WukalaSetting,
} from '@/services/wukala-service'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export async function generateMetadata({ params }: { params: any }) {
  const { slugPackage } = await params
  const detailData = await getPackageDetail(slugPackage)

  return {
    ...metadata(
      `Muslim101 | Detail Paket ${detailData.title}`,
      `Detail paket ${detailData.title}`,
      detailData.thumbnail
    ),
  }
}

export default async function DetailPackage({
  params,
  searchParams,
}: {
  params: any
  searchParams: any
}) {
  const { slugPackage } = await params
  const { referralCode } = await searchParams
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  let responseReferral: WukalaSetting | undefined
  if (referralCode && token) {
    try {
      responseReferral = await checkReferralCodeToken(token, referralCode)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      responseReferral = undefined
    }
  }

  const detailData = await getPackageDetail(slugPackage)
  const idDetailPackage = detailData.id
  const medinaIdHotel = detailData.medinaHotel.id ?? 0
  const meccaIdHotel = detailData.meccaHotel.id ?? 0
  const [galleryData, packageVariants, galleryMedina, galleryMecca, dataTenor] =
    await Promise.all([
      getGalleryPackage(idDetailPackage),
      getPackageVariantList({
        packageId: idDetailPackage,
        page: 1,
        size: 50,
        orderBy: 'createdAt',
        order: 'asc',
      }),
      getGalleryHotel(
        {
          page: 1,
          size: 10,
        },
        medinaIdHotel
      ),
      getGalleryHotel(
        {
          page: 1,
          size: 10,
        },
        meccaIdHotel
      ),
      getFacilityEnum('credit_tenor'),
    ])

  // Map gallery data to the format expected by GalleryList
  const packageImages = galleryData.map(
    (img: PackageGalleryImage): GalleryImage => ({
      id: img.id,
      src: img.image,
      alt: img.title || 'Package image',
      title: img.title,
      source: 'package',
    })
  )

  const medinaHotelImages = galleryMedina.results.map(
    (img: HotelGalleryImage): GalleryImage => ({
      id: img.id,
      src: img.imageUrl,
      alt: img.title || 'Medina hotel image',
      title: img.title,
      source: 'medina',
    })
  )

  const meccaHotelImages = galleryMecca.results.map(
    (img: HotelGalleryImage): GalleryImage => ({
      id: img.id,
      src: img.imageUrl,
      alt: img.title || 'Mecca hotel image',
      title: img.title,
      source: 'mecca',
    })
  )

  const namePackageType = () => {
    if (detailData.packageType === PACKAGE_TYPE.UMRAH) {
      return detailData?.isPlus ? 'Umroh Plus Liburan' : 'Umroh Regular'
    } else {
      return getSlugByVariantPackage(detailData.variantType).title
    }
  }

  // --- JSON-LD for Product Schema ---
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: detailData.title,
    description: detailData.detail?.description || detailData.title,
    image: detailData.thumbnail || `${URL}/images/logo.png`, // Fallback image
    sku: detailData.id.toString(),
    brand: {
      '@type': 'Brand',
      name: detailData.organizationInstance.name,
    },
    offers: {
      '@type': 'Offer',
      url: `${URL}/package/${detailData.slug}`,
      priceCurrency: detailData.currency || 'IDR',
      price: formatCurrency(detailData?.price, detailData.currency || 'IDR'),
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: detailData.organizationInstance.name,
      },
    },
  }
  // JSON-LD BreadcrumbList
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
      {
        '@type': 'ListItem',
        position: 3,
        name: detailData.title,
        item: `${URL}/${detailData.packageType}/${detailData.organizationInstance.slug}/${detailData.slug}`,
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
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
      <GalleryProvider
        packageImages={packageImages || []}
        medinaHotelImages={medinaHotelImages || []}
        meccaHotelImages={meccaHotelImages || []}
        title={detailData?.title}
      >
        <Topbar shadow scrolled token={token} />
        <MobileTopbar
          showBackButton
          variant="transparent"
          titleLink={detailData.title}
          token={token}
          packageId={idDetailPackage}
        />
        <main className="normalize-content container mx-auto mt-[40px] mb-16 max-lg:mt-0 max-lg:mb-[78px] max-lg:max-w-full max-lg:px-0">
          <GalleryList title={detailData.title} />
          <div className="relative z-9 mt-[35px] grid grid-cols-12 flex-col gap-5 rounded-tl-[20px] rounded-tr-[20px] bg-white max-lg:-mt-4 max-lg:flex max-lg:p-4 ">
            <div className="col-span-8 flex flex-col gap-6 max-lg:order-2">
              <TravelDetail
                organizationInstance={detailData?.organizationInstance}
                title={detailData?.title}
              />
              <DepartureDetail
                departure={detailData?.departure}
                arrival={detailData?.arrival}
                meccaHotel={detailData?.meccaHotel?.name}
                madinahHotel={detailData?.medinaHotel?.name}
                type={namePackageType()}
              />

              <PacakgeDescription
                termsCondition={detailData?.detail?.description}
              />

              {meccaIdHotel !== 0 && (
                <HotelMecca
                  mecca={detailData?.meccaHotel}
                  meccaHotelImages={meccaHotelImages}
                  detailData={detailData}
                />
              )}

              {medinaIdHotel !== 0 && (
                <HotelMedina
                  medina={detailData?.medinaHotel}
                  medinaHotelImages={medinaHotelImages}
                  detailData={detailData}
                />
              )}

              <TermsCondition
                termsCondition={detailData?.detail?.termsCondition}
              />

              {(detailData?.detail?.additionalInfo?.facilities?.length > 0 ||
                detailData?.detail?.additionalInfo?.otherFacilities?.length >
                  0) && (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className="bg-primary-500 h-auto w-[6px] rounded-full" />
                    <p className="heading-3-semibold font-semibold max-lg:text-sm max-lg:leading-5">
                      Fasilitas & Lainnya
                    </p>
                  </div>
                  {detailData?.detail?.additionalInfo?.facilities?.length >
                    0 && (
                    <Facilities
                      facilities={
                        detailData?.detail?.additionalInfo?.facilities
                      }
                    />
                  )}
                  {detailData?.detail?.additionalInfo?.otherFacilities?.length >
                    0 && (
                    <OtherFacilities
                      otherFacilities={
                        detailData?.detail?.additionalInfo?.otherFacilities
                      }
                    />
                  )}
                </div>
              )}

              {(detailData?.itinerary?.agenda ?? []).length > 0 && (
                <Itinerary itinerary={detailData?.itinerary?.agenda ?? []} />
              )}
            </div>
            <div className="col-span-4 flex-col gap-4 max-lg:order-1 max-lg:flex">
              {/* Adjust grid for mobile responsive */}
              <TitlePackageMobile
                title={detailData?.title}
                currency={detailData?.currency}
                packageType={detailData?.packageType}
              />
              <TravelDetail
                organizationInstance={detailData?.organizationInstance}
                title={detailData.title}
                mobile={true}
              />
              <PackageVariant
                dataTenor={dataTenor?.data?.results}
                titlePackage={detailData?.title}
                variants={packageVariants?.data?.results}
                organization={detailData?.organizationInstance}
                package={detailData}
                packageVariantId={detailData?.packageVariant?.id}
                token={token}
                referralCodeParams={responseReferral?.referralCode}
              />
            </div>
          </div>
        </main>
        <Footer type="compact" className="max-lg:hidden" />
        <ActionCheckoutMobile
          title={detailData?.title}
          currency={detailData?.currency}
          packageType={detailData?.packageType}
          variants={packageVariants?.data?.results}
          organization={detailData?.organizationInstance}
          thumbnail={detailData?.thumbnail}
          variantType={detailData?.variantType}
          token={token}
          dataTenor={dataTenor?.data?.results}
        />
      </GalleryProvider>
      <EventTrackerImpression
        nameDidMount="impression_detail_package"
        nameDidUnmount="exit_detail_package"
        topic="umrah"
        category="detail_package"
        data={{
          packageId: detailData.id,
          packageType: detailData.packageType,
          title: detailData.title,
          slug: detailData.slug,
          hotelRating: getHotelRating(detailData),
          tripDuration: getTripDuration(detailData),
          travelName: detailData.organizationInstance.name,
          travelCity: detailData.organizationInstance.city.name,
          travelCityId: detailData.organizationInstance.cityId,
          travelProvinceName: detailData.organizationInstance.province.name,
          travelProvinceId: detailData.organizationInstance.provinceId,
          lastCall: detailData.packageVariant.isLastCall,
          price: detailData.price,
          organizationId: detailData.organizationId,
          organizationInstanceId: detailData.organizationInstanceId,
        }}
      />
    </Fragment>
  )
}
