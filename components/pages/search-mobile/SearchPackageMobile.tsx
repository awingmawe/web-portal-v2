'use client'

import ProgramCards from '@/components/pages/homepage/mobile/ProgramCards'
import { SearchHistory } from '@/components/pages/search-mobile/SearchHistory'

const SearchMobileUmroh: React.FC = () => (
  <div className="w-full px-4">
    {/* Content that was previously in drawer */}
    <p className="text-xs-medium mb-7 text-neutral-500">
      Cek Program Unggulan Muslim101
    </p>

    <ProgramCards />

    <div className="my-3 h-px w-full bg-[#E8E8E8]" />

    {/* Search history component */}
    <SearchHistory />

    <p className="text-xs-medium mt-3 mb-2 text-neutral-500">
      Jangan Kelewatan Promo Menarik!
    </p>
  </div>
)

export default SearchMobileUmroh
