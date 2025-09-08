'use client'

import { LockIcon } from '@/components/icons/lock'
import { MaximizeIcon } from '@/components/icons/maximize'
import { SearchIcon } from '@/components/icons/search'
import SearchFilters from '@/components/pages/homepage/1-Banner/SearchFilter'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { dissolve, springTransition } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'
import Subtract from '@/public/images/Subtract.png'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

// Tab option types
type TripType = 'umrah' | 'hajj' | 'halal-trip'

interface SearchWidgetProps {
  className?: string
}

// Custom component for the notched container shape
const NotchedContainer: React.FC<{
  children: React.ReactNode
  className?: string
  height?: number
}> = ({ children, className }) => {
  return (
    <div className={cn('relative w-full', className)}>
      <Image
        src={Subtract}
        alt="notched"
        width={0}
        height={0}
        sizes="100vw"
        className="pointer-events-none absolute top-[-20px] w-full max-xl:h-[185px]"
      />
      {children}
    </div>
  )
}

const SearchWidget: React.FC<SearchWidgetProps> = ({ className }) => {
  const { setIsDisabled, setFilterName } = useFilterProduct()
  const { pushEvent } = useEventTracker()
  // State for active tab
  const [activeTab, setActiveTab] = useState<TripType>('umrah')
  // Ref for the tab container to calculate positions
  const tabContainerRef = useRef<HTMLDivElement>(null)
  // State to track previous active tab for animation direction
  const [prevActiveTab, setPrevActiveTab] = useState<TripType | null>(null)

  const disableTab = activeTab === 'halal-trip'
  const styleDisable = 'cursor-not-allowed opacity-10 blur-[2.5px]'

  useEffect(() => {
    setIsDisabled(disableTab)
  }, [activeTab, disableTab, setIsDisabled])

  // Handle tab change
  const handleTabChange = (tab: TripType) => {
    if (activeTab !== tab) {
      setPrevActiveTab(activeTab)
      setActiveTab(tab)
      setFilterName(tab)
      pushEvent({
        name: 'click_filter_menu',
        category: 'home',
        data: {
          filterName: tab,
        },
      })
    }
  }

  return (
    <motion.div
      initial={{ bottom: '-50%' }}
      animate={{
        bottom: '3%',
      }}
      transition={springTransition}
      className={cn(
        'absolute left-1/2 z-10 mx-auto w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/3 max-lg:hidden',
        className
      )}
    >
      <div className="relative">
        {/* Trip Type Selector Tabs */}
        <div className="absolute top-[-2.5%] left-1/2 z-99 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-transparent p-3 max-xl:top-3">
          <div
            ref={tabContainerRef}
            className="relative inline-flex items-center justify-start gap-1 overflow-hidden rounded-[100px] border-[1.20px] border-white/50 bg-white/60 p-0.5 shadow-[0px_4px_100px_0px_rgba(255,255,255,0.15)] backdrop-blur-[15px]"
          >
            <TabsWithAnimation
              tabs={[
                { id: 'umrah', label: 'Umrah', icon: <MapPin size={20} /> },
                { id: 'hajj', label: 'Haji', icon: <MapPin size={20} /> },
                {
                  id: 'halal-trip',
                  label: 'Muslim Trip',
                  icon: <MapPin size={20} />,
                },
              ]}
              activeTab={activeTab}
              prevActiveTab={prevActiveTab}
              onChange={handleTabChange}
            />
          </div>
        </div>

        {/* Main Search Widget using NotchedContainer */}
        <NotchedContainer height={200}>
          <div
            className={cn(
              'relative z-99 mx-auto flex w-[90%] flex-col gap-[15px] px-0 py-5',
              disableTab && styleDisable,
              dissolve
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className={cn('flex items-center gap-1.5', dissolve)}>
                <SearchIcon size={24} className="text-neutral-900" />
                <p className="text-l-medium">Cari Paket yang Sesuai Untukmu!</p>
              </div>
              <div className={cn('flex items-center gap-1', dissolve)}>
                <span className="text-s-regular text-neutral-500">
                  Masih bingung kapan?
                </span>
                <Link
                  href={`/search?type=${activeTab}`}
                  className="text-s-regular cursor-pointer text-neutral-900"
                >
                  Lihat Semua Paket
                </Link>
                <Link href="/search">
                  <MaximizeIcon
                    size={14}
                    className="cursor-pointer text-neutral-900"
                  />
                </Link>
              </div>
            </div>

            {/* Filter */}
            <SearchFilters type={activeTab} />
          </div>
        </NotchedContainer>

        {/* Conditional feature availability widgets */}
        <AnimatePresence>
          {activeTab === 'halal-trip' && (
            <motion.div
              className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-0 items-center gap-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={springTransition}
            >
              <LockIcon size={24} />
              <p className="text-l-regular text-neutral-900">
                Fitur Halal Trip saat ini belum tersedia. Nantikan fitur ini
                kedepannya!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Tabs with directional animation component
interface TabsWithAnimationProps {
  tabs: Array<{
    id: TripType
    label: string
    icon: React.ReactNode
  }>
  activeTab: TripType
  prevActiveTab: TripType | null
  onChange: (tab: TripType) => void
}

const TabsWithAnimation: React.FC<TabsWithAnimationProps> = ({
  tabs,
  activeTab,
  prevActiveTab,
  onChange,
}) => {
  // Store the tab button refs to calculate positions
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  // Animation direction state
  const [animDirection, setAnimDirection] = useState<'left' | 'right'>('right')
  // Background position state
  const [backgroundPosition, setBackgroundPosition] = useState({
    width: 0,
    left: 0,
  })

  // Determine animation direction when tab changes
  useEffect(() => {
    if (prevActiveTab && activeTab && prevActiveTab !== activeTab) {
      const prevIndex = tabs.findIndex((tab) => tab.id === prevActiveTab)
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)

      // Set direction based on index comparison
      setAnimDirection(prevIndex < currentIndex ? 'right' : 'left')
    }
  }, [activeTab, prevActiveTab, tabs])

  // Update background position when active tab changes
  useEffect(() => {
    const activeTabRef = tabRefs.current[activeTab]
    if (activeTabRef) {
      const rect = activeTabRef.getBoundingClientRect()
      const parentRect =
        activeTabRef.parentElement?.getBoundingClientRect() || {
          left: 0,
        }

      setBackgroundPosition({
        width: rect.width,
        left: rect.left - parentRect.left,
      })
    }
  }, [activeTab])

  // Create a callback ref that doesn't return anything
  const setTabRef = (id: string) => (el: HTMLButtonElement | null) => {
    tabRefs.current[id] = el
  }

  return (
    <div className="relative flex items-center">
      {/* Background animation - only this moves */}
      <motion.div
        className="bg-primary-500 absolute z-0 h-[calc(100%-4px)] rounded-full  max-xl:h-[calc(100%-2px)]"
        animate={{
          width: backgroundPosition.width,
          left: backgroundPosition.left,
        }}
        initial={
          prevActiveTab
            ? {
                width: backgroundPosition.width,
                left:
                  animDirection === 'right'
                    ? backgroundPosition.left - backgroundPosition.width
                    : backgroundPosition.left + backgroundPosition.width,
              }
            : {
                width: backgroundPosition.width,
                left: backgroundPosition.left,
              }
        }
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 30,
        }}
      />

      {/* Tab buttons - these stay in place */}
      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={setTabRef(tab.id)}
          onClick={() => onChange(tab.id)}
          className={cn(
            'relative z-10 flex cursor-pointer items-center gap-2 rounded-full px-4 py-3 focus-within:outline-0 max-xl:gap-1 max-xl:px-2 max-xl:py-2'
          )}
        >
          {tab.icon}
          <span className="text-s-regular">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
export default SearchWidget
