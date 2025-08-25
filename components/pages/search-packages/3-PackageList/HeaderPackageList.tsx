'use client'

import { SortingDropdown } from './SortingPackageList'

interface ResultsDisplayInfo {
  displayCount?: number
  startItem?: number
  endItem?: number
  isRange: boolean
}

interface ResultsSummaryProps {
  resultsDisplayInfo: ResultsDisplayInfo
  totalCount: number
  currentSort: string
  createSortUrlAction: (sortValue: string) => string
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  resultsDisplayInfo,
  totalCount,
  currentSort,
  createSortUrlAction,
}) => {
  // Format the results text based on whether it's a range or single count
  const getResultsText = () => {
    if (
      resultsDisplayInfo.isRange &&
      resultsDisplayInfo.startItem &&
      resultsDisplayInfo.endItem
    ) {
      // Desktop pagination: "Showing 10-18 of 100 packages"
      return `Menampilkan ${resultsDisplayInfo.startItem}-${resultsDisplayInfo.endItem} dari ${totalCount} paket`
    } else {
      // Mobile infinite scroll: "Showing 25 of 100 packages"
      return `Menampilkan ${resultsDisplayInfo.displayCount || 0} dari ${totalCount} paket`
    }
  }

  return (
    <div className="flex items-center justify-between max-lg:hidden">
      <h2 className="text-m-regular text-neutral-500">{getResultsText()}</h2>
      <div className="flex items-center gap-3">
        <p className="text-m-regular text-neutral-900">Urutkan Berdasarkan</p>
        <SortingDropdown
          currentSort={currentSort}
          createSortUrl={createSortUrlAction}
        />
      </div>
    </div>
  )
}
