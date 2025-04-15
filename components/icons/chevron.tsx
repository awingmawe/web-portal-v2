import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const ChevronIcon: React.FC<IconProps> = ({
  className = '',
  size,
  color = 'stroke-current',
  ...props
}) => {
  return (
    <svg
      width={size || 16}
      height={size || 16}
      viewBox={`0 0 16 16`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(`${color}`, className)}
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

export const ChevronRightIcon: React.FC<IconProps> = ({
  className = '',
  size,
  color = 'stroke-current',
  ...props
}) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(`${color}`, className)}
      {...props}
    >
      <path
        d="M8.91016 19.92L15.4302 13.4C16.2002 12.63 16.2002 11.37 15.4302 10.6L8.91016 4.08002"
        stroke="#30302F"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
