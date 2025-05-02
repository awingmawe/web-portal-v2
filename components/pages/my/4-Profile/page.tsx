'use client'

import BottomNavigation from '@/components/shared/mobile/BottomNavigation'
import { ACCOUNT_URL } from '@/constant/env'

export default function MyProfilePage() {
  return (
    <div>
      <iframe
        src={`${ACCOUNT_URL}/dashboard/profile?noTopbar=true&noSidebar=true`}
        className="h-screen w-full rounded-3xl border border-neutral-100 bg-white shadow-sm"
      ></iframe>
      <BottomNavigation />
    </div>
  )
}
