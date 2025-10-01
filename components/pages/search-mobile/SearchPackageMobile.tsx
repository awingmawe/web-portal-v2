'use client'

import ProgramCards from '@/components/pages/homepage/mobile/ProgramCards'
import { SearchHistory } from '@/components/pages/search-mobile/SearchHistory'
import {
  CategoryTabs,
  SearchResultsFooter,
  SearchResultsHeader,
  SearchResultsList,
} from '@/components/shared/Topbar/TopbarSearch/TopbarSearchContent'
import { CATEGORIES_FILTER_SEARCH } from '@/constant/env'
import { useSearchHistory } from '@/hooks/common/useSearchHistory'
import { useTopbarSearch } from '@/hooks/common/useTopbarSearch'

const SearchMobileUmroh: React.FC = () => {
  const {
    // State
    searchQuery,
    isLoadingResults,
    activeSlug,
    cardData,

    // Handlers
    handleSearchDesktop,
    handlePackageClick,
    handleCategoryClick,
  } = useTopbarSearch()
  const { addToHistory } = useSearchHistory()
  return (
    <div className="w-full px-4">
      {/* Search result on typing */}
      {searchQuery.length > 2 ? (
        <>
          <div className="space-y-2.5">
            <SearchResultsHeader searchQuery={searchQuery} />

            <CategoryTabs
              categories={CATEGORIES_FILTER_SEARCH}
              activeSlug={activeSlug}
              onCategoryClick={handleCategoryClick}
            />

            <SearchResultsList
              isLoadingResults={isLoadingResults}
              cardData={cardData}
              searchQuery={searchQuery}
              onPackageClick={handlePackageClick}
            />
          </div>
          <SearchResultsFooter
            cardData={cardData}
            isLoadingResults={isLoadingResults}
            searchQuery={searchQuery}
            handleSearchDesktop={handleSearchDesktop(activeSlug)}
            addToHistory={() => addToHistory(searchQuery)}
          />
        </>
      ) : (
        <p className="text-xs-regular text-center text-neutral-500">
          Ketik paling sedikit 3 karakter untuk menampilkan hasil.
        </p>
      )}

      <div className="my-3 h-px w-full bg-[#e5e5e5]" />

      {/* Content that was previously in drawer */}
      <p className="text-xs-medium mb-4 text-neutral-500">
        Cek Program Unggulan Muslim101
      </p>

      <ProgramCards />

      <div className="my-3 h-px w-full bg-[#e5e5e5]" />

      {/* Search history component */}
      <SearchHistory />

      <p className="text-xs-medium mt-3 mb-2 text-neutral-500">
        Jangan Kelewatan Promo Menarik!
      </p>
    </div>
  )
}

export default SearchMobileUmroh
