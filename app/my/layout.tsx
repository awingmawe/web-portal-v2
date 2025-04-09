import { Sidebar } from '@/components/pages/my/Sidebar'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import type React from 'react'
import { Fragment } from 'react'
export default async function LayoutMy({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <Fragment>
      <Topbar token={token} shadow scrolled />

      <div className="container mx-auto flex gap-5 py-8">
        <Sidebar />
        <div className="w-full  rounded-3xl border border-gray-100 bg-white shadow-sm">
          {children}
        </div>
      </div>
    </Fragment>
  )
}
