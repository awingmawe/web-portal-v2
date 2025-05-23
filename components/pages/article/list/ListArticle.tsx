'use client'

import { ArticleCard } from '@/components/pages/article/common/CardArticle'
import CategoryNavigation from '@/components/pages/article/common/Category'
import { CustomPagination } from '@/components/shared/CustomPagination'
import { Article } from '@/constant/types/ArticleProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function ListArticle({
  dataAllArticle,
  total,
}: {
  dataAllArticle: Article[]
  total: number
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { md: isMobile } = useTailwindBreakpoint()
  const totalPages = useMemo(() => {
    return Math.ceil(total / 9)
  }, [total])

  // Create page navigation function
  const goToPage = useCallback(
    (page: number) => {
      router.push(`/article/list?page=${page}`, { scroll: true })
    },
    [router]
  )
  return (
    <section className="container mx-auto mt-10 w-full max-lg:mt-7.5">
      <p className="heading-4-semibold max-lg:text-[16px] max-lg:leading-6">
        <span className="border-b-primary-500 border-b-4 ">Kategori</span>
      </p>
      <CategoryNavigation />
      <div className="grid grid-cols-12 gap-5">
        {dataAllArticle.map((article: Article) => (
          <div key={article.id} className="col-span-6 max-sm:col-span-12">
            <ArticleCard
              article={article}
              className="h-full"
              height={isMobile ? 200 : '100%'}
              aspect={isMobile ? 16 / 9 : 63 / 40}
            />
          </div>
        ))}
      </div>
      <div className="col-span-12">
        <CustomPagination
          currentPage={parseInt(searchParams.get('page') || '1', 10)}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </section>
  )
}
