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
