import { IconProps } from '@/constant/types/IconProps'
import React from 'react'

export const TimerIcon: React.FC<IconProps> = ({ size = 20, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M12.7021 1.66667H7.30215C4.16881 1.66667 3.92715 4.48334 5.61881 6.01667L14.3855 13.9833C16.0771 15.5167 15.8355 18.3333 12.7021 18.3333H7.30215C4.16881 18.3333 3.92715 15.5167 5.61881 13.9833L14.3855 6.01667C16.0771 4.48334 15.8355 1.66667 12.7021 1.66667Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
