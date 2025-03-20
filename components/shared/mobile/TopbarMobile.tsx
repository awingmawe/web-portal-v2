'use client'

import { Input } from '@/components/ui/input'
import { ArrowLeft, Bell, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

// Define the props interface with all possible options
interface MobileTopbarProps {
  variant: 'search' | 'title' | 'dateRange' | 'plain'
  title?: string
  dateRange?: {
    startDate: string
    endDate: string
    startLocation?: string
    endLocation?: string
  }
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
}

const MobileTopbar: React.FC<MobileTopbarProps> = ({
  variant,
  title,
  dateRange,
  searchPlaceholder,
  onSearch,
  showNotification = false,
  notificationCount = 0,
  backgroundColor,
  textColor = '#000000',
  showBackButton = true,
  onBackClick,
  searchValue = '',
  onCancelSearch,
}) => {
  const router = useRouter()

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      router.back()
    }
  }

  // Render different content based on variant
  const renderContent = () => {
    switch (variant) {
      case 'search':
        return (
          <Input
            placeholder={searchPlaceholder}
            model="compact"
            startIcon={<Search size={16} className="text-neutral-300" />}
            value={searchValue}
            className="py-1.5"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        )

      case 'dateRange':
        return (
          <div className="flex w-full flex-col">
            <div className="text-center text-sm font-medium">
              {dateRange?.startDate} - {dateRange?.endDate}
            </div>
            {dateRange?.startLocation && dateRange?.endLocation && (
              <div className="mt-1 text-center text-xs">
                {dateRange.startLocation} → {dateRange.endLocation}
              </div>
            )}
          </div>
        )

      case 'title':
        return <div className="flex-1 text-center font-medium">{title}</div>

      case 'plain':
      default:
        return null
    }
  }

  return (
    <div
      className="absolute top-3.5 z-99 flex w-full items-center px-4 py-3 sm:hidden"
      style={{ backgroundColor, color: textColor }}
    >
      {showBackButton && (
        <button onClick={handleBackClick} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}

      {renderContent()}
      {onCancelSearch && (
        <button
          className="ml-2 text-sm font-medium text-black"
          onClick={onCancelSearch}
        >
          Cancel
        </button>
      )}
      {showNotification && (
        <div className="relative ml-auto">
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

export default MobileTopbar
