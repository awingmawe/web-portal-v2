'use client'

import { ArrowCircleRight } from '@/components/icons/arrow-circle-right'
import { ArticleCard } from '@/components/pages/article/common/CardArticle'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Article } from '@/constant/types/ArticleProps'
import Link from 'next/link'

export default function ArtikelSection({
  dataCarousel,
}: {
  dataCarousel: Article[]
}) {
  return (
    <div className="relative z-6 w-full bg-[#FFFAED] pt-[70px]">
      <div className="px-20 pt-0 pb-20 max-lg:px-4">
        <div className="mb-3 flex items-end justify-between">
          <h1 className="text-3xl font-semibold lg:pt-0 lg:text-5xl">
            Artikel
          </h1>
          <Link
            href={`/article`}
            id={`link-see-all-article`}
            // onClick={() => {
            //   pushEvent({
            //     name: 'click_more',
            //     category: 'home',
            //     topic: 'umrah',
            //     data: {
            //       section: type,
            //     },
            //   })
            // }}
          >
            <Button
              intent="primary"
              className="flex w-full px-4 whitespace-nowrap max-lg:gap-[6px] lg:px-8"
            >
              Lihat Lebih Banyak <ArrowCircleRight size={14} />
            </Button>
          </Link>
        </div>
        <Carousel
          opts={{
            align: 'start',
            inViewThreshold: 1,
            watchDrag: true,
          }}
          className="mt-7 mb-0 w-full max-lg:mt-0 lg:my-7"
        >
          <CarouselContent className="-ml-4.5 px-2">
            {dataCarousel?.map((article) => (
              <CarouselItem
                key={`testimoni-${article.id}`}
                className="basis-1/4 items-center pl-4.5 max-lg:basis-3/5"
              >
                <ArticleCard
                  article={article}
                  className="h-full"
                  aspect={310 / 400}
                  section="Seluruh Artikel"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
