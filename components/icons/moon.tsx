import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const MoonIcon: React.FC<IconProps> = ({
  className = '',
  size = 22,
  color,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M21.2826 13.5237C21.4348 12.9531 20.5482 12.7162 20.1685 13.1716C18.8858 14.7098 17.012 15.7686 14.8456 15.9866C10.4857 16.4252 6.59181 13.2923 6.14823 8.989C5.8054 5.66334 7.62363 2.61195 10.4798 1.19467C10.5804 1.14476 10.5414 0.989317 10.4295 1.00058C4.84886 1.56204 0.785165 6.48247 1.35295 11.9907C1.92073 17.4989 6.905 21.509 12.4856 20.9476C16.8178 20.5117 20.2358 17.449 21.2826 13.5237Z"
        fill={color || '#E7E7E7'}
        stroke={color || '#E7E7E7'}
      />
    </svg>
  )
}

export default MoonIcon
