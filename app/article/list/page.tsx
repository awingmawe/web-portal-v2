import { metadata } from '@/app/shared-metadata'
import WidgetFilter from '@/components/pages/article/common/Widget'
import LayoutArticle from '@/components/pages/article/Layout'
import { ListArticle } from '@/components/pages/article/list/ListArticle'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { getArticleList } from '@/services/article-service'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim 101 | Pencarian Article',
      `Muslim 101 Pencarian Article`
    ),
  }
}

export default async function ArtilceSearch({ searchParams }: any) {
  const awaitedParams = await searchParams

  const { page, query } = awaitedParams
  const [dataAllArticle] = await Promise.all([
    getArticleList({
      page: page ?? 1,
      size: 9,
      q: query,
    }),
  ])

  return (
    <LayoutArticle>
      <main className="container mx-auto mt-7.5 mb-12.5 max-lg:px-4">
        <WidgetFilter eventCategory="article_index" />
        <ListArticle
          dataAllArticle={dataAllArticle.results}
          total={dataAllArticle.total}
        />
      </main>
      <EventTrackerImpression
        nameDidMount="impression_search_article"
        nameDidUnmount="exit_search_article"
        topic="general"
        category="article_index"
        data={{
          keyword: query,
        }}
      />
    </LayoutArticle>
  )
}
