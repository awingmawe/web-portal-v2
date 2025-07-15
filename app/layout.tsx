import MazeAnalytics from '@/components/shared/MazeAnalytics'
import QontakChatWidget from '@/components/shared/QontakChatWidget'
import RemoveLocalReferralCode from '@/components/shared/RemoveLocalReferralCode'
import { Toaster } from '@/components/ui/sonner'
import { GTM_ID } from '@/constant/env'
import { ContextProviders } from '@/contexts/providers'
import { cookieNames } from '@/services/common/cookie'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
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
      <body>
        <MazeAnalytics />
        <Suspense>
          <GoogleTagManager gtmId={GTM_ID as string} />

          <ContextProviders>
            {children}
            <Toaster />
            <RemoveLocalReferralCode />
            <QontakChatWidget hide={isWebview ? true : false} />
          </ContextProviders>
        </Suspense>
      </body>
    </html>
  )
}
