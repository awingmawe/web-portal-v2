'use client'

import { InfoIcon } from '@/components/icons/info'
import { MaximizeIcon } from '@/components/icons/maximize'
import { MosqueIcon } from '@/components/icons/mosque'
import { StarIconPrimary } from '@/components/icons/star'
import GalleryMainImage from '@/components/pages/detail-package/1-Gallery/GalleryMainImage'
import GalleryTabs from '@/components/pages/detail-package/1-Gallery/GalleryTabs'
import GalleryThumbnails from '@/components/pages/detail-package/1-Gallery/GalleryThumbnail'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { PACKAGE_TYPE } from '@/constant/env'
import { GalleryImage } from '@/constant/types/GalleryProps'
import { Hotel, HotelDestination } from '@/constant/types/HotelProps'
import { Package } from '@/constant/types/PackageProps'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { useGallery } from '@/contexts/gallery-package-context'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useGalleryDialog } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import {
  cn,
  formatDistance,
  getHotelRating,
  getTripDuration,
  isEmpty,
} from '@/lib/utils'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, useCallback, useMemo, useState } from 'react'

// Memoized component for hotel rating stars
const RatingStars = React.memo(({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(rating)].map((_, index) => (
      <StarIconPrimary key={index} size={16} />
    ))}
  </div>
))

RatingStars.displayName = 'RatingStars'

// Memoized component for destination item
const DestinationItem = React.memo(
  ({ destination }: { destination: HotelDestination }) => (
    <div className="col-span-6 flex items-center justify-between max-lg:col-span-12">
      <div className="flex items-center gap-2">
        <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-900"></div>
        <p className="text-m-regular text-neutral-900">
          {destination.destinationName}
        </p>
      </div>
      <p className="text-m-regular text-neutral-500">
        {formatDistance(destination.distance)}
      </p>
    </div>
  )
)

DestinationItem.displayName = 'DestinationItem'

// Memoized component for hotel image with loading state
const HotelImage = React.memo(
  ({
    image,
    index,
    isLoaded,
    onLoad,
    onClick,
  }: {
    image: GalleryImage
    index: number
    isLoaded: boolean
    onLoad: () => void
    onClick: () => void
  }) => (
    <div className="relative cursor-pointer" onClick={onClick}>
      {/* Show skeleton until image is loaded */}
      {!isLoaded && (
        <div className="aspect-video h-auto w-full animate-pulse rounded-lg bg-neutral-200"></div>
      )}

      <Image
        src={image.src}
        alt={`Hotel image ${index + 1}`}
        width={0}
        height={0}
        sizes="100vw"
        className={cn(
          'aspect-video w-full rounded-lg object-cover',
          dissolve,
          isLoaded ? 'block' : 'hidden'
        )}
        onLoad={onLoad}
        priority
      />
    </div>
  )
)

HotelImage.displayName = 'HotelImage'

// Generic hotel display component that works for both Mecca and Medina
interface HotelDisplayProps {
  hotel: Hotel
  hotelImages: GalleryImage[]
  hotelType: 'mecca' | 'medina'
  title: string
  detailData: Package
}

const HotelDisplay: React.FC<HotelDisplayProps> = ({
  hotel,
  hotelImages,
  hotelType,
  title,
  detailData,
}) => {
  const { pushEvent } = useEventTracker()
  const { selectedVariant, getPrice } = usePackageVariant()
  const { name, rating, hotelDestination, longitude, latitude } = hotel || {}

  // Filter priority destinations
  const priorityDestinations = useMemo(
    () => hotelDestination?.filter((x: any) => x.priority === true) || [],
    [hotelDestination]
  )

  // Filter non priority destinations
  const nonPriorityDestinations = useMemo(
    () => hotelDestination?.filter((x: any) => x.priority === false) || [],
    [hotelDestination]
  )

  // State to track image loading
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  // Handler for image load with useCallback
  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }))
  }, [])

  // Get necessary functions from gallery context
  const { setDialogOpen, changeTab, changeImage } = useGallery()
  const { dialogOpen, closeGallery } = useGalleryDialog()

  // Handle click on hotel image with useCallback
  const handleImageClick = useCallback(
    (index: number) => {
      // 1. Switch to correct hotel tab
      changeTab(hotelType)

      // 2. Set active image to the clicked one
      changeImage(index)

      // 3. Open the dialog
      setDialogOpen(true)
    },
    [changeImage, changeTab, hotelType, setDialogOpen]
  )

  // Create Google Maps URL with coordinates
  const googleMapsUrl = useMemo(
    () => `https://www.google.com/maps?q=${latitude},${longitude}`,
    [latitude, longitude]
  )

  // Function to handle dialog state changes
  const handleDialogChange = useCallback(
    (open: boolean) => {
      if (!open) {
        closeGallery()
      }
    },
    [closeGallery]
  )

  function handlePushEvent(name: string) {
    pushEvent({
      name,
      category: 'detail_package',
      topic: 'umrah',
      data: {
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
        lastCall: selectedVariant?.isLastCall,
        price: getPrice(),
        organizationId: detailData.organizationId,
        organizationInstanceId: detailData.organizationInstanceId,
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelCityId: hotel.cityId,
        hotelCityName: hotel.cityName,
      },
    })
  }

  // If no hotel data, don't render anything
  if (!hotel) return null
  return (
    <div className="pb-4 max-lg:border-b max-lg:border-b-neutral-200">
      {/* Header section */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-3">
          <div className="bg-primary-500 h-auto w-[6px] rounded-full" />
          <p className="heading-3-semibold font-semibold max-lg:text-sm max-lg:leading-5">
            {title}
          </p>
        </div>
        {longitude && latitude && (
          <Link
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-l-regular text-info-500 flex items-center gap-1.5 underline max-lg:text-sm max-lg:leading-5"
            onClick={() => handlePushEvent('show_map')}
          >
            Lihat Lokasi
            <MaximizeIcon size={20} color="text-info-500" />
          </Link>
        )}
      </div>

      {/* Information Hotel */}
      {detailData.packageType === PACKAGE_TYPE.HAJJ && (
        <div
          className={`bg-info-100 text-info-800 mt-3 flex items-center rounded-lg px-3 py-2`}
        >
          <InfoIcon className="text-info-800 mr-2 min-w-4" size={16} />
          <p className="text-s-regular">
            Informasi hotel dapat berubah sewaktu-waktu sesuai kebijakan dan
            ketentuan dari pihak travel
          </p>
        </div>
      )}
      {/* Distance information */}
      {priorityDestinations.length > 0 && (
        <div className="mt-3 mb-1 flex items-center gap-[9px]">
          <MosqueIcon size={16} />
          <p className="text-s-regular text-neutral-500">
            {hotel && !isEmpty(hotelDestination)
              ? `${formatDistance(priorityDestinations[0]?.distance)}
              ke
              ${priorityDestinations[0]?.destinationName}`
              : ''}
          </p>
        </div>
      )}

      {/* Hotel name and rating */}
      <div className="mt-2 mb-4 flex items-center justify-between gap-2">
        <p className="text-l-regular text-neutral-900">{name}</p>
        <div className="flex flex-col">
          <div className="mt-1">
            <RatingStars rating={rating} />
          </div>
        </div>
      </div>

      {/* Carousel Images */}
      {hotelImages && hotelImages.length > 0 && (
        <div className="mb-4">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="h-auto w-full"
          >
            <CarouselContent className="h-full">
              {hotelImages.map((image, index) => (
                <CarouselItem
                  key={`hotel-${hotelType}-image-${index}`}
                  className="h-full"
                >
                  <HotelImage
                    image={image}
                    index={index}
                    isLoaded={!!imagesLoaded[index]}
                    onLoad={() => handleImageLoad(index)}
                    onClick={() => handleImageClick(index)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="left-5 bg-[#1818184D] p-2.5 backdrop-blur-[5px] max-lg:hidden"
              iconColor="stroke-neutral-0"
            />
            <CarouselNext
              className="right-5 bg-[#1818184D] p-2.5 backdrop-blur-[5px] max-lg:hidden"
              iconColor="stroke-neutral-0"
            />
          </Carousel>
          <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
            <DialogContent className="bg-neutral-0 my-auto min-w-5xl gap-2.5 rounded-[20px] border-0 px-2.5 py-8 max-xl:min-w-fit max-lg:h-full max-lg:w-full max-lg:max-w-[100%] max-lg:rounded-none max-lg:bg-neutral-900 max-lg:p-0">
              {/* Tabs */}
              <GalleryTabs />

              {/* Main Image Display */}
              <GalleryMainImage />

              {/* Thumbnail Carousel */}
              <GalleryThumbnails />

              {/* Custom Close Icon on Desktop */}
              <DialogClose
                className="bg-neutral-0 absolute top-[20px] right-[20px] cursor-pointer rounded-full p-2.5 max-lg:hidden"
                aria-label="Close dialog"
              >
                <X className="text-primary-500" />
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {/* Destination information */}
      {nonPriorityDestinations && nonPriorityDestinations.length > 0 && (
        <Fragment>
          <p className="text-l-semibold mb-2 text-neutral-900">
            Area Wisata Terdekat:
          </p>
          <div className="grid grid-cols-12 gap-x-6 gap-y-2">
            {nonPriorityDestinations.map((dest: HotelDestination, index) => (
              <DestinationItem
                key={`${dest.destinationName}-${index}`}
                destination={dest}
              />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  )
}

// Mecca hotel component that uses the base component
const HotelMecca: React.FC<{
  mecca: Hotel
  meccaHotelImages: GalleryImage[]
  detailData: Package
}> = ({ mecca, meccaHotelImages, detailData }) => {
  return (
    <HotelDisplay
      hotel={mecca}
      hotelImages={meccaHotelImages}
      hotelType="mecca"
      title="Hotel Makkah"
      detailData={detailData}
    />
  )
}

// Medina hotel component that uses the base component
const HotelMedina: React.FC<{
  medina: Hotel
  medinaHotelImages: GalleryImage[]
  detailData: Package
}> = ({ medina, medinaHotelImages, detailData }) => {
  return (
    <HotelDisplay
      hotel={medina}
      hotelImages={medinaHotelImages}
      hotelType="medina"
      title="Hotel Madinah"
      detailData={detailData}
    />
  )
}

export { HotelDisplay, HotelMecca, HotelMedina }
