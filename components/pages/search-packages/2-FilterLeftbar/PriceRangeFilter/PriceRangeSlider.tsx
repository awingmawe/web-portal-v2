'use client'

import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { PriceParams } from '@/constant/types/PackageProps'
import { usePriceRangeFilter } from '@/hooks/filter-product-hooks/useRangeFilter'
import { formatNumberCurrency, isEmpty } from '@/lib/utils'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Move debounce hook outside component or import from separate file
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

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

interface PriceRangeSliderProps {
  minMax: PriceParams
  filters:
    | {
        hargaMin: string
        hargaMax: string
      }
    | undefined
  setPriceRangeAction: (range: { hargaMin: string; hargaMax: string }) => void
  isLoadingSkeleton: boolean
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  minMax,
  filters,
  setPriceRangeAction,
  isLoadingSkeleton,
}) => {
  const { min, max } = minMax
  const formattedMin = Number(min)
  const formattedMax = Number(max)

  // Local state for input values
  const [localHargaMin, setLocalHargaMin] = useState(filters?.hargaMin || '')
  const [localHargaMax, setLocalHargaMax] = useState(filters?.hargaMax || '')

  // Track if we're updating from parent to prevent circular updates
  const isUpdatingFromParent = useRef(false)
  const lastUpdateFromParent = useRef({ min: '', max: '' })

  // Sync local state with props only when they actually change
  useEffect(() => {
    const newMin = filters?.hargaMin || ''

    // Only update if the values are actually different
    if (newMin !== lastUpdateFromParent.current.min) {
      isUpdatingFromParent.current = true
      setLocalHargaMin(newMin)
      lastUpdateFromParent.current.min = newMin

      // Reset flag after state update
      setTimeout(() => {
        isUpdatingFromParent.current = false
      }, 0)
    }
  }, [filters?.hargaMin])

  useEffect(() => {
    const newMax = filters?.hargaMax || ''

    // Only update if the values are actually different
    if (newMax !== lastUpdateFromParent.current.max) {
      isUpdatingFromParent.current = true
      setLocalHargaMax(newMax)
      lastUpdateFromParent.current.max = newMax

      // Reset flag after state update
      setTimeout(() => {
        isUpdatingFromParent.current = false
      }, 0)
    }
  }, [filters?.hargaMax])

  // Debounced values
  const debouncedHargaMin = useDebounce(localHargaMin, 1000)
  const debouncedHargaMax = useDebounce(localHargaMax, 1000)

  // Memoized setPriceRange to prevent unnecessary re-renders
  const memoizedSetPriceRange = useCallback(
    (range: { hargaMin: string; hargaMax: string }) => {
      if (!isUpdatingFromParent.current) {
        setPriceRangeAction(range)
      }
    },
    [setPriceRangeAction]
  )

  // Effect for updating parent state when debounced values change
  useEffect(() => {
    if (
      !isUpdatingFromParent.current &&
      debouncedHargaMin !== filters?.hargaMin &&
      localHargaMin !== '' // Only update if there's actually a value
    ) {
      memoizedSetPriceRange({
        hargaMin: debouncedHargaMin,
        hargaMax: filters?.hargaMax || '',
      })
    }
  }, [
    debouncedHargaMin,
    filters?.hargaMin,
    filters?.hargaMax,
    memoizedSetPriceRange,
    localHargaMin,
  ])

  useEffect(() => {
    if (
      !isUpdatingFromParent.current &&
      debouncedHargaMax !== filters?.hargaMax &&
      localHargaMax !== '' // Only update if there's actually a value
    ) {
      memoizedSetPriceRange({
        hargaMin: filters?.hargaMin || '',
        hargaMax: debouncedHargaMax,
      })
    }
  }, [
    debouncedHargaMax,
    filters?.hargaMin,
    filters?.hargaMax,
    memoizedSetPriceRange,
    localHargaMax,
  ])

  // Memoized local state setters to prevent unnecessary re-renders in the hook
  const memoizedSetLocalHargaMin = useCallback((value: string) => {
    if (!isUpdatingFromParent.current) {
      setLocalHargaMin(value)
    }
  }, [])

  const memoizedSetLocalHargaMax = useCallback((value: string) => {
    if (!isUpdatingFromParent.current) {
      setLocalHargaMax(value)
    }
  }, [])

  // Hooks for slider range - adapting to use the new priceRange structure
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
      hargaMin: localHargaMin || String(formattedMin),
      hargaMax: localHargaMax || String(formattedMax),
    },
    setHargaMin: memoizedSetLocalHargaMin,
    setHargaMax: memoizedSetLocalHargaMax,
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
      // Ensure we always have exactly two values and not updating from parent
      if (values.length === 2 && !isUpdatingFromParent.current) {
        handleSliderChange(values as [number, number])
      }
    }

    const handleLocalSliderChangeEnd = (values: number[]) => {
      // Ensure we always have exactly two values and not updating from parent
      if (values.length === 2 && !isUpdatingFromParent.current) {
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
      if (!isUpdatingFromParent.current) {
        handleHargaMinChange(e)
      }
    }

    const handleLocalHargaMinBlur = () => {
      if (!isUpdatingFromParent.current) {
        handleHargaMinBlur()
      }
    }

    return (
      <Input
        value={
          isEmpty(localHargaMin) ? formatNumberCurrency(min) : localHargaMin
        }
        className="rounded-lg border-[0.5px] border-neutral-200 p-2"
        onChange={handleLocalHargaMinChange}
        onBlur={handleLocalHargaMinBlur}
        placeholder="Rp 0"
      />
    )
  }, [localHargaMin, min, handleHargaMinBlur, handleHargaMinChange])

  const maxPriceInput = useMemo(() => {
    const handleLocalHargaMaxChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (!isUpdatingFromParent.current) {
        handleHargaMaxChange(e)
      }
    }

    const handleLocalHargaMaxBlur = () => {
      if (!isUpdatingFromParent.current) {
        handleHargaMaxBlur()
      }
    }

    return (
      <Input
        value={
          isEmpty(localHargaMax) ? formatNumberCurrency(max) : localHargaMax
        }
        className="rounded-lg border-[0.5px] border-neutral-200 p-2 text-right"
        align="text-right"
        onChange={handleLocalHargaMaxChange}
        onBlur={handleLocalHargaMaxBlur}
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
