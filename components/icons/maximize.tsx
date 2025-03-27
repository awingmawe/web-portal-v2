import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const MaximizeIcon: React.FC<IconProps> = ({
  className = '',
  size,
  color,
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
        d="M1.1665 5.82166V5.24999C1.1665 2.33332 2.33317 1.16666 5.24984 1.16666H8.74984C11.6665 1.16666 12.8332 2.33332 12.8332 5.24999V8.74999C12.8332 11.6667 11.6665 12.8333 8.74984 12.8333H8.1665"
        stroke={color ? color : '#30302F'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5835 6.41668L10.506 3.48834H8.16683"
        stroke={color ? color : '#30302F'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5059 3.48834V5.82751"
        stroke={color ? color : '#30302F'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.4165 9.42084V10.9958C6.4165 12.3083 5.8915 12.8333 4.579 12.8333H3.004C1.6915 12.8333 1.1665 12.3083 1.1665 10.9958V9.42084C1.1665 8.10834 1.6915 7.58334 3.004 7.58334H4.579C5.8915 7.58334 6.4165 8.10834 6.4165 9.42084Z"
        stroke={color ? color : '#30302F'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
