import { metadata } from '@/app/shared-metadata'
import ImageDetail from '@/components/pages/article/detail/1-Image/ImageDetail'
import ContentArticle from '@/components/pages/article/detail/2-Content/Content'
import LayoutArticle from '@/components/pages/article/Layout'
import { getArticleDetail } from '@/services/article-service'
import { cookieNames } from '@/services/common/cookie'
import { getBanner } from '@/services/umrah-service'
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

  const [dataArticleDetail, dataBannerCarousel] = await Promise.all([
    getArticleDetail(slug),
    getBanner({
      page: 1,
      size: 10,
      order: 'desc',
      orderBy: 'createdAt',
    }),
  ])

  return (
    <LayoutArticle>
      <main className="container mx-auto mt-7.5 mb-12.5 max-lg:px-4">
        <ImageDetail
          created_at={dataArticleDetail.created_at}
          thumbnail={dataArticleDetail.thumbnail_url}
        />
        <ContentArticle
          {...dataArticleDetail}
          token={token}
          dataBannerCarousel={dataBannerCarousel}
        />
      </main>
    </LayoutArticle>
  )
}
