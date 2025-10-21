import { InfoIcon } from '@/components/icons/info'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Facility } from '@/constant/types/FacilityProps'
import { formatCurrency } from '@/lib/utils'
import { useCalculateFinancing } from '@/services/hooks/banking-service/credits-api'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function FinancingSimulation({
  dataTenor,
  price,
  showInput = false,
}: {
  dataTenor: Facility[]
  price?: number
  showInput?: boolean
}) {
  const [selectedTenor, setSelectedTenor] = useState('')
  const [totalAmount, setTotalAmount] = useState(
    price ? formatCurrency(price) : ''
  )
  const [displayValue, setDisplayValue] = useState(
    price ? formatCurrency(price) : ''
  )

  // Debounce timer reference
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  const handleChange = (e: any) => {
    const inputValue = e.target.value

    // Hanya izinkan angka dan titik
    const numericValue = inputValue.replace(/[^\d]/g, '')

    // Format untuk display
    const formatted = formatCurrency(numericValue)
    setDisplayValue(formatted)

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Set new timer untuk update totalAmount setelah 500ms
    debounceTimer.current = setTimeout(() => {
      setTotalAmount(formatted)
    }, 500)
  }

  const handleBlur = () => {
    // Clear debounce timer saat blur
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Format ulang saat blur untuk memastikan format konsisten
    if (price) {
      const formatted = formatCurrency(price)
      setDisplayValue(formatted)
      setTotalAmount(formatted)
    } else {
      // Update immediately saat blur
      setTotalAmount(displayValue)
    }
  }

  useEffect(() => {
    // Sync dengan prop price dari luar
    const formatted = price ? formatCurrency(price) : ''
    setTotalAmount(formatted)
    setDisplayValue(formatted)
  }, [price])

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  const { create, data, isLoading } = useCalculateFinancing({
    showErrorToast: true,
  })

  // Get tenor options from customValue
  const tenorOptions = useMemo(
    () => dataTenor[0]?.customValue || [],
    [dataTenor]
  )

  // Set default value when data is loaded
  useEffect(() => {
    if (tenorOptions.length > 0 && !selectedTenor) {
      const value = tenorOptions[0]?.value || ''
      setSelectedTenor(String(value))
    }
  }, [tenorOptions, selectedTenor])

  // Trigger calculation when tenor or down payment changes
  useEffect(() => {
    if (selectedTenor && (price || totalAmount)) {
      create({
        totalAmount: price || totalAmount,
        tenor: Number(selectedTenor),
      })
    }
  }, [selectedTenor, price, totalAmount, setTotalAmount, create])

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      {/* Down Payment Input */}
      {showInput && (
        <div className={`relative space-y-1`}>
          <label className="text-s-regular">
            Total Harga Paket <span className="text-error-500">*</span>
          </label>
          <Input
            type="text"
            prefix="Rp"
            model="normal"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={price !== undefined}
            className="w-full rounded-full border-1 border-neutral-200 px-4 py-2.5"
          />
        </div>
      )}

      {/* Tenor Select */}
      <div className="space-y-1">
        <label className="text-s-regular">
          Tenor <span className="text-error-500">*</span>
        </label>
        <Select
          disabled={tenorOptions.length === 0 || isLoading}
          value={selectedTenor}
          onValueChange={setSelectedTenor}
        >
          <SelectTrigger className="w-full rounded-full border-1 border-neutral-200 px-4 py-2.5">
            <SelectValue placeholder="Pilih tenor" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-none shadow-[0px_6px_24px_0px_rgba(0,0,0,0.25)] outline-none">
            {tenorOptions.length === 0 ? (
              <SelectItem value="empty" disabled>
                Tidak ada data tenor
              </SelectItem>
            ) : (
              tenorOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-m-regular flex w-full cursor-pointer items-center justify-between rounded-2xl py-2.5 hover:bg-neutral-100"
                >
                  {option.value} Bulan
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Simulasi Pembiayaan Card */}
      <div className="space-y-2 rounded-xl border border-neutral-200 p-4">
        <p className="text-m-medium">Simulasi Pembiayaan</p>

        {isLoading ? (
          <div className="w-full space-y-4 py-2">
            {/* Skeleton untuk Total Pembiayaan dengan Accordion */}
            <div className="space-y-2">
              {/* Header Accordion */}
              <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                <Skeleton className="h-5 w-28" />
              </div>

              {/* Breakdown Items (expanded state) */}
              <div className="space-y-2 pl-2">
                {/* Item 1: Harga Paket */}
                <div className="flex items-center justify-between border-l-2 border-neutral-200 pl-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Item 2: Uang Muka */}
                <div className="flex items-center justify-between border-l-2 border-neutral-200 pl-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Item 3: Biaya Admin */}
                <div className="flex items-center justify-between border-l-2 border-neutral-200 pl-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>

            {/* Skeleton untuk Angsuran Per Bulan */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-5 w-24" />
            </div>

            {/* Skeleton untuk Warning Message */}
            <div className="bg-primary-100 flex items-start gap-2 rounded-lg p-3">
              <Skeleton className="h-5 w-5 flex-shrink-0 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>
        ) : data ? (
          <>
            {/* Accordion for Total Pembiayaan */}
            <Accordion
              type="single"
              collapsible
              className="mb-0 w-full"
              defaultValue="breakdown"
            >
              <AccordionItem value="breakdown" className="border-none">
                <div className="flex items-center justify-between">
                  <AccordionTrigger
                    className="flex-1 py-0 hover:no-underline"
                    noSeparator
                    sizeChevron={18}
                  >
                    <span className="text-s-regular text-neutral-500">
                      Total Pembiayaan
                    </span>
                  </AccordionTrigger>
                  <span className="text-m-semibold text-right">
                    {formatCurrency(data.totalAmount)}
                  </span>
                </div>
                <AccordionContent className="py-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between border-l-2 border-neutral-200 pl-2">
                      <span className="text-s-regular text-neutral-500">
                        Harga Paket
                      </span>
                      <span className="text-m-medium text-right text-neutral-500">
                        {formatCurrency(data.totalAmount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-l-2 border-neutral-200 pl-2">
                      <span className="text-s-regular text-neutral-500">
                        Uang Muka ({data.dpPercentage}
                        %)
                      </span>
                      <span className="text-m-medium text-right text-neutral-500">
                        (-) {formatCurrency(data.down_payment)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-l-2 border-neutral-200 pl-2">
                      <span className="text-s-regular text-neutral-500">
                        Biaya Admin
                      </span>
                      <span className="text-m-medium text-right text-neutral-500">
                        (+) {formatCurrency(data.admin_fee || 0)}
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Angsuran Per Bulan */}
            <div className="flex items-center justify-between">
              <span className="text-s-regular text-neutral-500">
                Angsuran Per Bulan
              </span>
              <span className="text-m-semibold text-right text-neutral-500">
                {formatCurrency(data?.monthly_payment || 0)}
              </span>
            </div>

            {/* Warning Message */}
            <div
              className={`text-s-regular bg-primary-100 flex items-center rounded-lg p-1`}
            >
              <InfoIcon
                className="stroke-warning-700 mr-2 flex-none stroke-0"
                size={20}
              />
              <p className="text-warning-700">
                Perhitungan ini hanya{' '}
                <span className="text-warning-700 font-bold">SIMULASI</span>,
                hasil akhir dapat berbeda dan belum termasuk biaya pendukung
                lain.
              </p>
            </div>
          </>
        ) : (
          <div className="text-m-regular py-8 text-center text-neutral-500">
            Silakan pilih tenor dan paket untuk melihat simulasi
          </div>
        )}
      </div>
    </div>
  )
}
