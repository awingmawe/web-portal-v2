'use client'

import { PackageVariant } from '@/constant/types/PackageProps'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

// Room type options
export type RoomType = 'quad' | 'triple' | 'double'

// Context state interface
interface PackageVariantContextState {
  selectedVariant: PackageVariant | null
  variants: PackageVariant[]
  selectedRoomType: RoomType
  setSelectedVariant: (variant: PackageVariant | null) => void
  setVariants: (variants: PackageVariant[]) => void
  setSelectedRoomType: (roomType: RoomType) => void
  getPrice: () => number
  getOriginalPrice: () => number
}

// Initial state
const initialState: PackageVariantContextState = {
  selectedVariant: null,
  variants: [],
  selectedRoomType: 'quad',
  setSelectedVariant: () => {},
  setVariants: () => {},
  setSelectedRoomType: () => {},
  getPrice: () => 0,
  getOriginalPrice: () => 0,
}

// Create context
const PackageVariantContext =
  createContext<PackageVariantContextState>(initialState)

// Provider props interface
interface PackageVariantProviderProps {
  children: ReactNode
  initialVariants?: PackageVariant[]
  initialSelectedVariant?: PackageVariant | null
  initialRoomType?: RoomType
}

// Provider component
export const PackageVariantProvider: React.FC<PackageVariantProviderProps> = ({
  children,
  initialVariants = [],
  initialSelectedVariant = null,
  initialRoomType = 'quad',
}) => {
  const [selectedVariant, setSelectedVariant] = useState<PackageVariant | null>(
    initialSelectedVariant
  )
  const [variants, setVariants] = useState<PackageVariant[]>(initialVariants)
  const [selectedRoomType, setSelectedRoomType] =
    useState<RoomType>(initialRoomType)

  // Helper function to get current price based on selected variant and room type
  // Use useCallback to memoize this function
  const getPrice = useCallback((): number => {
    if (!selectedVariant) return 0

    switch (selectedRoomType) {
      case 'double':
        return selectedVariant.priceDouble
      case 'triple':
        return selectedVariant.priceTriple
      case 'quad':
      default:
        return selectedVariant.priceQuad
    }
  }, [selectedVariant, selectedRoomType])

  // Helper function to get original price based on selected variant and room type
  // Use useCallback to memoize this function
  const getOriginalPrice = useCallback((): number => {
    if (!selectedVariant) return 0

    switch (selectedRoomType) {
      case 'double':
        return selectedVariant.originalPriceDouble
      case 'triple':
        return selectedVariant.originalPriceTriple
      case 'quad':
      default:
        return selectedVariant.originalPriceQuad
    }
  }, [selectedVariant, selectedRoomType])

  // Memoize state setter functions to prevent unnecessary recreations
  const memoizedSetSelectedVariant = useCallback(
    (variant: PackageVariant | null) => {
      setSelectedVariant(variant)
    },
    []
  )

  const memoizedSetVariants = useCallback((newVariants: PackageVariant[]) => {
    setVariants(newVariants)
  }, [])

  const memoizedSetSelectedRoomType = useCallback((roomType: RoomType) => {
    setSelectedRoomType(roomType)
  }, [])

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const value = {
    selectedVariant,
    variants,
    selectedRoomType,
    setSelectedVariant: memoizedSetSelectedVariant,
    setVariants: memoizedSetVariants,
    setSelectedRoomType: memoizedSetSelectedRoomType,
    getPrice,
    getOriginalPrice,
  }

  return (
    <PackageVariantContext.Provider value={value}>
      {children}
    </PackageVariantContext.Provider>
  )
}

// Custom hook for using the context
export const usePackageVariant = () => {
  const context = useContext(PackageVariantContext)

  if (context === undefined) {
    throw new Error(
      'usePackageVariant must be used within a PackageVariantProvider'
    )
  }

  return context
}
