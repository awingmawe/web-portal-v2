import { Toaster } from '@/components/ui/sonner'
import { GTM_ID } from '@/constant/env'
import { ContextProviders } from '@/contexts/providers'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Muslim 101 | All in One Islamic Digital Platform',
  description: 'Muslim 101 | All in One Islamic Digital Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <GoogleTagManager gtmId={GTM_ID as string} />
      <body>
        <ContextProviders>
          {children}
          <Toaster />
        </ContextProviders>
      </body>
    </html>
  )
}
