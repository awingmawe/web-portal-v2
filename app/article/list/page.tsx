import { metadata } from '@/app/shared-metadata'
import TopbarMobileArticle from '@/components/pages/article/common/TopbarMobile'
import WidgetFilter from '@/components/pages/article/common/Widget'
import LayoutArticle from '@/components/pages/article/Layout'
import { ListArticle } from '@/components/pages/article/list/ListArticle'
import { NODE_ENV, URL } from '@/constant/env'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import {
  getArticleCategories,
  getArticleList,
} from '@/services/article-service'

export async function generateMetadata() {
  return {
    ...metadata('Muslim101 | Pencarian Article', `Muslim101 Pencarian Article`),
  }
}

export default async function ArtilceSearch({ searchParams }: any) {
  const awaitedParams = await searchParams

  const { page, query, category } = awaitedParams
  const [dataAllArticle, dataCategories] = await Promise.all([
    getArticleList({
      page: page ?? 1,
      size: 10,
      q: query,
      category,
    }),
    getArticleCategories({
      is_active: true,
      page: 1,
      size: 100,
    }),
  ])

  // Current page number
  const currentPage = parseInt(page) || 1

  // --- JSON-LD for Search Results Page ---
  const searchResultsJsonLd = {
    '@context': 'https://schema.org',
    '@type': query ? 'SearchResultsPage' : 'CollectionPage',
    name: query ? `Hasil pencarian: ${query}` : 'Artikel Muslim101',
    description: query
      ? `Hasil pencarian artikel untuk "${query}" di Muslim101`
      : 'Kumpulan artikel terbaru dan terpercaya tentang Islam di Muslim101',
    url: `${URL}/article/list?${query ? `q=${query}` : ''}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: dataAllArticle.total,
      itemListElement:
        dataAllArticle.results?.map((article, index) => ({
          '@type': 'ListItem',
          position: (currentPage - 1) * 10 + index + 1,
          item: {
            '@type': 'NewsArticle',
            '@id': `${URL}/article/detail/${article.slug}`,
            headline: article.title,
            description: article.description,
            image: article.thumbnail || `${URL}/thumbnail.png`,
            datePublished: article.published_at,
            dateModified: article.updated_at || article.published_at,
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
            articleSection: article.category?.name,
            keywords: article.hashtags?.map((tag) => tag).join(', '),
          },
        })) || [],
    },
    // Add search action if this is a search page
    ...(query && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${URL}/article/list?query={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
    // Add pagination info
    ...(dataAllArticle.total > 10 && {
      pagination: {
        '@type': 'PaginationLinks',
        numberOfPages: Math.ceil(dataAllArticle.total / 10),
        pageNumber: currentPage,
      },
    }),
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

  // --- JSON-LD for Website ---
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Muslim101',
    url: URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${URL}/article/list?query={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <LayoutArticle>
      {/* JSON-LD Scripts */}
      {NODE_ENV === 'production' && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(searchResultsJsonLd),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbJsonLd),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteJsonLd),
            }}
          />
        </>
      )}

      <TopbarMobileArticle href="/article" applyRouter />
      <main className="container mx-auto mt-10 mb-12.5 max-lg:px-4">
        <WidgetFilter eventCategory="article_index" />
        <ListArticle
          dataAllArticle={dataAllArticle.results}
          total={dataAllArticle.total}
          dataCategories={dataCategories}
          size={10}
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
