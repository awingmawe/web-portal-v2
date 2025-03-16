import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { FormEvent, useCallback, useState } from 'react'

interface UseSearchQueryProps {
  initialQuery?: string
  redirectPath?: string
  delay?: number
  searchParamName?: string
}

export function useSearchQuery({
  initialQuery = '',
  redirectPath = '/packages',
  delay = 500,
  searchParamName = 'query',
}: UseSearchQueryProps = {}) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [loading, setLoading] = useState(false)
  const updateQueryParams = useUpdateQueryParams()

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    },
    []
  )

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault()

      if (loading) return

      setLoading(true)

      // Set a timer to simulate API call or processing
      setTimeout(() => {
        if (searchQuery) {
          // Use updateQueryParams to navigate with the search query
          updateQueryParams([searchParamName], [searchQuery], redirectPath)
        } else {
          // If search query is empty, remove the parameter
          updateQueryParams([searchParamName], [''], redirectPath)
        }

        setLoading(false)
      }, delay)
    },
    [
      searchQuery,
      loading,
      updateQueryParams,
      searchParamName,
      redirectPath,
      delay,
    ]
  )

  const clearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  return {
    searchQuery,
    loading,
    setSearchQuery,
    handleSearchChange,
    handleSearch,
    clearSearch,
  }
}
