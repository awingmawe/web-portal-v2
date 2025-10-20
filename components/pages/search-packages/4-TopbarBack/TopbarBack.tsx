'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const TopbarBackLink = () => {
  const router = useRouter()
  return (
    <p
      onClick={() => router.back()}
      className="heading-3-semibold col-span-12 inline-flex w-fit cursor-pointer items-center gap-1 max-lg:hidden"
    >
      <ChevronLeft size={24} />
      Kembali
    </p>
  )
}

export default TopbarBackLink
