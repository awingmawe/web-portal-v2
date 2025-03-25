'use client'

import { HeaderPackageList } from '@/components/pages/homepage/4-PackageList/HeaderPackageList'
import { CardPackage } from '@/components/shared/CardPackage'
import { CardPackageSkeleton } from '@/components/shared/SkeletonCardPackage'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CardData } from '@/constant/types/PackageProps'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface PackageListPlusProps {
  dataPlus: CardData[]
  isLoading?: boolean
}

interface PackageSectionProps {
  title: string
  description: string
  type: 'promo' | 'regular' | 'plus'
  data: CardData[]
  isLoading: boolean
  renderSkeletonItems: (count: number, isLoading: boolean) => React.ReactNode
}

// Reusable Package Section Component
const PackageSection = ({
  title,
  description,
  type,
  data,
  isLoading,
  renderSkeletonItems,
}: PackageSectionProps) => {
  // Memoize the package items
  const packageItems = useMemo(
    () =>
      data?.map((item, index) => (
        <CarouselItem
          key={`package-items-${item.title}-${index}`}
          className="basis-4/5 items-center pl-4.5 md:basis-1/2 lg:basis-1/4"
        >
          <CardPackage data={item} />
        </CarouselItem>
      )),
    [data]
  )

  return (
    <>
      <HeaderPackageList title={title} desc={description} type={type} />
      <Carousel
        opts={{
          align: 'start',
          inViewThreshold: 1,
          watchDrag: true,
        }}
        className="my-7 w-full max-lg:mt-0"
      >
        <CarouselContent className="-ml-4.5 px-2">
          {isLoading ? renderSkeletonItems(4, true) : packageItems}
        </CarouselContent>
        <CarouselPrevious className="top-[35%] max-sm:hidden" />
        <CarouselNext className="top-[35%] max-sm:hidden" />
      </Carousel>
    </>
  )
}

export const PackageListPlus: React.FC<PackageListPlusProps> = ({
  dataPlus,
  isLoading: externalLoading,
}) => {
  // Internal loading states
  const [isPromoLoading, setIsPromoLoading] = useState(true)
  const [isRegularLoading, setIsRegularLoading] = useState(true)
  const [isPlusLoading, setIsPlusLoading] = useState(true)

  // Use either external or internal loading state - memoize this computation
  const loading = useMemo(
    () =>
      externalLoading !== undefined
        ? externalLoading
        : isPromoLoading || isRegularLoading || isPlusLoading,
    [externalLoading, isPromoLoading, isRegularLoading, isPlusLoading]
  )

  // Create the skeleton carousel items with useCallback
  const renderSkeletonItems = useCallback(
    (count: number, isLoading: boolean) => {
      return Array.from({ length: count }).map((_, index) => (
        <CarouselItem
          key={`skeleton-${index}`}
          className="basis-4/5 items-center pl-4.5 md:basis-1/2 lg:basis-1/4"
        >
          <CardPackageSkeleton isLoading={isLoading} />
        </CarouselItem>
      ))
    },
    []
  )

  // Simulate loading or respect the external loading state
  useEffect(() => {
    if (externalLoading !== undefined) return

    // Simulate staggered loading for different sections
    const promoTimer = setTimeout(() => setIsPromoLoading(false), 1200)
    const regularTimer = setTimeout(() => setIsRegularLoading(false), 1800)
    const plusTimer = setTimeout(() => setIsPlusLoading(false), 2400)

    return () => {
      clearTimeout(promoTimer)
      clearTimeout(regularTimer)
      clearTimeout(plusTimer)
    }
  }, [externalLoading])

  // Package section configurations
  const sections = [
    {
      title: 'Umroh Plus',
      description: 'Umroh istimewa plus jalan-jalan ke destinasi pilihan!',
      type: 'plus' as const,
      data: dataPlus,
      isLoading: isPlusLoading || loading,
    },
  ]

  return (
    <section className="mt-[60px] flex flex-col gap-7 max-lg:mt-6 max-lg:gap-2">
      {sections.map((section) => (
        <PackageSection
          key={section.type}
          title={section.title}
          description={section.description}
          type={section.type}
          data={section.data}
          isLoading={section.isLoading}
          renderSkeletonItems={renderSkeletonItems}
        />
      ))}
    </section>
  )
}
