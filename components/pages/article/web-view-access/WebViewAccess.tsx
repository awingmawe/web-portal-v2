'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function WebViewAccess() {
  const searchParams = useSearchParams()

  useEffect(() => {
    setTimeout(() => {
      window.location.href = searchParams.get('redirectUrl')
        ? String(searchParams.get('redirectUrl'))
        : '/article'
    }, 1000)
  }, [searchParams])
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-[#ffc14b]/20"></div>
          <div
            className="absolute inset-0 h-12 w-12 animate-pulse rounded-full bg-[#ffc14b]/40"
            style={{
              boxShadow: '0 0 15px rgba(255, 193, 0, 0.3)',
              animationDuration: '1.5s',
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
