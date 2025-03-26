'use client'

import AuthProvider from '@/contexts/auth/providers'
import { GalleryProvider } from '@/contexts/gallery-package-context'
import { PackageVariantProvider } from '@/contexts/package-variant-context'
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
    <FilterProductProvider>
      <GalleryProvider>
        <PackageVariantProvider>
          {/* Add other providers here as needed */}
          {/* <ThemeProvider> */}
          <AuthProvider>{children}</AuthProvider>
          {/* </ThemeProvider> */}
        </PackageVariantProvider>
      </GalleryProvider>
    </FilterProductProvider>
  )
}
