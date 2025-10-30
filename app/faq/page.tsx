import { metadata } from '@/app/shared-metadata'
import Breadcrumb from '@/components/pages/faq/Breadcumb'
import FaqContent from '@/components/pages/faq/FaqContent'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { Input } from '@/components/ui/input'
import { cookieNames } from '@/services/common/cookie'
import { Search } from 'lucide-react'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

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
    <Fragment>
      <Topbar shadow scrolled token={token} />
      <MobileTopbar variant="plain" showBackButton />
      <Breadcrumb />

      <div className="container mx-auto mt-5 mb-10">
        <section className="mt-8 max-lg:px-4">
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
      <Footer />
    </Fragment>
  )
}
