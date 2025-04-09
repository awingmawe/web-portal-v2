'use client'

import { toast } from '@/components/ui/sonner'
import { Copy } from 'lucide-react'
import React from 'react'

interface ReferralProps {
  referral: string
}

export const Referral: React.FC<ReferralProps> = ({ referral }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referral)
      .then(() => toast.success('Kode Referral disalin!'))
      .catch((err) => console.error('Failed to copy text: ', err))
  }

  return (
    <div className="bg-primary-500 relative mt-5 overflow-hidden rounded-3xl p-5">
      <div className="bg-primary-400 absolute -top-20 -left-5 z-10 h-45 w-45 rounded-full"></div>

      <div className="relative z-20">
        <h3 className="mb-4">
          <span className="text-l-medium">Kode Referral : </span>
          <span className="heading-4-bold">{referral}</span>
        </h3>
        <button
          onClick={copyToClipboard}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
        >
          Salin Kode Referral
          <Copy size={18} />
        </button>
      </div>
    </div>
  )
}
