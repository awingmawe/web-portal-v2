'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { CardTransactionBanking } from '@/components/pages/my/5-Banking/common/CardPembiayaan'
import { CardTransactionBankingSkeleton } from '@/components/pages/my/5-Banking/common/SkeletonCardPembiayaan'
import { CustomPagination } from '@/components/shared/CustomPagination'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import { useCustomNavigation } from '@/hooks/common/useCustomNavigation'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import {
  useGetSubmissionList,
  useGetSubmissionListInfinite,
} from '@/services/hooks/banking-service/submission-credits-api'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function ListSubmissionPembiayaan() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { goBack } = useCustomNavigation()
  const debounceSearch = useDebounce(search, 500)
  const { lg: isMobile, mounted } = useTailwindBreakpoint()

  // --- PAGINATION LOGIC (DESKTOP) ---
  const { data: paginatedData, isLoading: isPaginatedLoading } =
    useGetSubmissionList(
      {
        page,
        size: 10,
        search: debounceSearch[0],
      },
      { isPaused: () => !mounted || isMobile } // Hanya aktifkan hook ini di desktop
    )

  // --- INFINITE SCROLL LOGIC (MOBILE) ---
  const {
    data: infiniteData,
    isLoading: isInfiniteLoading,
    isReachingEnd,
    loadMore,
  } = useGetSubmissionListInfinite(
    {
      page,
      size: 10,
      search: debounceSearch[0],
    },
    { isPaused: () => !mounted || !isMobile }
  ) // Hanya aktifkan hook ini di mobile

  if (!mounted) {
    return (
      <div className="flex flex-col gap-4 max-lg:p-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardTransactionBankingSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 max-lg:p-4">
      <div className="flex w-full items-center gap-6 max-lg:absolute max-lg:-top-13.5 max-lg:left-0 max-lg:gap-4 max-lg:px-4">
        <ArrowIcon
          size={20}
          className="rotate-180 lg:hidden"
          onClick={goBack}
        />
        <Input
          model="compact"
          startIcon={<Search size={12} className="text-neutral-300" />}
          placeholder="Cari berdasarkan ID/ Travel/ Pesanan"
          className="w-2/5 max-lg:w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </div>
      {/* --- SKELETON LOADER --- */}
      {isMobile &&
        isInfiniteLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <CardTransactionBankingSkeleton key={index} />
        ))}

      {!isMobile &&
        isPaginatedLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <CardTransactionBankingSkeleton key={index} />
        ))}

      {isMobile &&
        !isInfiniteLoading && ( // Tampil jika INI mobile
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
        )}
      {!isMobile && paginatedData && paginatedData?.totalPages > 1 && (
        <CustomPagination
          currentPage={page}
          totalPages={paginatedData.totalPages}
          goToPage={setPage}
        />
      )}
    </div>
  )
}
