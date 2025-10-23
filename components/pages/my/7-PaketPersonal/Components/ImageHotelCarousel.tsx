import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { HotelGalleryImage } from '@/constant/types/GalleryProps'
import { dissolve } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HotelImageCarouselProps {
  images: HotelGalleryImage[]
  className?: string
}

const HotelImageCarousel: React.FC<HotelImageCarouselProps> = ({
  images,
  className,
}) => {
  if (images.length === 0) {
    return (
      <div className="relative w-[200px] lg:max-w-[150px]">
        <Image
          src={'/images/no-image-placeholder.png'}
          alt={`Hotel image no image`}
          width={0}
          height={0}
          sizes="100vw"
          className={cn(
            'aspect-[9/5] w-full rounded-lg object-cover',
            dissolve
          )}
        />
      </div>
    )
  }
  return (
    <div className={cn('relative w-[200px] lg:max-w-[150px]', className)}>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="h-auto w-full"
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => {
            return (
              <CarouselItem
                key={`hotel-${image.caption}-image-${index}`}
                className="h-full"
              >
                <Image
                  src={image.imageUrl}
                  alt={`Hotel image ${index + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={cn(
                    'aspect-[9/5] w-full rounded-lg object-cover',
                    dissolve
                  )}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>

        {/* Carousel Controls - only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <CarouselPrevious
              className="left-1 h-[18px] w-[18px] bg-[#1818184D] p-1 backdrop-blur-[5px] max-lg:hidden"
              iconColor="stroke-neutral-0"
            />
            <CarouselNext
              className="right-1 h-[18px] w-[18px] bg-[#1818184D] p-1 backdrop-blur-[5px] max-lg:hidden"
              iconColor="stroke-neutral-0"
            />
          </>
        )}
      </Carousel>
    </div>
  )
}

export default HotelImageCarousel
