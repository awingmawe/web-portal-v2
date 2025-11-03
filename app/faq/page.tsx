import { metadata } from '@/app/shared-metadata'
import FaqContent from '@/components/pages/faq/FaqContent'
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
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const resolved = await searchParams
  const page = Number(resolved?.page) || 1

  return (
    <LayoutFaq>
      <MobileTopbar variant={'plain'} title="FAQ" showBackButton />
      {/* SEARCH MOBILE */}
      <div className="scrollbar-hide flex gap-2 overflow-x-hidden pl-5 lg:hidden">
        <div className={`pr-t absolute -top-19 left-3.5 w-11/12 md:w-10/12 `}>
          <h4 className="heading-4-medium mb-2 text-center">
            Halo, Apa yang bisa kami bantu?
          </h4>
          <Input
            model="expended"
            startIcon={<Search size={16} className="text-neutral-300" />}
            placeholder="Cari Pertanyaan"
            className="w-full py-1.5"
            value={''}
          />
        </div>
      </div>

      {/* SEARCH DESKTOP */}
      <div className="container mx-auto mb-10">
        <section className="mt-8 max-lg:px-4 max-md:hidden">
          <div className="rounded-xl bg-gradient-to-r from-[#FFEAAC] to-[#FFC101] px-8 pt-2 pb-5 max-lg:px-4">
            <div className="text-center">
              <h2 className="mt-4 mb-4 text-3xl max-lg:text-base">
                Cari Pertanyaanmu Disini
              </h2>
              <div className="flex items-center justify-between gap-1 rounded-full border border-neutral-200 bg-white px-4 py-2.5">
                <Input
                  placeholder="Cari paket, travel, hotel atau airlines"
                  className="text-m-regular w-full border-0 pr-10"
                />
                <Search size={16} className="text-neutral-300" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 max-lg:px-4">
          <FaqContent page={page} limit={2} type="list" pagination={true} />
        </section>
      </div>
    </LayoutFaq>
  )
}
