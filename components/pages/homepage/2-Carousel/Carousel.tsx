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
import { useEventTracker } from '@/contexts/event-tracker/context'
import { dissolve } from '@/lib/animation-setup'
import { cn, isEmpty } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function CarouselBanner({
  dataBanner,
  title = 'Program Muslim101',
  description = 'Jangan lewatkan program menarik dari Muslim 101',
  className = '',
  showPerItem = 3,
}: {
  dataBanner: GenericResponse<Banner>
  title?: string
  description?: string
  className?: string
  showPerItem?: number
}) {
  const { pushEvent } = useEventTracker()
  // State to track image loading
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  // Handler for image load
  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }))
  }

  const handlePerItem = () => {
    if (showPerItem === 1) {
      return 'basis-1'
    }
    if (showPerItem === 2) {
      return 'basis-1/2'
    }
    if (showPerItem === 3) {
      return 'basis-1/3'
    }
  }
  return (
    <section className={cn(className)}>
      <p
        className={`heading-3-bold mb-6 text-neutral-900  max-lg:mb-1 max-lg:ml-5 max-lg:text-xl max-lg:leading-6.5`}
      >
        {title}
      </p>
      <p className="text-l-regular mb-7 text-neutral-900 max-lg:mx-5 max-lg:mb-5 max-lg:text-xs max-lg:leading-4">
        {description}
      </p>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          inViewThreshold: 1,
        }}
        className="w-full "
      >
        <CarouselContent className="-ml-5 max-lg:ml-0">
          {dataBanner?.results.map((banner, index) => (
            <CarouselItem
              key={index}
              className={`${handlePerItem()} overflow-hidden pl-5 max-lg:basis-1/3 max-md:basis-1/2 max-sm:basis-4/5`}
            >
              <Link
                href={banner.url ?? ''}
                onClick={(e) => {
                  pushEvent({
                    name: 'click_program',
                    category: 'home',
                    data: {
                      title: banner.title,
                      bannerId: banner.id,
                      destination: banner.url,
                      order: index + 1,
                    },
                  })

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
