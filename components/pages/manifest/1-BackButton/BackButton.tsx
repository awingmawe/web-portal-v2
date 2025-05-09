'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  className?: string
}

export const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <p
      className={`heading-4-semibold sticky top-5 w-fit text-neutral-900 ${className} z-99 flex cursor-pointer items-center`}
      onClick={handleBack}
    >
      <ChevronLeft />
      Kembali
    </p>
  )
}
