/* eslint-disable react-hooks/exhaustive-deps */
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import {
  UsePriceRangeFilterProps,
  UsePriceRangeFilterResult,
} from '@/hooks/types-props'
import { formatNumberCurrency } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'

export function usePriceRangeFilter({
  initialMin,
  initialMax,
  filters,
  setHargaMin,
  setHargaMax,
}: UsePriceRangeFilterProps): UsePriceRangeFilterResult {
  const updateQueryParams = useUpdateQueryParams()

  // Local state for slider values
  const [range, setRange] = useState<[number, number]>([
    initialMin || 0,
    initialMax || 1000000,
  ])

  // Initialize input values from filters on component mount
  useEffect(() => {
    const minValue = filters.hargaMin
      ? parseInt(filters.hargaMin.replace(/\D/g, ''))
      : initialMin || 0

    const maxValue = filters.hargaMax
      ? parseInt(filters.hargaMax.replace(/\D/g, ''))
      : initialMax || 1000000

    setRange([minValue, maxValue])

    if (filters.hargaMin) {
      setHargaMin(formatNumberCurrency(filters.hargaMin))
    }
    if (filters.hargaMax) {
      setHargaMax(formatNumberCurrency(filters.hargaMax))
    }
  }, [filters.hargaMin, filters.hargaMax, initialMin, initialMax])

  // Handler for slider change
  const handleSliderChange = useCallback((value: [number, number]) => {
    setRange(value)

    // Update min value
    const formattedMin = formatNumberCurrency(value[0].toString())
    setHargaMin(formattedMin.replace(/\D/g, ''))

    // Update max value
    const formattedMax = formatNumberCurrency(value[1].toString())
    setHargaMax(formattedMax.replace(/\D/g, ''))
  }, [])

  // Handler when slider interaction ends - update URL params
  const handleSliderChangeEnd = useCallback((value: [number, number]) => {
    updateQueryParams(['prMin', 'prMax', 'page'], [value[0], value[1], 1])
  }, [])

  // Input handlers
  const handleHargaMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const formattedDisplay = formatNumberCurrency(value)
      const numericValue = formattedDisplay.replace(/\D/g, '')
      const valueToSet =
        parseInt(numericValue) > initialMax
          ? initialMax.toString()
          : numericValue

      // Only update the input value while typing
      setHargaMin(valueToSet)

      // If the min input more than the max input, change the value max input same as min input
      if (Number(numericValue) > range[1]) {
        setHargaMax(valueToSet)
      }

      // Update slider if valid number
      const parsedValue = parseInt(numericValue)
      if (!isNaN(parsedValue)) {
        // Ensure value is within range
        const boundedValue = Math.max(
          initialMin || 0,
          Math.min(parsedValue, range[1])
        )
        setRange([boundedValue, range[1]])
      }
    },
    [initialMin, initialMax, range]
  )

  const handleHargaMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const formattedDisplay = formatNumberCurrency(value)
      const numericValue = formattedDisplay.replace(/\D/g, '')

      // Parse the value to check against max
      const parsedValue = parseInt(numericValue)

      // Update the input with either the numeric value or the bounded value
      const valueToSet =
        parsedValue > initialMax ? initialMax.toString() : numericValue
      setHargaMax(valueToSet)

      if (Number(valueToSet) < range[0]) {
        setHargaMin(valueToSet)
      }

      if (!isNaN(parsedValue)) {
        // If the value exceeds the max, use the max value instead
        const boundedValue = Math.min(
          initialMax || 1000000,
          Math.max(parsedValue, range[0])
        )

        // Update slider with bounded value
        setRange([range[0], boundedValue])
      } else {
        // Handle non-numeric input
        setHargaMax(numericValue)
      }
    },
    [initialMax, range]
  )

  const handleHargaMaxBlur = useCallback(() => {
    // Parse the current value
    const parsedValue = parseInt(filters.hargaMax.replace(/\D/g, ''))

    if (!isNaN(parsedValue)) {
      // Ensure value is within range
      const boundedValue = Math.min(
        initialMax || 1000000,
        Math.max(parsedValue, range[0])
      )

      // Update the filter and URL params on blur

      updateQueryParams(['prMax', 'prMin', 'page'], [boundedValue, range[0], 1])
    }
  }, [filters.hargaMax, initialMax, range])

  const handleHargaMinBlur = useCallback(() => {
    // Parse the current value
    const parsedValue = parseInt(filters.hargaMin.replace(/\D/g, ''))

    if (!isNaN(parsedValue)) {
      // Ensure value is within range
      const boundedValue = Math.max(
        initialMin || 0,
        Math.min(parsedValue, range[1])
      )

      // Update the filter and URL params on blur
      updateQueryParams(['prMin', 'prMax', 'page'], [boundedValue, range[1], 1])
    }
  }, [filters.hargaMin, initialMin, range])

  return {
    range,
    handleSliderChange,
    handleSliderChangeEnd,
    handleHargaMinChange,
    handleHargaMaxChange,
    handleHargaMinBlur,
    handleHargaMaxBlur,
  }
}
