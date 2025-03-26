import { IconProps } from '@/constant/types/IconProps'
import React from 'react'

export const AirPlane: React.FC<IconProps> = ({
  size,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 60}
      height={size || 60}
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M35.3636 35.4542H52.1818C52.1818 35.4542 57.4545 34.8178 58.0909 31.5451C58.7273 28.2724 53.4545 27.9087 53.4545 27.9087L52.2727 26.9996C50.5455 25.636 48.3636 24.9996 46.1818 25.0906L4 26.636L4.18182 30.9087L17.6364 34.7269C19.8182 35.1815 22.0909 35.4542 24.3636 35.4542"
        stroke="currentColor"
        strokeWidth="2.8125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.00036 26.6367L2.63672 17.6367H7.00035L12.2731 26.364"
        stroke="currentColor"
        strokeWidth="2.8125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.3634 31.3633L17.6361 44.4542C17.3634 44.8178 17.4543 45.2724 17.8179 45.5451C17.9088 45.636 18.0907 45.7269 18.2725 45.7269H22.727C22.9088 45.7269 23.0907 45.636 23.1816 45.5451L40.4543 31.2724M25.3634 25.9087L17.6361 15.636C17.3634 15.2724 17.4543 14.8178 17.8179 14.5451C17.9088 14.4542 18.0907 14.3633 18.2725 14.3633H22.727C22.9088 14.3633 23.0907 14.4542 23.1816 14.5451L36.3634 25.4542"
        stroke="currentColor"
        strokeWidth="2.8125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
