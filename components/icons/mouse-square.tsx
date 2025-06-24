import { IconProps } from '@/constant/types/IconProps'
import { cn } from '@/lib/utils'
import React from 'react'

export const MouseSquareIcon: React.FC<IconProps> = ({
  className = '',
  size = 32,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className && cn('stroke-current', className)}
      {...props}
    >
      <path
        d="M28.4993 10.027V17.867C28.4993 18.3203 28.0594 18.6403 27.6327 18.507L22.3927 16.8803C20.9527 16.4403 19.406 16.8137 18.3527 17.867C17.286 18.9337 16.8994 20.4937 17.3527 21.9337L18.966 27.1337C19.0993 27.5603 18.7793 28.0003 18.326 28.0003H10.526C5.92602 28.0003 3.16602 25.2537 3.16602 20.6403V10.027C3.16602 5.41366 5.92602 2.66699 10.526 2.66699H21.1393C25.7393 2.66699 28.4993 5.41366 28.4993 10.027Z"
        fill="currentColor"
      />
      <path
        d="M29.7796 25.121L27.6062 25.8543C27.0062 26.0543 26.5262 26.521 26.3262 27.1343L25.5929 29.3076C24.9662 31.1876 22.3262 31.1476 21.7396 29.2676L19.2729 21.3343C18.7929 19.761 20.2462 18.2943 21.8062 18.7876L29.7529 21.2543C31.6196 21.841 31.6462 24.4943 29.7796 25.121Z"
        fill="currentColor"
      />
    </svg>
  )
}
