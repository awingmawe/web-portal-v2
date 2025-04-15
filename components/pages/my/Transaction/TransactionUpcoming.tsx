'use client'

import type React from 'react'

import DateRangePicker from '@/components/pages/my/Transaction/DateRangeFilter'
import EmptyState from '@/components/pages/my/Transaction/EmptyState'
import TransactionCard from '@/components/pages/my/Transaction/TransactionCard'
import TransactionSkeletonLoading from '@/components/pages/my/Transaction/TransactionSkeletonLoading'
import { CustomPagination } from '@/components/pages/search-packages/3-PackageList/PaginationPackageList'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GetListQuery } from '@/constant/types/GeneralProps'
import { Transaction } from '@/constant/types/Transaction'
import { getTransactionListUmrah } from '@/services/umrah-service'
import { Search } from 'lucide-react'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

export default function TransactionUpcoming() {
  // State for pagination and filters
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // State for filters
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

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
        'bookingCode:likeLower': `%${searchQuery}%`,
      }

      // Add optional filters if they exist
      if (statusFilter == 'all') {
        queryParams['status.slug:in'] =
          'waiting-cancellation,waiting-approval,approved'
      } else if (statusFilter == 'waiting-approval') {
        queryParams['status.slug:in'] = 'waiting-approval'
      } else if (statusFilter == 'coming-soon') {
        queryParams['status.slug:in'] = 'coming-soon'
      } else if (statusFilter == 'siap-berangkat') {
        queryParams['status.slug:in'] = 'approved'
        queryParams['isCompletedManifest'] = true
        queryParams['isPaidOff'] = true
      }
      if (dateRange?.from && dateRange.to) {
        queryParams[`createdAt:gte`] = dateRange.from.toISOString()
        queryParams[`createdAt:lte`] = dateRange.to.toISOString()
      }

      // Fetch data
      const response = await getTransactionListUmrah(queryParams)

      // Update state with response data
      setTransactions(response.results)
      setTotalPages(Math.ceil(response.total / 10))
    } catch (err) {
      console.error('Error fetching transactions:', err)
      setError('Failed to load transactions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, searchQuery, statusFilter, dateRange])

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

  return (
    <Fragment>
      {/* Search and Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari berdasarkan ID"
            className="w-full rounded-full"
            value={searchQuery}
            onChange={handleSearchChange}
            endIcon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>

        <div className="relative">
          <Select
            defaultValue="all"
            value={statusFilter}
            onValueChange={handleStatusFilterChange}
          >
            <SelectTrigger className="h-10 w-full rounded-3xl border-neutral-200 shadow-none">
              <SelectValue placeholder="Semua Tahapan" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-neutral-200">
              <SelectGroup>
                <SelectItem className="rounded-2xl" value="all">
                  Semua Tahapan
                </SelectItem>
                <SelectItem className="rounded-2xl" value="waiting-approval">
                  Menunggu Konfirmasi
                </SelectItem>
                <SelectItem className="rounded-2xl" value="coming-soon">
                  Menunggu Pelunasan & Data Jemaah
                </SelectItem>
                <SelectItem className="rounded-2xl" value="siap-berangkat">
                  Siap Berangkat
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          {/* <DateRangePicker onChange={handleDateRangeChange} /> */}
          <DateRangePicker onChange={handleDateRangeChange} />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-error-100 text-error-700 mt-6 rounded-md p-4">
          {error}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="mt-5">
          <TransactionSkeletonLoading noTabs noFilter noPagination />
        </div>
      )}
      {!isLoading && transactions.length == 0 && <EmptyState />}

      {!isLoading && transactions.length > 0 && (
        <div className="space-y-6">
          {transactions.map((transaction) => {
            return (
              <Fragment key={transaction.id}>
                {/* Transaction Cards */}
                <TransactionCard
                  status={transaction.status.slug}
                  id={transaction.bookingCode}
                  packageName={transaction.packageSnapshot.snapshot.name}
                  thumbnail={
                    transaction.packageSnapshot.snapshot.package.thumbnail
                  }
                  startDate={transaction.packageSnapshot.snapshot.departureDate}
                  endDate={transaction.packageSnapshot.snapshot.arrivalDate}
                  createdDate={transaction.createdAt}
                  jemaah={Number.parseInt(transaction.quantity)}
                  bookingId={String(transaction.id)}
                  isCompletedManifest={transaction.isCompletedManifest}
                  isPaidOff={transaction.isPaidOff}
                  statusTahapan="Akan Datang"
                />
              </Fragment>
            )
          })}
        </div>
      )}

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
