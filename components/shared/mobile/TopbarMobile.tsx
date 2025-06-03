/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { CallCenterIcon } from '@/components/icons/call-center'
import ShareDrawer from '@/components/pages/detail-package/mobile/DrawerShare'
import FilterDrawer from '@/components/pages/search-packages/mobile/TopFilterMobile/FilterDrawerMobile'
import { Input } from '@/components/ui/input'
import { CALL_CENTER } from '@/constant/env'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useCustomNavigation } from '@/hooks/common/useCustomNavigation'
import { useSearchQuery } from '@/hooks/common/useSearchQuery'
import { dissolve } from '@/lib/animation-setup'
import { capitalizeText, formatDateRangeShort, isEmpty } from '@/lib/utils'
import { Bell, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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
    | 'profileTopbar'
    | 'logo'
    | 'pendanaanSyariah'
    | 'plainBank'
    | 'suksesBanking'
  forceMobile?: boolean
  titleLink?: string
  title?: string
  token?: string
  packageId?: number
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  showNotification?: boolean
  notificationCount?: number
  backgroundColor?: string
  textColor?: string
  showBackButton?: boolean
  showCallCenter?: boolean
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
    showCallCenter = false,
    onBackClick,
    forceMobile = false,
    titleLink = '',
    token,
    packageId,
  }) => {
    const { filters } = useFilterProduct()
    const { goBack } = useCustomNavigation()

    const [showFixedHeader, setShowFixedHeader] = useState(false)

    const router = useRouter()
    // Use the same search hook as desktop version
    const { searchQuery, handleSearchChange, handleSearch } = useSearchQuery({
      redirectUri: 'search',
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

    const handleBackClick = useCallback(() => {
      if (onBackClick) {
        onBackClick()
      } else {
        goBack()
      }
    }, [onBackClick, router])

    const renderContent = useCallback(() => {
      switch (variant) {
        case 'search':
          return (
            <div
              className={`relative flex flex-1 items-center gap-2 ${dissolve}`}
            >
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
              <p className="text-m-reguler" onClick={handleBackClick}>
                Cancel
              </p>
            </div>
          )

        case 'suksesBanking':
          return <div className="text-l-medium flex-1 text-center">{title}</div>
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

        case 'profileTopbar':
        case 'pendanaanSyariah':
        case 'transactionTopbar':
        case 'title':
          return <div className="text-l-medium flex-1 text-center">{title}</div>

        case 'logo':
          return (
            <Image
              src="/images/logo.svg"
              alt="logo-muslim101"
              width={134}
              height={16}
              className="mx-auto"
            />
          )
        case 'plainBank':
        case 'plain':
          return (
            <div className="text-l-medium mr-8 flex-1 text-center">{title}</div>
          )

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
        case 'profileTopbar':
        case 'pendanaanSyariah':
        case 'transactionTopbar':
        case 'title':
        case 'search':
        case 'suksesBanking':
        case 'filter':
          return ''
        case 'transparent':
          return `bg-neutral-0 rounded-[20px] p-1 ${
            !showFixedHeader ? 'shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)]' : ''
          }`
        case 'plain':
        case 'plainBank':
        case 'pendanaanSyariah':
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
        `z-10 flex w-full items-center justify-between px-4 py-3 ${forceMobile ? '' : 'lg:hidden'}`,
      ]

      // Position classes based on variant
      let positionClasses = ''
      let backgroundClasses = ''

      switch (variant) {
        case 'plain':

        case 'transparent':
          positionClasses = 'fixed top-0'
          backgroundClasses = showFixedHeader
            ? 'bg-neutral-0 border-b border-b-neutral-100'
            : 'border-b-transparent bg-transparent'
          break
        case 'plainBank':
          positionClasses = 'absolute top-0'
          backgroundClasses = showFixedHeader
            ? 'bg-neutral-0 border-b border-b-neutral-100'
            : 'border-b-transparent bg-transparent'
          break
        case 'title':
        case 'search':
        case 'suksesBanking':
        case 'filter':
          positionClasses = `${forceMobile ? 'max-w-xl w-full bg-primary-500' : 'max-lg:bg-primary-500'} absolute h-[100px] -top-[22px]`
          backgroundClasses = ''
          break
        case 'transactionTopbar':
          positionClasses = 'absolute -top-13.5'
          backgroundClasses = ''
          break
        case 'profileTopbar':
          positionClasses =
            'absolute -top-25 left-1/2 transform -translate-x-1/2'
          backgroundClasses = ''
          break
        case 'pendanaanSyariah':
          positionClasses = 'absolute -top-15'
          backgroundClasses = ''
          break
        case 'logo':
          positionClasses = 'fixed top-0'
          backgroundClasses = 'bg-neutral-0 border-b border-b-neutral-100'
          break
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
            token={token}
            id={packageId}
          />
        )
      } else if (variant === 'filter') {
        return <FilterDrawer />
      }

      return null
    }

    return (
      <div className={containerClasses}>
        {(variant === 'filter' ||
          variant === 'title' ||
          variant === 'search' ||
          variant === 'suksesBanking') && (
          <>
            {/* Circle Background for mobile */}
            <Image
              src="/images/circle-1.svg"
              alt="bg-search"
              width={0}
              height={0}
              sizes="100vw"
              className={`absolute right-0 bottom-0 -z-1 h-auto w-1/4 ${forceMobile ? '' : 'lg:hidden'}`}
            />
            <Image
              src="/images/circle-2.svg"
              alt="bg-search"
              width={0}
              height={0}
              sizes="100vw"
              className={`absolute top-0 left-0 -z-1 h-auto w-1/2 ${forceMobile ? '' : 'lg:hidden'}`}
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

        {showCallCenter && (
          <Link
            href={`https://wa.me/${CALL_CENTER}?text=Assalamualaikum,+dengan+customer+service+Muslim+101+?`}
            target="_blank"
          >
            <div className={`relative ml-auto`}>
              <CallCenterIcon className="h-5 w-5" />
            </div>
          </Link>
        )}
      </div>
    )
  }
)

MobileTopbar.displayName = 'MobileTopbar'

export default MobileTopbar
