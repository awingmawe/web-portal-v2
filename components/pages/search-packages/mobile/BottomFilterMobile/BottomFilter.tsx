'use client'

import { DiscountIcon, DiscountIconPrimary } from '@/components/icons/discount'
import { GiftIcon, GiftIconPrimary } from '@/components/icons/gift'
import { MoneysIconBlack, MoneysIconPrimary } from '@/components/icons/moneys'
import { SortIcon, SortIconPrimary } from '@/components/icons/sort'
import { FacilityDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/FacilityFilter'
import { PriceDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/PriceRangeFilter'
import { PromoDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/PromoFilter'
import { SectionDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/SectionFilter'
import { SortDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/SortFilter'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { easeInOut, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

export interface NavItem {
  id: number
  name: string
  icon: React.ReactElement
  badge?: number
  activeIcon: React.ReactElement
}

const navItems: NavItem[] = [
  {
    id: 1,
    name: 'Harga',
    icon: <MoneysIconBlack />,
    activeIcon: <MoneysIconPrimary />,
  },
  {
    id: 2,
    name: 'Fasilitas',
    icon: <GiftIcon />,
    activeIcon: <GiftIconPrimary />,
  },
  {
    id: 3,
    name: 'Urutkan',
    icon: <SortIcon />,
    activeIcon: <SortIconPrimary />,
  },
  {
    id: 4,
    name: 'Tipe Paket',
    icon: <DiscountIcon />,
    activeIcon: <DiscountIconPrimary />,
  },
]

export default function BottomNavigation({
  dataMinMax,
  dataFacility,
  dataTagPackages,
  dataSection,
  dpMinMax,
  forceMobile = false,
}: {
  dataMinMax: any
  dataFacility: any
  dataTagPackages: any
  dataSection: any
  dpMinMax?: any
  forceMobile?: boolean
}) {
  const { filters, resetFilter, setFilters } = useFilterProduct()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState<Record<number, boolean>>({})
  // Get current sort from URL or use default
  const [selectedSort, setSelectedSort] = useState<string>(
    searchParams.get('sort') || 'price-low'
  )

  // Calculate total active packages for badge
  const totalActivePackages = useMemo(() => {
    if (!dataTagPackages || !dataTagPackages.length) return 0

    return dataTagPackages.reduce(
      (total: number, tag: any) =>
        total + parseInt(tag.activePackageCount || '0', 10),
      0
    )
  }, [dataTagPackages])

  // Create the promo item with the calculated badge count
  const promoItem = useMemo(
    () => ({
      id: 5,
      name: 'Promo',
      icon: <DiscountIcon />,
      activeIcon: <DiscountIconPrimary />,
      badge: totalActivePackages || 0,
    }),
    [totalActivePackages]
  )

  const toggleDrawer = (id: number) => {
    setOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const applyFilters = (id: number) => {
    // Close the drawer
    setOpen((prev) => ({
      ...prev,
      [id]: false,
    }))
  }

  const resetSingleFilter = (id: number) => {
    // Map drawer IDs to filter keys
    const filterKeyMap: Record<number, string> = {
      1: 'priceRange',
      2: 'facilityCode',
      3: 'sort',
      4: 'section',
      5: 'tagSlug',
      6: 'dpRange',
    }

    if (filterKeyMap[id] === 'sort') {
      setSelectedSort('')
      return
    }

    // Reset the appropriate filter in context
    if (filterKeyMap[id] === 'priceRange') {
      setFilters({
        ...filters,
        priceRange: {
          hargaMin: dataMinMax.min,
          hargaMax: dataMinMax.max,
        },
      })

      return
    }

    // Reset the appropriate filter in context
    if (filterKeyMap[id] === 'dpRange') {
      setFilters({
        ...filters,
        dpRange: {
          dpMin: dpMinMax.min,
          dpMax: dpMinMax.max,
        },
      })

      return
    }

    if (filterKeyMap[id]) {
      resetFilter(filterKeyMap[id] as any)
    }
  }

  // Function to determine if a filter is applied
  const isFilterApplied = (id: number) => {
    switch (id) {
      case 1: // Price
        return !!searchParams.get('prMin') || !!searchParams.get('prMax')
      case 2: // Facility
        return !!searchParams.get('fC')
      case 3: // Sort
        // Check if sort parameter exists in URL
        return !!searchParams.get('sort')
      case 4: // Section
        return !!searchParams.get('section')
      case 5: // Promo
        return !!searchParams.get('tS')
      case 6: // DP
        return !!searchParams.get('dpMin') || !!searchParams.get('dpMax')
      default:
        return false
    }
  }

  // Function to render drawer content based on item id
  const renderDrawerContent = (itemId: number) => {
    switch (itemId) {
      case 1:
        return (
          <PriceDrawer
            applyFilters={applyFilters}
            toggleDrawer={toggleDrawer}
            dataMinMax={dataMinMax}
            itemId={itemId}
          />
        )
      case 2:
        return (
          <FacilityDrawer
            applyFilters={applyFilters}
            itemId={itemId}
            toggleDrawer={toggleDrawer}
            dataFacility={dataFacility}
          />
        )
      case 3:
        return (
          <SortDrawer
            applyFilters={applyFilters}
            itemId={itemId}
            toggleDrawer={toggleDrawer}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        )
      case 4:
        return (
          <SectionDrawer
            dataSection={dataSection}
            applyFilters={applyFilters}
            toggleDrawer={toggleDrawer}
            itemId={itemId}
          />
        )
      case 5:
        return (
          <PromoDrawer
            dataTagPackages={dataTagPackages}
            applyFilters={applyFilters}
            toggleDrawer={toggleDrawer}
            itemId={itemId}
          />
        )
      default:
        return <div className="py-4">Content not available</div>
    }
  }

  // Framer Motion animation variants for the badge
  const badgeAnimationVariants = {
    animate: {
      y: [0, -4, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  }

  // Function to render a navigation item with its drawer
  const renderNavItem = (
    item: (typeof navItems)[0] | typeof promoItem,
    isPromo = false
  ) => {
    // Check if filter is applied
    const filterApplied = isFilterApplied(item.id)

    // Use either the active or inactive icon based on filter state
    const currentIcon = filterApplied ? item.activeIcon : item.icon

    return (
      <Drawer
        key={item.id}
        open={open[item.id]}
        onOpenChange={() => toggleDrawer(item.id)}
      >
        <DrawerTrigger asChild>
          <button
            className={`relative flex flex-1 flex-col items-center justify-center px-1 py-2 
              ${isPromo ? 'relative min-w-[80px]' : 'min-w-[80px]'}
            `}
          >
            <div className="relative">
              {currentIcon}

              {/* Badge with animation - only show if has badge count */}
              {item.badge && item.badge > 0 && (
                <motion.div
                  className="bg-error-500 absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white"
                  variants={badgeAnimationVariants}
                  animate="animate"
                >
                  {item.badge > 9 ? '9+' : item.badge}
                </motion.div>
              )}
            </div>
            <span className="mt-1 text-xs">{item.name}</span>
          </button>
        </DrawerTrigger>
        <DrawerContent className="px-4">
          <DrawerHeader className="px-0 pb-0">
            <DrawerTitle className="flex items-center justify-between px-0">
              <span className="flex items-center gap-2">
                {currentIcon}
                {item.name}
              </span>
              {filterApplied && (
                <p
                  className="h-8 text-red-500"
                  onClick={() => resetSingleFilter(item.id)}
                >
                  Reset {item.name}
                </p>
              )}
            </DrawerTitle>
          </DrawerHeader>

          {renderDrawerContent(item.id)}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 flex border-t border-gray-200 bg-white shadow-[0px_-4px_24px_0px_rgba(0,0,0,0.15)] ${forceMobile ? 'mx-auto w-full max-w-xl' : 'lg:hidden'}`}
    >
      {/* Scrollable container for regular nav items */}
      <div className="scrollbar-hide flex flex-1 overflow-x-auto">
        {navItems.map((item) => renderNavItem(item))}
      </div>

      {/* Fixed promo filter on the right with gradient overlay */}
      <div className="relative z-[99] min-w-[80px] border-l border-neutral-200 bg-white before:pointer-events-none before:absolute before:top-0 before:left-[-144px] before:z-1 before:h-14 before:w-36 before:bg-gradient-to-r before:from-white/0 before:to-white">
        <div className="absolute top-0 left-0 h-14 w-36 bg-gradient-to-r from-white/0 to-neutral-200" />
        {renderNavItem(promoItem, true)}
      </div>
    </div>
  )
}
