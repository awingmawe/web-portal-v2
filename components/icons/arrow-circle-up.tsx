import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const ArrowCircleUp: React.FC<IconProps> = ({
  className = '',
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-current', className)}
      {...props}
    >
      <path
        d="M7.00033 12.8334C10.222 12.8334 12.8337 10.2217 12.8337 7.00008C12.8337 3.77842 10.222 1.16675 7.00033 1.16675C3.77866 1.16675 1.16699 3.77842 1.16699 7.00008C1.16699 10.2217 3.77866 12.8334 7.00033 12.8334Z"
        stroke="#131313"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.94043 7.73497L6.9996 5.68164L9.05876 7.73497"
        stroke="#131313"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
