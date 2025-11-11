'use client'

import { CardTransactionBanking } from '@/components/pages/my/5-Banking/common/CardPembiayaan'
import { CardTransactionBankingSkeleton } from '@/components/pages/my/5-Banking/common/SkeletonCardPembiayaan'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { useGetSubmissionListInfinite } from '@/services/hooks/banking-service/submission-credits-api'

export default function ListSubmissionPembiayaanMobile({
  search,
}: {
  search: string
}) {
  // --- INFINITE SCROLL LOGIC (MOBILE) ---
  const {
    data: infiniteData,
    isLoading: isInfiniteLoading,
    isReachingEnd,
    loadMore,
  } = useGetSubmissionListInfinite({
    size: 10,
    search,
  }) // Hanya aktifkan hook ini di mobile

  if (isInfiniteLoading)
    return Array.from({ length: 3 }).map((_, index) => (
      <CardTransactionBankingSkeleton key={index} />
    ))

  return (
    <InfiniteScroll
      isLoading={isInfiniteLoading}
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
