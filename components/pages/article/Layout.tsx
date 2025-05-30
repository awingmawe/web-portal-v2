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
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(cookieNames.SESSION_ID)?.value

  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  const isWebview =
    (cookieStore.get(cookieNames.IS_WEBVIEW)?.value as string) || false

  const tokenFromHeader2 = (await headers()).get('single-use-token') || ''
  const sessionId2 = (await headers()).get('session-id') || ''
  const isWebView2 = (await headers()).get('is-web-view') || ''

  return (
    <Fragment>
      <Topbar
        token={token}
        shadow
        scrolled
        type="normal"
        className="h-[80px]"
      />

      <MobileTopbar variant="logo" showBackButton={true} />
      <div className="h-30"></div>
      <p>session ID : {JSON.stringify(sessionId)}</p>
      <p>TOKEN : {JSON.stringify(token)}</p>
      <p>isWebview : {JSON.stringify(isWebview)}</p>
      <hr />
      <p>session ID : {JSON.stringify(tokenFromHeader2)}</p>
      <p>TOKEN : {JSON.stringify(sessionId2)}</p>
      <p>isWebview : {JSON.stringify(isWebView2)}</p>
      {children}
      <Footer
        className={`max-lg:mb-0 ${isWebview === 'true' ? 'max-lg:hidden' : ''}`}
      />
    </Fragment>
  )
}
