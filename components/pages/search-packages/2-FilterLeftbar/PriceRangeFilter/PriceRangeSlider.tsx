'use client'

import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { PriceParams } from '@/constant/types/PackageProps'
import { usePriceRangeFilter } from '@/hooks/filter-product-hooks/useRangeFilter'
import { formatNumberCurrency, isEmpty } from '@/lib/utils'
import React, { useEffect, useMemo, useState } from 'react'

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

  // Local state for input values
  const [localHargaMin, setLocalHargaMin] = useState(filters.hargaMin)
  const [localHargaMax, setLocalHargaMax] = useState(filters.hargaMax)

  // Sync local state with props
  useEffect(() => {
    setLocalHargaMin(filters.hargaMin)
    setLocalHargaMax(filters.hargaMax)
  }, [filters.hargaMin, filters.hargaMax])

  // Custom debounce hook
  const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debouncedValue
  }

  // Debounced values
  const debouncedHargaMin = useDebounce(localHargaMin, 1000)
  const debouncedHargaMax = useDebounce(localHargaMax, 1000)

  // Effect for updating parent state when debounced values change
  useEffect(() => {
    if (debouncedHargaMin !== filters.hargaMin) {
      setHargaMin(debouncedHargaMin)
    }
  }, [debouncedHargaMin, filters.hargaMin, setHargaMin])

  useEffect(() => {
    if (debouncedHargaMax !== filters.hargaMax) {
      setHargaMax(debouncedHargaMax)
    }
  }, [debouncedHargaMax, filters.hargaMax, setHargaMax])

  // Hooks for slider range
  const {
    range,
    handleSliderChange,
    handleSliderChangeEnd,
    handleHargaMinChange,
    handleHargaMaxChange,
    handleHargaMinBlur,
    handleHargaMaxBlur,
  } = usePriceRangeFilter({
    initialMin: formattedMin,
    initialMax: formattedMax,
    filters: {
      hargaMin: localHargaMin,
      hargaMax: localHargaMax,
    },
    setHargaMin: setLocalHargaMin,
    setHargaMax: setLocalHargaMax,
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

  // Modified slider for using local state
  const priceSlider = useMemo(() => {
    const handleLocalSliderChange = (values: number[]) => {
      // Ensure we always have exactly two values
      if (values.length === 2) {
        handleSliderChange(values as [number, number])
      }
    }

    const handleLocalSliderChangeEnd = (values: number[]) => {
      // Ensure we always have exactly two values
      if (values.length === 2) {
        handleSliderChangeEnd(values as [number, number])
      }
    }

    return (
      <Slider
        defaultValue={[formattedMin || 0, formattedMax || 1000000]}
        value={range}
        min={formattedMin || 0}
        max={formattedMax || 1000000}
        step={1000}
        minStepsBetweenThumbs={1}
        className="mt-4"
        onValueChange={handleLocalSliderChange}
        onValueCommit={handleLocalSliderChangeEnd}
      />
    )
  }, [
    formattedMin,
    formattedMax,
    range,
    handleSliderChange,
    handleSliderChangeEnd,
  ])

  // Modified input components for local state
  const minPriceInput = useMemo(() => {
    const handleLocalHargaMinChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      handleHargaMinChange(e)
    }

    return (
      <Input
        value={
          isEmpty(localHargaMin) ? formatNumberCurrency(min) : localHargaMin
        }
        className="rounded-lg border-[0.5px] border-neutral-200 p-2"
        onChange={handleLocalHargaMinChange}
        onBlur={handleHargaMinBlur}
        placeholder="Rp 0"
      />
    )
  }, [localHargaMin, min, handleHargaMinBlur, handleHargaMinChange])

  const maxPriceInput = useMemo(() => {
    const handleLocalHargaMaxChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      handleHargaMaxChange(e)
    }

    return (
      <Input
        value={
          isEmpty(localHargaMax) ? formatNumberCurrency(max) : localHargaMax
        }
        className="rounded-lg border-[0.5px] border-neutral-200 p-2 text-right"
        align="text-right"
        onChange={handleLocalHargaMaxChange}
        onBlur={handleHargaMaxBlur}
        placeholder="Rp 0"
      />
    )
  }, [localHargaMax, max, handleHargaMaxBlur, handleHargaMaxChange])

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
