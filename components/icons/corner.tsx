import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const CornerIcon: React.FC<IconProps> = ({
  className = '',
  size = 7,
  color = '#950823',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <g filter="url(#filter0_i_3955_1891)">
        <path d="M7 7V0H0C0 3.86599 3.13401 7 7 7Z" fill={color} />
      </g>
      <defs>
        <filter
          id="filter0_i_3955_1891"
          x="0"
          y="0"
          width="7"
          height="8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.494303 0 0 0 0 0 0 0 0 0 0.094367 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_3955_1891"
          />
        </filter>
      </defs>
    </svg>
  )
}
