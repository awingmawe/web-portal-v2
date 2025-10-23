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
        stroke="#131313"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ChevronCircleDown: React.FC<IconProps> = ({
  className = '',
  size,
  color = 'stroke-current',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(`${color}`, className)}
      {...props}
    >
      <path
        d="M7.00098 1.66669C9.93889 1.66669 12.3348 4.06182 12.335 6.99969C12.335 9.93772 9.939 12.3337 7.00098 12.3337C4.0631 12.3335 1.66797 9.93761 1.66797 6.99969C1.66815 4.06193 4.06321 1.66686 7.00098 1.66669ZM9.65234 5.53778C9.30976 5.25897 8.81137 5.25903 8.46875 5.53778L8.39746 5.60223L7.00098 6.99872L5.60449 5.60223L5.53418 5.53778C5.19162 5.25892 4.69323 5.25908 4.35059 5.53778L4.2793 5.60223C3.93754 5.94402 3.91653 6.48997 4.21582 6.85712L4.2793 6.92743L6.33887 8.987C6.52496 9.17299 6.76487 9.26133 7.00098 9.26141C7.23725 9.26141 7.47786 9.17319 7.66406 8.987L9.72949 6.92157C10.0604 6.57897 10.0887 6.04213 9.78809 5.67352L9.72363 5.60223L9.65234 5.53778Z"
        fill="white"
        stroke="white"
      />
    </svg>
  )
}
