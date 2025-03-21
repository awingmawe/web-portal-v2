'use client'

import { BannerSkeleton } from '@/components/pages/homepage/2-Carousel/SkeletonCarousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Banner } from '@/constant/types/BannerProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { dissolve } from '@/lib/animation-setup'
import { isEmpty } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function CarouselBanner({
  dataBanner,
}: {
  dataBanner: GenericResponse<Banner>
}) {
  // State to track image loading
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  // Handler for image load
  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <section>
      <p className="heading-2-bold mt-16 mb-0.5 text-neutral-900 max-lg:mt-[30px] max-lg:text-xl max-lg:leading-6.5">
        Program Muslim101
      </p>
      <p className="text-l-regular mb-7 text-neutral-900 max-lg:mb-2 max-lg:text-xs max-lg:leading-4">
        Jangan lewatkan program menarik dari Muslim 101
      </p>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          inViewThreshold: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-5">
          {dataBanner?.results.map((banner, index) => (
            <CarouselItem
              key={index}
              className={`basis-4/5 overflow-hidden pl-5 md:basis-1/2 lg:basis-1/3`}
            >
              <Link
                href={banner.url ?? ''}
                onClick={(e) => {
                  if (!isEmpty(banner.url)) {
                    window.location.href = banner.url ?? ''
                  } else {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
                key={`image-banner-${index}`}
                id={`image-banner-${banner.title}`}
              >
                <div
                  className={`relative ${!isEmpty(banner.url) ? 'cursor-pointer' : 'cursor-auto'}`}
                >
                  {/* Show skeleton until image is loaded */}
                  {!imagesLoaded[index] && <BannerSkeleton />}

                  <Image
                    src={banner.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt={`image-banner-${banner.title}`}
                    className={`aspect-2/1 h-auto w-full rounded-xl ${dissolve} object-cover ${
                      imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="max-sm:hidden" />
        <CarouselNext className="max-sm:hidden" />
      </Carousel>
    </section>
  )
}
