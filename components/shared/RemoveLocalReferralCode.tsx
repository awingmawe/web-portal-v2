'use client'
import { removeLocalReferralCode } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function RemoveLocalReferralCode() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      localStorage.removeItem('app_navigation_history')
    }
    removeLocalReferralCode()
  }, [pathname])

  return <div className="hidden"></div>
}
