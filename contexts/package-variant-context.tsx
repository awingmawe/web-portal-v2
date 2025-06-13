'use client'

import { Package, PackageVariant } from '@/constant/types/PackageProps'
import { formatCurrencyIndonesia, formatDateToRangeString } from '@/lib/utils'
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
  formattedDeparture: string
  formattedArrival: string
  numberOfDays: number
  handleBadgePromo: (
    discountType: string,
    amount: number | string
  ) => string | null
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
  formattedDeparture: '',
  formattedArrival: '',
  numberOfDays: 0,
  handleBadgePromo: () => null,
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
  const [currentPackage, setCurrentPackage] = useState<Package | null>()
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

  // Format departure and arrival dates for display
  const formattedDeparture = selectedVariant?.departureDate
    ? formatDateToRangeString(new Date(selectedVariant.departureDate))
    : '-'
  const formattedArrival = selectedVariant?.arrivalDate
    ? formatDateToRangeString(new Date(selectedVariant.arrivalDate))
    : '-'
  const numberOfDays = selectedVariant?.tripDuration
    ? selectedVariant?.tripDuration
    : selectedVariant?.departureDate && selectedVariant?.arrivalDate
      ? Math.ceil(
          (new Date(selectedVariant.arrivalDate).getTime() -
            new Date(selectedVariant.departureDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : 0
  const handleBadgePromo = (discountType: string, amount: number | string) => {
    if (discountType === 'percentage') {
      return `${amount}%`
    } else if (discountType === 'nominal') {
      return `${formatCurrencyIndonesia(amount as number)}`
    }
    return null
  }

  // Context value
  const value = {
    currentPackage,
    setCurrentPackage,
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
    formattedDeparture,
    formattedArrival,
    numberOfDays,
    handleBadgePromo,
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
