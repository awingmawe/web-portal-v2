import { IconProps } from '@/constant/types/IconProps'
import React from 'react'

export const LockIcon2: React.FC<IconProps> = ({
  size,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M37.5 24.875V20.1875C37.5 16.0453 34.1422 12.6875 30 12.6875C25.8578 12.6875 22.5 16.0453 22.5 20.1875V24.875"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30 38.7031V34.25"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 48.3125C36.9899 48.3125 42.6562 42.6461 42.6562 35.6562C42.6562 28.6664 36.9899 23 30 23C23.0101 23 17.3438 28.6664 17.3438 35.6562C17.3438 42.6461 23.0101 48.3125 30 48.3125Z"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  )
}
