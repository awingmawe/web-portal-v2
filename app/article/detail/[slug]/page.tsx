import { metadata } from '@/app/shared-metadata'
import ImageDetail from '@/components/pages/article/detail/1-Image/ImageDetail'
import ContentArticle from '@/components/pages/article/detail/2-Content/Content'
import LayoutArticle from '@/components/pages/article/Layout'
import { PackageTagSlug } from '@/constant/types/ArticleProps'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { mapProductsToCardData } from '@/lib/utils'
import {
  getArticleComment,
  getArticleCommentPublic,
  getArticleDetail,
} from '@/services/article-service'
import { cookieNames } from '@/services/common/cookie'
import { getUserById } from '@/services/identity-service'
import { getBanner, getPackageList, getTagById } from '@/services/umrah-service'
import { cookies } from 'next/headers'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim 101 | Pencarian Article',
      `Muslim 101 Pencarian Article`
    ),
  }
}

export default async function ArtilceDetail({ params }: any) {
  const { slug } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const [dataArticleDetail, dataBannerCarousel, dataComments] =
    await Promise.all([
      getArticleDetail(slug),
      getBanner({
        page: 1,
        size: 10,
        order: 'desc',
        orderBy: 'createdAt',
      }),
      token
        ? getArticleComment(
            slug,
            {
              page: 1,
              size: 10,
            },
            token
          )
        : getArticleCommentPublic(slug, {
            page: 1,
            size: 10,
          }),
    ])

  const tag = await getTagById(Number(dataArticleDetail.promo_tag))

  const dataPerTag = await getPackageList({
    page: 1,
    size: 12,
    ['tagPackage.tagSlug']: tag.slug,
    order: 'desc',
    orderBy: 'createdAt',
  })

  const dataUser = await getUserById(dataArticleDetail?.author_id)

  const dataForTracker = {
    articleId: dataArticleDetail?.id,
    articleCategory: dataArticleDetail?.category?.name,
    articleType: dataArticleDetail?.type,
    title: dataArticleDetail?.title,
    slug: dataArticleDetail?.slug,
    description: dataArticleDetail?.description,
    author: dataUser?.name,
    publishedAt: dataArticleDetail?.published_at,
    tag: dataArticleDetail?.hashtags?.map((tag) => tag).join(', '),
  }

  const dataPackageSlug: PackageTagSlug = {
    slug: tag.slug,
    data: mapProductsToCardData(dataPerTag),
  }
  return (
    <LayoutArticle>
      <main className="container mx-auto mt-7.5 mb-12.5 max-lg:mt-12.5 max-lg:px-4">
        <ImageDetail
          created_at={dataArticleDetail.created_at}
          thumbnail={dataArticleDetail.thumbnail_url}
        />
        <ContentArticle
          {...dataArticleDetail}
          author={dataUser}
          token={token}
          dataBannerCarousel={dataBannerCarousel}
          comments={dataComments.results}
          packageCampaign={dataPackageSlug}
        />
      </main>
      <EventTrackerImpression
        nameDidMount="impression_detail_article"
        nameDidUnmount="exit_detail_article"
        topic="general"
        category="article_detail"
        data={{
          dataForTracker,
        }}
      />
    </LayoutArticle>
  )
}
