'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const TopbarUmrahPersonalOfferHeader = ({
  journeyCode,
}: {
  journeyCode: string
}) => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between max-lg:hidden">
      <div
        className="flex cursor-pointer items-center gap-1"
        onClick={() => router.push('/my/paket-personal')}
      >
        <ChevronLeft />
        <p className="heading-4-semibold">Daftar Penawaran Paket Personal</p>
      </div>
      <p className="text-m-medium text-neutral-500">ID: {journeyCode}</p>
    </div>
  )
}

export default TopbarUmrahPersonalOfferHeader
