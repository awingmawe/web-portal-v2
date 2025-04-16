'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { SearchIcon } from '@/components/icons/search'
import { SendIcon } from '@/components/icons/send'
import ShareIcon from '@/components/icons/share'
import WhatsappIcon from '@/components/icons/whatsapp'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useSearchQuery } from '@/hooks/common/useSearchQuery'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import { capitalizeText, formatDateRangeShort, isEmpty } from '@/lib/utils'
import { Bell, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

// Define the props interface with all possible options
interface MobileTopbarProps {
  variant: 'search' | 'title' | 'filter' | 'plain' | 'transparent'
  titleLink?: string
  title?: string
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  showNotification?: boolean
  notificationCount?: number
  backgroundColor?: string
  textColor?: string
  showBackButton?: boolean
  onBackClick?: () => void
  searchValue?: string
  onCancelSearch?: () => void
  onFilterChange?: () => void
}

// Share drawer component for transparent variant
const ShareDrawer = React.memo(
  ({
    titleLink,
    buttonClasses,
    shareViaWhatsApp,
    shareViaCopyLink,
  }: {
    titleLink: string
    buttonClasses: string
    shareViaWhatsApp: (link: string) => void
    shareViaCopyLink: () => void
  }) => {
    return (
      <Drawer>
        <DrawerTrigger>
          <div className="flex items-center gap-2">
            <div className={buttonClasses}>
              <SendIcon size={20} />
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="gap-3">
            <DrawerTitle className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <SendIcon size={14} />
                <p className="text-m-semibold text-neutral-900">Share</p>
              </div>
              <DrawerClose>
                <X className="text-primary-900" />
              </DrawerClose>
            </DrawerTitle>
            <DrawerDescription className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full"
                size="xs"
                onClick={() => shareViaWhatsApp(titleLink || '')}
              >
                <WhatsappIcon size={24} className="mr-[9px]" />
                Share ke WhatsApp
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="xs"
                onClick={shareViaCopyLink}
              >
                <ShareIcon size={24} className="mr-[9px]" />
                Salin Link
              </Button>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
  }
)
ShareDrawer.displayName = 'ShareDrawer'

// Filter drawer component
const FilterDrawer = React.memo(({ filters }: { filters: any }) => {
  const { dateRange, arrivalAirport, departureAirport } = filters
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <span className="bg-neutral-0 text-s-medium rounded-[100px] px-2 py-3 text-neutral-900">
          {isEmpty(dateRange) ||
          isEmpty(arrivalAirport) ||
          isEmpty(departureAirport)
            ? 'Filter'
            : 'Ubah'}
        </span>
      </DrawerTrigger>
      <DrawerContent className="bg-primary-500 h-full overflow-hidden !border-0 outline-0">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <div className="h-6 w-6" />
          <DrawerTitle className="text-l-semibold">
            {isEmpty(dateRange) ||
            isEmpty(arrivalAirport) ||
            isEmpty(departureAirport)
              ? 'Filter'
              : 'Ubah Pencarian'}
          </DrawerTitle>
          <DrawerClose>
            <X className="text-neutral-900" />
          </DrawerClose>
        </DrawerHeader>
        <div className="bg-neutral-0 scrollbar-hide mx-4 mb-4 overflow-y-auto rounded-[20px] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <SearchIcon size={24} />
              <p className="text-m-semibold w-full">Cari Paket</p>
            </div>
            <p className="text-s-regular text-error-500">Reset</p>
          </div>
          {/* Filter Sections */}
          <div className="mt-2 flex flex-col space-y-3">
            {/* Bintang Hotel */}
            <div className="border-b border-neutral-100 pb-1.5">
              <div className="text-xs-regular mb-2.5 tracking-[0px] text-neutral-500">
                Bintang Hotel
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center">
                  <svg
                    className="text-primary-500 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <span className="text-m-regular">Hotel Bintang 5</span>
                  <span className="text-s-regular text-primary-500 ml-1">
                    (⭐⭐⭐⭐⭐)
                  </span>
                </div>
                <X className="h-5 w-5 text-neutral-500" />
              </div>
            </div>

            {/* Bulan Keberangkatan */}
            <div className="border-b border-neutral-100 pb-1.5">
              <div className="text-xs-regular mb-2.5 text-neutral-500">
                Bulan Keberangkatan
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg
                    className="h-5 w-5 text-neutral-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                  </svg>
                  <span className="text-m-regular">Januari 2025</span>
                </div>
                <X className="h-5 w-5 text-neutral-500" />
              </div>
            </div>

            {/* Bandara Keberangkatan */}
            <div className="border-b border-neutral-100 pb-1.5">
              <div className="text-xs-regular mb-2.5 text-neutral-500">
                Bandara Keberangkatan
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg
                    className="h-5 w-5 text-neutral-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                  </svg>
                  <span className="text-m-regular">Jakarta (CGK)</span>
                </div>
                <X className="h-5 w-5 text-neutral-500" />
              </div>
            </div>

            {/* Bandara Kedatangan */}
            <div className="border-b border-neutral-100 pb-1.5">
              <div className="text-xs-regular mb-2.5 text-neutral-500">
                Bandara Kedatangan
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg
                    className="h-5 w-5 text-neutral-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                  </svg>
                  <span className="text-m-regular">Madinah (MED)</span>
                </div>
                <X className="h-5 w-5 text-neutral-500" />
              </div>
            </div>

            {/* Maskapai Penerbangan */}
            <div className="pb-4">
              <div className="text-xs-regular mb-2.5 text-neutral-500">
                Maskapai Penerbangan
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg
                    className="h-5 w-5 text-neutral-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                  <span className="text-m-regular">Emirates Airline</span>
                </div>
                <X className="h-5 w-5 text-neutral-500" />
              </div>
            </div>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600 w-full text-neutral-900">
            Cari
          </Button>
        </div>

        {/* Fixed search button at the bottom */}
      </DrawerContent>
    </Drawer>
  )
})
FilterDrawer.displayName = 'FilterDrawer'

const MobileTopbar: React.FC<MobileTopbarProps> = React.memo(
  ({
    variant,
    title,
    searchPlaceholder = 'Cari paket, travel, hotel atau airlines',
    showNotification = false,
    notificationCount = 0,
    showBackButton = true,
    onBackClick,
    titleLink = '',
  }) => {
    const { shareViaCopyLink, shareViaWhatsApp } = useGallerySharing()
    const { filters } = useFilterProduct()

    const [showFixedHeader, setShowFixedHeader] = useState(false)

    const router = useRouter()
    // Use the same search hook as desktop version
    const { searchQuery, handleSearchChange, handleSearch } = useSearchQuery({
      redirectPath: '/search',
      delay: 1000,
      searchParamName: 'query',
    })
    const { dateRange, departureAirport, arrivalAirport } = filters

    // Memoize formatted date range to prevent unnecessary recalculations
    const formattedDateRange = useMemo(() => {
      return dateRange ? formatDateRangeShort(dateRange) : ''
    }, [dateRange])

    const getDisplayText = useMemo(() => {
      if (departureAirport && arrivalAirport) {
        return (
          <p className="text-xs-regular text-neutral-900">
            {capitalizeText(departureAirport.cityName)} ({departureAirport.code}
            )
            <ArrowIcon size={18} className="inline-flex" />{' '}
            {capitalizeText(arrivalAirport.cityName)} ({arrivalAirport.code})
          </p>
        )
      } else if (departureAirport) {
        return (
          <p className="text-xs-regular text-neutral-900">
            {capitalizeText(departureAirport.cityName)} ({departureAirport.code}
            )
          </p>
        )
      } else {
        return null
      }
    }, [arrivalAirport, departureAirport])

    /**
     * Handles the back button click event. If an `onBackClick` callback is provided,
     * it invokes that callback. Otherwise, it navigates back to the previous page
     * in the browser history using the router.
     */
    const handleBackClick = useCallback(() => {
      if (onBackClick) {
        onBackClick()
      } else {
        router.back()
      }
    }, [onBackClick, router])

    /**
     * Renders the content of the mobile top bar based on the given variant.
     * Available variants are:
     *   - `search`: Renders a search input form.
     *   - `filter`: Renders date range and optional location information.
     *   - `title`: Renders a title in the center.
     *   - `plain`: Renders nothing.
     *   - `transparent`: Renders nothing.
     * @returns The rendered content of the mobile top bar.
     */
    const renderContent = useCallback(() => {
      switch (variant) {
        case 'search':
          return (
            <div className={`relative flex-1 ${dissolve}`}>
              <form onSubmit={handleSearch} className="w-full">
                <Input
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={searchPlaceholder}
                  model="compact"
                  startIcon={<Search size={16} className="text-neutral-300" />}
                  className="w-full py-1.5"
                />
              </form>
            </div>
          )

        case 'filter':
          return (
            <div className="flex w-full flex-col items-center">
              {isEmpty(formattedDateRange) &&
                isEmpty(arrivalAirport) &&
                isEmpty(departureAirport) && (
                  <div className="text-s-medium text-center text-neutral-900">
                    Umroh
                  </div>
                )}
              {formattedDateRange && (
                <div className="text-s-medium text-center">
                  {formattedDateRange}
                </div>
              )}
              {(arrivalAirport || departureAirport) && (
                <div className="mt-1 text-center">{getDisplayText}</div>
              )}
            </div>
          )

        case 'title':
          return <div className="flex-1 text-center font-medium">{title}</div>

        case 'plain':
        case 'transparent':
        default:
          return null
      }
    }, [
      variant,
      searchQuery,
      handleSearch,
      handleSearchChange,
      searchPlaceholder,
      formattedDateRange,
      arrivalAirport,
      departureAirport,
      getDisplayText,
      title,
    ])

    // Use callback for scroll handler to prevent recreating on each render
    const updateFixedHeader = useCallback(() => {
      const element = document.getElementById('gallery-list')
      setShowFixedHeader(
        window.scrollY > (element?.getBoundingClientRect().height ?? 200)
      )
    }, [])

    // Setup scroll listener
    useEffect(() => {
      window.addEventListener('scroll', updateFixedHeader)
      // Initial check
      updateFixedHeader()

      return () => {
        window.removeEventListener('scroll', updateFixedHeader)
      }
    }, [updateFixedHeader])

    // Memoize button classes with switch case for different variants
    const buttonClasses = useMemo(() => {
      // Using switch case to handle different variants
      switch (variant) {
        case 'filter':
          return ''
        case 'transparent':
          return `bg-neutral-0 rounded-[20px] p-1 ${
            !showFixedHeader ? 'shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)]' : ''
          }`
        case 'search':
          return 'bg-neutral-0 rounded-[20px] p-1'
        case 'title':
        case 'plain':
        default:
          return `bg-neutral-0 rounded-[20px] p-1 ${
            !showFixedHeader ? 'shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)]' : ''
          }`
      }
    }, [variant, showFixedHeader])

    // Memoize container classes with switch case for different variants
    const containerClasses = useMemo(() => {
      // Base classes that apply to all variants
      const baseClasses = [
        dissolve,
        'z-10 flex w-full items-center justify-between px-4 py-3 lg:hidden',
      ]

      // Position classes based on variant
      let positionClasses = ''
      let backgroundClasses = ''

      switch (variant) {
        case 'search':
          positionClasses = 'absolute top-3.5'
          backgroundClasses = 'border-b-transparent bg-transparent'
          break

        case 'transparent':
          positionClasses = 'fixed top-0'
          backgroundClasses = showFixedHeader
            ? 'bg-neutral-0 border-b border-b-neutral-100'
            : 'border-b-transparent bg-transparent'
          break

        case 'filter':
          positionClasses = 'fixed top-0'
          backgroundClasses = ''
          break

        case 'title':
        case 'plain':
        default:
          positionClasses = 'fixed top-3.5'
          backgroundClasses = 'border-b-transparent bg-transparent'
          break
      }

      return [...baseClasses, positionClasses, backgroundClasses].join(' ')
    }, [variant, showFixedHeader])

    // Render the appropriate action button based on variant
    const renderActionButton = () => {
      if (variant === 'transparent') {
        return (
          <ShareDrawer
            titleLink={titleLink}
            buttonClasses={buttonClasses}
            shareViaWhatsApp={shareViaWhatsApp}
            shareViaCopyLink={shareViaCopyLink}
          />
        )
      } else if (variant === 'filter') {
        return <FilterDrawer filters={filters} />
      }

      return null
    }

    return (
      <div className={containerClasses}>
        {showBackButton && (
          <button onClick={handleBackClick} className={buttonClasses}>
            <ArrowIcon size={20} className="rotate-180" />
          </button>
        )}

        {renderContent()}

        {renderActionButton()}

        {showNotification && !searchQuery && (
          <div className={`relative ml-auto ${dissolve}`}>
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                <span className="text-xs text-white">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

MobileTopbar.displayName = 'MobileTopbar'

export default MobileTopbar
