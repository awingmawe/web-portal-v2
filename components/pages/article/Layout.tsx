import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import type React from 'react'
import { Fragment } from 'react'

export default async function LayoutArticle({
  children,
  searchParams,
}: {
  children: React.ReactNode
  searchParams?: any
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <Fragment>
      <Topbar token={token} shadow scrolled type="normal" />
      {searchParams.header && (
        <MobileTopbar variant="logo" showBackButton={false} />
      )}
      {children}
      <Footer
        className={`max-lg:mb-0 ${searchParams.footer && 'max-lg:hidden'}`}
      />
    </Fragment>
  )
}
