'use client'

import { Skeleton } from '@/components/ui/skeleton'
export interface TransactionSkeletonLoadingProps {
  noTabs?: boolean
  noFilter?: boolean
  noPagination?: boolean
}

export default function TransactionSkeletonLoading({
  noTabs = false,
  noFilter = false,
  noPagination = false,
}: TransactionSkeletonLoadingProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      {/* Tabs */}
      {!noTabs && (
        <div className="mb-6 flex w-full border-b border-neutral-200">
          <div className="w-1/3 border-b-2 border-neutral-200 pb-2 text-center font-medium">
            <Skeleton className="mx-auto h-6 w-32" />
          </div>
          <div className="w-1/3 pb-2 text-center text-gray-400">
            <Skeleton className="mx-auto h-6 w-32" />
          </div>
          <div className="w-1/3 pb-2 text-center text-gray-400">
            <Skeleton className="mx-auto h-6 w-32" />
          </div>
        </div>
      )}

      {/* Search and Filters */}
      {!noFilter && (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="relative">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
          <div className="relative">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
          <div className="relative">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
          <div className="relative">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>
      )}

      {/* Booking Card */}
      <div className="mb-6 overflow-hidden rounded-lg border border-neutral-200">
        {/* Status Header */}
        <div className="bg-blue-50 p-4">
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Booking ID */}
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>

        {/* Package Details */}
        <div className="flex flex-col border-b border-neutral-200 p-4 md:flex-row">
          <div className="flex gap-4 md:w-3/4">
            <Skeleton className="h-32 w-32 flex-shrink-0 rounded-md" />
            <div className="flex-grow space-y-4">
              <Skeleton className="h-7 w-40" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-64" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-end justify-center md:mt-0 md:w-1/4">
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="h-8 w-40" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Pagination */}
      {!noPagination && (
        <div className="my-6 flex items-center justify-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      )}
    </div>
  )
}
