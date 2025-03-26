'use client'

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
import { GalleryImage } from '@/constant/types/GalleryProps'
import { Hotel, HotelDestination } from '@/constant/types/HotelProps'
import { useGallery } from '@/contexts/gallery-package-context'
import { useGalleryDialog } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import { cn, formatDistance, isEmpty } from '@/lib/utils'
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
        <div className="aspect-video w-full animate-pulse rounded-lg bg-neutral-200"></div>
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
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={onLoad}
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
}

const HotelDisplay: React.FC<HotelDisplayProps> = ({
  hotel,
  hotelImages,
  hotelType,
  title,
}) => {
  const { name, rating, hotelDestination, longitude, latitude } = hotel || {}

  // Filter priority destinations
  const priorityDestinations = useMemo(
    () => hotelDestination?.filter((x: any) => x.priority === true) || [],
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

  // If no hotel data, don't render anything
  if (!hotel) return null

  return (
    <div className="border-b border-b-neutral-200 pb-4">
      {/* Header section */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-3">
          <div className="bg-primary-500 h-auto w-[6px] rounded-full" />
          <p className="heading-3-semibold font-semibold max-lg:text-sm max-lg:leading-5">
            {title}
          </p>
        </div>
        <Link
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-l-regular text-info-500 flex items-center gap-1.5 underline max-lg:text-sm max-lg:leading-5"
        >
          Lihat Lokasi
          <MaximizeIcon size={20} color="text-info-500" />
        </Link>
      </div>

      {/* Distance information */}
      {priorityDestinations.length > 0 && (
        <div className="mb-1 flex items-center gap-[9px]">
          <MosqueIcon size={16} />
          <p className="text-s-regular text-neutral-500">
            {hotel && !isEmpty(hotelDestination)
              ? `${formatDistance(priorityDestinations[0]?.distance)}
              ke Masjid
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
            className="w-full"
          >
            <CarouselContent>
              {hotelImages.map((image, index) => (
                <CarouselItem key={`hotel-${hotelType}-image-${index}`}>
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
              className="left-5 bg-[#4141414D] p-2.5 backdrop-blur-[5px] max-lg:hidden"
              iconColor="stroke-neutral-0"
            />
            <CarouselNext
              className="right-5 bg-[#4141414D] p-2.5 backdrop-blur-[5px] max-lg:hidden"
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
      {hotelDestination && hotelDestination.length > 0 && (
        <Fragment>
          <p className="text-l-semibold mb-2 text-neutral-900">
            Area Wisata Terdekat:
          </p>
          <div className="grid grid-cols-12 gap-x-6 gap-y-2">
            {hotelDestination.map((dest: HotelDestination) => (
              <DestinationItem
                key={`${dest.destinationName}`}
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
}> = ({ mecca, meccaHotelImages }) => {
  return (
    <HotelDisplay
      hotel={mecca}
      hotelImages={meccaHotelImages}
      hotelType="mecca"
      title="Hotel Makkah"
    />
  )
}

// Medina hotel component that uses the base component
const HotelMedina: React.FC<{
  medina: Hotel
  medinaHotelImages: GalleryImage[]
}> = ({ medina, medinaHotelImages }) => {
  return (
    <HotelDisplay
      hotel={medina}
      hotelImages={medinaHotelImages}
      hotelType="medina"
      title="Hotel Madinah"
    />
  )
}

export { HotelDisplay, HotelMecca, HotelMedina }
