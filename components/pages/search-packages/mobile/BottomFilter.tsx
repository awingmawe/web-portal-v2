'use client'

import { DiscountIcon } from '@/components/icons/discount'
import { GiftIcon } from '@/components/icons/gift'
import { MoneysIconBlack } from '@/components/icons/moneys'
import { SortIcon } from '@/components/icons/sort'
import { FacilityDrawer } from '@/components/pages/search-packages/mobile/FacilityFilter'
import { PriceDrawer } from '@/components/pages/search-packages/mobile/PriceRangeFilter'
import { PromoDrawer } from '@/components/pages/search-packages/mobile/PromoFilter'
import { SortDrawer } from '@/components/pages/search-packages/mobile/SortFilter'
// import { TypeDrawer } from '@/components/pages/search-packages/mobile/TypePackageFilter'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { cloneElement, useRef, useState } from 'react'

export interface NavItem {
  id: number
  name: string
  icon: React.ReactElement
  badge?: number
}

const navItems: NavItem[] = [
  {
    id: 1,
    name: 'Harga',
    icon: <MoneysIconBlack className="fill-neutral-500 stroke-neutral-500" />,
  },
  {
    id: 2,
    name: 'Fasilitas',
    icon: <GiftIcon className="fill-neutral-500 stroke-neutral-500" />,
  },
  {
    id: 3,
    name: 'Urutkan',
    icon: <SortIcon className="fill-neutral-500 stroke-neutral-500" />,
  },
  // {
  //   id: 4,
  //   name: 'Tipe',
  //   icon: <BoxIcon className="fill-neutral-500 stroke-neutral-500" />,
  // },
]

// Separate promo item
const promoItem = {
  id: 5,
  name: 'Promo',
  icon: <DiscountIcon className="fill-neutral-500 stroke-neutral-500" />,
  badge: 5,
}

export default function BottomNavigation({
  dataMinMax,
  dataFacility,
}: {
  dataMinMax: any
  dataFacility: any
}) {
  const { filters, resetFilter } = useFilterProduct()
  const [open, setOpen] = useState<Record<number, boolean>>({})

  // References to drawer components that have apply methods
  const drawerRefs = useRef<Record<number, any>>({})

  const toggleDrawer = (id: number) => {
    setOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const applyFilters = (id: number) => {
    // Call the appropriate apply method based on drawer type
    if (id === 1 && drawerRefs.current[1]?.applyFilter) {
      // Call the PriceDrawer's apply method
      drawerRefs.current[1].applyFilter()
    }

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
      5: 'tagSlug',
    }

    // Reset the appropriate filter in context
    if (filterKeyMap[id]) {
      resetFilter(filterKeyMap[id] as any)
    }
  }

  // Function to determine if a filter is applied
  const isFilterApplied = (id: number) => {
    switch (id) {
      case 1: // Price
        return filters.priceRange?.hargaMin || filters.priceRange?.hargaMax
      case 2: // Facility
        return !!filters.facilityCode
      case 3: // Sort
        // Add logic for sort if needed
        return false
      // case 4: // Type
      //   return !!filters.hotelStars
      case 5: // Promo
        return !!filters.tagSlug
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
            ref={(ref: any) => (drawerRefs.current[1] = ref)}
            dataMinMax={dataMinMax}
          />
        )
      case 2:
        return <FacilityDrawer dataFacility={dataFacility} />
      case 3:
        return <SortDrawer />
      // case 4:
      //   return <TypeDrawer />
      case 5:
        return <PromoDrawer />
      default:
        return <div className="py-4">Content not available</div>
    }
  }

  // Function to render a navigation item with its drawer
  const renderNavItem = (
    item: (typeof navItems)[0] | typeof promoItem,
    isPromo = false
  ) => {
    // Check if filter is applied
    const filterApplied = isFilterApplied(item.id)

    // Clone the icon with updated classes based on filter application
    const iconWithClass = cloneElement(item.icon, {
      ...item.icon.props,
      className: filterApplied
        ? 'fill-primary-500 stroke-primary-500'
        : 'fill-neutral-500 stroke-neutral-500',
    })

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
            <div className="relative">{iconWithClass}</div>
            <span className="mt-1 text-xs">{item.name}</span>
          </button>
        </DrawerTrigger>
        <DrawerContent className="px-4">
          <DrawerHeader className="px-0 pb-0">
            <DrawerTitle className="flex items-center justify-between px-0">
              <span className="flex items-center gap-2">
                {iconWithClass}
                {item.name}
              </span>
              {filterApplied && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-red-500"
                  onClick={() => resetSingleFilter(item.id)}
                >
                  Reset
                </Button>
              )}
            </DrawerTitle>
          </DrawerHeader>

          {renderDrawerContent(item.id)}

          <DrawerFooter className="mb-4 flex flex-row gap-2 p-0">
            <Button
              variant="outline"
              className="border-primary-500 w-full py-3"
              onClick={() => toggleDrawer(item.id)}
            >
              Batal
            </Button>
            <Button
              onClick={() => applyFilters(item.id)}
              className="w-full py-3"
            >
              Simpan
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex border-t border-gray-200 bg-white shadow-[0px_-4px_24px_0px_rgba(0,0,0,0.15)] lg:hidden">
      {/* Scrollable container for regular nav items */}
      <div className="scrollbar-hide flex flex-1 overflow-x-auto">
        {navItems.map((item) => renderNavItem(item))}
      </div>

      {/* Fixed promo filter on the right with gradient overlay */}
      <div className="relative z-[99] min-w-[80px] border-l border-gray-100 bg-white before:absolute before:top-0 before:left-[-144px] before:z-1 before:h-14 before:w-36 before:bg-gradient-to-r before:from-white/0 before:to-white">
        <div className="absolute top-0 left-0 h-14 w-36 bg-gradient-to-r from-white/0 to-neutral-200" />
        {renderNavItem(promoItem, true)}
      </div>
    </div>
  )
}
