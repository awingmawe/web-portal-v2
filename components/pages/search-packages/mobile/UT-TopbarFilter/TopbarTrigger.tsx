'use client'

import FilterPanel from '@/components/pages/search-packages/mobile/UT-TopbarFilter/FilterContent'
import SortFilterComponent from '@/components/pages/search-packages/mobile/UT-TopbarFilter/SortFilter-UT'
import TagButton from '@/components/pages/search-packages/mobile/UT-TopbarFilter/TagButton'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { City } from '@/constant/types/LocationProps'
import { TagPackages } from '@/constant/types/TagPackageProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useMemo } from 'react'

// Skeleton Component
const HorizontalFilterSkeleton = () => {
  return (
    <div className="flex items-center gap-1 pt-3">
      {/* Filter Button Skeleton */}
      <div className="relative flex animate-pulse flex-col items-center justify-center px-1">
        <div className="h-6 w-6 rounded bg-neutral-200" />
        <div className="mt-1 h-3 w-10 rounded bg-neutral-200" />
      </div>

      {/* Sort Button Skeleton */}
      <div className="relative flex animate-pulse flex-col items-center justify-center px-1">
        <div className="h-6 w-6 rounded bg-neutral-200" />
        <div className="mt-1 h-3 w-12 rounded bg-neutral-200" />
      </div>

      {/* Divider */}
      <div className="w-px self-stretch border border-[#e5e5e5]" />

      {/* Dynamic Filter Tags Skeleton */}
      <div className="flex items-center gap-1 overflow-hidden">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="h-8 w-24 animate-pulse rounded-full bg-neutral-200"
          />
        ))}
      </div>
    </div>
  )
}

const HorizontalFilterBar = ({
  dataTagPackages,
  dataMinMax,
  dataFacility,
  dataSection,
  dataKota,
}: {
  dataTagPackages: TagPackages[]
  dataMinMax: any
  dataFacility: any
  dataSection: any
  dataKota: GenericResponse<City>
}) => {
  const {
    isLoadingSkeleton,
    filters,
    setFacilityCode,
    setSection,
    setTagSlug,
    setLocationFilter,
  } = useFilterProduct()
  // Generate active filter tags dari semua filter types
  const activeFilterTags = useMemo(() => {
    const tags: Array<{
      type: 'facility' | 'section' | 'location' | 'promo'
      label: string
      code: string
      filterName: string
      setter: any
      paramName: string
    }> = []

    // Active Facilities
    if (filters.facilityCode) {
      const activeFacilityCodes = filters.facilityCode.split(',')
      activeFacilityCodes.forEach((code) => {
        const facility = dataFacility?.results?.find(
          (f: any) => String(f.code) === code
        )
        if (facility) {
          tags.push({
            type: 'facility',
            label: facility.name,
            code: facility.code,
            filterName: 'facilityCode',
            setter: setFacilityCode,
            paramName: 'fC',
          })
        }
      })
    }

    // Active Sections
    if (filters.section) {
      const activeSectionSlugs = filters.section.split(',')
      activeSectionSlugs.forEach((slug) => {
        const section = dataSection?.find((s: any) => s.slug === slug)
        if (section) {
          tags.push({
            type: 'section',
            label: section.name,
            code: section.slug,
            filterName: 'section',
            setter: setSection,
            paramName: 'section',
          })
        }
      })
    }

    // Active Locations
    if (filters.organizationInstanceCity) {
      const activeLocationIds = filters.organizationInstanceCity.split(',')
      activeLocationIds.forEach((id) => {
        const location = dataKota?.results?.find(
          (l: any) => String(l.id) === id
        )
        if (location) {
          tags.push({
            type: 'location',
            label: location.name,
            code: location.id,
            filterName: 'organizationInstanceCity',
            setter: setLocationFilter,
            paramName: 'lC',
          })
        }
      })
    }

    // Active Promos (Tag Packages)
    if (filters.tagSlug) {
      const activePromoSlugs = filters.tagSlug.split(',')
      activePromoSlugs.forEach((slug) => {
        const promo = dataTagPackages?.find((p: any) => p.slug === slug)
        if (promo) {
          tags.push({
            type: 'promo',
            label: promo.name,
            code: promo.slug,
            filterName: 'tagSlug',
            setter: setTagSlug,
            paramName: 'tS',
          })
        }
      })
    }

    return tags
  }, [
    filters.facilityCode,
    filters.section,
    filters.organizationInstanceCity,
    filters.tagSlug,
    dataFacility,
    dataSection,
    dataKota,
    dataTagPackages,
    setFacilityCode,
    setSection,
    setLocationFilter,
    setTagSlug,
  ])

  // Hitung apakah ada filter aktif
  const hasActiveFilters = activeFilterTags.length > 0

  // Jika ada filter aktif, ambil promo yang belum aktif
  // Jika tidak ada filter aktif, tampilkan semua promo
  const displayPromoTags = useMemo(() => {
    if (!dataTagPackages || dataTagPackages.length === 0) return []

    if (!hasActiveFilters) {
      // Tidak ada filter aktif, tampilkan semua promo
      return dataTagPackages
    }

    // Ada filter aktif, tampilkan hanya promo yang belum aktif
    const activePromoSlugs = filters.tagSlug ? filters.tagSlug.split(',') : []

    return dataTagPackages.filter((tag) => !activePromoSlugs.includes(tag.slug))
  }, [dataTagPackages, filters.tagSlug, hasActiveFilters])

  // Show skeleton while loading
  if (isLoadingSkeleton) {
    return <HorizontalFilterSkeleton />
  }

  return (
    <div className="flex items-center gap-1 pt-3">
      {/* Filter Button */}
      <FilterPanel
        dataMinMax={dataMinMax}
        dataFacility={dataFacility}
        dataSection={dataSection}
        dataTagPackages={dataTagPackages}
        dataKota={dataKota}
      />

      {/* Sort Button */}
      <SortFilterComponent />

      {/* Divider */}
      <div className="w-px self-stretch border border-[#e5e5e5]" />

      {/* Dynamic Filter Tags */}
      <div className="scrollbar-hide flex items-center gap-1 overflow-visible overflow-x-auto whitespace-nowrap">
        {/* Jika ada filter aktif, tampilkan mereka di depan */}
        {hasActiveFilters &&
          activeFilterTags.map((tag, index) => (
            <TagButton
              key={`active-${tag.type}-${tag.code}-${index}`}
              label={tag.label}
              code={tag.code}
              name={tag.filterName}
              setFilters={tag.setter}
              filters={filters}
              shouldUpdate
              paramName={tag.paramName}
            />
          ))}

        {/* Tampilkan promo tags (semua jika tidak ada filter, atau yang belum aktif jika ada filter) */}
        {displayPromoTags.map((tag, index) => (
          <TagButton
            key={`promo-${tag.id}-${index}`}
            label={tag.name}
            code={tag.slug}
            name="tagSlug"
            setFilters={setTagSlug}
            filters={filters}
            shouldUpdate
            paramName="tS"
          />
        ))}
      </div>
    </div>
  )
}

export default HorizontalFilterBar
