import { metadata } from '@/app/shared-metadata'
import TopbarMobileArticle from '@/components/pages/article/common/TopbarMobile'
import { ArticleSearchWidget } from '@/components/pages/article/landing/1-Widget/Widget'
import { NewsArticle } from '@/components/pages/article/landing/2-NewArticle/NewArticle'
import { AllArticle } from '@/components/pages/article/landing/3-AllArticle/AllArticle'
import LayoutArticle from '@/components/pages/article/Layout'
import { NODE_ENV, URL } from '@/constant/env'
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
    ...metadata('Muslim101 | Article', `Muslim101 Article`),
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

  // --- JSON-LD for WebSite ---
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Muslim101',
    url: URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${URL}/article/list?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  // --- JSON-LD for Article List ---
  const articleListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement:
      dataArticleTerbaru?.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.description,
          image: article.thumbnail || `${URL}/thumbnail.png`,
          datePublished: article.published_at,
          author: [
            {
              '@type': 'Person',
              name: article.created_by || 'Muslim101',
            },
          ],
          publisher: {
            '@type': 'Organization',
            name: 'Muslim101',
            logo: {
              '@type': 'ImageObject',
              url: `${URL}/thumbnail.png`,
            },
          },
          url: `${URL}/article/detail/${article.slug}`,
        },
      })) || [],
  }

  // --- JSON-LD for Breadcrumb ---
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Artikel',
        item: `${URL}/article`,
      },
    ],
  }
  return (
    <LayoutArticle>
      {/* JSON-LD Scripts */}
      {NODE_ENV === 'production' && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteJsonLd),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleListJsonLd),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbJsonLd),
            }}
          />
        </>
      )}
      <TopbarMobileArticle
        href={isWebview ? '/close-web-view' : 'back'}
        isWebview={isWebview == 'true'}
      />
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
