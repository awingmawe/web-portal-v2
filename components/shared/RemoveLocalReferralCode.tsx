'use client'
import { removeLocalReferralCode } from '@/lib/utils'
import { useEffect } from 'react'

export default function RemoveLocalReferralCode() {
  useEffect(() => {
    removeLocalReferralCode()
  }, [])

  return <div className="hidden"></div>
}
