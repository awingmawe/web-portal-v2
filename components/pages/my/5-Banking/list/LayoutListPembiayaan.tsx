'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import ListSubmissionPembiayaan from '@/components/pages/my/5-Banking/list/ListSubmissionPembiayaan'
import ListSubmissionPembiayaanMobile from '@/components/pages/my/5-Banking/list/mobile/ListSubsmissionPembiayaanMobile'
import { Input } from '@/components/ui/input'
import { useCustomNavigation } from '@/hooks/common/useCustomNavigation'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function LayoutListSubmissionPembiayaan() {
  const [search, setSearch] = useState('')
  const { goBack } = useCustomNavigation()
  const debounceSearch = useDebounce(search, 500)
  const { lg: isMobile } = useTailwindBreakpoint()

  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-lg:p-4">
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
      {!isMobile ? (
        <ListSubmissionPembiayaan search={debounceSearch[0]} />
      ) : (
        <ListSubmissionPembiayaanMobile search={debounceSearch[0]} />
      )}
    </div>
  )
}
