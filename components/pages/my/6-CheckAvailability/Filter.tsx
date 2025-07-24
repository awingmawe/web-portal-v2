'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ChangeEvent } from 'react'

interface SearchAndFilterProps {
  searchQuery: string
  productFilter: string
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleProductChange: (value: string) => void
}

export const SearchAndFilter = ({
  searchQuery,
  productFilter,
  handleSearchChange,
  handleProductChange,
}: SearchAndFilterProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 max-lg:hidden md:grid-cols-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Cari berdasarkan Nama Paket"
          className="w-full rounded-full"
          value={searchQuery}
          onChange={handleSearchChange}
          endIcon={<Search className="h-5 w-5 text-gray-400" />}
        />
      </div>
      <div className="relative">
        <select
          value={productFilter}
          onChange={(e) => handleProductChange(e.target.value)}
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700"
        >
          <option value="">Pilih Produk</option>
          <option value="umroh">Umroh</option>
          <option value="haji">Haji</option>
        </select>
      </div>
    </div>
  )
}

interface SearchAndFilterMobileProps {
  searchQuery: string
  productFilter: string
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleProductChange: (value: string) => void
  setIsLoadingMobile: (value: boolean) => void
}

export const SearchAndFilterMobile = ({
  searchQuery,
  productFilter,
  handleSearchChange,
  handleProductChange,
  setIsLoadingMobile,
}: SearchAndFilterMobileProps) => {
  return (
    <div className="scrollbar-hide flex flex-col gap-2 px-5">
      <div>
        <Input
          model="compact"
          startIcon={<Search size={16} className="text-neutral-300" />}
          placeholder="Cari ID Transaksi"
          className="w-full py-1.5"
          value={searchQuery}
          onChange={(e) => {
            setIsLoadingMobile(true)
            handleSearchChange(e)
          }}
        />
      </div>
      <div>
        <select
          value={productFilter}
          onChange={(e) => {
            handleProductChange(e.target.value)
            setIsLoadingMobile(true)
          }}
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700"
        >
          <option value="">Pilih Produk</option>
          <option value="umroh">Umroh</option>
          <option value="haji">Haji</option>
        </select>
      </div>
    </div>
  )
}
