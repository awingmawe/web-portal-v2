import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const ArrowIcon: React.FC<IconProps> = ({
  className = '',
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-current', className)}
      {...props}
    >
      <path
        d="M11.3223 4.44751L15.8748 9.00001L11.3223 13.5525"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.125 9H15.7475"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export const ArrowDiagonalIcon: React.FC<IconProps> = ({ size, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M18.0019 7.05C18.0019 6.78478 17.8965 6.53043 17.709 6.34289C17.5215 6.15536 17.2671 6.05 17.0019 6.05L9.00189 6C8.73668 6 8.48232 6.10536 8.29479 6.29289C8.10725 6.48043 8.00189 6.73478 8.00189 7C8.00189 7.26522 8.10725 7.51957 8.29479 7.70711C8.48232 7.89464 8.73668 8 9.00189 8H14.5619L6.29189 16.29C6.19816 16.383 6.12377 16.4936 6.073 16.6154C6.02223 16.7373 5.99609 16.868 5.99609 17C5.99609 17.132 6.02223 17.2627 6.073 17.3846C6.12377 17.5064 6.19816 17.617 6.29189 17.71C6.38486 17.8037 6.49546 17.8781 6.61732 17.9289C6.73917 17.9797 6.86988 18.0058 7.00189 18.0058C7.1339 18.0058 7.26461 17.9797 7.38647 17.9289C7.50833 17.8781 7.61893 17.8037 7.71189 17.71L16.0019 9.42V15C16.0019 15.2652 16.1072 15.5196 16.2948 15.7071C16.4823 15.8946 16.7367 16 17.0019 16C17.2671 16 17.5215 15.8946 17.709 15.7071C17.8965 15.5196 18.0019 15.2652 18.0019 15V7.05Z"
        fill="black"
      />
    </svg>
  )
}
export const ArrowLongIcon: React.FC<IconProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="62"
      height="19"
      viewBox="0 0 62 19"
      fill="none"
    >
      <path
        d="M56.3223 4.94751L60.8748 9.50001L56.3223 14.0525"
        stroke="#969696"
        strokeWidth="1.125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 9.5L61 9.50001"
        stroke="#969696"
        strokeWidth="1.125"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
