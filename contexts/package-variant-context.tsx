'use client'

import {
  Package,
  PackageVariant,
  VariantPriceType,
} from '@/constant/types/PackageProps'
import { formatCurrencyIndonesia, formatDateToRangeString } from '@/lib/utils'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

// Room type options
export type RoomType = { [key: string]: number } | null

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
  variantsPrice: VariantPriceType[]
  getVariantsPrice: (
    type: 'double' | 'triple' | 'quad'
  ) => VariantPriceType | null
  getTotalQty: () => number
  isEmptyRoomType: boolean
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
  variantsPrice: [],
  getVariantsPrice: () => null,
  getTotalQty: () => 0,
  isEmptyRoomType: false,
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
  const [selectedRoomType, setSelectedRoomType] = useState<{
    [key: string]: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading)

  // Helper function to get current price based on selected variant and room type
  const getPrice = useCallback((): number => {
    if (!selectedVariant) return 0

    const { priceDouble, priceTriple, priceQuad } = selectedVariant
    let total = 0
    Object.entries(selectedRoomType || {}).forEach(([roomType, qty]) => {
      switch (roomType) {
        case 'double':
          total += priceDouble * qty
          break
        case 'triple':
          total += priceTriple * qty
          break
        case 'quad':
          total += priceQuad * qty
          break
        default:
          break
      }
    })
    return total
  }, [selectedVariant, selectedRoomType])

  // Helper function to get original price based on selected variant and room type
  const getOriginalPrice = useCallback((): number => {
    if (!selectedVariant) return 0
    const { originalPriceDouble, originalPriceQuad, originalPriceTriple } =
      selectedVariant
    let total = 0
    Object.entries(selectedRoomType || {}).forEach(([roomType, qty]) => {
      switch (roomType) {
        case 'double':
          total += originalPriceDouble * qty
          break
        case 'triple':
          total += originalPriceTriple * qty
          break
        case 'quad':
          total += originalPriceQuad * qty
          break
        default:
          break
      }
    })

    return total
  }, [selectedVariant, selectedRoomType])

  const getTotalQty = useCallback(() => {
    return (
      (selectedRoomType?.double || 0) +
      (selectedRoomType?.triple || 0) +
      (selectedRoomType?.quad || 0)
    )
  }, [selectedRoomType])

  const variantsPrice = useMemo(
    () =>
      selectedVariant
        ? ['double', 'triple', 'quad'].map((type) => ({
            type: type as 'double' | 'triple' | 'quad',
            price:
              type === 'double'
                ? selectedVariant.priceDouble
                : type === 'triple'
                  ? selectedVariant.priceTriple
                  : selectedVariant.priceQuad,
            originalPrice:
              type === 'double'
                ? selectedVariant.originalPriceDouble
                : type === 'triple'
                  ? selectedVariant.originalPriceTriple
                  : selectedVariant.originalPriceQuad,
            hasDiscount: selectedVariant.discountAmount
              ? Number(selectedVariant.discountAmount) > 0
              : false,
          }))
        : [],
    [selectedVariant]
  )
  const [prevSelectedVariant, setPrevSelectedVariant] =
    useState<PackageVariant | null>(null)

  useEffect(() => {
    setPrevSelectedVariant(selectedVariant)
  }, [selectedVariant])

  useEffect(() => {
    if (selectedVariant?.id !== prevSelectedVariant?.id) {
      setSelectedRoomType({
        double:
          selectedVariant?.priceDouble == 0 ? 0 : selectedRoomType?.double || 0,
        triple:
          selectedVariant?.priceTriple == 0 ? 0 : selectedRoomType?.triple || 0,
        quad: selectedVariant?.priceQuad == 0 ? 0 : selectedRoomType?.quad || 0,
      })
    }
  }, [selectedVariant, prevSelectedVariant, variantsPrice, selectedRoomType])

  const getVariantsPrice = (
    type: 'double' | 'triple' | 'quad'
  ): VariantPriceType | null => {
    return variantsPrice.find((variant) => variant.type === type) || null
  }

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

  const isEmptyRoomType = useMemo(() => {
    return (
      (selectedRoomType?.double === 0 ||
        selectedRoomType?.double === undefined) &&
      (selectedRoomType?.triple === 0 ||
        selectedRoomType?.triple === undefined) &&
      (selectedRoomType?.quad === 0 || selectedRoomType?.quad === undefined)
    )
  }, [selectedRoomType])

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
    variantsPrice,
    getVariantsPrice,
    getTotalQty,
    isEmptyRoomType,
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
