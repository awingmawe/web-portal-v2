import { metadata } from '@/app/shared-metadata'
import { ArticleSearchWidget } from '@/components/pages/article/landing/1-Widget/Widget'
import { NewsArticle } from '@/components/pages/article/landing/2-NewArticle/NewArticle'
import { AllArticle } from '@/components/pages/article/landing/3-AllArticle/AllArticle'
import LayoutArticle from '@/components/pages/article/Layout'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import {
  getArticleCategories,
  getArticleList,
} from '@/services/article-service'
import { headers } from 'next/headers'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Article', `Muslim 101 Article`),
  }
}

export default async function ArticleHome({ searchParams }: any) {
  const awaitedParams = await searchParams
  const { page, category } = awaitedParams
  const isWebview = (await headers()).get('is-web-view') || ''

  const [
    dataArticleTerbaruResponse,
    dataAllArticleResponse,
    dataCategories,
    // dataTerpopular
  ] = await Promise.all([
    getArticleList({
      page: 1,
      size: 4,
    }),
    getArticleList({
      page: page ?? 1,
      size: page > 1 ? 9 : 13,
      category,
    }),
    getArticleCategories({
      is_active: true,
      page: 1,
      size: 100,
    }),
    // getArticleByHiglight({
    //   type: 'popular',
    //   limit: 3,
    // }),
  ])

  const dataArticleTerbaru = dataArticleTerbaruResponse.results

  // Filter out dataArticleTerbaru from dataAllArticle
  const terbaruIds = new Set(dataArticleTerbaru.map((article) => article.id))
  const filteredAllArticles = dataAllArticleResponse?.results?.filter(
    (article) => !terbaruIds.has(article.id)
  )

  const dataAllArticle = {
    ...dataAllArticleResponse,
    results: filteredAllArticles,
    total: dataAllArticleResponse.total,
  }

  return (
    <LayoutArticle>
      <ArticleSearchWidget params={isWebview} />
      <main className="mb-12.5 max-lg:mx-4">
        <NewsArticle dataArticleTerbaru={dataArticleTerbaru} />
        <AllArticle
          dataAllArticle={dataAllArticle.results}
          total={dataAllArticle.total}
          dataTerpopular={[]}
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
