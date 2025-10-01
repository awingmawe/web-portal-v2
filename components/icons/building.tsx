import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const BuildingIcon: React.FC<IconProps> = ({
  className = '',
  size,
  color,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(`${color && 'stroke-current'}`, color, className)}
      {...props}
    >
      <path
        d="M8.66683 14.6666H3.3335C2.00016 14.6666 1.3335 13.9999 1.3335 12.6666V7.33325C1.3335 5.99992 2.00016 5.33325 3.3335 5.33325H6.66683V12.6666C6.66683 13.9999 7.3335 14.6666 8.66683 14.6666Z"
        stroke={color ? color : '#424242'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.74015 2.66675C6.68682 2.86675 6.66683 3.08675 6.66683 3.33341V5.33341H3.3335V4.00008C3.3335 3.26675 3.9335 2.66675 4.66683 2.66675H6.74015Z"
        stroke={color ? color : '#424242'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3335 5.33325V8.66659"
        stroke={color ? color : '#424242'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5.33325V8.66659"
        stroke={color ? color : '#424242'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3335 11.3333H10.0002C9.6335 11.3333 9.3335 11.6333 9.3335 11.9999V14.6666H12.0002V11.9999C12.0002 11.6333 11.7002 11.3333 11.3335 11.3333Z"
        stroke={color ? color : '#424242'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8.66675V11.3334"
        stroke={color ? color : '#424242'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.6665 12.6666V3.33325C6.6665 1.99992 7.33317 1.33325 8.6665 1.33325H12.6665C13.9998 1.33325 14.6665 1.99992 14.6665 3.33325V12.6666C14.6665 13.9999 13.9998 14.6666 12.6665 14.6666H8.6665C7.33317 14.6666 6.6665 13.9999 6.6665 12.6666Z"
        stroke={color ? color : '#424242'}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
