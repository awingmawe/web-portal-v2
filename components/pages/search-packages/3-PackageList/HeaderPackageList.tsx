'use client'

import { SortingDropdown } from './SortingPackageList'

interface ResultsSummaryProps {
  resultsCount: number
  totalCount: number
  currentSort: string
  createSortUrl: (sortValue: string) => string
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  resultsCount,
  totalCount,
  currentSort,
  createSortUrl,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-m-regular text-neutral-500">
        Menampilkan {resultsCount} hasil dari {totalCount} paket
      </h2>
      <div className="flex items-center gap-3">
        <p className="text-m-regular text-neutral-900">Urutkan Berdasarkan</p>
        <SortingDropdown
          currentSort={currentSort}
          createSortUrl={createSortUrl}
        />
      </div>
    </div>
  )
}
