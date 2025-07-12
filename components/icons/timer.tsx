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
export const TimerIcon2: React.FC<IconProps> = ({ size = 20, ...props }) => {
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
        d="M10 6.6665V10.8332"
        stroke="black"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 1.6665H12.5"
        stroke="black"
        stroke-width="1.25"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.16732 6.66667C3.25065 7.88333 2.70898 9.4 2.70898 11.0417C2.70898 15.0667 5.97565 18.3333 10.0007 18.3333C14.0257 18.3333 17.2923 15.0667 17.2923 11.0417C17.2923 7.01667 14.0257 3.75 10.0007 3.75C8.95065 3.75 7.95898 3.96667 7.05898 4.36667"
        stroke="black"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
