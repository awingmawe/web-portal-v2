'use client'

import BoxIcon from '@/components/icons/box'
import { DiscountIcon } from '@/components/icons/discount'
import { GiftIcon } from '@/components/icons/gift'
import { MoneysIconBlack } from '@/components/icons/moneys'
import { SortIcon } from '@/components/icons/sort'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Slider } from '@/components/ui/slider'
import { Tag } from 'lucide-react'
import { useState } from 'react'

type NavItem = {
  id: number
  name: string
  icon: React.ReactElement
  badge?: number
}

const navItems: NavItem[] = [
  {
    id: 1,
    name: 'Harga',
    icon: <MoneysIconBlack className="fill-primary-500 stroke-primary-500" />,
  },
  { id: 2, name: 'Fasilitas', icon: <GiftIcon /> },
  { id: 3, name: 'Urutkan', icon: <SortIcon /> },
  { id: 4, name: 'Tipe', icon: <BoxIcon /> },
]

// Separate promo item
const promoItem = { id: 5, name: 'Promo', icon: <DiscountIcon />, badge: 5 }

export default function BottomNavigation() {
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const [appliedFilters, setAppliedFilters] = useState<Record<number, number>>(
    {}
  )

  const toggleDrawer = (id: number) => {
    setOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const applyFilters = (id: number, count: number) => {
    setAppliedFilters((prev) => ({
      ...prev,
      [id]: count,
    }))
    setOpen((prev) => ({
      ...prev,
      [id]: false,
    }))
  }

  const resetFilter = (id: number) => {
    setAppliedFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[id]
      return newFilters
    })
  }

  // Function to render a navigation item with its drawer
  const renderNavItem = (
    item: (typeof navItems)[0] | typeof promoItem,
    isPromo = false
  ) => (
    <Drawer
      key={item.id}
      open={open[item.id]}
      onOpenChange={() => toggleDrawer(item.id)}
    >
      <DrawerTrigger asChild>
        <button
          className={`relative flex flex-1 flex-col items-center justify-center px-1 py-2 ${
            isPromo ? 'relative min-w-[80px]' : 'min-w-[80px]'
          }`}
        >
          <div className="relative">
            {item.icon}
            {(item.badge || appliedFilters[item.id]) && (
              <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs text-white">
                {item.badge || appliedFilters[item.id]}
              </Badge>
            )}
          </div>
          <span className="mt-1 text-xs">{item.name}</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="px-4">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            <span>{item.name}</span>
            {appliedFilters[item.id] && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-red-500"
                onClick={() => resetFilter(item.id)}
              >
                Reset
              </Button>
            )}
          </DrawerTitle>
          <DrawerDescription>
            Set your {item.name.toLowerCase()} preferences
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody item={item} />

        <DrawerFooter className="flex flex-row gap-2">
          <Button variant="outline" onClick={() => toggleDrawer(item.id)}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              applyFilters(item.id, Math.floor(Math.random() * 5) + 1)
            }
          >
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex border-t border-gray-200 bg-white shadow-[0px_-4px_24px_0px_rgba(0,0,0,0.15)] lg:hidden">
      {/* Scrollable container for regular nav items */}
      <div className="scrollbar-hide flex flex-1 overflow-x-auto">
        {navItems.map((item) => renderNavItem(item))}
      </div>

      {/* Fixed promo filter on the right with gradient overlay */}
      <div className="relative z-[99] min-w-[80px] border-l border-gray-100 bg-white before:absolute before:top-0 before:left-[-144px] before:z-100 before:h-14 before:w-36 before:bg-gradient-to-r before:from-white/0 before:to-white">
        <div className="absolute top-0 left-0 h-14 w-36 bg-gradient-to-r from-white/0 to-neutral-200" />
        {renderNavItem(promoItem, true)}
      </div>
    </div>
  )
}

// Different drawer content based on the item type
function DrawerBody({ item }: { item: { id: number; name: string } }) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    3000000, 15000000,
  ])

  switch (item.id) {
    case 1: // Harga
      return (
        <div className="py-4">
          <div className="mb-6">
            <Slider
              defaultValue={priceRange}
              max={20000000}
              step={100000}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
            />
          </div>
          <div className="mb-8 flex items-center justify-between">
            <div className="text-neutral-800">
              <div className="text-xs text-neutral-500">Minimum</div>
              <div className="font-medium">
                Rp {priceRange[0].toLocaleString()}
              </div>
            </div>
            <div className="text-right text-neutral-800">
              <div className="text-xs text-neutral-500">Maximum</div>
              <div className="font-medium">
                Rp {priceRange[1].toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )

    case 2: // Fasilitas
      return (
        <div className="space-y-3 py-4">
          {[
            'Wi-Fi',
            'Breakfast',
            'Swimming Pool',
            'Gym',
            'Spa',
            'Restaurant',
          ].map((facility) => (
            <div key={facility} className="flex items-start space-x-2">
              <Checkbox id={`facility-${facility}`} />
              <label
                htmlFor={`facility-${facility}`}
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {facility}
              </label>
            </div>
          ))}
        </div>
      )

    case 3: // Urutkan
      return (
        <div className="space-y-2 py-4">
          {[
            'Harga Terendah',
            'Harga Tertinggi',
            'Rating Tertinggi',
            'Terbaru',
            'Terlaris',
          ].map((sort) => (
            <div
              key={sort}
              className="cursor-pointer rounded-lg border p-3 hover:bg-neutral-50"
            >
              <div className="font-medium">{sort}</div>
            </div>
          ))}
        </div>
      )

    case 4: // Tipe
      return (
        <div className="space-y-3 py-4">
          {['Hotel', 'Villa', 'Apartment', 'Resort', 'Homestay'].map((type) => (
            <div key={type} className="flex items-start space-x-2">
              <Checkbox id={`type-${type}`} />
              <label
                htmlFor={`type-${type}`}
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      )

    case 5: // Promo
      return (
        <div className="space-y-3 py-4">
          {[
            { name: 'Flash Sale', discount: '30%' },
            { name: 'End of Month', discount: '25%' },
            { name: 'Weekend Deal', discount: '15%' },
            { name: 'TRAVELOKA8', discount: '8%' },
            { name: 'NewUser', discount: '10%' },
          ].map((promo) => (
            <div
              key={promo.name}
              className="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-neutral-50"
            >
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-red-500" />
                <span className="font-medium">{promo.name}</span>
              </div>
              <Badge className="bg-red-100 font-semibold text-red-500">
                {promo.discount}
              </Badge>
            </div>
          ))}
        </div>
      )

    default:
      return <div className="py-4">Content for {item.name}</div>
  }
}
