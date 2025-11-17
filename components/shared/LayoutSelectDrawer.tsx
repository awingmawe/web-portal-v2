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
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

export interface SelectOption {
  value: string
  label: string
  [key: string]: any
}

interface SelectWithInfiniteScrollProps {
  value?: string
  selectedLabel?: string
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
  onSearchChangeAction?: (value: string) => void
  hasSearch?: boolean
  header?: React.ReactNode
}

export const LayoutSelectDrawer = forwardRef<
  HTMLButtonElement, // Tipe elemen yang di-ref (button)
  SelectWithInfiniteScrollProps // Tipe props
>(
  (
    {
      value,
      selectedLabel,
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
      onSearchChangeAction,
      hasSearch = true,
      header,
    },
    ref
  ) => {
    const { lg: isMobile } = useTailwindBreakpoint()
    const [open, setOpen] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find((option) => option.value === value)

    const displayValue = useMemo(() => {
      // 1. Prioritas utama: label dari 'options' yang sudah di-load
      if (selectedOption?.label) {
        return selectedOption.label
      }
      // 2. Fallback: 'selectedLabel' yang di-pass dari parent (jika 'value' ada)
      if (value && selectedLabel) {
        return selectedLabel
      }
      // 3. Fallback terakhir: placeholder
      return placeholder
    }, [selectedOption, selectedLabel, value, placeholder])

    const handleSelect = useCallback(
      (selectedValue: string) => {
        const option = options.find((opt) => opt.value === selectedValue)
        onChangeAction(selectedValue, option)
        setOpen(false)
      },
      [onChangeAction, options]
    )

    // Default option renderer
    const defaultRenderOption = useCallback(
      (option: SelectOption, isSelected: boolean) => (
        <div className="flex w-full items-center justify-between">
          <span className="text-m-regular">{option.label}</span>
          {isSelected && <Check className="h-4 w-4" />}
        </div>
      ),
      []
    )

    // Default empty state renderer
    const defaultRenderEmpty = useCallback(
      () => (
        <div className="grid h-60 min-w-[320px] place-content-center p-3 text-center text-neutral-500 max-lg:w-full">
          {searchValue ? emptyText : placeholder}
        </div>
      ),
      [searchValue, emptyText, placeholder]
    )

    // Select Content (shared between Drawer and Popover)
    const SelectContent = useMemo(() => {
      return (
        <div className={cn('flex w-[300px] flex-col max-lg:w-full', className)}>
          {header && <div className="px-4 py-3">{header}</div>}
          {hasSearch && onSearchChangeAction && (
            <div className="border-b px-4 py-3">
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChangeAction(e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {/* Options List */}
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide max-h-[300px] overflow-y-auto"
            style={{ scrollBehavior: 'auto' }}
          >
            {loading && options.length === 0 ? (
              <div className="flex h-[300px] w-[300px] items-center justify-center py-8">
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
    }, [
      className,
      header,
      hasSearch,
      onSearchChangeAction,
      searchPlaceholder,
      searchValue,
      loading,
      options,
      isLoadingMore,
      hasMore,
      onLoadMore,
      defaultRenderEmpty,
      disabled,
      value,
      handleSelect,
      defaultRenderOption,
    ])

    // Mobile: Drawer
    if (isMobile) {
      return (
        <Drawer nested open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild disabled={disabled || loading}>
            <button
              ref={ref}
              type="button"
              className={cn(
                'flex w-full items-center justify-between overflow-hidden rounded-full border border-neutral-200 px-4 py-3.5 text-left transition-colors',
                disabled || loading
                  ? 'cursor-not-allowed bg-neutral-50 text-neutral-400'
                  : 'hover:border-neutral-300',
                !value && 'text-neutral-400',
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
            <DrawerHeader className="px-4 py-3">
              <DrawerTitle className="text-m-medium">{placeholder}</DrawerTitle>
            </DrawerHeader>
            {SelectContent}
            <div className="p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
              <DrawerTrigger asChild>
                <Button className="w-full ">Tutup</Button>
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
            ref={ref}
            type="button"
            className={cn(
              'flex w-full items-center justify-between overflow-hidden rounded-full border border-neutral-200 px-4 py-3.5 text-left transition-colors',
              disabled || loading
                ? 'cursor-not-allowed bg-neutral-50 text-neutral-400'
                : 'hover:border-neutral-300',
              !value && 'text-neutral-400',
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
          {SelectContent}
        </PopoverContent>
      </Popover>
    )
  }
)

LayoutSelectDrawer.displayName = 'LayoutSelectDrawer'
