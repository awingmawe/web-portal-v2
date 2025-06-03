'use client'

import { ArrowDiagonalIcon } from '@/components/icons/arrow'
import { ArticleCard } from '@/components/pages/article/common/CardArticle'
import CategoryNavigation from '@/components/pages/article/common/Category'
import { Button } from '@/components/ui/button'
import { Article, Category } from '@/constant/types/ArticleProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Link from 'next/link'
import React from 'react'

export function AllArticle({
  dataAllArticle,
  dataTerpopular,
  dataCategories,
}: {
  dataAllArticle: Article[]
  dataTerpopular: Article[]
  dataCategories: Category[]
}) {
  const { md: isMobile } = useTailwindBreakpoint()

  return (
    <section className="container mx-auto mt-10 w-full max-lg:mt-7.5">
      <div className="grid grid-cols-12 gap-4.5">
        <div className="col-span-8 max-lg:col-span-12">
          <p className="heading-4-semibold max-lg:text-[16px] max-lg:leading-6">
            <span className="border-b-primary-500 border-b-4 ">Seluruh</span>{' '}
            Artikel
          </p>
          <CategoryNavigation
            eventCategory="article"
            dataCategories={dataCategories}
          />
          {dataAllArticle?.length > 0 ? (
            <>
              <div className="grid grid-cols-12 gap-4.5">
                {dataAllArticle?.map((article: Article) => (
                  <div
                    key={article.id}
                    className="col-span-4 max-md:col-span-6 max-sm:col-span-12"
                  >
                    <ArticleCard
                      article={article}
                      className="h-full"
                      height={isMobile ? 200 : '100%'}
                      aspect={isMobile ? 16 / 9 : 3 / 4}
                      section="Seluruh Artikel"
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-12 grid">
                <Link href="/article/list" className="m-auto mt-6">
                  <Button className="items-center gap-1 px-3 py-2" size="xs">
                    <p className="text-m-regular text-neutral-900">
                      Lihat Artikel Lainnya
                    </p>
                    <ArrowDiagonalIcon size={24} />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="col-span-12 flex h-[300px] items-center justify-center text-center">
              <p className="text-m-regular text-neutral-500 max-lg:text-sm max-lg:leading-5">
                Artikel tidak tersedia
              </p>
            </div>
          )}
        </div>
        {dataTerpopular?.length > 0 && (
          <div className="col-span-4 max-lg:col-span-12">
            <div className="max-lg:rounded-0 flex flex-col rounded-[20px] border-1 border-neutral-200 p-4 max-lg:gap-5 max-lg:border-0 max-lg:p-0">
              <p className="heading-4-semibold mb-4 max-lg:mb-0 max-lg:text-[16px] max-lg:leading-6">
                <span className="border-b-primary-500 border-b-4 ">
                  Artikel
                </span>{' '}
                Terpopuler
              </p>
              {dataTerpopular.map((article: Article, index) => (
                <React.Fragment key={article.id}>
                  <ArticleCard
                    article={article}
                    height={200}
                    className="h-full"
                    aspect={16 / 9}
                    section="Artikel Terpopuler"
                  />
                  {index !== dataTerpopular.length - 1 && (
                    <div className="my-2.5 h-px w-full bg-[#D2D2D1] max-lg:hidden" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
