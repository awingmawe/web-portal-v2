'use client'

import FacilityFilter from '@/components/pages/search-packages/2-FilterLeftbar/FacilityFilter'
import PriceRangeFilter from '@/components/pages/search-packages/2-FilterLeftbar/PriceRangeFilter'
import RatingHotelFilter from '@/components/pages/search-packages/2-FilterLeftbar/RatingHotelFilter'
import SectionFilter from '@/components/pages/search-packages/2-FilterLeftbar/SectionFilter'
import TagPackageFilter from '@/components/pages/search-packages/2-FilterLeftbar/TagPackageFilter'
import { Accordion } from '@/components/ui/accordion'
import { Facility } from '@/constant/types/FacilityProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { PriceParams } from '@/constant/types/PackageProps'
import { TagPackages } from '@/constant/types/TagPackageProps'
import React from 'react'

interface FilterLeftbarProps {
  dataMinMax: PriceParams
  dataTagPackages: TagPackages[]
  dataFacility: GenericResponse<Facility>
  dataSection: TagPackages[]
}

const FilterLeftbar: React.FC<FilterLeftbarProps> = ({
  dataMinMax,
  dataTagPackages,
  dataFacility,
  dataSection,
}) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={['item-1', 'item-2', 'item-3', 'item-4', 'item-5']}
      className="flex w-full flex-col gap-6"
    >
      <PriceRangeFilter dataMinMax={dataMinMax} />
      <RatingHotelFilter />
      <FacilityFilter dataFacility={dataFacility} />
      <SectionFilter dataSectionPackage={dataSection} />
      <TagPackageFilter dataTagPackage={dataTagPackages} />
    </Accordion>
  )
}

export default React.memo(FilterLeftbar)
