'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import ShareDrawer from '@/components/pages/detail-package/mobile/DrawerShare'
import FilterDrawer from '@/components/shared/mobile/FilterMobile/FilterDrawerMobile'
import { Input } from '@/components/ui/input'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useSearchQuery } from '@/hooks/common/useSearchQuery'
import { dissolve } from '@/lib/animation-setup'
import { capitalizeText, formatDateRangeShort, isEmpty } from '@/lib/utils'
import { Bell, Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

// Define the props interface with all possible options
interface MobileTopbarProps {
  variant:
    | 'search'
    | 'title'
    | 'filter'
    | 'plain'
    | 'transparent'
    | 'transactionTopbar'
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
    const { filters } = useFilterProduct()

    const [showFixedHeader, setShowFixedHeader] = useState(false)

    const router = useRouter()
    // Use the same search hook as desktop version
    const { searchQuery, handleSearchChange, handleSearch } = useSearchQuery({
      redirectPath: '/search',
      delay: 1000,
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

        case 'transactionTopbar':
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
        case 'transactionTopbar':
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
          positionClasses =
            'max-lg:bg-primary-500 absolute h-[100px] -top-[22px]'
          backgroundClasses = ''
          break
        case 'transactionTopbar':
          positionClasses = 'absolute -top-13.5'
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
          <ShareDrawer titleLink={titleLink} buttonClasses={buttonClasses} />
        )
      } else if (variant === 'filter') {
        return <FilterDrawer />
      }

      return null
    }

    return (
      <div className={containerClasses}>
        {variant === 'filter' && (
          <>
            {/* Circle Background for mobile */}
            <Image
              src="images/circle-1.svg"
              alt="bg-search"
              width={0}
              height={0}
              sizes="100vw"
              className="absolute right-0 bottom-0 -z-1 h-auto w-1/4 lg:hidden"
            />
            <Image
              src="images/circle-2.svg"
              alt="bg-search"
              width={0}
              height={0}
              sizes="100vw"
              className="absolute top-0 left-0 -z-1 h-auto w-1/2 lg:hidden"
            />
            {/* End of Circle Background for Mobile */}
          </>
        )}
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
