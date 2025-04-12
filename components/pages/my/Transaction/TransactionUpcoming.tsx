'use client'

import DateRangePicker from '@/components/pages/my/Transaction/DateRangeFilter'
import TransactionCard from '@/components/pages/my/Transaction/TransactionCard'
import { CustomPagination } from '@/components/pages/search-packages/3-PackageList/PaginationPackageList'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { Fragment, useCallback } from 'react'

export default function TransactionUpcoming() {
  const goToPage = useCallback((page: number) => {
    return page
  }, [])

  return (
    <Fragment>
      {/* Search and Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari berdasarkan ID"
            className="w-full rounded-full"
            endIcon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>

        <div className="relative">
          <Select defaultValue="all">
            <SelectTrigger className="h-10 w-full rounded-3xl border-neutral-200 shadow-none">
              <SelectValue placeholder="Semua Produk" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-neutral-200">
              <SelectGroup>
                <SelectItem className="rounded-2xl" value="all">
                  Semua Produk
                </SelectItem>
                <SelectItem className="rounded-2xl" value="umrah">
                  Umrah
                </SelectItem>
                <SelectItem className="rounded-2xl" value="haji">
                  Haji
                </SelectItem>
                <SelectItem className="rounded-2xl" value="halal-trip">
                  Halal Trip
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Select defaultValue="all">
            <SelectTrigger className="h-10 w-full rounded-3xl border-neutral-200 shadow-none">
              <SelectValue placeholder="Semua Produk" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-neutral-200">
              <SelectGroup>
                <SelectItem className="rounded-2xl" value="all">
                  Semua Tahapan
                </SelectItem>
                <SelectItem className="rounded-2xl" value="banana">
                  Menunggu Konfirmasi
                </SelectItem>
                <SelectItem className="rounded-2xl" value="blueberry">
                  Menunggu Pelunasan & Data Jamaah
                </SelectItem>
                <SelectItem className="rounded-2xl" value="grapes">
                  Siap Berangkat
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <DateRangePicker />
        </div>
      </div>

      {/* Transaction Card */}
      <TransactionCard
        status="Akan Datang"
        id="123456"
        packageName="Package Name"
        startDate="2023-10-10"
        endDate="2023-10-20"
        createdDate="2023-10-20"
        participants={5}
        balance={1000000}
      />

      <CustomPagination currentPage={1} totalPages={100} goToPage={goToPage} />
    </Fragment>
  )
}
