'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function FaqSearch() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    if (!searchTerm.trim()) return router.push(`/faq`)

    router.push(`/faq?search=${encodeURIComponent(searchTerm)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  const searchOnChange = (value: string) => {
    if (!value.trim()) return router.push(`/faq`)
    setSearchTerm(value)
  }

  return (
    <>
      {/* SEARCH MOBILE */}
      <div className="scrollbar-hide flex gap-2 overflow-x-hidden pl-5 lg:hidden">
        <div className={`pr-t absolute -top-19 left-3.5 w-11/12 md:w-10/12`}>
          <h4 className="heading-5-medium mb-2 text-center">
            Halo, Apa yang bisa kami bantu?
          </h4>
          <Input
            model="expended"
            startIcon={
              <Search size={16} className="text-m-regular text-neutral-300" />
            }
            placeholder="Cari Pertanyaan"
            className="w-full py-1.5"
            onChange={(e) => searchOnChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* SEARCH Desktop */}

      <div className="container mx-auto">
        <section className="mt-8 max-lg:px-4 max-md:hidden">
          <div className="rounded-xl bg-gradient-to-r from-[#FFEAAC] to-[#FFC101] px-8 pt-2 pb-5 max-lg:px-4">
            <div className="text-center">
              <h2 className="mt-4 mb-4 text-3xl max-lg:text-base">
                Cari Pertanyaanmu Disini
              </h2>
              <div className="flex items-center justify-between gap-2">
                <div className="flex w-full items-center justify-between gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1">
                  <Input
                    placeholder="Cari Pertanyaan"
                    className="text-m-regular w-full border-0 pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Search size={16} className="text-neutral-300" />
                </div>
                <Button
                  onClick={handleSearch}
                  variant="default"
                  className="w-min bg-white px-8 py-3"
                >
                  Cari
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
