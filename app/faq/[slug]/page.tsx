import { metadata } from '@/app/shared-metadata'
import FaqContent from '@/components/pages/faq/FaqContent'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Fragment } from 'react'

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
  params: { slug: string }
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const slug = params.slug

  return (
    <Fragment>
      <Topbar shadow scrolled token={token} />
      <MobileTopbar variant="plain" showBackButton />
      <div className="container mx-auto mt-5 mb-10">
        <Link href={'/faq'}>
          <div className="bg-white p-4">
            <button className="flex cursor-pointer items-center text-gray-800">
              <ChevronLeft className="mr-4" size={24} />

              <span className="text-m-regular text-gray-800">Kembali</span>
            </button>
          </div>
        </Link>

        <section className="mt-8 flex flex-col items-center max-lg:px-4">
          <FaqContent slug={slug} type="content" pagination />
        </section>
      </div>
      <Footer />
    </Fragment>
  )
}
