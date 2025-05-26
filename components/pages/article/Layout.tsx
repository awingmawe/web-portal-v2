import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies, headers } from 'next/headers'
import type React from 'react'
import { Fragment } from 'react'

export default async function LayoutArticle({
  children,
}: {
  children: React.ReactNode
}) {
  const tokenFromHeader = (await headers()).get('single-use-token') || ''
  const isWebview = (await headers()).get('is-web-view') || ''
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <Fragment>
      <Topbar token={token ?? tokenFromHeader} shadow scrolled type="normal" />
      {!isWebview && <MobileTopbar variant="logo" showBackButton={false} />}
      {children}
      <Footer className={`max-lg:mb-0 ${!isWebview && 'max-lg:hidden'}`} />
    </Fragment>
  )
}
