import { metadata } from '@/app/shared-metadata'
import FaqContent from '@/components/pages/faq/FaqContent'
import FaqSearch from '@/components/pages/faq/FaqSearch'
import LayoutFaq from '@/components/pages/faq/Layout'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'

export async function generateMetadata() {
  return {
    ...metadata('Muslim101 | FAQ', `Muslim101 FAQ`),
  }
}

export default async function Faq({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const page = Number(searchParams?.page) || 1
  const likeLower = searchParams?.search as string | undefined

  return (
    <LayoutFaq>
      <MobileTopbar variant={'plain'} title="FAQ" showBackButton />

      <FaqSearch />

      {/* SEARCH DESKTOP */}
      <div className="container mx-auto mb-10">
        <section className="mt-8 max-lg:px-4">
          <FaqContent
            page={page}
            limit={10}
            type="list"
            pagination={true}
            likeLower={likeLower}
          />
        </section>
      </div>
    </LayoutFaq>
  )
}
