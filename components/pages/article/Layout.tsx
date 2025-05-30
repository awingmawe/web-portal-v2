import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import type React from 'react'
import { Fragment } from 'react'

export default async function LayoutArticle({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const tokenFromHeader = cookieStore.get(cookieNames.SESSION_ID)?.value

  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  const isWebview =
    (cookieStore.get(cookieNames.IS_WEBVIEW)?.value as string) || false

  return (
    <Fragment>
      <Topbar token={token ?? tokenFromHeader} shadow scrolled type="normal" />
      {isWebview === 'true' ? (
        ''
      ) : (
        <MobileTopbar variant="logo" showBackButton={false} />
      )}
      {children}
      <Footer
        className={`max-lg:mb-0 ${isWebview === 'true' ? 'max-lg:hidden' : ''}`}
      />
    </Fragment>
  )
}
