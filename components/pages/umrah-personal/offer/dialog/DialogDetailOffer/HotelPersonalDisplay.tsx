import { MaximizeIcon } from '@/components/icons/maximize'
import { MosqueIcon } from '@/components/icons/mosque'
import { StarIconPrimary } from '@/components/icons/star'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { HotelGalleryImage } from '@/constant/types/GalleryProps'
import { HotelDestination } from '@/constant/types/HotelProps'
import { HotelSelection } from '@/constant/types/UmrahPersonalProps'
import { dissolve } from '@/lib/animation-setup'
import { cn, formatDistance, isEmpty } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, useEffect, useMemo, useState } from 'react'

type HotelPersonalDisplayProps = {
  hotelGallery: HotelGalleryImage[]
  hotelData: HotelSelection
  loading: boolean
}

const DestinationItem = React.memo(
  ({ destination }: { destination: HotelDestination }) => (
    <div className="col-span-6 flex items-center justify-between ">
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

const RatingStars = React.memo(({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(rating)].map((_, index) => (
      <StarIconPrimary key={index} size={16} />
    ))}
  </div>
))

RatingStars.displayName = 'RatingStars'

const HotelPersonalDisplay: React.FC<HotelPersonalDisplayProps> = ({
  hotelGallery,
  loading,
  hotelData,
}) => {
  const {
    selectedHotel: { hotelDestination, name, latitude, longitude },
    rating,
  } = hotelData
  const googleMapsUrl = useMemo(
    () => `https://www.google.com/maps?q=${latitude},${longitude}`,
    [latitude, longitude]
  )

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

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="flex flex-col">
      {hotelGallery.length > 0 && (
        <div className="relative mb-4 w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="h-auto w-full"
          >
            <CarouselContent className="h-full">
              {loading ? (
                <CarouselItem className="h-full">
                  <div className="relative h-full w-full animate-pulse bg-neutral-200">
                    <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-t from-transparent to-neutral-200 opacity-50" />
                  </div>
                </CarouselItem>
              ) : (
                hotelGallery.map((image, index) => {
                  return (
                    <CarouselItem
                      key={`hotelGallery-${image.caption}-image-${index}`}
                      className="h-full"
                    >
                      <Image
                        src={image.imageUrl}
                        alt={`Hotel image ${index + 1}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={cn(
                          'aspect-[2/1] w-full rounded-lg object-cover',
                          dissolve
                        )}
                      />
                    </CarouselItem>
                  )
                })
              )}
            </CarouselContent>

            {/* Carousel Controls - only show if more than 1 image */}
            {hotelGallery.length > 1 && !loading && (
              <>
                <CarouselPrevious
                  className="left-1 h-[20px] w-[20px] bg-[#4141414D] p-4 backdrop-blur-[5px] max-lg:hidden"
                  iconColor="stroke-neutral-0"
                />
                <CarouselNext
                  className="right-1 h-[20px] w-[20px] bg-[#4141414D] p-4 backdrop-blur-[5px] max-lg:hidden"
                  iconColor="stroke-neutral-0"
                />
              </>
            )}
          </Carousel>

          {/* Dot Indicators */}
          {hotelGallery.length > 1 && !loading && (
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-1">
              {hotelGallery.map((_, index) => (
                <div
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-300 ease-in-out',
                    current === index + 1
                      ? 'bg-primary-500 ' // Active dot
                      : 'bg-neutral-200 hover:bg-white/75' // Inactive dot
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-m-regular">{name}</p>
          {longitude && latitude && (
            <Link
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-m-regular text-info-500 flex items-center gap-1.5 underline max-lg:text-sm max-lg:leading-5"
            >
              Lihat Lokasi
              <MaximizeIcon size={20} color="text-info-500" />
            </Link>
          )}
        </div>
        <RatingStars rating={rating} />
        {priorityDestinations.length > 0 && (
          <div className="flex items-center gap-2">
            <MosqueIcon size={16} />
            <p className="text-s-regular text-neutral-500">
              {hotelData && !isEmpty(hotelDestination)
                ? `${formatDistance(priorityDestinations[0]?.distance)}
                      ke
                      ${priorityDestinations[0]?.destinationName}`
                : ''}
            </p>
          </div>
        )}
        {nonPriorityDestinations && nonPriorityDestinations.length > 0 && (
          <Fragment>
            <p className="text-m-regular text-neutral-900">
              Area Wisata Terdekat:
            </p>
            <div className="grid grid-cols-12 gap-4">
              {nonPriorityDestinations.map((dest: HotelDestination) => (
                <DestinationItem
                  key={`${dest.destinationName}`}
                  destination={dest}
                />
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default HotelPersonalDisplay
