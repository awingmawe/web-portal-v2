/* eslint-disable react-hooks/exhaustive-deps */
import { useFilterProduct } from '@/contexts/filter-product-context'
import { usePathname, useSearchParams } from 'next/navigation'
import { FormEvent, useCallback, useMemo, useState } from 'react'

export function useSearchQuery() {
  const { searchQuery, setSearchQuery } = useFilterProduct()
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
      const params = new URLSearchParams(searchParams.toString())

      params.set('query', searchQuery)
      // Set a timer to simulate API call or processing
      setTimeout(() => {
        window.location.href = `/search?${pathname}?${params.toString()}`

        setLoading(false)
      }, 500)
    },
    [loading, searchParams, searchQuery, pathname]
  )

  const handleSearchDesktop = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('query', searchQuery)
    const queryString = params.toString()

    return queryString ? `/search?${queryString}` : '/search'
  }, [searchParams, searchQuery])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  return {
    searchQuery,
    loading,
    setSearchQuery,
    handleSearchChange,
    handleSearchDesktop,
    handleSearch,
    clearSearch,
  }
}
