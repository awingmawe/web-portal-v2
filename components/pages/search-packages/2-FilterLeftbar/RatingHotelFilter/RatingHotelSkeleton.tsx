'use client'

import React from 'react'

interface HotelRatingSkeletonProps {
  starOptions: number[]
}

export const HotelRatingSkeleton: React.FC<HotelRatingSkeletonProps> = ({
  starOptions,
}: {
  starOptions: number[]
}) => {
  return (
    <div className="space-y-2">
      {starOptions.map((item) => (
        <div key={`skeleton-${item}`} className="flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-200"></div>
          <div className="flex gap-1">
            {Array(item)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={`star-skeleton-${idx}`}
                  className="h-6 w-6 animate-pulse rounded bg-neutral-200"
                ></div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
