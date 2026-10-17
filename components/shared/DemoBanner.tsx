'use client'

import React, { useState } from 'react'
import { Info, X } from 'lucide-react'

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <aside
      aria-label="Demo Portfolio Announcement"
      className="relative z-[100] w-full bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 px-3 py-2 text-white shadow-md"
    >
      <div className="container mx-auto flex items-center justify-between gap-2 text-xs sm:text-sm">
        <div className="flex flex-1 items-center justify-center gap-2 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200 ring-1 ring-emerald-400/30">
            <Info className="h-3 w-3 text-emerald-300" />
            Portfolio Demo
          </span>
          <p className="font-medium text-emerald-50">
            This website is for <span className="font-semibold text-white">portfolio demonstration purposes only</span>. All bookings, data, and transactions are simulated.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="rounded p-1 text-emerald-200 transition-colors hover:bg-emerald-700/50 hover:text-white focus:outline-none"
          title="Dismiss notice"
          aria-label="Dismiss demo banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  )
}
