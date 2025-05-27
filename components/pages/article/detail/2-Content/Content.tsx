'use client'

import ShareIcon from '@/components/icons/share'
import WhatsappIcon from '@/components/icons/whatsapp'
import { ArticleCard } from '@/components/pages/article/common/CardArticle'
import { CarouselBanner } from '@/components/pages/homepage/2-Carousel/Carousel'
import { PackageListEvent } from '@/components/pages/homepage/4-PackageList/PackageListEvent'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ACCOUNT_URL } from '@/constant/env'
import {
  Article,
  Category,
  PackageTagSlug,
} from '@/constant/types/ArticleProps'
import { Banner } from '@/constant/types/BannerProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { formatDateToDDMMYYYY, formatReadTime } from '@/lib/utils'
import Link from 'next/link'
import { Fragment } from 'react'

export default function ContentArticle({
  content,
  title,
  author,
  token,
  created_at,
  category,
  read_time,
  button_link,
  button_text,
  other_articles,
  type,
  packageCampaign,
  dataBannerCarousel,
}: {
  content: string
  title: string
  token?: string
  author?: any
  created_at: Date | string
  category: Category
  read_time: number
  button_link: string
  button_text: string
  other_articles: Article[]
  type: string
  packageCampaign?: PackageTagSlug
  dataBannerCarousel: GenericResponse<Banner>
}) {
  const { shareViaCopyLink } = useGallerySharing()

  const isPromoPackage = type === 'regular' && other_articles
  return (
    <div
      className={`${isPromoPackage ? 'grid grid-cols-1' : 'mx-auto grid grid-cols-6 max-lg:grid-cols-1'} relative my-8 gap-8 max-lg:mt-2 max-lg:mb-4 max-lg:gap-4`}
    >
      {/* Title and Description Article */}
      <div
        className={`${isPromoPackage ? 'col-start-1 col-end-7' : 'col-span-4 col-start-2'} flex flex-col gap-2 max-lg:col-span-12`}
      >
        <p className="heading-1-semibold max-lg:text-[20px] max-lg:leading-6.5">
          {title}
        </p>
        <div className="flex items-center gap-3 max-lg:gap-2">
          <div className="flex items-center gap-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author?.avatarProvider} alt="User avatar" />
              <AvatarFallback className="text-m-regular text-neutral-800 max-lg:text-xs max-lg:leading-4">
                {author?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="text-m-regular text-neutral-800 max-lg:text-xs max-lg:leading-4">
            •
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:hidden max-lg:text-xs max-lg:leading-4">
            {formatDateToDDMMYYYY(
              typeof created_at === 'string' ? new Date(created_at) : created_at
            )}
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:hidden max-lg:text-xs max-lg:leading-4">
            |
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:text-xs max-lg:leading-4">
            {category.name}
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:text-xs max-lg:leading-4">
            •
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:text-xs max-lg:leading-4">
            {formatReadTime(read_time ?? 0)}
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:hidden max-lg:text-xs max-lg:leading-4">
            |
          </p>
          <div className="flex items-center gap-2 max-lg:hidden">
            <p className="text-l-regular text-neutral-500">Bagikan:</p>
            <WhatsappIcon size={20} className="cursor-pointer" />
            <ShareIcon
              size={20}
              onClick={shareViaCopyLink}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={`${isPromoPackage ? 'col-start-1 col-end-4' : 'col-span-4 col-start-2'} max-lg:col-span-12`}
      >
        <div className="flex flex-col gap-6">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {(button_link || button_text) && (
            <div className="bg-primary-500 flex items-center rounded-[20px] py-3">
              <Button className="bg-neutral-0 px-10 py-3">{button_text}</Button>
            </div>
          )}
          {type !== 'regular' && (
            <>
              {packageCampaign && (
                <PackageListEvent dataCustom={packageCampaign} />
              )}
              <CarouselBanner
                dataBanner={dataBannerCarousel}
                title="Penawaran lain"
                className="mt-0"
                description=""
                showPerItem={2}
              />
            </>
          )}
          {/* Comment */}
          <div className="flex w-full flex-col gap-6 rounded-[20px] border-1 border-neutral-100 p-4">
            {token ? (
              ''
            ) : (
              <div className="flex w-full flex-col items-center gap-4 rounded-[20px] border-1 border-neutral-100 p-4">
                <p className="text-s-regular">
                  Kamu membutuhkan akun untuk mulai berkomentar!
                </p>
                <Link
                  href={`${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`}
                  className="text-s-semibold bg-primary-500 rounded-full px-10 py-2 text-neutral-900"
                >
                  Masuk/Buat Akun
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Artikel Lainnya */}
      {isPromoPackage && (
        <div className="sticky top-20 col-span-2 col-end-7 max-lg:hidden">
          <div className="max-lg:rounded-0 flex flex-col rounded-[20px] border-1 border-neutral-200 p-4 max-lg:gap-5 max-lg:border-0 max-lg:p-0">
            <p className="heading-4-semibold mb-4">
              <span className="border-b-primary-500 border-b-4">Artikel</span>{' '}
              Lainnya
            </p>
            {other_articles.map((article, idx) => {
              return (
                <Fragment key={`article-${idx}-${article.title}`}>
                  <ArticleCard
                    article={article}
                    height={200}
                    className={'h-full'}
                    aspect={16 / 9}
                  />
                  {idx !== other_articles.length - 1 && (
                    <div className="my-2.5 h-px w-full bg-[#D2D2D1] max-lg:hidden" />
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
