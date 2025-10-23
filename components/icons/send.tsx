import { IconProps } from '@/constant/types/IconProps'
import React from 'react'

export const SendIcon: React.FC<IconProps> = ({
  className,
  color,
  size,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M6.16641 5.26667L13.2414 2.90833C16.4164 1.85 18.1414 3.58333 17.0914 6.75833L14.7331 13.8333C13.1497 18.5917 10.5497 18.5917 8.96641 13.8333L8.26641 11.7333L6.16641 11.0333C1.40807 9.45 1.40807 6.85833 6.16641 5.26667Z"
        stroke={color || '#131313'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.4248 11.375L11.4081 8.38333"
        stroke={color || '#131313'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
