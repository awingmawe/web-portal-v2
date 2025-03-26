import { IconProps } from '@/constant/types/IconProps'
import React from 'react'

export const ApprovedShield: React.FC<IconProps> = ({
  size,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 60}
      height={size || 62}
      viewBox="0 0 60 62"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M6 12.87C6 11.9476 6.79484 11.2259 7.71297 11.3147L9.85609 11.5222C15.1464 12.0341 20.4266 10.4521 24.5639 7.1156L29.2379 3.34623C29.8103 2.88459 30.6272 2.88459 31.1996 3.34623L35.8736 7.1156C40.0109 10.4521 45.2911 12.0341 50.5814 11.5222L52.7245 11.3147C53.6427 11.2259 54.4375 11.9476 54.4375 12.87V33.1872C54.4375 39.9254 51.0959 46.2251 45.5173 50.0042L33.7241 57.9932C31.6072 59.4272 28.8303 59.4272 26.7134 57.9932L14.9203 50.0042C9.34156 46.2251 6 39.9254 6 33.1872V12.87Z"
        stroke="white"
        strokeWidth="5"
      />
      <path
        d="M21.625 30.7045C23.4903 32.3957 27.3009 35.8507 27.6206 36.1406C27.9404 36.4305 35.2151 29.4964 38.8125 25.9932"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}
