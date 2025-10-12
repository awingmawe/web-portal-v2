// TODO: Refactor this component

'use client'

import BoxIcon from '@/components/icons/box'
import { DiscountIconPrimary } from '@/components/icons/discount'
import { FilterBold } from '@/components/icons/filter'
import { GiftIconPrimary } from '@/components/icons/gift'
import LocationLinear from '@/components/icons/locations'
import { MoneysIconPrimary } from '@/components/icons/moneys'
import { FacilityDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/FacilityFilter'
import { LocationDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/LocationFilter'
import { PriceDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/PriceRangeFilter'
import { PromoDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/PromoFilter'
import { SectionDrawer } from '@/components/pages/search-packages/mobile/BottomFilterMobile/SectionFilter'
import FilterSection from '@/components/pages/search-packages/mobile/UT-TopbarFilter/FilterContent/FilterSection'
import TagButton from '@/components/pages/search-packages/mobile/UT-TopbarFilter/FilterContent/TagButton'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Facility } from '@/constant/types/FacilityProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { City } from '@/constant/types/LocationProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { isEmpty } from '@/lib/utils'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Fragment, useEffect, useMemo, useState } from 'react'

const MAX_HEIGHT = 60
const ITEM_HEIGHT = 26
const ITEMS_PER_ROW = 2

type ExpandableSection = 'facilities' | 'sections' | 'promos' | 'locations'

// Konfigurasi untuk setiap section
interface SectionConfig {
  key: ExpandableSection
  title: string
  icon: React.ReactElement
  filterName: string
  resetLabel: string
  content: (
    closeDrawer: () => void,
    applyAndClose: () => void
  ) => React.ReactNode
}

export default function FilterPanel({
  dataMinMax,
  dataFacility,
  dataSection,
  dataTagPackages,
  dataKota,
}: {
  dataMinMax: any
  dataFacility: GenericResponse<Facility>
  dataSection: any
  dataTagPackages: any
  dataKota: GenericResponse<City>
}) {
  const {
    setFilters,
    resetFilter,
    setFacilityCode,
    setSection,
    setTagSlug,
    setLocationFilter,
    filters,
  } = useFilterProduct()

  const [showViewAll, setShowViewAll] = useState({
    facilities: false,
    sections: false,
    locations: false,
    promos: false,
  })

  const [isMainDrawerOpen, setIsMainDrawerOpen] = useState(false)
  const [expandedSection, setExpandedSection] =
    useState<ExpandableSection | null>(null)

  // Mapping data untuk setiap section
  const dataMapping = {
    facilities: dataFacility.results,
    sections: dataSection || [],
    locations: dataKota.results,
    promos: dataTagPackages || [],
  }

  // Mapping setter function
  const setterMapping = {
    facilities: setFacilityCode,
    sections: setSection,
    locations: setLocationFilter,
    promos: setTagSlug,
  }

  // Mapping field name untuk data
  const fieldMapping = {
    facilities: { name: 'name', code: 'code' },
    sections: { name: 'name', code: 'slug' },
    locations: { name: 'name', code: 'id' },
    promos: { name: 'name', code: 'slug' },
  }

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0
    console.log(filters.priceRange?.hargaMin, filters.priceRange?.hargaMax)

    // Check price range (count as 1 if different from default)
    const isPriceFiltered =
      (filters.priceRange?.hargaMin !== dataMinMax.min ||
        filters.priceRange?.hargaMax !== dataMinMax.max) &&
      (!isEmpty(filters.priceRange?.hargaMin) ||
        !isEmpty(filters.priceRange?.hargaMax))
    if (isPriceFiltered) count += 1

    // Check facility codes
    if (filters.facilityCode) {
      count += filters.facilityCode.split(',').length
    }

    // Check sections
    if (filters.section) {
      count += filters.section.split(',').length
    }

    // Check locations
    if (filters.organizationInstanceCity) {
      count += filters.organizationInstanceCity.split(',').length
    }

    // Check tag slugs (promos)
    if (filters.tagSlug) {
      count += filters.tagSlug.split(',').length
    }

    return count
  }, [
    filters.priceRange,
    filters.facilityCode,
    filters.section,
    filters.organizationInstanceCity,
    filters.tagSlug,
    dataMinMax.min,
    dataMinMax.max,
  ])

  const checkIfNeedsViewAll = (itemCount: number) => {
    const estimatedRows = Math.ceil(itemCount / ITEMS_PER_ROW)
    const estimatedHeight = estimatedRows * ITEM_HEIGHT
    return estimatedHeight > MAX_HEIGHT
  }

  useEffect(() => {
    setShowViewAll({
      facilities: checkIfNeedsViewAll(dataFacility.results.length),
      sections: checkIfNeedsViewAll(dataSection?.length || 0),
      locations: checkIfNeedsViewAll(dataKota?.results?.length),
      promos: checkIfNeedsViewAll(dataTagPackages?.length || 0),
    })
  }, [dataFacility, dataSection, dataTagPackages, dataKota])

  const updateQueryParams = useUpdateQueryParams()

  const resetFilters = () => {
    setFilters({
      ...filters,
      priceRange: {
        hargaMin: dataMinMax.min,
        hargaMax: dataMinMax.max,
      },
    })
    resetFilter('facilityCode')
    resetFilter('section')
    resetFilter('tagSlug')
    resetFilter('organizationInstanceCity')
  }

  const applyFilters = () => {
    // Build array of params to update
    const paramsToUpdate: string[] = ['page']
    const valuesToUpdate: any[] = [1]

    // Price Range - cek apakah berbeda dari default
    const isPriceDefault =
      filters.priceRange?.hargaMin === dataMinMax.min &&
      filters.priceRange?.hargaMax === dataMinMax.max

    if (!isPriceDefault) {
      if (filters.priceRange?.hargaMin !== undefined) {
        paramsToUpdate.push('prMin')
        valuesToUpdate.push(filters.priceRange.hargaMin.replace(/\./g, ''))
      }
      if (filters.priceRange?.hargaMax !== undefined) {
        paramsToUpdate.push('prMax')
        valuesToUpdate.push(filters.priceRange.hargaMax.replace(/\./g, ''))
      }
    } else {
      // Remove price params if reset to default
      paramsToUpdate.push('prMin', 'prMax')
      valuesToUpdate.push(null, null)
    }

    // Facility Code
    if (filters.facilityCode && filters.facilityCode.length > 0) {
      paramsToUpdate.push('fC')
      valuesToUpdate.push(filters.facilityCode)
    } else {
      // Remove param if empty
      paramsToUpdate.push('fC')
      valuesToUpdate.push(null)
    }

    // City / Location
    if (
      filters.organizationInstanceCity &&
      filters.organizationInstanceCity.length > 0
    ) {
      paramsToUpdate.push('lC')
      valuesToUpdate.push(filters.organizationInstanceCity)
    } else {
      // Remove param if empty
      paramsToUpdate.push('lC')
      valuesToUpdate.push(null)
    }

    // Section
    if (filters.section && filters.section.length > 0) {
      paramsToUpdate.push('section')
      valuesToUpdate.push(filters.section)
    } else {
      // Remove param if empty
      paramsToUpdate.push('section')
      valuesToUpdate.push(null)
    }

    // Tag Slug (Promo)
    if (filters.tagSlug && filters.tagSlug.length > 0) {
      paramsToUpdate.push('tS')
      valuesToUpdate.push(filters.tagSlug)
    } else {
      // Remove param if empty
      paramsToUpdate.push('tS')
      valuesToUpdate.push(null)
    }

    // Update URL with all filters (including removed ones)
    updateQueryParams(paramsToUpdate, valuesToUpdate)

    // Close drawer
    setIsMainDrawerOpen(false)
  }

  const openExpandedDrawer = (section: ExpandableSection) => {
    setExpandedSection(section)
    setIsMainDrawerOpen(false)
  }

  const closeExpandedDrawer = () => {
    setExpandedSection(null)
    setIsMainDrawerOpen(true)
  }

  const applyAndCloseExpandedDrawer = () => {
    setExpandedSection(null)
    setIsMainDrawerOpen(true)
  }

  const sectionsConfig: SectionConfig[] = [
    {
      key: 'facilities',
      title: 'Fasilitas',
      icon: <GiftIconPrimary />,
      filterName: 'facilityCode',
      resetLabel: 'Reset Fasilitas',
      content: (closeDrawer, applyAndClose) => (
        <FacilityDrawer
          applyFiltersAction={applyAndClose}
          itemId={1}
          toggleDrawerAction={closeDrawer}
          dataFacility={dataFacility}
        />
      ),
    },
    {
      key: 'sections',
      title: 'Tipe Paket',
      icon: <BoxIcon size={20} className="text-primary-500" />,
      filterName: 'section',
      resetLabel: 'Reset Tipe Paket',
      content: (closeDrawer, applyAndClose) => (
        <SectionDrawer
          applyFiltersAction={applyAndClose}
          itemId={1}
          toggleDrawerAction={closeDrawer}
          dataSection={dataSection}
        />
      ),
    },
    {
      key: 'locations',
      title: 'Lokasi Travel',
      icon: <LocationLinear />,
      filterName: 'organizationInstanceCity',
      resetLabel: 'Reset Lokasi Travel',
      content: (closeDrawer, applyAndClose) => (
        <LocationDrawer
          dataKota={dataKota}
          applyFiltersAction={applyAndClose}
          toggleDrawerAction={closeDrawer}
          itemId={1}
        />
      ),
    },
    {
      key: 'promos',
      title: 'Promo & Diskon',
      icon: <DiscountIconPrimary />,
      filterName: 'tagSlug',
      resetLabel: 'Reset Promo',
      content: (closeDrawer, applyAndClose) => (
        <PromoDrawer
          dataTagPackages={dataTagPackages}
          applyFiltersAction={applyAndClose}
          toggleDrawerAction={closeDrawer}
          itemId={1}
        />
      ),
    },
  ]

  // Render FilterSection berdasarkan config
  const renderFilterSection = (config: SectionConfig) => {
    const data = dataMapping[config.key]
    if (!data || data.length === 0) return null

    const fields = fieldMapping[config.key]
    const setter = setterMapping[config.key]

    return (
      <Fragment key={config.key}>
        <FilterSection
          icon={config.icon}
          title={config.title}
          showViewAll={showViewAll[config.key]}
          onViewAll={() => openExpandedDrawer(config.key)}
        >
          <div
            className="flex flex-wrap gap-2"
            style={{
              maxHeight: `${MAX_HEIGHT}px`,
              overflow: 'hidden',
            }}
          >
            {data.map((item: any, index: number) => (
              <TagButton
                key={`${config.key}-${index}`}
                label={item[fields.name]}
                name={config.filterName}
                setFilters={setter}
                code={item[fields.code]}
                filters={filters}
              />
            ))}
          </div>
        </FilterSection>
        <div className="h-px border border-[#e5e5e5]" />
      </Fragment>
    )
  }

  // Render Expanded Drawer berdasarkan config
  const renderExpandedDrawer = (config: SectionConfig) => {
    const hasActiveFilters =
      filters[config.filterName as keyof typeof filters]?.length > 0

    return (
      <Drawer
        key={config.key}
        open={expandedSection === config.key}
        onOpenChange={(open) => !open && setExpandedSection(null)}
      >
        <DrawerContent className="px-4">
          <DrawerHeader className="px-0 pb-0">
            <DrawerTitle className="hidden">{config.title}</DrawerTitle>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {config.icon}
                <p className="text-m-semibold">{config.title}</p>
              </div>
              {hasActiveFilters && (
                <p
                  className="text-s-medium text-error-500 cursor-pointer"
                  onClick={() => resetFilter(config.filterName as any)}
                >
                  {config.resetLabel}
                </p>
              )}
            </div>
          </DrawerHeader>
          {config.content(closeExpandedDrawer, applyAndCloseExpandedDrawer)}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <>
      {/* Main Filter Drawer */}
      <Drawer open={isMainDrawerOpen} onOpenChange={setIsMainDrawerOpen}>
        <div
          className="relative flex cursor-pointer flex-col items-center justify-center px-1"
          onClick={() => setIsMainDrawerOpen(true)}
        >
          <FilterBold />
          <p className="text-s-regular">Filter</p>
          {/* Notification Badge - shows active filter count */}
          {activeFilterCount > 0 && (
            <span className="bg-primary-500 text-xs-regular absolute -top-2 right-0 flex h-4 w-4 items-center justify-center rounded-full text-white">
              {activeFilterCount > 9 ? '9+' : activeFilterCount}
            </span>
          )}
        </div>
        <DrawerContent className="px-4">
          <DialogTitle className="hidden">Filter</DialogTitle>
          <DrawerHeader className="px-0 pb-0">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-m-semibold">Filter</p>
              <p
                onClick={resetFilters}
                className="text-s-medium text-error-500 cursor-pointer"
              >
                Reset Filter
              </p>
            </div>
          </DrawerHeader>

          <div className="flex flex-col gap-4 overflow-y-auto">
            {/* Price Range */}
            <FilterSection icon={<MoneysIconPrimary />} title="Harga">
              <PriceDrawer
                dataMinMax={dataMinMax}
                applyFiltersAction={() => {}}
                itemId={1}
                toggleDrawerAction={() => {}}
                footer={false}
                resetFilters={resetFilters}
              />
            </FilterSection>

            <div className="h-px border border-[#e5e5e5]" />

            {/* Render semua sections */}
            {sectionsConfig.map((config) => renderFilterSection(config))}
          </div>

          <DrawerFooter className="flex flex-row gap-3 px-0 py-5">
            <DrawerClose className="border-primary-500 w-full rounded-full border-2 py-3">
              <p className="text-s-regular">Batal</p>
            </DrawerClose>
            <Button
              onClick={applyFilters}
              variant="default"
              className="w-full py-3"
            >
              Simpan
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Render semua Expanded Drawers */}
      {sectionsConfig.map((config) => renderExpandedDrawer(config))}
    </>
  )
}
