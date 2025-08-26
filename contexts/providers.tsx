'use client'

import AuthProvider from '@/contexts/auth/providers'
import { CheckoutProvider } from '@/contexts/checkout-context-v2'
import { EventTrackerProvider } from '@/contexts/event-tracker/provider'
import { GalleryProvider } from '@/contexts/gallery-package-context'
import { ManifestProvider } from '@/contexts/manifest-context/provider'
import { PackageVariantProvider } from '@/contexts/package-variant-context'
import { UmrahPersonalProvider } from '@/contexts/umrah-personal/provider'
import { ReactNode } from 'react'
import { FilterProductProvider } from './filter-product-context'
// Import other providers as needed, for example:
// import { ThemeProvider } from './ThemeContext'

interface ProvidersProps {
  children: ReactNode
}

/**
 * Combined Providers component that wraps the application with all necessary context providers
 */
export function ContextProviders({ children }: ProvidersProps) {
  return (
    // Nest providers inside each other, with the most global one at the top
    <EventTrackerProvider>
      <FilterProductProvider>
        <GalleryProvider>
          <PackageVariantProvider>
            <ManifestProvider>
              <UmrahPersonalProvider>
                <CheckoutProvider>
                  {/* Add other providers here as needed */}
                  {/* <ThemeProvider> */}
                  <AuthProvider>{children}</AuthProvider>
                </CheckoutProvider>
              </UmrahPersonalProvider>
              {/* </ThemeProvider> */}
            </ManifestProvider>
          </PackageVariantProvider>
        </GalleryProvider>
      </FilterProductProvider>
    </EventTrackerProvider>
  )
}
