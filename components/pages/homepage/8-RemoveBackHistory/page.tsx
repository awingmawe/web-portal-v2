'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function RemoveBackHistory() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      localStorage.removeItem('app_navigation_history')
      sessionStorage.removeItem('isLinkAja')
    }
  }, [pathname])

  return <div className="hidden"></div>
}
