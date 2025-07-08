import { IconProps } from '@/constant/types/IconProps'
import React from 'react'

export const Tag2Icon: React.FC<IconProps> = ({ size = 28, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      {...props}
    >
      <path
        d="M4.40476 16.3438L8.93476 20.8738C10.7948 22.7338 13.8148 22.7338 15.6848 20.8738L20.0748 16.4837C21.9348 14.6237 21.9348 11.6037 20.0748 9.73375L15.5348 5.21375C14.5848 4.26375 13.2748 3.75375 11.9348 3.82375L6.93476 4.06375C4.93476 4.15375 3.34476 5.74375 3.24476 7.73375L3.00476 12.7337C2.94476 14.0837 3.45476 15.3938 4.40476 16.3438Z"
        stroke="#8E8E8B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.73438 13.0439C11.1151 13.0439 12.2344 11.9247 12.2344 10.5439C12.2344 9.16323 11.1151 8.04395 9.73438 8.04395C8.35366 8.04395 7.23438 9.16323 7.23438 10.5439C7.23438 11.9247 8.35366 13.0439 9.73438 13.0439Z"
        stroke="#8E8E8B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.2344 18.0439L17.2344 14.0439"
        stroke="#8E8E8B"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
