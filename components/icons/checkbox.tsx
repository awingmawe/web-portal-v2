import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const CheckboxIcon: React.FC<IconProps> = ({
  className = '',
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 6 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-current', className)}
      {...props}
    >
      <path
        d="M0.833659 3.83332L1.40008 4.25814C1.82877 4.57966 2.43471 4.50611 2.77404 4.09138L5.16699 1.16666"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const ChecklistIcon: React.FC<IconProps> = ({
  className = '',
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <g clipPath="url(#clip0_4320_7606)">
        <path
          d="M19.7988 10.1112C19.7988 15.4615 15.4616 19.7987 10.1113 19.7987C4.76105 19.7987 0.423828 15.4615 0.423828 10.1112C0.423828 4.76093 4.76105 0.423706 10.1113 0.423706C15.4616 0.423706 19.7988 4.76093 19.7988 10.1112ZM8.99078 15.2407L16.1783 8.05316C16.4223 7.8091 16.4223 7.41335 16.1783 7.16929L15.2944 6.28543C15.0504 6.04132 14.6546 6.04132 14.4105 6.28543L8.54883 12.1471L5.81215 9.41039C5.56809 9.16632 5.17234 9.16632 4.92824 9.41039L4.04437 10.2943C3.80031 10.5383 3.80031 10.9341 4.04437 11.1781L8.10688 15.2406C8.35098 15.4847 8.74668 15.4847 8.99078 15.2407Z"
          fill="#00B97D"
        />
      </g>
      <defs>
        <clipPath id="clip0_4320_7606">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.111328 0.111145)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
