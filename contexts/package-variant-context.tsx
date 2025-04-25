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
export type RoomType = 'quad' | 'triple' | 'double' | null

// Context state interface
interface PackageVariantContextState {
  selectedVariant: PackageVariant | null
  selectedVariantId: number | null
  variants: PackageVariant[]
  selectedRoomType: RoomType
  isLoading: boolean
  setSelectedVariant: (variant: PackageVariant | null) => void
  setSelectedVariantId: (id: number | null) => void
  setVariants: (variants: PackageVariant[]) => void
  setSelectedRoomType: (roomType: RoomType) => void
  setIsLoading: (loading: boolean) => void
  getPrice: () => number
  getOriginalPrice: () => number
  hasDiscount: () => boolean
}

// Initial state
const initialState: PackageVariantContextState = {
  selectedVariant: null,
  selectedVariantId: null,
  variants: [],
  selectedRoomType: null,
  isLoading: true,
  setSelectedVariant: () => {},
  setSelectedVariantId: () => {},
  setVariants: () => {},
  setSelectedRoomType: () => {},
  setIsLoading: () => {},
  getPrice: () => 0,
  getOriginalPrice: () => 0,
  hasDiscount: () => false,
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
  initialLoading?: boolean
}

// Provider component
export const PackageVariantProvider: React.FC<PackageVariantProviderProps> = ({
  children,
  initialVariants = [],
  initialSelectedVariant = null,
  initialRoomType = null,
  initialLoading = true,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<PackageVariant | null>(
    initialSelectedVariant
  )
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    initialSelectedVariant?.id || null
  )
  const [variants, setVariants] = useState<PackageVariant[]>(initialVariants)
  const [selectedRoomType, setSelectedRoomType] =
    useState<RoomType>(initialRoomType)
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading)

  // Helper function to get current price based on selected variant and room type
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

  // Helper function to check if the selected variant has a discount
  const hasDiscount = useCallback((): boolean => {
    if (!selectedVariant) return false
    return (
      !!selectedVariant.discountAmount &&
      Number(selectedVariant.discountAmount) > 0
    )
  }, [selectedVariant])

  // Context value
  const value = {
    selectedVariant,
    selectedVariantId,
    variants,
    selectedRoomType,
    isLoading,
    setSelectedVariant,
    setSelectedVariantId,
    setVariants,
    setSelectedRoomType,
    setIsLoading,
    getPrice,
    getOriginalPrice,
    hasDiscount,
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
