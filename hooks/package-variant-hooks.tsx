import { PackageVariant } from '@/constant/types/PackageProps'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useCallback, useMemo } from 'react'

/**
 * Hook for variant selection functionality
 */
export const useVariantSelection = () => {
  const { variants, selectedVariant, setSelectedVariant } = usePackageVariant()

  // Select a variant by ID
  const selectVariantById = useCallback(
    (variantId: number) => {
      const variant = variants.find((v) => v.id === variantId) || null
      setSelectedVariant(variant)
    },
    [variants, setSelectedVariant]
  )

  // Select first variant in the list
  const selectFirstVariant = useCallback(() => {
    if (variants.length > 0) {
      setSelectedVariant(variants[0])
      return true
    }
    return false
  }, [variants, setSelectedVariant])

  return {
    variants,
    selectedVariant,
    setSelectedVariant,
    selectVariantById,
    selectFirstVariant,
    hasVariants: variants.length > 0,
  }
}

/**
 * Hook for room type and pricing functionality
 */
export const usePricing = () => {
  const {
    selectedRoomType,
    setSelectedRoomType,
    getPrice,
    getOriginalPrice,
    selectedVariant,
  } = usePackageVariant()

  // Check if there's a discount
  const hasDiscount = useMemo(() => {
    if (!selectedVariant) return false
    return (selectedVariant.discountAmount as number) > 0
  }, [selectedVariant])

  // Get discount amount formatted based on discount type
  const getFormattedDiscount = useCallback(() => {
    if (!selectedVariant || !hasDiscount) return null

    if (selectedVariant.discountType === 'percentage') {
      return `${selectedVariant.discountAmount}%`
    } else {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(selectedVariant.discountAmount as number)
    }
  }, [selectedVariant, hasDiscount])

  return {
    selectedRoomType,
    setSelectedRoomType,
    currentPrice: getPrice(),
    originalPrice: getOriginalPrice(),
    hasDiscount,
    discountFormatted: getFormattedDiscount(),
    discountType: selectedVariant?.discountType,
    discountAmount: selectedVariant?.discountAmount,
  }
}

/**
 * Menemukan harga positif (non-nol) terendah dari sebuah variant.
 * @param variant - Objek PackageVariant
 * @returns Harga positif terendah, atau Infinity jika semua harga 0
 */
const getLowestPositivePriceInVariant = (variant: PackageVariant): number => {
  // 1. Kumpulkan semua harga
  const prices = [variant.priceQuad, variant.priceDouble, variant.priceTriple]

  // 2. Filter harga yang lebih besar dari 0
  const positivePrices = prices.filter((price) => price > 0)

  // 3. Jika tidak ada harga positif
  if (positivePrices.length === 0) {
    return Infinity
  }

  // 4. Kembalikan nilai minimum dari harga positif
  return Math.min(...positivePrices)
}

/**
 * Mencari variant tunggal dengan harga paling murah (non-nol) dari semua variant.
 * @param variants - Array PackageVariant[]
 * @returns PackageVariant | null - Variant dengan harga terendah, atau null jika tidak ada.
 */
export const findVariantWithLowestPrice = (
  variants: PackageVariant[]
): PackageVariant | null => {
  if (!variants || variants.length === 0) {
    return null
  }

  let lowestPriceSoFar = Infinity
  let variantWithLowestPrice: PackageVariant | null = null

  for (const variant of variants) {
    const lowestPriceInCurrentVariant = getLowestPositivePriceInVariant(variant)

    if (lowestPriceInCurrentVariant < lowestPriceSoFar) {
      lowestPriceSoFar = lowestPriceInCurrentVariant
      variantWithLowestPrice = variant
    }
  }

  return variantWithLowestPrice
}
