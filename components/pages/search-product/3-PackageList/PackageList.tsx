'use client'

import { CardPackage } from '@/components/shared/CardPackage'
import { CardPackageSkeleton } from '@/components/shared/SkeletonCardPackage'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { Package } from '@/constant/types/PackageProps'
import { mapProductsToCardData } from '@/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

interface PackageResultsProps {
  dataPackages: GenericResponse<Package>
  currentPage: number
  pageSize: number
}

export const PackageResults: React.FC<PackageResultsProps> = ({
  dataPackages,
  currentPage,
  pageSize,
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(dataPackages.total / pageSize)
  }, [dataPackages.total, pageSize])

  // Map package data to card data format
  const packageCards = useMemo(() => {
    return mapProductsToCardData(dataPackages)
  }, [dataPackages])

  // Create page navigation function
  const goToPage = useCallback(
    (page: number) => {
      setIsLoading(true)
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', page.toString())
      window.location.href = `${pathname}?${params.toString()}`
    },
    [pathname, searchParams]
  )

  // Generate pagination items
  const paginationItems = useMemo(() => {
    const items = []

    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault()
            goToPage(1)
          }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    )

    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i <= 1 || i >= totalPages) continue
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              goToPage(i)
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    // Always show last page if there's more than 1 page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              goToPage(totalPages)
            }}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }, [currentPage, totalPages, goToPage])

  return (
    <div className="flex flex-col gap-6">
      {/* Results info */}
      <div className="flex items-center justify-between">
        <h2 className="text-l-semibold text-neutral-900">
          Menampilkan {dataPackages.results.length} dari {dataPackages.total}{' '}
          paket
        </h2>
        <p className="text-s-regular text-neutral-500">
          Halaman {currentPage} dari {totalPages}
        </p>
      </div>

      {/* No results message */}
      {dataPackages.results.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-l-semibold mb-2 text-neutral-900">
            Tidak ada paket yang ditemukan
          </p>
          <p className="text-m-regular text-neutral-500">
            Silakan gunakan filter lain untuk menemukan paket yang sesuai
          </p>
        </div>
      )}

      {/* Package grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? // Show skeletons when loading
            Array(6)
              .fill(0)
              .map((_, index) => (
                <CardPackageSkeleton key={`skeleton-${index}`} />
              ))
          : // Show packages
            packageCards.map((packageData) => (
              <CardPackage key={packageData.id} data={packageData} />
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) goToPage(currentPage - 1)
                }}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>

            {paginationItems}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) goToPage(currentPage + 1)
                }}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
