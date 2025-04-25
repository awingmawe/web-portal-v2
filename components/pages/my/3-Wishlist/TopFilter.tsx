'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ChangeEvent } from 'react'

interface SearchAndFilterWishlistProps {
  searchQuery: string
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  //   statusFilter: string
  //   handleStatusFilterChange: (value: string) => void
}

export const SearchAndFilterWishlist = ({
  searchQuery,
  handleSearchChange,
  //   statusFilter,
  //   handleStatusFilterChange,
}: SearchAndFilterWishlistProps) => {
  return (
    <div className="grid grid-cols-12 gap-4 max-lg:absolute max-lg:-top-15 max-lg:left-1/2 max-lg:flex max-lg:w-full max-lg:-translate-x-1/2">
      <div className="relative col-span-6 max-lg:col-span-12 max-lg:mx-auto max-lg:w-[90%]">
        <Input
          type="text"
          placeholder="Cari berdasarkan ID"
          className="w-full rounded-full"
          value={searchQuery}
          onChange={handleSearchChange}
          endIcon={<Search className="h-5 w-5 text-gray-400" />}
        />
      </div>

      {/* <div className="relative col-span-6">
        <Select
          defaultValue="all"
          value={statusFilter}
          onValueChange={handleStatusFilterChange}
        >
          <SelectTrigger className="h-10 w-full rounded-3xl border-neutral-200 shadow-none">
            <SelectValue placeholder="Semua Tahapan" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-neutral-200">
            <SelectGroup>
              <SelectItem className="rounded-2xl" value="all">
                Semua Tahapan
              </SelectItem>
              <SelectItem className="rounded-2xl" value="waiting-approval">
                Menunggu Konfirmasi
              </SelectItem>
              <SelectItem className="rounded-2xl" value="coming-soon">
                Menunggu Pelunasan & Data Jemaah
              </SelectItem>
              <SelectItem className="rounded-2xl" value="siap-berangkat">
                Siap Berangkat
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  )
}
