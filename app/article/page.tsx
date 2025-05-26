import { metadata } from '@/app/shared-metadata'
import { ArticleSearchWidget } from '@/components/pages/article/landing/1-Widget/Widget'
import { NewsArticle } from '@/components/pages/article/landing/2-NewArticle/NewArticle'
import { AllArticle } from '@/components/pages/article/landing/3-AllArticle/AllArticle'
import LayoutArticle from '@/components/pages/article/Layout'
import { getArticleList } from '@/services/article-service'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Article', `Muslim 101 Article`),
  }
}

export default async function ArticleHome({ searchParams }: any) {
  const awaitedParams = await searchParams
  const { page } = awaitedParams

  const [
    dataArticleTerbaru,
    dataAllArticle,
    // dataTerpopular
  ] = await Promise.all([
    getArticleList({
      page: 1,
      size: 4,
    }),
    getArticleList({
      page: page ?? 1,
      size: page > 1 ? 9 : 13,
    }),
    // getArticleByHiglight({
    //   type: 'popular',
    //   limit: 3,
    // }),
  ])

  return (
    <LayoutArticle>
      <ArticleSearchWidget params={awaitedParams} />
      <main className="mb-12.5 max-lg:mx-4">
        <NewsArticle dataArticleTerbaru={dataArticleTerbaru.results} />
        <AllArticle
          dataAllArticle={dataAllArticle.results}
          total={dataAllArticle.total}
          dataTerpopular={[]}
        />
      </main>
    </LayoutArticle>
  )
}
