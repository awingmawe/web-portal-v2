import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const ChevronIcon: React.FC<IconProps> = ({
  className = '',
  size,
  color = 'neutral-900',
  ...props
}) => {
  return (
    <svg
      width={size || 16}
      height={size || 16}
      viewBox={`0 0 16 16`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(`stroke-${color} stroke-current`, className)}
      {...props}
    >
      <path
        d="M13.28 5.96667L8.9333 10.3133C8.41997 10.8267 7.57997 10.8267 7.06664 10.3133L2.71997 5.96667"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
