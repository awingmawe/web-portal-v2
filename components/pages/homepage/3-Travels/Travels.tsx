'use client'

import { TravelLogoSkeleton } from '@/components/pages/homepage/3-Travels/SkeletonTravels'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { Travel } from '@/constant/types/TravelProps'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useState } from 'react'

export function CarouselTravel({
  dataTravel,
}: {
  dataTravel: GenericResponse<Travel>
}) {
  // State to track image loading
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  // Handler for image load
  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <section className="mt-8  max-lg:px-4">
      <div className="rounded-xl bg-gradient-to-r from-[#FFEAAC] to-[#FFC101] py-2 max-lg:px-4">
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-bold max-lg:text-base">
            Mitra Kami
          </h2>
          <p className="mt-2 mb-4 text-base max-lg:text-xs">
            Kami telah bermitra dengan bermacam-macam travel agent terpercaya
          </p>
        </div>
        <Carousel
          opts={{
            align: 'end',
            loop: true,
            inViewThreshold: 1,
            watchDrag: false,
          }}
          plugins={[
            Autoplay({
              delay: 1500,
            }),
          ]}
          className="my-7 w-full max-lg:my-4"
        >
          <CarouselContent className="-ml-1">
            {dataTravel?.results.map((item, index) => (
              <CarouselItem
                key={`logo-travel-${item.organizationInstance?.tagline}-${index}`}
                className="basis-1/2 items-center overflow-hidden md:basis-1/4 lg:basis-1/9"
              >
                <div className="relative flex justify-center">
                  {/* Show skeleton until image is loaded */}
                  {!imagesLoaded[index] && <TravelLogoSkeleton />}

                  <div className="rounded-lg bg-[#FFFBF2] p-5">
                    <Image
                      src={item.organizationInstance?.thumbnail}
                      width={0}
                      height={0}
                      alt={`logo-travel-${item.organizationInstance?.tagline}`}
                      className={`m-auto aspect-square h-[80px] w-auto object-contain transition-opacity duration-300 max-lg:h-[60px] ${
                        imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
