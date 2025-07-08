export interface UseSearchParams {
  initialQuery?: string
  pageSize?: number
  typeairport?: string
  version?: 'v1' | 'v2'
}

export interface UseSearchResult<T> {
  data: T[]
  loading: boolean
  initialLoading: boolean
  hasMore: boolean
  error: Error | null
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  loadMore: () => Promise<void>
}

export interface UsePriceRangeFilterProps {
  initialMin: number
  initialMax: number
  filters: {
    hargaMin: string
    hargaMax: string
  }
  setHargaMin: (value: string) => void
  setHargaMax: (value: string) => void
}

export interface UsePriceRangeFilterResult {
  range: [number, number]
  handleSliderChange: (value: [number, number]) => void
  handleSliderChangeEnd: (value: [number, number]) => void
  handleHargaMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleHargaMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleHargaMinBlur: () => void
  handleHargaMaxBlur: () => void
}

export interface UseCheckboxSelectionProps {
  selectedValues?: string
  onSelectionChange: (value: string) => void
  paramName: string
}
