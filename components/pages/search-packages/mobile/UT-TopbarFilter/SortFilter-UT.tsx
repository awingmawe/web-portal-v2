import { SortIcon } from '@/components/icons/sort'
import { SortDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/SortFilter'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const SortFilterComponent = () => {
  const searchParams = useSearchParams()

  const [selectedSort, setSelectedSort] = useState<string>(
    searchParams.get('sort') || 'price-low'
  )
  const [openDrawerSort, setOpenDrawerSort] = useState(false)

  // Define itemId for sort drawer (using same ID as BottomNavigation)
  const sortItemId = 1

  // Define applyFilters function to close drawer
  const applyFilters = () => {
    setOpenDrawerSort(false)
  }

  // Define toggleDrawer function
  const toggleDrawer = () => {
    setOpenDrawerSort((prev) => !prev)
  }
  return (
    <Drawer open={openDrawerSort} onOpenChange={setOpenDrawerSort}>
      <DrawerTrigger asChild>
        <div className="relative flex cursor-pointer flex-col items-center justify-center px-1">
          <SortIcon size={16} />
          <p className="text-s-regular">Urutkan</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="px-4">
        <DrawerHeader className="px-0 pb-0">
          <DrawerTitle className="flex items-center justify-between px-0">
            <span className="flex items-center gap-2">
              <SortIcon size={16} />
              Urutkan
            </span>
            {!!selectedSort && (
              <p
                className="text-s-medium text-red-500"
                onClick={() => setSelectedSort('')}
              >
                Reset Urutkan
              </p>
            )}
          </DrawerTitle>
        </DrawerHeader>

        <SortDrawer
          applyFiltersAction={applyFilters}
          itemId={sortItemId}
          toggleDrawerAction={toggleDrawer}
          selectedSort={selectedSort}
          setSelectedSortAction={setSelectedSort}
        />
      </DrawerContent>
    </Drawer>
  )
}

export default SortFilterComponent
