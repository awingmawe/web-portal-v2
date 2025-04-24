'use client'

import { Button } from '@/components/ui/button'
import NoPackageAvailable from '@/public/images/no-data-package.png'
import Image from 'next/image'

interface NoResultsProps {
  resetAllFilters: () => void
}

export const NoResults: React.FC<NoResultsProps> = ({ resetAllFilters }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-3/4 flex-row items-center gap-3.5 max-lg:flex-col">
        <Image src={NoPackageAvailable} alt="no-packages-available" />
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-l-semibold mb-2 text-neutral-900">
            Pencarian Tidak Ditemukan
          </p>
          <p className="text-l-regular mb-3 text-neutral-500">
            Hasil yang ingin kamu cari tidak ditemukan. Silakan hapus beberapa
            filter yang digunakan
          </p>
          <Button className="px-10 py-3" onClick={resetAllFilters}>
            Reset Filter
          </Button>
        </div>
      </div>
    </div>
  )
}
