import { Package } from '@/constant/types/PackageProps'
import { useSearchQuery } from '@/hooks/common/useSearchQuery'
import { mapProductsToCardData } from '@/lib/utils'
import { getPackageList } from '@/services/umrah-service'
import { easeIn, easeOut } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export const useTopbarSearch = () => {
  // Search query hook
  const { searchQuery, handleSearchChange, handleSearchDesktop, clearSearch } =
    useSearchQuery({ redirectUri: 'search' })

  // State management
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchResults, setSearchResults] = useState<Package[]>([])
  const [isLoadingResults, setIsLoadingResults] = useState(false)
  const [activeSlug, setActiveSlug] = useState<string>('umrah')

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset search state when component mounts
  useEffect(() => {
    clearSearch()
    setIsExpanded(false)
    setShowSuggestions(false)
    setSearchResults([])
  }, [clearSearch])

  // Handle click outside to close search when empty
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !searchQuery
      ) {
        setIsExpanded(false)
        setShowSuggestions(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded, searchQuery])

  // Focus input when expanded and maintain focus when popover opens
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current?.focus()
    }
  }, [isExpanded])

  // Debounced search function
  const debouncedSearch = useDebouncedCallback(async (query: string) => {
    if (query.length >= 3) {
      setIsLoadingResults(true)
      try {
        const response = await getPackageList({
          page: 1,
          size: 5,
          search: `%${query}%`,
          packageType: activeSlug,
        })
        setSearchResults(response.results)
        setShowSuggestions(true)
      } catch (error) {
        console.error('Error fetching search suggestions:', error)
        setSearchResults([])
      } finally {
        setIsLoadingResults(false)
      }
    } else {
      setShowSuggestions(false)
      setSearchResults([])
    }
  }, 300)

  // Re-trigger search when activeSlug changes and there's a valid search query
  useEffect(() => {
    if (searchQuery.length >= 3) {
      debouncedSearch(searchQuery)
    }
  }, [activeSlug, searchQuery, debouncedSearch])

  // Event handlers
  const handleSearchIconClick = useCallback(() => {
    setIsExpanded(true)
  }, [])

  const handleXClick = useCallback(() => {
    if (searchQuery) {
      // Clear the value if there's content
      handleSearchChange({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>)
      setShowSuggestions(false)
      setSearchResults([])
      // Refocus input after clearing
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    } else {
      // Close search if empty
      setIsExpanded(false)
      setShowSuggestions(false)
    }
  }, [searchQuery, handleSearchChange])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      handleSearchChange(e)

      // Trigger debounced search
      if (value.length >= 3) {
        debouncedSearch(value)
      } else {
        setShowSuggestions(false)
        setSearchResults([])
      }
    },
    [handleSearchChange, debouncedSearch]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchQuery) {
        setShowSuggestions(false)
        window.location.href = handleSearchDesktop(activeSlug)
      }
      if (e.key === 'Escape') {
        setIsExpanded(false)
        setShowSuggestions(false)
      }
    },
    [searchQuery, handleSearchDesktop, activeSlug]
  )

  const handlePackageClick = useCallback(() => {
    setShowSuggestions(false)
  }, [])

  const handleCategoryClick = useCallback((slug: string) => {
    setActiveSlug(slug)
  }, [])

  // Popover handlers
  const handleOpenAutoFocus = useCallback((event: Event) => {
    // Prevent popover from stealing focus from input
    event.preventDefault()
  }, [])

  const handleInteractOutside = useCallback(
    (event: Event) => {
      // Only close if clicking outside the entire search container
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (!searchQuery) {
          setIsExpanded(false)
          setShowSuggestions(false)
        } else {
          setShowSuggestions(false)
        }
      } else {
        // Prevent closing if clicking inside the container
        event.preventDefault()
      }
    },
    [searchQuery]
  )

  // Animation variants
  const searchIconVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: easeIn,
      },
    },
  }

  const searchInputVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: easeOut,
        delay: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: easeIn,
      },
    },
  }

  // Map packages to card data
  const cardData = mapProductsToCardData({
    results: searchResults,
    total: searchResults.length,
  })

  return {
    // State
    searchQuery,
    isExpanded,
    showSuggestions,
    searchResults,
    isLoadingResults,
    activeSlug,
    cardData,

    // Refs
    inputRef,
    containerRef,

    // Handlers
    handleSearchDesktop,
    handleSearchIconClick,
    handleXClick,
    handleInputChange,
    handleKeyDown,
    handlePackageClick,
    handleCategoryClick,
    handleOpenAutoFocus,
    handleInteractOutside,
    setShowSuggestions,

    // Animation variants
    searchIconVariants,
    searchInputVariants,
  }
}
