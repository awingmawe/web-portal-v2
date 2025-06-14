'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { useRouter } from 'next/navigation'

const TopbarMobile = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <div className="bg-neutral-0 absolute top-0 z-99 flex w-full items-center justify-between px-4 py-3 lg:hidden">
      <ArrowIcon size={20} className="rotate-180" onClick={handleBack} />
      <p className="text-l-semibold">Umrah Personal</p>
      <div />
    </div>
  )
}

export default TopbarMobile
