'use client'

import { CardTransactionBanking } from '@/components/pages/my/5-Banking/list/common/CardPembiayaan'
import { CardTransactionBankingSkeleton } from '@/components/pages/my/5-Banking/list/common/SkeletonCardPembiayaan'
import EmptyState from '@/components/pages/my/5-Banking/list/EmptyState'
import { CustomPagination } from '@/components/shared/CustomPagination'
import { useGetSubmissionList } from '@/services/hooks/banking-service/submission-credits-api'
import { Fragment, useState } from 'react'

export default function ListSubmissionPembiayaan({
  search,
}: {
  search: string
}) {
  const [page, setPage] = useState(1)

  // --- PAGINATION LOGIC (DESKTOP) ---
  const { data: paginatedData, isLoading: isPaginatedLoading } =
    useGetSubmissionList({
      page,
      size: 10,
      search,
    })
  const setPagePagination = (goPage: number) => {
    setPage(goPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isPaginatedLoading && paginatedData?.data.length === 0)
    return <EmptyState />

  if (isPaginatedLoading)
    return Array.from({ length: 3 }).map((_, index) => (
      <CardTransactionBankingSkeleton key={index} />
    ))

  return (
    <Fragment>
      {paginatedData?.data.map((res, index) => (
        <CardTransactionBanking data={res} key={`transaction-data-${index}`} />
      ))}

      {paginatedData && paginatedData?.totalPages > 1 && (
        <CustomPagination
          currentPage={page}
          totalPages={paginatedData.totalPages}
          goToPage={setPagePagination}
        />
      )}
    </Fragment>
  )
}
