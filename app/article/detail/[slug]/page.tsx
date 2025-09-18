import { metadata } from '@/app/shared-metadata'
import TopbarMobileArticle from '@/components/pages/article/common/TopbarMobile'
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

export async function generateMetadata({ params }: any) {
  const { slug } = await params

  const dataDetail = await getArticleDetail(slug)

  return {
    ...metadata(
      `Muslim101 | ${dataDetail?.title}`,
      dataDetail?.description,
      dataDetail?.thumbnail,
      dataDetail?.hashtags
    ),
  }
}

export default async function ArtilceDetail({ params }: any) {
  const { slug } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  const isWebview = cookieStore.get(cookieNames.IS_WEBVIEW)?.value as string

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

  let tag
  let dataPerTag
  let dataPackageSlug: PackageTagSlug | undefined = undefined

  if (dataArticleDetail.type === 'promo-umrah') {
    try {
      tag = await getTagById(Number(dataArticleDetail.promo_tag))

      // Only call getPackageList if we have a valid tag with slug
      if (tag?.slug) {
        dataPerTag = await getPackageList({
          page: 1,
          size: 12,
          ['tagPackage.tagSlug']: tag.slug,
          order: 'desc',
          orderBy: 'createdAt',
        })

        dataPackageSlug = {
          slug: tag.slug,
          data: mapProductsToCardData(dataPerTag),
        }
      }
    } catch (error) {
      console.error(error)
      tag = {}
    }
  }

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
    tag: dataArticleDetail?.hashtags?.map((tag) => tag).join(', ') ?? '',
  }

  return (
    <LayoutArticle>
      <TopbarMobileArticle
        href="back"
        applyRouter
        isWebview={isWebview == 'true'}
      />
      <main className="container mx-auto mt-7.5 mb-12.5 max-lg:mt-15 max-lg:px-4">
        <ImageDetail
          created_at={dataArticleDetail.created_at}
          slug={dataArticleDetail.slug}
          thumbnail_url={dataArticleDetail.thumbnail}
          title={dataArticleDetail.title}
          isWebview={isWebview}
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
