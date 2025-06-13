'use client'

import { Article } from '@/constant/types/ArticleProps'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
dayjs.extend(relativeTime)

interface ArticleCardProps {
  article: Article
  height?: number | string
  className?: string
  aspect?: number | string
  eventCategory?: string
  section?: string
}

export const ArticleCard = ({
  article,
  className,
  height = 'auto',
  aspect,
  eventCategory = 'article',
  section = 'Artikel Terbaru',
}: ArticleCardProps) => {
  const elem = useRef<HTMLDivElement>(null)
  const { observe, pushEvent } = useEventTracker()

  const dataForTracker = {
    articleId: article?.id,
    articleCategory: article?.category?.name,
    articleType: article?.type,
    title: article?.title,
    slug: article?.slug,
    description: article?.description,
    publishedAt: article?.published_at,
    // author: dataArticleDetail?.author?.name,
    tag: article?.hashtags?.map((tag) => tag).join(', '),
    section,
  }

  // Format the date to the Indonesian format (DD Bulan YYYY)
  const publishedAt = new Date(article?.published_at ?? article?.created_at)

  const formattedDate = dayjs(publishedAt).locale('id').fromNow()

  // Observe the element for tracking
  useEffect(() => {
    if (elem.current) {
      observe(elem.current, () => {
        pushEvent({
          name: 'impression_package_card',
          topic: 'general',
          category: eventCategory,
          data: dataForTracker,
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elem])
  return (
    <Link
      href={`/article/detail/${article?.slug}`}
      className={cn('block', className)}
      onClick={() => {
        pushEvent({
          name: 'click_article_card',
          topic: 'general',
          category: eventCategory,
          data: dataForTracker,
        })
      }}
    >
      <div
        className="group relative w-full overflow-hidden rounded-xl"
        style={{ height: height, aspectRatio: aspect }}
      >
        {/* Image */}
        <Image
          src={article?.thumbnail ?? '/images/no-image-placeholder.png'}
          alt={article?.title ?? 'Article Image'}
          width={0}
          height={0}
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105`}
        />

        {/* Gradient overlay */}

        {/* Content container */}
        <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent via-black/20 to-black/60">
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" /> */}
          <div className="relative flex flex-col justify-between p-4 max-lg:gap-1">
            {/* Category tag */}
            <span
              className={`text-m-regular absolute -top-5 left-0 rounded rounded-tr-full rounded-br-full px-3 py-1 font-medium text-white max-lg:-top-2.5 max-lg:text-xs max-lg:leading-4`}
              style={{ background: `${article?.category.color}` }}
            >
              {article?.category.name}
            </span>

            {/* Bottom content */}
            <div className="space-y-2 max-lg:space-y-1">
              <h3 className="text-l-medium line-clamp-2 text-white max-lg:text-sm max-lg:leading-5 max-lg:font-normal">
                {article?.title}
              </h3>
              <p className="text-m-regular text-neutral-100 max-lg:text-xs max-lg:leading-4">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
