import MazeAnalytics from '@/components/shared/MazeAnalytics'
import PopupPromo from '@/components/shared/PopupPromo'
import QontakChatWidget from '@/components/shared/QontakChatWidget'
import RemoveLocalReferralCode from '@/components/shared/RemoveLocalReferralCode'
import { Toaster } from '@/components/ui/sonner'
import {
  FACEBOOK_DOMAIN_VERIFICATION,
  GTM_ID,
  HIDE_QONTAK,
} from '@/constant/env'
import { ContextProviders } from '@/contexts/providers'
import { cookieNames } from '@/services/common/cookie'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { SWRConfig } from 'swr'
import './globals.css'
export const metadata: Metadata = {
  title: 'Muslim 101 | Semua Ada Semua Berkah',
  description: 'Muslim 101 | Semua Ada Semua Berkah',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const isWebview = cookieStore.get(cookieNames.IS_WEBVIEW)?.value as string

  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      {/* {CHAT_BOT_CLIENT_ID && CHAT_BOT_SOURCE && !isWebview && (
        <Script
          src={CHAT_BOT_SOURCE}
          data-client-id={CHAT_BOT_CLIENT_ID}
          data-sender="Jhon"
          data-user-id="xxx-xxx"
        />
      )} */}
      <body>
        <MazeAnalytics />
        <Suspense>
          <GoogleTagManager gtmId={GTM_ID as string} />
          <meta
            name="facebook-domain-verification"
            content={FACEBOOK_DOMAIN_VERIFICATION}
          />

          <ContextProviders>
            <SWRConfig>{children}</SWRConfig>
            <Toaster />
            <RemoveLocalReferralCode />
            {!HIDE_QONTAK && (
              <QontakChatWidget hide={isWebview ? true : false} />
            )}
          </ContextProviders>
          <PopupPromo />
        </Suspense>
      </body>
    </html>
  )
}
