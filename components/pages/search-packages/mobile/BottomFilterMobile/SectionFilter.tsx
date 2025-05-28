'use client'

import { Button } from '@/components/ui/button'
import { DrawerFooter } from '@/components/ui/drawer'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'

interface SectionDrawerProps {
  toggleDrawer: (id: number) => void
  itemId: number
  applyFilters: (id: number) => void
  dataSection: any
}

export function SectionDrawer({
  toggleDrawer,
  itemId,
  applyFilters,
  dataSection,
}: SectionDrawerProps) {
  const updateQueryParams = useUpdateQueryParams()
  const { filters, setSection } = useFilterProduct()

  // Handle section selection
  const handleSectionChange = (value: string) => {
    setSection(value)
  }

  // Apply section filter and update URL
  const handleApplySection = () => {
    // Update URL with selected section option
    updateQueryParams(['section', 'page'], [filters.section, 1])

    // Close drawer and apply filters
    applyFilters(itemId)
  }

  return (
    <>
      <div className="my-4 space-y-2">
        <RadioGroup
          value={filters.section}
          onValueChange={handleSectionChange}
          className="space-y-2"
        >
          {dataSection.map((option: any, index: any) => (
            <div
              key={option.slug}
              className={`flex cursor-pointer items-center gap-2 pb-2 ${index !== dataSection.length - 1 && 'border-b-1 border-b-neutral-100'}`}
              onClick={() => handleSectionChange(option.slug)}
            >
              <RadioGroupItem
                value={option.slug}
                id={`section-${option.slug}`}
                className="h-4 w-4"
              />
              <label
                htmlFor={`section-${option.slug}`}
                className="text-m-regular flex-1 cursor-pointer"
              >
                {option.name}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <DrawerFooter className="mb-4 flex flex-row gap-2 p-0">
        <Button
          variant="outline"
          className="border-primary-500 w-full py-3"
          onClick={() => toggleDrawer(itemId)}
        >
          Batal
        </Button>
        <Button onClick={handleApplySection} className="w-full py-3">
          Simpan
        </Button>
      </DrawerFooter>
    </>
  )
}
