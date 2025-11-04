import { metadata } from '@/app/shared-metadata'
import FaqContent from '@/components/pages/faq/FaqContent'
import FaqSearch from '@/components/pages/faq/FaqSearch'
import LayoutFaq from '@/components/pages/faq/Layout'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { Input } from '@/components/ui/input'
import { cookieNames } from '@/services/common/cookie'
import { Search } from 'lucide-react'
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

  console.log(likeLower)

  return (
    <LayoutFaq>
      <MobileTopbar variant={'plain'} title="FAQ" showBackButton />

      {/* SEARCH MOBILE */}
      <div className="scrollbar-hide flex gap-2 overflow-x-hidden pl-5 lg:hidden">
        <div className={`pr-t absolute -top-19 left-3.5 w-11/12 md:w-10/12`}>
          <h4 className="heading-5-medium mb-2 text-center">
            Halo, Apa yang bisa kami bantu?
          </h4>
          <Input
            model="expended"
            startIcon={
              <Search size={16} className="text-m-regular text-neutral-300" />
            }
            placeholder="Cari Pertanyaan"
            className="w-full py-1.5"
          />
        </div>
      </div>

      {/* SEARCH DESKTOP */}
      <div className="container mx-auto mb-10">
        <FaqSearch />

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
