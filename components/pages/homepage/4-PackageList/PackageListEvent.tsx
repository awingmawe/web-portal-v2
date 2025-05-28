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
import { PackageTagSlug } from '@/constant/types/ArticleProps'
import { CardData } from '@/constant/types/PackageProps'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'

interface PackageListEventProps {
  dataPromo?: CardData[]
  dataRegular?: CardData[]
  dataPlus?: CardData[]
  dataCustom?: PackageTagSlug
  isLoading?: boolean
  eventCategory?: string
  header?: boolean
  params?: string
}

interface PackageSectionProps {
  title: string
  description?: string
  type?: 'promo' | 'regular' | 'plus' | string
  data: CardData[]
  isLoading?: boolean
  header: boolean
  eventCategory?: string
  params?: string
  renderSkeletonItems: (count: number, isLoading: boolean) => React.ReactNode
}

// Reusable Package Section Component
const PackageSection = ({
  title,
  description,
  type,
  data,
  isLoading,
  header = true,
  eventCategory,
  params,
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
          <CardPackage
            data={item}
            section={type}
            eventCategory={eventCategory}
          />
        </CarouselItem>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  return (
    <Fragment>
      {data.length !== 0 && (
        <div>
          {header && (
            <HeaderPackageList
              title={title}
              desc={description ?? ''}
              type={type ?? ''}
              params={params ?? 'section'}
            />
          )}
          <Carousel
            opts={{
              align: 'start',
              inViewThreshold: 1,
              watchDrag: true,
            }}
            className="w-full max-lg:mt-0"
          >
            <CarouselContent className="-ml-4.5 px-2 max-lg:ml-0">
              {isLoading ? renderSkeletonItems(4, true) : packageItems}
            </CarouselContent>
            <CarouselPrevious className="top-[35%] max-lg:hidden" />
            <CarouselNext className="top-[35%] max-lg:hidden" />
          </Carousel>
        </div>
      )}
    </Fragment>
  )
}

export const PackageListEvent: React.FC<PackageListEventProps> = ({
  dataPromo,
  dataRegular,
  dataPlus,
  dataCustom,
  isLoading: externalLoading,
  eventCategory,
  header,
  params,
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
      title: 'Paket Promo',
      description: 'Promo menarik Muslim101 untukmu',
      type: 'promo' as const,
      data: dataPromo,
      isLoading: isPromoLoading || loading,
      header: header,
      eventCategory,
    },
    {
      title: 'Umroh Reguler',
      description:
        'Umroh tanpa khawatir, tinggal berangkat dan ibadah dengan nyaman!',
      type: 'regular' as const,
      data: dataRegular,
      isLoading: isRegularLoading || loading,
      header: header,
      eventCategory,
    },
    {
      title: 'Umroh Plus Liburan',
      description: 'Umroh istimewa plus jalan-jalan ke destinasi pilihan!',
      type: 'plus' as const,
      data: dataPlus || [],
      isLoading: isPlusLoading || loading,
      header: header,
      eventCategory,
    },
    {
      title: 'Penawaran Lainnya',
      type: dataCustom?.slug,
      data: dataCustom?.data,
      header: header,
      eventCategory,
      params,
    },
  ]

  return (
    <section className="flex flex-col">
      {sections.map((section) => (
        <Fragment key={section.title}>
          <PackageSection
            key={section.type}
            title={section.title}
            description={section.description}
            type={section.type ?? ''}
            header={section.header ?? true}
            data={section.data ?? []}
            isLoading={section.isLoading}
            eventCategory={section.eventCategory}
            params={section.params}
            renderSkeletonItems={renderSkeletonItems}
          />
        </Fragment>
      ))}
    </section>
  )
}
