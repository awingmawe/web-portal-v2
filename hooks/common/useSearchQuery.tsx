'use client'

import { useEventTracker } from '@/contexts/event-tracker/context'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useSearchHistory } from '@/hooks/common/useSearchHistory'
import { isEmpty } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useCallback, useMemo, useState } from 'react'

export interface UseSearchQueryProps {
  redirectUri: string
  dataEventTracker?: any
  sort?: string
  useHistory?: boolean
}

export function useSearchQuery({
  redirectUri,
  dataEventTracker,
  useHistory,
  sort,
}: UseSearchQueryProps) {
  const { searchQuery, setSearchQuery } = useFilterProduct()
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const { pushEvent } = useEventTracker()
  const router = useRouter()

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

      if (loading) return

      setLoading(true)
      const params = new URLSearchParams(searchParams.toString())

      // If using history, add the current search query to history
      if (useHistory) {
        addToHistory(searchQuery)
      }

      if (sort) {
        params.set('sort', sort)
      }

      if (!isEmpty(searchQuery)) {
        params.set('query', searchQuery)
      } else {
        params.delete('query')
      }

      params.set('page', '1')
      if (dataEventTracker) {
        pushEvent({ ...dataEventTracker, data: { keyword: searchQuery } })
      }

      // Set a timer to simulate API call or processing
      setTimeout(() => {
        router.push(`/${redirectUri}?${params.toString()}`)
        setLoading(false)
      }, 500)
    },
    [
      loading,
      searchParams,
      useHistory,
      sort,
      searchQuery,
      dataEventTracker,
      addToHistory,
      pushEvent,
      router,
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
