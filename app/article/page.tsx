import { metadata } from '@/app/shared-metadata'
import TopbarMobileArticle from '@/components/pages/article/common/TopbarMobile'
import { ArticleSearchWidget } from '@/components/pages/article/landing/1-Widget/Widget'
import { NewsArticle } from '@/components/pages/article/landing/2-NewArticle/NewArticle'
import { AllArticle } from '@/components/pages/article/landing/3-AllArticle/AllArticle'
import LayoutArticle from '@/components/pages/article/Layout'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import {
  getArticleByHiglight,
  getArticleCategories,
  getArticleList,
} from '@/services/article-service'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Article', `Muslim 101 Article`),
  }
}

export default async function ArticleHome({ searchParams }: any) {
  const cookieStore = await cookies()

  const { category } = await searchParams
  const isWebview =
    (cookieStore.get(cookieNames.IS_WEBVIEW)?.value as string) || false

  const [
    dataArticleTerbaruResponse,
    dataAllArticleResponse,
    dataCategories,
    dataTerpopular,
  ] = await Promise.all([
    getArticleList({
      page: 1,
      size: 4,
    }),
    getArticleList({
      page: 1,
      size: 13,
      category,
    }),
    getArticleCategories({
      is_active: true,
      page: 1,
      size: 100,
    }),
    getArticleByHiglight({
      slug: 'popular',
      query: {
        page: 1,
        size: 3,
      },
    }),
  ])

  const dataArticleTerbaru = dataArticleTerbaruResponse.results

  // Filter out dataArticleTerbaru from dataAllArticle
  const terbaruIds = new Set(dataArticleTerbaru?.map((article) => article.id))
  const filteredAllArticles = dataAllArticleResponse?.results?.filter(
    (article) => !terbaruIds.has(article.id)
  )

  const dataAllArticle = {
    ...dataAllArticleResponse,
    results: filteredAllArticles,
    total: dataAllArticleResponse.total - 4,
  }

  return (
    <LayoutArticle>
      <TopbarMobileArticle href={isWebview ? '/close-web-view' : 'back'} />
      <ArticleSearchWidget params={isWebview} />
      <main className="mb-12.5 max-lg:mx-4">
        {dataArticleTerbaru?.length > 0 && (
          <NewsArticle dataArticleTerbaru={dataArticleTerbaru} />
        )}
        <AllArticle
          dataAllArticle={dataAllArticle.results}
          dataTerpopular={dataTerpopular}
          dataCategories={dataCategories}
        />
      </main>
      <EventTrackerImpression
        nameDidMount="impression_article"
        nameDidUnmount="exit_article"
        topic="general"
        category="article"
      />
    </LayoutArticle>
  )
}
