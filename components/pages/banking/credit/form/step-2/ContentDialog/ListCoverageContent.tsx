import { SearchIcon } from '@/components/icons/search'
import ListCoverageSkeleton from '@/components/pages/banking/credit/form/step-2/ContentDialog/ListCoverageSkeleton'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Input } from '@/components/ui/input'
import { useGetProviderByCoverage } from '@/services/hooks/banking-service/credits-api'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const ListCoverageContent = ({
  providerName,
  providerId,
}: {
  providerName: string
  providerId: number
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const handleSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value)
  }, 500)

  const {
    data: listLocation,
    isLoading,
    loadMore,
    isLoadingMore,
    isReachingEnd,
  } = useGetProviderByCoverage(providerId, {
    'district_name:likeLower': debouncedSearch
      ? `%${debouncedSearch}%`
      : undefined,
    size: 20,
    page: 1,
  })

  return (
    <div className="flex flex-col gap-4">
      <p className="text-m-regular">
        Sebelum melakukan pengajuan pembiayaan dengan {providerName}, harap
        lakukan pengecekan apakah wilayah domisili kamu saat ini tervalidasi:
      </p>
      <Input
        placeholder="Cari Kecamatan"
        value={searchValue}
        model="normal"
        onChange={(e) => {
          setSearchValue(e.target.value)
          handleSearch(e.target.value)
        }}
        className="w-full"
        startIcon={<SearchIcon size={16} />}
      />
      <div className="scrollbar-hide h-[300px] overflow-y-auto">
        {isLoading ? (
          <ListCoverageSkeleton />
        ) : listLocation && listLocation.length > 0 ? (
          <InfiniteScroll
            isLoading={isLoadingMore || false}
            hasMore={isReachingEnd || false}
            next={loadMore}
            threshold={0.8}
          >
            {listLocation.map((location, index) => (
              <div
                className="flex flex-col py-2 not-last:border-b not-last:border-neutral-200"
                key={`${location.district_name}-${location.city_name}-${index}`}
              >
                <p className="text-m-regular">{location.district_name}</p>
                <p className="text-s-regular text-neutral-500">
                  {location.city_name}
                </p>
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <p className="pt-8 text-center text-neutral-500">
            Area jangkauan tidak ditemukan.
          </p>
        )}
      </div>
    </div>
  )
}

export default ListCoverageContent
