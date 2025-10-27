'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { cn } from '@/lib/utils'
import { Check, ChevronDown, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'

export interface SelectOption {
  value: string
  label: string
  [key: string]: any
}

interface SelectWithInfiniteScrollProps {
  value?: string
  onChangeAction: (value: string, option?: SelectOption) => void
  options: SelectOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  loading?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
  hasMore?: boolean
  isLoadingMore?: boolean
  onLoadMore?: () => void
  searchValue?: string
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function LayoutSelectDrawer({
  value,
  onChangeAction,
  options = [],
  placeholder = 'Pilih opsi',
  searchPlaceholder = 'Cari...',
  emptyText = 'Tidak ada data',
  disabled = false,
  loading = false,
  className,
  triggerClassName,
  contentClassName,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  searchValue,
  onSearchChange,
}: SelectWithInfiniteScrollProps) {
  const { lg: isMobile } = useTailwindBreakpoint()
  const [open, setOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)
  const displayValue = selectedOption?.label || placeholder

  const handleSelect = (selectedValue: string) => {
    const option = options.find((opt) => opt.value === selectedValue)
    onChangeAction(selectedValue, option)
    setOpen(false)
  }

  // Default option renderer
  const defaultRenderOption = (option: SelectOption, isSelected: boolean) => (
    <div className="flex w-full items-center justify-between">
      <span>{option.label}</span>
      {isSelected && <Check className="h-4 w-4" />}
    </div>
  )

  // Default empty state renderer
  const defaultRenderEmpty = () => (
    <div className="grid h-60 min-w-[320px] place-content-center p-3 text-center text-neutral-500">
      {searchValue ? emptyText : placeholder}
    </div>
  )

  // Select Content (shared between Drawer and Popover)
  const SelectContent = () => (
    <div className={cn('flex max-w-[320px] flex-col', className)}>
      {/* Search Input */}
      <div className="border-b p-3">
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          className="w-full"
        />
      </div>

      {/* Options List */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide max-h-[300px] overflow-y-auto"
        style={{ scrollBehavior: 'auto' }}
      >
        {loading && options.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
          </div>
        ) : options.length > 0 ? (
          <InfiniteScroll
            isLoading={isLoadingMore}
            hasMore={hasMore}
            next={onLoadMore || (() => {})}
            threshold={0.8}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                disabled={disabled}
                className={cn(
                  'w-full border-b border-neutral-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-neutral-100',
                  value === option.value && 'bg-primary-100',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {defaultRenderOption(option, value === option.value)}
              </button>
            ))}
          </InfiniteScroll>
        ) : (
          defaultRenderEmpty()
        )}

        {/* Loading More Indicator */}
        {isLoadingMore && hasMore && (
          <div className="flex items-center justify-center border-t py-4">
            <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
            <span className="text-muted-foreground ml-2 text-sm">
              Memuat lebih banyak...
            </span>
          </div>
        )}
      </div>
    </div>
  )

  // Mobile: Drawer
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild disabled={disabled || loading}>
          <button
            type="button"
            className={cn(
              'flex w-full items-center justify-between rounded-full border border-neutral-200 px-4 py-2.5 text-left transition-colors',
              disabled || loading
                ? 'cursor-not-allowed bg-neutral-50 text-neutral-400'
                : 'hover:border-neutral-300',
              !selectedOption && 'text-neutral-400',
              triggerClassName
            )}
          >
            <span className="text-m-regular truncate">{displayValue}</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 transition-transform',
                open && 'rotate-180'
              )}
            />
          </button>
        </DrawerTrigger>
        <DrawerContent className={cn('max-h-[85vh]', contentClassName)}>
          <DrawerHeader className="border-b border-gray-200 px-4 py-3">
            <DrawerTitle className="text-lg font-medium">
              {placeholder}
            </DrawerTitle>
          </DrawerHeader>
          <SelectContent />
          <div className="border-t p-4">
            <DrawerTrigger asChild>
              <Button className="w-full">Tutup</Button>
            </DrawerTrigger>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  // Desktop: Popover
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled || loading}>
        <button
          type="button"
          className={cn(
            'flex w-full items-center justify-between rounded-full border border-neutral-200 px-4 py-2.5 text-left transition-colors',
            disabled || loading
              ? 'cursor-not-allowed bg-neutral-50 text-neutral-400'
              : 'hover:border-neutral-300',
            !selectedOption && 'text-neutral-400',
            triggerClassName
          )}
        >
          <span className="text-m-regular truncate">{displayValue}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 transition-transform',
              open && 'rotate-180'
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'w-[--radix-popover-trigger-width] p-0',
          contentClassName
        )}
        align="start"
      >
        <SelectContent />
      </PopoverContent>
    </Popover>
  )
}
