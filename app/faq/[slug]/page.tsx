import { metadata } from '@/app/shared-metadata'
import LayoutFaq from '@/components/pages/faq/Layout'
import { getFaq } from '@/services/article-service'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import renderHTML from 'react-render-html'

/**
 * Generate metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return {
    ...metadata(`Muslim101 | FAQ - ${slug}`, `FAQ tentang ${slug}`),
  }
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const faqLists = await getFaq({ slug })
  const faqContent = faqLists?.results?.[0]

  return (
    <LayoutFaq variant="details">
      <div className="container mx-auto mt-5 mb-30 max-lg:mb-10">
        <Link href="/faq" className="max-md:hidden">
          <div className="bg-white p-4">
            <button className="flex cursor-pointer items-center text-gray-800">
              <ChevronLeft className="mr-4" size={24} />
              <span className="text-m-regular text-gray-800">Kembali</span>
            </button>
          </div>
        </Link>

        <section className="mt-8 flex flex-col items-center max-lg:items-start max-lg:px-4">
          <div className="flex max-w-[50%] flex-col items-start gap-4 max-lg:max-w-full">
            <h1 className="heading-1-semibold max-lg:text-base max-lg:leading-5">
              {faqContent?.title}
            </h1>
            <div className="text-m-regular max-lg:text-s-regular max-sm:text-s-regular max-lg:leading-5 max-sm:leading-5">
              {renderHTML(faqContent?.body)}
            </div>
          </div>
        </section>
      </div>
    </LayoutFaq>
  )
}
