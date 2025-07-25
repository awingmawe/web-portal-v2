'use client'

import type React from 'react'

import TransactionSkeletonLoading from '@/components/pages/my/7-PaketPersonal/Components/TransactionSkeletonLoading'
import {
  SearchAndFilter,
  SearchAndFilterMobile,
} from '@/components/pages/my/7-PaketPersonal/Filter'
import List from '@/components/pages/my/7-PaketPersonal/List'
import { CustomPagination } from '@/components/shared/CustomPagination'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { GetListQuery } from '@/constant/types/GeneralProps'
import { Transaction } from '@/constant/types/Transaction'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { getTransactionListUmrahPersonal } from '@/services/umrah-service'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

export default function TransactionUpcoming() {
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

  // State for filters
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('query') ? String(searchParams.get('query')) : ''
  )
  const [statusFilter, setStatusFilter] = useState<string>(
    searchParams.get('status') || 'all'
  )
  const [statusFilterMobile, setStatusFilterMobile] = useState<string>(
    searchParams.get('status') || 'all'
  )
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const dateString = searchParams.get('date')
    if (!dateString) return undefined
    const [fromString, toString] = dateString.split(' - ')
    const fromDate = new Date(fromString)
    const toDate = new Date(toString)
    return {
      from: fromDate,
      to: toDate,
    } as DateRange
  })

  // Function to fetch transactions
  const fetchTransactions = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Build query parameters
      const queryParams: GetListQuery = {
        page: currentPage,
        size: 10,
        order: 'desc',
        orderBy: 'createdAt',
        'journeyCode:likeLower': `%${searchQuery}%`,
      }

      // Fetch data
      const response = await getTransactionListUmrahPersonal(queryParams)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery, statusFilter, dateRange, lg, router])

  // Handle page change
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle status filter change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  // Handle date range change
  const handleDateRangeChange = (
    date: React.SetStateAction<DateRange | undefined>
  ) => {
    setDateRange(date)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  // Fetch transactions when dependencies change
  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <TransactionSkeletonLoading noTabs noFilter noPagination />
  }

  return (
    <Fragment>
      <MobileTopbar
        showBackButton
        variant="plainPaketPersonal"
        onBackClick={() => router.push('/my')}
      />
      {/* Search and Filters */}
      <SearchAndFilter
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        handleStatusFilterChange={handleStatusFilterChange}
        handleDateRangeChange={handleDateRangeChange}
      />
      {/* Search and Filter Mobile */}
      {lg && (
        <SearchAndFilterMobile
          statusFilterMobile={statusFilterMobile}
          dateFilterMobile={dateRange}
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          handleStatusFilterChange={handleStatusFilterChange}
          handleDateRangeChange={handleDateRangeChange}
          setStatusFilterMobile={setStatusFilterMobile}
          setIsLoadingMobile={setIsLoadingMobileFilter}
        />
      )}
      {/* <NeedPaymentLink /> */}
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
        fetchTransactions={fetchTransactions}
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
