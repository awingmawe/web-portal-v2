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
import { PACKAGE_TYPE } from '@/constant/env'
import { PackageTagSlug } from '@/constant/types/ArticleProps'
import { CardData } from '@/constant/types/PackageProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { ChevronRightCircle } from 'lucide-react'
import Link from 'next/link'
import { Fragment, useCallback, useMemo } from 'react'

interface PackageListEventProps {
  dataPromo?: CardData[]
  dataRegular?: CardData[]
  dataPlus?: CardData[]
  dataHaji?: CardData[]
  dataPembiayaan?: CardData[]
  dataCustom?: PackageTagSlug
  isLoading?: boolean
  eventCategory?: string
  header?: boolean
  params?: string
  className?: string
}

interface PackageSectionProps {
  title: string
  description?: string
  type?: 'promo' | 'regular' | 'plus' | string
  data: CardData[]
  isLoading?: boolean
  header: boolean
  packageType?: string | 'umrah' | 'hajj'
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
  packageType,
  renderSkeletonItems,
}: PackageSectionProps) => {
  const { lg } = useTailwindBreakpoint()
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
              packageType={packageType ?? 'umrah'}
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
              {lg && type && (
                <CarouselItem
                  className="mx-4.5 hidden basis-4/5 flex-col items-center
              justify-center rounded-2xl border border-neutral-200 max-lg:flex md:basis-1/2 lg:basis-1/4"
                >
                  <Link
                    href={`/search?page=1&query=&${type === PACKAGE_TYPE.HAJJ ? 'type=' : 'section='}${type}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ChevronRightCircle className="h-10 w-10" />
                      <p className="text-m-regular text-center text-neutral-900">
                        Lihat Paket Lainnya
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              )}
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
  dataHaji,
  dataPembiayaan,
  dataCustom,
  isLoading,
  eventCategory,
  header,
  params,
  className,
}) => {
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

  // Package section configurations
  const sections = [
    {
      title: 'Paket Promo',
      description: 'Promo menarik Muslim101 untukmu',
      type: 'promo' as const,
      data: dataPromo,
      packageType: 'umrah',
      header: header,
      eventCategory,
    },
    {
      title: 'Umroh Reguler',
      description:
        'Umroh tanpa khawatir, tinggal berangkat dan ibadah dengan nyaman!',
      type: 'regular' as const,
      data: dataRegular,
      packageType: 'umrah',
      header: header,
      eventCategory,
    },
    {
      title: 'Umroh Plus Liburan',
      description: 'Umroh istimewa plus jalan-jalan ke destinasi pilihan!',
      type: 'plus' as const,
      data: dataPlus || [],
      packageType: 'umrah',
      header: header,
      eventCategory,
    },
    {
      title: 'Haji',
      description: 'Pilihan paket terbaik untuk perjalanan suci kamu!',
      type: 'hajj' as const,
      data: dataHaji || [],
      header: header,
      packageType: 'hajj',
      params: 'type',
      eventCategory,
    },
    {
      title: 'Paket Pembiayaan',
      description: 'Paket pilihan yang sudah tersedia pembiayaan',
      data: dataPembiayaan || [],
      header: header,
      packageType: 'umrah',
      eventCategory,
    },

    {
      title: 'Paket Promo Ini!',
      type: dataCustom?.slug,
      data: dataCustom?.data,
      header: header,
      eventCategory,
      params,
    },
  ]

  return (
    <section className={`${className} flex flex-col`}>
      {sections.map((section) => (
        <Fragment key={section.title}>
          <PackageSection
            key={section.type}
            packageType={section.packageType}
            title={section.title}
            description={section.description}
            type={section.type ?? ''}
            header={section.header ?? true}
            data={section.data ?? []}
            isLoading={isLoading}
            eventCategory={section.eventCategory}
            params={section.params}
            renderSkeletonItems={renderSkeletonItems}
          />
        </Fragment>
      ))}
    </section>
  )
}
