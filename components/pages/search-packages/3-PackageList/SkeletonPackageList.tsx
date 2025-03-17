'use client'

import { CardPackageSkeleton } from '@/components/shared/SkeletonCardPackage'

// Header Skeleton Component
export const ResultsHeaderSkeleton = () => (
  <div className="flex items-center justify-between">
    <div className="h-5 w-64 animate-pulse rounded-md bg-neutral-200"></div>
    <div className="flex items-center gap-3">
      <div className="h-5 w-40 animate-pulse rounded-md bg-neutral-200"></div>
      <div className="h-10 w-44 animate-pulse rounded-[100px] bg-neutral-200"></div>
    </div>
  </div>
)

// Pagination Skeleton Component
export const PaginationSkeleton = () => (
  <div className="mt-8 flex justify-center">
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 animate-pulse rounded-md bg-neutral-200"></div>
      <div className="h-10 w-10 animate-pulse rounded-md bg-neutral-200"></div>
      <div className="h-10 w-10 animate-pulse rounded-md bg-neutral-200"></div>
      <div className="h-10 w-10 animate-pulse rounded-md bg-neutral-200"></div>
      <div className="h-10 w-10 animate-pulse rounded-md bg-neutral-200"></div>
    </div>
  </div>
)

// Package Grid Skeleton Component
export const PackageGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <CardPackageSkeleton key={`skeleton-${index}`} />
      ))}
  </div>
)
