'use client'

import { CardTransactionBanking } from '@/components/pages/my/5-Banking/list/common/CardPembiayaan'
import { CardTransactionBankingSkeleton } from '@/components/pages/my/5-Banking/list/common/SkeletonCardPembiayaan'
import EmptyState from '@/components/pages/my/5-Banking/list/EmptyState'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { useGetSubmissionListInfinite } from '@/services/hooks/banking-service/submission-credits-api'
import { PAGE_SIZE } from '@/services/use-swr-fetcher'

export default function ListSubmissionPembiayaanMobile({
  search,
}: {
  search: string
}) {
  // --- INFINITE SCROLL LOGIC (MOBILE) ---
  const {
    data: infiniteData,
    isLoading: isInfiniteLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
  } = useGetSubmissionListInfinite({
    size: PAGE_SIZE,
    search,
  })

  if (!isInfiniteLoading && infiniteData?.length === 0) return <EmptyState />

  if (isInfiniteLoading)
    return Array.from({ length: 3 }).map((_, index) => (
      <CardTransactionBankingSkeleton key={index} />
    ))

  return (
    <InfiniteScroll
      isLoading={isLoadingMore || false}
      hasMore={!isReachingEnd}
      next={loadMore}
      threshold={0.8}
    >
      {infiniteData?.map((res) => (
        <CardTransactionBanking key={res.id} data={res} />
      ))}
    </InfiniteScroll>
  )
}
