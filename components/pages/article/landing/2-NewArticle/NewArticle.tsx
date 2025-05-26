'use client'

import { ArticleCard } from '@/components/pages/article/common/CardArticle'
import { Article } from '@/constant/types/ArticleProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'

export function NewsArticle({
  dataArticleTerbaru,
}: {
  dataArticleTerbaru: Article[]
}) {
  const { md: isMobile } = useTailwindBreakpoint()
  return (
    <section className="container mx-auto mt-10 w-full max-lg:mt-7.5">
      <p className="heading-4-semibold mb-4 max-lg:text-[16px] max-lg:leading-6">
        <span className="border-b-primary-500 border-b-4 ">Artikel</span>{' '}
        Terbaru 🔥
      </p>
      <div className="grid grid-cols-12 gap-4.5">
        <div className="col-span-7 max-lg:col-span-12">
          <ArticleCard
            article={dataArticleTerbaru[0]}
            className="h-full"
            height={isMobile ? 200 : '100%'}
            aspect={16 / 9}
          />
        </div>
        <div className="col-span-5 flex flex-col gap-4.5 max-lg:col-span-12">
          <ArticleCard
            article={dataArticleTerbaru[1]}
            height={isMobile ? 200 : '100%'}
            className={'max-lg:h-full'}
            aspect={16 / 9}
          />
          <div className="flex w-full gap-4.5 max-lg:gap-3.5">
            <ArticleCard
              article={dataArticleTerbaru[2]}
              height={190}
              className="w-full"
            />
            <ArticleCard
              article={dataArticleTerbaru[3]}
              height={190}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
