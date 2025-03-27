'use client'

import { ArrowIcon } from '@/components/icons/arrow'
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
import { useSearchQuery } from '@/hooks/common/useSearchQuery'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import { Bell, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

// Define the props interface with all possible options
interface MobileTopbarProps {
  variant: 'search' | 'title' | 'dateRange' | 'plain' | 'transparent'
  titleLink?: string
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
  searchPlaceholder = 'Cari paket, travel, hotel atau airlines',
  showNotification = false,
  notificationCount = 0,
  showBackButton = true,
  onBackClick,
  titleLink,
}) => {
  const { shareViaCopyLink, shareViaWhatsApp } = useGallerySharing()

  const [showFixedHeader, setShowFixedHeader] = useState(false)

  const router = useRouter()
  // Use the same search hook as desktop version
  const { searchQuery, handleSearchChange, handleSearch } = useSearchQuery({
    redirectPath: '/search',
    delay: 1000,
    searchParamName: 'query',
  })

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
      case 'transparent':
      default:
        return null
    }
  }

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

  return (
    <div
      className={`${variant !== 'search' ? 'fixed' : 'absolute'} ${variant === 'transparent' && showFixedHeader ? 'bg-neutral-0 border-b border-b-neutral-100' : 'border-b-transparent bg-transparent'} ${dissolve} ${variant === 'transparent' ? 'top-0 ' : 'top-3.5'} z-10 flex w-full items-center justify-between px-4 py-3 lg:hidden`}
    >
      {showBackButton && (
        <button
          onClick={handleBackClick}
          className={`bg-neutral-0 rounded-[20px] p-1 ${!showFixedHeader ? 'shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)]' : ''}`}
        >
          <ArrowIcon size={20} className="rotate-180" />
        </button>
      )}

      {renderContent()}

      {variant === 'transparent' && (
        <Drawer>
          <DrawerTrigger>
            <div className="flex items-center gap-2">
              <div
                className={`bg-neutral-0 rounded-[20px] p-1 ${!showFixedHeader ? 'shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)]' : ''}`}
              >
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
      )}
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

export default MobileTopbar
