/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import type React from 'react'

import TransactionSkeletonLoading from '@/components/pages/my/1-Transaction/Components/TransactionSkeletonLoading'
import { SearchAndFilter } from '@/components/pages/my/6-CheckAvailability/Filter'
import List from '@/components/pages/my/6-CheckAvailability/List'
import { CustomPagination } from '@/components/shared/CustomPagination'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { Transaction } from '@/constant/types/Transaction'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { getCheckListUmrah } from '@/services/umrah-service'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'

export default function CheckAvailability() {
  const searchParams = useSearchParams()
  const { lg } = useTailwindBreakpoint()
  const [isMounted, setIsMounted] = useState(false)
  // State for pagination and filters
  const [currentPage, setCurrentPage] = useState<number>(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  )
  const router = useRouter()
  const [totalPages, setTotalPages] = useState<number>(1)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingMobile, setIsLoadingMobileFilter] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [productFilter, setProductFilter] = useState('')
  const handleProductChange = (value: string) => setProductFilter(value)
  // State for filters
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('query') ? String(searchParams.get('query')) : ''
  )

  // Function to fetch transactions
  const fetchTransactions = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Build query parameters
      const queryParams: any = {
        page: currentPage,
        size: 10,
        search: `${searchQuery}`,
      }

      // Fetch data
      const response = await getCheckListUmrah(queryParams)
      // console.log(response)

      // Update state with response data

      if (lg && currentPage > 1) {
        setTransactions((prev) => [...prev, ...response.results])
      } else {
        setTransactions(response.results)
      }

      setTotalPages(Math.ceil(response.total / 10))
      setIsLoading(false)
      setIsLoadingMobileFilter(false)
    } catch (err) {
      console.error('Error fetching transactions:', err)
      setError('Failed to load transactions. Please try again.')
    }
  }, [currentPage, searchQuery, productFilter, lg, router])

  // Handle page change
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle date range change

  // Fetch transactions when dependencies change
  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="mt-5">
        <TransactionSkeletonLoading noTabs noFilter noPagination />
      </div>
    )
  }

  return (
    <Fragment>
      <MobileTopbar
        showBackButton
        variant="transactionTopbar"
        title="Cek Ketersedian Kursi"
        onBackClick={() => router.push('/my')}
      />

      {/* Search and Filters */}
      <SearchAndFilter
        searchQuery={searchQuery}
        productFilter={productFilter}
        handleSearchChange={handleSearchChange}
        handleProductChange={handleProductChange}
      />

      {/* Error state */}
      {error && (
        <div className="bg-error-100 text-error-700 mt-6 rounded-md p-4">
          {error}
        </div>
      )}

      {/* List state */}
      <List
        isLoading={isLoading}
        isLoadingMobile={isLoadingMobile}
        lg={lg}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        transactions={transactions}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}
    </Fragment>
  )
}
