'use client'

import { Button } from '@/components/ui/button'
import { DrawerFooter } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { formatNumberCurrency } from '@/lib/utils'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'

interface PriceDrawerProps {
  dataMinMax: { min: number; max: number }
  toggleDrawerAction: (id: number) => void
  itemId: number
  applyFiltersAction: (id: number) => void
  footer?: boolean
  resetFilters?: () => void
}

export const PriceDrawer = ({
  dataMinMax,
  applyFiltersAction,
  toggleDrawerAction,
  itemId,
  footer = true,
  resetFilters,
}: PriceDrawerProps) => {
  const { filters, setFilters } = useFilterProduct()
  const updateQueryParams = useUpdateQueryParams()
  const { min, max } = dataMinMax
  const minValue = Number(min)
  const maxValue = Number(max)

  // Local state for input values and slider range
  const [localHargaMin, setLocalHargaMin] = useState('')
  const [localHargaMax, setLocalHargaMax] = useState('')
  const [range, setRange] = useState<[number, number]>([minValue, maxValue])

  // Sync local state with filters when drawer opens
  useEffect(() => {
    // Initialize from existing filters or use min/max values
    const initialMin = filters.priceRange?.hargaMin
      ? parseInt(filters.priceRange?.hargaMin.replace(/\D/g, ''), 10)
      : minValue
    const initialMax = filters.priceRange?.hargaMax
      ? parseInt(filters.priceRange?.hargaMax.replace(/\D/g, ''), 10)
      : maxValue

    // Set local inputs and range
    setLocalHargaMin(
      filters.priceRange?.hargaMin
        ? formatNumberCurrency(initialMin.toString())
        : ''
    )
    setLocalHargaMax(
      filters.priceRange?.hargaMax
        ? formatNumberCurrency(initialMax.toString())
        : ''
    )
    setRange([initialMin, initialMax])
  }, [
    filters.priceRange?.hargaMin,
    filters.priceRange?.hargaMax,
    minValue,
    maxValue,
    resetFilters,
  ])

  // Handler for slider change
  const handleSliderChange = (value: number[]) => {
    if (value.length === 2) {
      setRange(value as [number, number])

      const formattedMin = formatNumberCurrency(value[0].toString())
      const formattedMax = formatNumberCurrency(value[1].toString())

      // Update local input values
      setLocalHargaMin(formattedMin)
      setLocalHargaMax(formattedMax)

      // Update context filters immediately
      setFilters({
        ...filters,
        priceRange: {
          hargaMin: formattedMin,
          hargaMax: formattedMax,
        },
      })
    }
  }

  // Handler for min price input change
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const numericString = inputValue.replace(/\D/g, '')

    if (numericString === '') {
      setLocalHargaMin('')
      return
    }

    const numericValue = parseInt(numericString, 10)
    const boundedValue = Math.min(numericValue, maxValue)
    const formattedValue = formatNumberCurrency(boundedValue.toString())

    setLocalHargaMin(formattedValue)

    const newMin = boundedValue
    let newMax = range[1]
    let formattedMax = localHargaMax

    if (boundedValue > range[1]) {
      newMax = boundedValue
      formattedMax = formattedValue
      setLocalHargaMax(formattedValue)
    }

    setRange([newMin, newMax])

    // Update context filters immediately
    setFilters({
      ...filters,
      priceRange: {
        hargaMin: formattedValue,
        hargaMax: formattedMax,
      },
    })
  }

  // Handler for max price input change
  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const numericString = inputValue.replace(/\D/g, '')

    if (numericString === '') {
      setLocalHargaMax('')
      return
    }

    const numericValue = parseInt(numericString, 10)
    const boundedValue = Math.min(numericValue, maxValue)
    const formattedValue = formatNumberCurrency(boundedValue.toString())

    setLocalHargaMax(formattedValue)

    let newMin = range[0]
    const newMax = boundedValue
    let formattedMin = localHargaMin

    if (boundedValue < range[0]) {
      newMin = boundedValue
      formattedMin = formattedValue
      setLocalHargaMin(formattedValue)
    }

    setRange([newMin, newMax])

    // Update context filters immediately
    setFilters({
      ...filters,
      priceRange: {
        hargaMin: formattedMin,
        hargaMax: formattedValue,
      },
    })
  }

  // Handler for save button - updates global filter state and URL params
  const handleSaveFilter = () => {
    const parsedUrl = queryString.parseUrl(window.location.href)
    const query = parsedUrl.query

    if (
      formatNumberCurrency(query.prMin?.toString() || '0') === localHargaMin &&
      formatNumberCurrency(query.prMax?.toString() || '0') === localHargaMax
    ) {
      delete query['prMin']
      delete query['prMax']
    }
    // Update URL parameters
    updateQueryParams(
      ['prMin', 'prMax', 'page'],
      [range[0].toString(), range[1].toString(), 1]
    )

    // Close drawer and apply filters
    applyFiltersAction(itemId)
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-2 flex justify-between">
          <p className="text-m-regular text-neutral-500">Dari</p>
          <p className="text-m-regular text-right text-neutral-500">Hingga</p>
        </div>

        <div className="flex items-center justify-between self-stretch">
          <Input
            value={localHargaMin}
            className="rounded-full border-[0.5px] border-neutral-200 p-2"
            onChange={handleMinInputChange}
            placeholder={`Rp ${formatNumberCurrency(minValue.toString())}`}
          />
          <div className="h-px w-5 flex-none bg-[#c9c9c9] sm:mx-5 xl:mx-10" />
          <Input
            value={localHargaMax}
            className="rounded-full border-[0.5px] border-neutral-200 p-2 text-right"
            align="text-right"
            onChange={handleMaxInputChange}
            placeholder={`Rp ${formatNumberCurrency(maxValue.toString())}`}
          />
        </div>

        <div className="mt-4">
          <Slider
            value={range}
            min={minValue}
            max={maxValue}
            step={10000}
            onValueChange={handleSliderChange}
          />
        </div>

        {/* Price range description */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-s-regular text-neutral-500">
            {`Rp ${formatNumberCurrency(minValue.toString())}`}
          </p>
          <p className="text-s-regular text-neutral-500">
            {`Rp ${formatNumberCurrency(maxValue.toString())}`}
          </p>
        </div>
      </div>
      {footer && (
        <DrawerFooter className="mb-4 flex flex-row gap-2 p-0">
          <Button
            variant="outline"
            className="border-primary-500 w-full py-3"
            onClick={() => toggleDrawerAction(itemId)}
          >
            Batal
          </Button>
          <Button onClick={handleSaveFilter} className="w-full py-3">
            Simpan
          </Button>
        </DrawerFooter>
      )}
    </>
  )
}

PriceDrawer.displayName = 'PriceDrawer'
