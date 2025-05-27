'use client'

import { useEventTracker } from '@/contexts/event-tracker/context'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useSearchHistory } from '@/hooks/common/useSearchHistory'
import { useSearchParams } from 'next/navigation'
import { FormEvent, useCallback, useMemo, useState } from 'react'

export interface UseSearchQueryProps {
  redirectUri: string
  dataEventTracker?: any
}

export function useSearchQuery({
  redirectUri,
  dataEventTracker,
}: UseSearchQueryProps) {
  const { searchQuery, setSearchQuery } = useFilterProduct()
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const { pushEvent } = useEventTracker()

  // Use the search history hook
  const { searchHistory, addToHistory } = useSearchHistory()

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    },
    [setSearchQuery]
  )

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault()

      if (loading || !searchQuery.trim()) return

      setLoading(true)
      const params = new URLSearchParams(searchParams.toString())

      // Add to search history when searching
      addToHistory(searchQuery)

      params.set('query', searchQuery)

      pushEvent(dataEventTracker)
      // Set a timer to simulate API call or processing
      setTimeout(() => {
        window.location.href = `/${redirectUri}?${params.toString()}`
        setLoading(false)
      }, 500)
    },
    [
      loading,
      searchQuery,
      searchParams,
      addToHistory,
      pushEvent,
      dataEventTracker,
      redirectUri,
    ]
  )

  // Handle selecting a history item
  const handleHistoryItemClick = useCallback(
    (historyItem: string) => {
      setSearchQuery(historyItem)

      const params = new URLSearchParams(searchParams.toString())
      params.set('query', historyItem)

      // Add to search history when selecting from history
      addToHistory(historyItem)

      window.location.href = `/${redirectUri}?${params.toString()}`
    },
    [searchParams, setSearchQuery, addToHistory, redirectUri]
  )

  const handleSearchDesktop = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('query', searchQuery)
    const queryString = params.toString()

    return queryString ? `/${redirectUri}?${queryString}` : redirectUri
  }, [searchParams, searchQuery, redirectUri])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
  }, [setSearchQuery])

  return {
    searchQuery,
    searchHistory,
    loading,
    setSearchQuery,
    handleSearchChange,
    handleSearchDesktop,
    handleSearch,
    handleHistoryItemClick,
    clearSearch,
  }
}
