'use client'

import { SearchIcon } from '@/components/icons/search'
import {
  CategoryTabs,
  SearchResultsFooter,
  SearchResultsHeader,
  SearchResultsList,
} from '@/components/shared/Topbar/TopbarSearch/TopbarSearchContent'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CATEGORIES_FILTER_SEARCH } from '@/constant/env'
import { useTopbarSearch } from '@/hooks/common/useTopbarSearch'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import React from 'react'

const TopbarSearch: React.FC = () => {
  const {
    // State
    searchQuery,
    isExpanded,
    showSuggestions,
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
    handlePackageClick,
    handleCategoryClick,
    handleOpenAutoFocus,
    handleInteractOutside,
    setShowSuggestions,

    // Animation variants
    searchIconVariants,
    searchInputVariants,
  } = useTopbarSearch()

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
                  />
                  <X
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-100"
                    onClick={handleXClick}
                    onMouseDown={(e) => e.preventDefault()}
                  />
                </div>
              </PopoverTrigger>

              <PopoverContent
                className="scrollbar-hide relative max-h-[400px] max-w-[600px] overflow-y-auto"
                align="start"
                sideOffset={8}
                onOpenAutoFocus={handleOpenAutoFocus}
                onInteractOutside={handleInteractOutside}
                data-lenis-prevent
              >
                <div className="space-y-2.5 p-6">
                  <SearchResultsHeader searchQuery={searchQuery} />

                  <CategoryTabs
                    categories={CATEGORIES_FILTER_SEARCH}
                    activeSlug={activeSlug}
                    onCategoryClick={handleCategoryClick}
                  />

                  <SearchResultsList
                    isLoadingResults={isLoadingResults}
                    cardData={cardData}
                    searchQuery={searchQuery}
                    onPackageClick={handlePackageClick}
                  />
                </div>

                <SearchResultsFooter
                  cardData={cardData}
                  isLoadingResults={isLoadingResults}
                  searchQuery={searchQuery}
                  handleSearchDesktop={handleSearchDesktop(activeSlug)}
                />
              </PopoverContent>
            </Popover>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TopbarSearch
