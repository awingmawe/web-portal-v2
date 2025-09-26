'use client'

import { Fragment } from 'react'
import Topbar from '@/components/shared/Topbar'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import FilterLeftbar from '@/components/pages/search-packages/2-FilterLeftbar'
import { TalanganPackageResults } from './components/TalanganPackageResults'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { FilterProductProvider } from '@/contexts/filter-product-context'

interface DataMinMax {
  minAmount: number
  maxAmount: number
  minTenor?: number
  maxTenor?: number
}

interface TagPackage {
  id: string
  name: string
  slug: string
}

interface Facility {
  id: string
  name: string
  icon?: string
}

interface Section {
  id: string
  name: string
  description?: string
}

interface TalanganPackageSelectionProps {
  token: string
  dataMinMax: DataMinMax
  dataTagPackages: TagPackage[]
  dataFacility: Facility[]
  dataSection: Section[]
}

export default function TalanganPackageSelection({
  token,
  dataMinMax,
  dataTagPackages,
  dataFacility,
  dataSection,
}: TalanganPackageSelectionProps) {
  return (
    <FilterProductProvider>
      <Fragment>
        <Topbar token={token} scrolled />
        
        {/* Custom Header for Talangan */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center">
              <Link href="/banking/credit/form" className="flex items-center text-gray-800 hover:text-gray-600 mr-4">
                <ChevronLeft size={24} className="mr-2" />
                <span className="font-medium">Kembali ke Form</span>
              </Link>
              <div className="border-l pl-4">
                <h1 className="text-xl font-semibold text-gray-900">Pilih Paket Umroh</h1>
                <p className="text-sm text-gray-600">Pilih paket yang sesuai untuk pengajuan talangan Anda</p>
              </div>
            </div>
          </div>
        </div>

        <main className="my-7.5 max-lg:fixed max-lg:mt-auto max-lg:mb-0 max-lg:h-[100vh] max-lg:w-full max-lg:overflow-hidden max-lg:bg-transparent">
          <MobileTopbar variant="filter" showBackButton />
          <section className="scrollbar-hide container mx-auto mt-25 grid grid-cols-12 gap-5 max-lg:absolute max-lg:top-[55px] max-lg:bottom-0 max-lg:z-11 max-lg:mt-0 max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:overflow-y-auto max-lg:rounded-tl-3xl max-lg:rounded-tr-3xl max-lg:bg-white max-lg:px-4 max-lg:py-7.5 max-lg:pb-[130px] max-lg:shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]">
            <div className="col-span-4 max-lg:hidden">
              <FilterLeftbar
                dataMinMax={dataMinMax}
                dataTagPackages={dataTagPackages}
                dataFacility={dataFacility}
                dataSection={dataSection}
              />
            </div>
            <div className="col-span-8 max-lg:col-span-12">
              <TalanganPackageResults />
            </div>
          </section>
        </main>
      </Fragment>
    </FilterProductProvider>
  )
}