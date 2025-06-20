import MazeAnalytics from '@/components/shared/MazeAnalytics'
import { Toaster } from '@/components/ui/sonner'
import { GTM_ID } from '@/constant/env'
import { ContextProviders } from '@/contexts/providers'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
export const metadata: Metadata = {
  title: 'Muslim101 | Semua Ada Semua Berkah',
  description: 'Muslim101 | Semua Ada Semua Berkah',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <body>
        <MazeAnalytics />
        <Suspense>
          <GoogleTagManager gtmId={GTM_ID as string} />

          <ContextProviders>
            {children}
            <Toaster />
          </ContextProviders>
        </Suspense>
      </body>
    </html>
  )
}
