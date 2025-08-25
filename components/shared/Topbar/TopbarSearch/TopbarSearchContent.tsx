import { CardPackage } from '@/components/shared/CardPackage'
import { CardData } from '@/constant/types/PackageProps'
import Link from 'next/link'
import React from 'react'

// Search Results Header Component
interface SearchResultsHeaderProps {
  searchQuery: string
}

export const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
  searchQuery,
}) => <p className="text-m-regular">Hasil untuk &quot;{searchQuery}&quot;</p>

// Category Tabs Component
interface Category {
  name: string
  slug: string
}

interface CategoryTabsProps {
  categories: Category[]
  activeSlug: string
  onCategoryClick: (slug: string) => void
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeSlug,
  onCategoryClick,
}) => (
  <div className="flex gap-2">
    {categories?.map((category, index) => (
      <button
        key={`category-paket-${index}`}
        onClick={() => onCategoryClick(category.slug)}
        className={`
          rounded-full px-3 py-1 whitespace-nowrap text-neutral-900 transition-all duration-500 ease-in-out ${
            activeSlug === category.slug
              ? 'bg-primary-300 '
              : 'bg-primary-100 hover:bg-primary-200'
          } text-m-semibold cursor-pointer outline-0 focus-within:outline-0 focus:outline-0 focus-visible:outline-0
        `}
      >
        {category.name}
      </button>
    ))}
  </div>
)

// Search Results List Component
interface SearchResultsListProps {
  isLoadingResults: boolean
  cardData: CardData[]
  searchQuery: string
  onPackageClick: () => void
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  isLoadingResults,
  cardData,
  searchQuery,
  onPackageClick,
}) => {
  if (isLoadingResults) {
    return (
      <div className="m-auto flex items-center justify-center p-6">
        <div className="border-primary-500 h-6 w-6 animate-spin rounded-full border-b-2"></div>
        <span className="ml-2 text-sm text-neutral-500">Mencari paket...</span>
      </div>
    )
  }

  if (cardData.length > 0) {
    return (
      <div className="space-y-3" data-lenis-prevent>
        {cardData.map((packageData, index) => (
          <div
            key={`search-result-${index}`}
            onClick={onPackageClick}
            onMouseDown={(e) => e.preventDefault()}
          >
            <CardPackage
              data={packageData}
              eventCategory="search"
              section="search-topbar"
            />
          </div>
        ))}
      </div>
    )
  }

  if (searchQuery.length >= 3) {
    return (
      <div className="p-6 text-center text-sm text-neutral-500 max-lg:text-xs">
        Tidak ada paket ditemukan untuk &quot;{searchQuery}&quot;
      </div>
    )
  }

  return null
}

// Search Results Footer Component
interface SearchResultsFooterProps {
  cardData: CardData[]
  isLoadingResults: boolean
  searchQuery: string
  handleSearchDesktop: string
  addToHistory?: () => void
}

export const SearchResultsFooter: React.FC<SearchResultsFooterProps> = ({
  cardData,
  isLoadingResults,
  searchQuery,
  handleSearchDesktop,
  addToHistory,
}) => {
  if (cardData.length > 0 && !isLoadingResults) {
    return (
      <div
        className="bg-neutral-0 z-11 flex max-lg:mt-3 lg:sticky lg:bottom-0 lg:p-4"
        data-lenis-prevent
      >
        <Link
          href={handleSearchDesktop}
          className="bg-primary-500 hover:bg-primary-700 text-s-regular w-full rounded-full px-10 py-4 text-center text-neutral-900 transition-all"
          onMouseDown={(e) => e.preventDefault()}
          onClick={addToHistory}
        >
          Lihat semua hasil untuk &quot;{searchQuery}&quot;
        </Link>
      </div>
    )
  }

  return null
}
