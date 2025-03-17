'use client'

import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { PriceParams } from '@/constant/types/PackageProps'
import { usePriceRangeFilter } from '@/hooks/filter-product-hooks'
import { formatNumberCurrency } from '@/lib/utils'
import React, { useMemo } from 'react'

interface PriceRangeSliderProps {
  minMax: PriceParams
  filters: {
    hargaMin: string
    hargaMax: string
  }
  setHargaMin: (value: string) => void
  setHargaMax: (value: string) => void
  isLoadingSkeleton: boolean
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  minMax,
  filters,
  setHargaMin,
  setHargaMax,
  isLoadingSkeleton,
}) => {
  const { min, max } = minMax
  const formattedMin = Number(min)
  const formattedMax = Number(max)

  // Hooks for slider range
  const {
    range,
    handleSliderChange,
    handleSliderChangeEnd,
    handleHargaMinChange,
    handleHargaMaxChange,
    handleHargaMinBlur, // function for update query params when user click outside input
    handleHargaMaxBlur, // function for update query params when user click outside input
  } = usePriceRangeFilter({
    initialMin: formattedMin,
    initialMax: formattedMax,
    filters,
    setHargaMin,
    setHargaMax,
  })

  // Memoized skeleton components
  const sliderSkeleton = useMemo(
    () => (
      <div className="mt-4 h-2 w-full animate-pulse rounded-lg bg-neutral-200" />
    ),
    []
  )

  const minPriceSkeleton = useMemo(
    () => (
      <div className="h-8 w-full animate-pulse rounded-lg bg-neutral-200" />
    ),
    []
  )

  const maxPriceSkeleton = useMemo(
    () => (
      <div className="h-8 w-full animate-pulse rounded-lg bg-neutral-200" />
    ),
    []
  )

  // Memoized slider component
  const priceSlider = useMemo(
    () => (
      <Slider
        defaultValue={[formattedMin || 0, formattedMax || 1000000]}
        value={range}
        min={formattedMin || 0}
        max={formattedMax || 1000000}
        step={1000}
        minStepsBetweenThumbs={1}
        className="mt-4"
        onValueChange={handleSliderChange}
        onValueCommit={handleSliderChangeEnd}
      />
    ),
    [
      formattedMin,
      formattedMax,
      range,
      handleSliderChange,
      handleSliderChangeEnd,
    ]
  )

  // Memoized input components
  const minPriceInput = useMemo(
    () => (
      <Input
        value={filters.hargaMin}
        className="rounded-lg border-[0.5px] border-neutral-200 p-2"
        onChange={handleHargaMinChange}
        onBlur={handleHargaMinBlur}
        placeholder="Rp 0"
      />
    ),
    [filters.hargaMin, handleHargaMinChange, handleHargaMinBlur]
  )

  const maxPriceInput = useMemo(
    () => (
      <Input
        value={filters.hargaMax}
        className="rounded-lg border-[0.5px] border-neutral-200 p-2 text-right"
        align="text-right"
        onChange={handleHargaMaxChange}
        onBlur={handleHargaMaxBlur}
        placeholder="Rp 0"
      />
    ),
    [filters.hargaMax, handleHargaMaxChange, handleHargaMaxBlur]
  )

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex justify-between">
        <p className="text-m-regular text-neutral-500">Dari</p>
        <p className="text-m-regular text-right text-neutral-500">Hingga</p>
      </div>
      <div className="flex items-center justify-between self-stretch">
        {isLoadingSkeleton ? minPriceSkeleton : minPriceInput}
        <div className="h-px w-5 flex-none bg-[#D2D2D1] sm:mx-5 xl:mx-10" />
        {isLoadingSkeleton ? maxPriceSkeleton : maxPriceInput}
      </div>

      {/* Price Range Slider */}
      {isLoadingSkeleton ? sliderSkeleton : priceSlider}

      {/* Min/Max Labels */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-s-regular text-neutral-500">
          {min ? `Rp ${formatNumberCurrency(min.toString())}` : 'Rp 0'}
        </p>
        <p className="text-s-regular text-neutral-500">
          {max ? `Rp ${formatNumberCurrency(max.toString())}` : 'Rp 1.000.000'}
        </p>
      </div>
    </div>
  )
}
