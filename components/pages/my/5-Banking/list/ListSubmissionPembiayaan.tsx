'use client'

import { CardTransactionBanking } from '@/components/pages/my/5-Banking/common/CardPembiayaan'
import { CardTransactionBankingSkeleton } from '@/components/pages/my/5-Banking/common/SkeletonCardPembiayaan'
import { CustomPagination } from '@/components/shared/CustomPagination'
import { useGetSubmissionList } from '@/services/hooks/banking-service/submission-credits-api'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'

export default function ListSubmissionPembiayaan({
  search,
}: {
  search: string
}) {
  const router = useRouter()
  const [page, setPage] = useState(1)

  // --- PAGINATION LOGIC (DESKTOP) ---
  const { data: paginatedData, isLoading: isPaginatedLoading } =
    useGetSubmissionList({
      page,
      size: 10,
      search,
    })
  const setPagePagination = (goPage: number) => {
    router.replace('/my/banking', { scroll: true })
    setPage(goPage)
  }
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
