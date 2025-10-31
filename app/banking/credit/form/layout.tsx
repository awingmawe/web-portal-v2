import TopbarMobilePembiayaan from '@/components/pages/banking/common/TopbarMobilePembiayaan'
import Footer from '@/components/shared/Footer'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'

export default async function FormPembiayaanLayout({
  children,
}: {
  children: ReactNode
}) {
  const cookieStore = cookies()
  const token = (await cookieStore).get(cookieNames.USER_ACCESS_TOKEN)
    ?.value as string

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Topbar scrolled token={token} shadow />
      <main className="py-6 max-lg:fixed max-lg:my-0 max-lg:mt-auto max-lg:mb-0 max-lg:h-dvh max-lg:w-full max-lg:overflow-hidden max-lg:bg-transparent max-lg:py-0">
        <TopbarMobilePembiayaan />
        <section className="scrollbar-hide container mx-auto mt-8 flex flex-col gap-8 overflow-x-hidden max-lg:absolute max-lg:top-[85px] max-lg:bottom-0 max-lg:z-11 max-lg:mt-0 max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:gap-6 max-lg:overflow-y-auto max-lg:rounded-tl-3xl max-lg:rounded-tr-3xl max-lg:bg-white max-lg:py-6 max-lg:pb-20 max-lg:shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]">
          {children}
        </section>
      </main>
      <Footer type="compact" className="mt-auto hidden lg:block" />
    </div>
  )
}
