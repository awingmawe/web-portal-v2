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
      <Topbar scrolled token={token} />
      <main className="my-6 flex flex-col gap-8 max-lg:my-0 max-lg:gap-6">
        {children}
      </main>
      <Footer type="compact" className="mt-auto hidden lg:block" />
    </div>
  )
}
