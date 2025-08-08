'use client'

import { SearchIcon } from '@/components/icons/search'
import { CardPackage } from '@/components/shared/CardPackage'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Package } from '@/constant/types/PackageProps'
import { useSearchQuery } from '@/hooks/common/useSearchQuery'
import { mapProductsToCardData } from '@/lib/utils'
import { getPackageList } from '@/services/umrah-service'
import { AnimatePresence, easeIn, easeOut, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export const TopbarSearch: React.FC = () => {
  const { searchQuery, handleSearchChange, handleSearchDesktop, clearSearch } =
    useSearchQuery({ redirectUri: 'search' })
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchResults, setSearchResults] = useState<Package[]>([])
  const [isLoadingResults, setIsLoadingResults] = useState(false)
  const [activeSlug, setActiveSlug] = useState<string>('umrah')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset search state when component mounts
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

  // Handle search icon click
  const handleSearchIconClick = useCallback(() => {
    setIsExpanded(true)
  }, [])

  // Handle X button click
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

  // Handle input change
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

  // Handle Enter key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchQuery) {
        setShowSuggestions(false)
        window.location.href = handleSearchDesktop
      }
      if (e.key === 'Escape') {
        setIsExpanded(false)
        setShowSuggestions(false)
      }
    },
    [searchQuery, handleSearchDesktop]
  )

  // Handle package click
  const handlePackageClick = useCallback(() => {
    setShowSuggestions(false)
  }, [])

  // Handle category/activeSlug change
  const handleCategoryClick = useCallback((slug: string) => {
    setActiveSlug(slug)
    // No need to manually trigger search here as the useEffect will handle it
  }, [])

  // Prevent popover from stealing focus and handle interactions
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

  const categories = [
    { name: 'Umroh', slug: 'umrah' },
    { name: 'Haji', slug: 'hajj' },
  ]

  // Map packages to card data
  const cardData = mapProductsToCardData({
    results: searchResults,
    total: searchResults.length,
  })

  return (
    <div ref={containerRef} className="relative">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="search-icon"
            variants={searchIconVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex cursor-pointer items-center gap-1"
            onClick={handleSearchIconClick}
          >
            <SearchIcon size={20} className="text-neutral-500" />
            <span className="text-s-regular text-neutral-500">Cari</span>
          </motion.div>
        ) : (
          <motion.div
            key="search-input"
            variants={searchInputVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex items-center gap-2.5"
          >
            <Popover
              open={showSuggestions && searchQuery.length >= 3}
              onOpenChange={setShowSuggestions}
            >
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    ref={inputRef}
                    placeholder="Cari paket, travel, hotel atau airlines"
                    className="w-full max-w-[310px] pr-10"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                  <X
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-100"
                    onClick={handleXClick}
                    // Prevent this from stealing focus
                    onMouseDown={(e) => e.preventDefault()}
                  />
                </div>
              </PopoverTrigger>

              <PopoverContent
                className="scrollbar-hide relative max-h-[400px] max-w-[600px] overflow-y-auto"
                align="start"
                sideOffset={8}
                // Prevent popover from stealing focus
                onOpenAutoFocus={handleOpenAutoFocus}
                onInteractOutside={handleInteractOutside}
                // Prevent Lenis from controlling scroll within popover
                data-lenis-prevent
              >
                <div className="space-y-2.5 p-6">
                  <p className="text-m-regular">
                    Hasil untuk &quot;
                    {searchQuery}&quot;
                  </p>
                  <div className="flex gap-2">
                    {categories?.map((category, index) => (
                      <button
                        key={`category-paket-${index}`}
                        onClick={() => handleCategoryClick(category.slug)}
                        className={`
                rounded-full px-3 py-1 whitespace-nowrap text-neutral-900 transition-all duration-500 ease-in-out ${activeSlug === category.slug ? 'bg-primary-300 ' : 'bg-primary-100 hover:bg-primary-200'} text-m-semibold cursor-pointer outline-0 focus-within:outline-0 focus:outline-0 focus-visible:outline-0
              `}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  {isLoadingResults ? (
                    <div className="m-auto flex items-center justify-center p-6">
                      <div className="border-primary-500 h-6 w-6 animate-spin rounded-full border-b-2"></div>
                      <span className="ml-2 text-sm text-neutral-500">
                        Mencari paket...
                      </span>
                    </div>
                  ) : cardData.length > 0 ? (
                    <div className="space-y-3" data-lenis-prevent>
                      {cardData.map((packageData, index) => (
                        <div
                          key={`search-result-${index}`}
                          onClick={handlePackageClick}
                          // Prevent mouse down from affecting input focus
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
                  ) : searchQuery.length >= 3 ? (
                    <div className="p-6 text-center text-sm text-neutral-500">
                      Tidak ada paket ditemukan untuk &quot;{searchQuery}
                      &quot;
                    </div>
                  ) : null}
                </div>
                {cardData.length > 0 && !isLoadingResults && (
                  <div
                    className="bg-neutral-0 sticky bottom-0 z-11 flex p-4"
                    data-lenis-prevent
                  >
                    <Link
                      href={handleSearchDesktop}
                      className="bg-primary-500 hover:bg-primary-700 text-s-regular w-full rounded-full px-10 py-4 text-center text-neutral-900 transition-all"
                      // Prevent mouse down from affecting input focus
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      Lihat semua hasil untuk &quot;{searchQuery}&quot;
                    </Link>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
