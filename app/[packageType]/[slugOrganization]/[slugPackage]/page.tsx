import { metadata } from '@/app/shared-metadata'
import GalleryList from '@/components/pages/detail-package/1-Gallery/GalleryList'
import PackageVariant from '@/components/pages/detail-package/2-PackageVariant/PackageVariant'
import TravelDetail from '@/components/pages/detail-package/3-TravelDetail/TravelDetail'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import {
  GalleryImage,
  HotelGalleryImage,
  PackageGalleryImage,
} from '@/constant/types/GalleryProps'
import { getGalleryHotel } from '@/services/general-service'
import {
  getGalleryPackage,
  getPackageDetail,
  getPackageVariantList,
} from '@/services/umrah-service'
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

export default async function DetailPackage({ params }: { params: any }) {
  const { slugPackage } = await params

  const detailData = await getPackageDetail(slugPackage)

  const idDetailPackage = detailData.id
  const medinaIdHotel = detailData.medinaHotel.id
  const meccaIdHotel = detailData.meccaHotel.id

  const [galleryData, packageVariants, galleryMedina, galleryMecca] =
    await Promise.all([
      getGalleryPackage(idDetailPackage),
      getPackageVariantList({
        packageId: idDetailPackage,
        page: 1,
        size: 10,
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
  return (
    <Fragment>
      <Topbar type="shadow" />
      <MobileTopbar
        showBackButton
        variant="transparent"
        titleLink={detailData.title}
      />
      <main className="mt-[108px] px-20 max-lg:mt-0 max-lg:px-0">
        <GalleryList
          title={detailData.title}
          packageImages={packageImages}
          medinaHotelImages={medinaHotelImages}
          meccaHotelImages={meccaHotelImages}
        />
        <div className="relative z-9 mt-[35px] grid grid-cols-12 flex-col gap-5 rounded-tl-[20px] rounded-tr-[20px] bg-white max-lg:-mt-4 max-lg:flex max-lg:p-4 max-lg:shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]">
          <div className="col-span-8">
            <TravelDetail
              organizationInstance={detailData?.organizationInstance}
              title={detailData.title}
            />
          </div>
          <div className="col-span-4 ">
            <PackageVariant variants={packageVariants.results} />
          </div>
        </div>
      </main>
    </Fragment>
  )
}
