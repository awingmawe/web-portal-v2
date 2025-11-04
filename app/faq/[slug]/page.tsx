import { metadata } from '@/app/shared-metadata'
import LayoutFaq from '@/components/pages/faq/Layout'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { getFaq } from '@/services/article-service'
import { cookieNames } from '@/services/common/cookie'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  return {
    ...metadata(
      `Muslim101 | FAQ - ${params.slug}`,
      `FAQ tentang ${params.slug}`
    ),
  }
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  const { slug } = await params
  const faqLists = await getFaq({
    slug,
  })

  let faqContent

  if (faqLists) {
    faqContent = faqLists.results[0]
  }

  return (
    <LayoutFaq variant="details">
      <MobileTopbar variant="plain" title={faqContent?.title} showBackButton />
      <div className="container mx-auto mt-5 mb-30">
        <Link href={'/faq'} className="max-md:hidden">
          <div className="bg-white p-4">
            <button className="flex cursor-pointer items-center text-gray-800">
              <ChevronLeft className="mr-4" size={24} />

              <span className="text-m-regular text-gray-800">Kembali</span>
            </button>
          </div>
        </Link>

        <section className="mt-8 flex flex-col items-center max-lg:items-start max-lg:px-4">
          <div className="flex max-w-[50%] flex-col items-start gap-4 max-lg:max-w-full">
            <h1 className="text-m-semibold mb-2 max-lg:text-xl max-lg:leading-6.5 max-sm:text-sm  max-sm:leading-5">
              {faqContent?.title}
            </h1>
            <div
              className="prose text-m-regular text-justify max-lg:text-xl max-lg:leading-6.5 max-sm:text-sm max-sm:leading-5"
              dangerouslySetInnerHTML={
                faqContent?.body ? { __html: faqContent.body } : undefined
              }
            />
          </div>
        </section>
      </div>
    </LayoutFaq>
  )
}
