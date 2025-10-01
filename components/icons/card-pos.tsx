import { IconProps } from '@/constant/types/IconProps'
import React from 'react'

export const CardPosIcon: React.FC<IconProps> = ({
  className = '',
  size = 36,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M5.89453 23.8188L23.8195 5.8938"
        stroke="#ffc14b"
        strokeWidth="2.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6523 27.4187L18.4523 25.6187"
        stroke="#ffc14b"
        strokeWidth="2.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.6875 23.3831L24.2725 19.7981"
        stroke="#ffc14b"
        strokeWidth="2.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.4019 15.3585L15.3619 5.3985C18.5419 2.2185 20.1319 2.2035 23.2819 5.3535L30.6469 12.7185C33.7969 15.8685 33.7819 17.4585 30.6019 20.6385L20.6419 30.5985C17.4619 33.7785 15.8719 33.7935 12.7219 30.6435L5.3569 23.2785C2.20691 20.1285 2.2069 18.5535 5.4019 15.3585Z"
        stroke="#ffc14b"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 32.9978H33"
        stroke="#ffc14b"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
