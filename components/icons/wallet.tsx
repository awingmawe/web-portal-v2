import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const WalletIcon: React.FC<IconProps> = ({
  className = '',
  size,
  ...props
}) => {
  return (
    <svg
      width={size || 60}
      height={size || 60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('strokecurrent', className)}
      {...props}
    >
      <path
        d="M12.1875 26.0156C12.1875 22.1324 15.3355 18.9844 19.2188 18.9844H21.0938H30H38.9062H40.7812C44.6645 18.9844 47.8125 22.1324 47.8125 26.0156V33.0469V40.0781C47.8125 44.4791 44.2447 48.0469 39.8438 48.0469H38.9062H30H21.0938H20.1562C15.7553 48.0469 12.1875 44.4791 12.1875 40.0781V33.0469V26.0156Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M40.3125 38.2031C41.6069 38.2031 42.6562 37.1538 42.6562 35.8594C42.6562 34.565 41.6069 33.5156 40.3125 33.5156C39.0181 33.5156 37.9688 34.565 37.9688 35.8594C37.9688 37.1538 39.0181 38.2031 40.3125 38.2031Z"
        fill="currentColor"
      />
      <path
        d="M40.0781 25.0781H20.1562"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M47.8125 30.7031H38.4375C36.3664 30.7031 34.6875 32.382 34.6875 34.4531V37.2656C34.6875 39.3367 36.3664 41.0156 38.4375 41.0156H47.8125"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M46.1719 21.0941V15.7934C46.1719 13.2898 43.7655 11.4894 41.3638 12.1958L18.2812 18.9847"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
