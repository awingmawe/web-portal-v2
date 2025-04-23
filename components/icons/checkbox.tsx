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
        stroke="currentColor"
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

export const ChecklistCircle: React.FC<IconProps> = ({
  className = '',
  size = 14,
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
        d="M7.0013 1.1665C3.78714 1.1665 1.16797 3.78567 1.16797 6.99984C1.16797 10.214 3.78714 12.8332 7.0013 12.8332C10.2155 12.8332 12.8346 10.214 12.8346 6.99984C12.8346 3.78567 10.2155 1.1665 7.0013 1.1665ZM9.78964 5.65817L6.48214 8.96567C6.40047 9.04734 6.28964 9.094 6.17297 9.094C6.0563 9.094 5.94547 9.04734 5.8638 8.96567L4.21297 7.31484C4.0438 7.14567 4.0438 6.86567 4.21297 6.6965C4.38214 6.52734 4.66214 6.52734 4.8313 6.6965L6.17297 8.03817L9.1713 5.03984C9.34047 4.87067 9.62047 4.87067 9.78964 5.03984C9.9588 5.209 9.9588 5.48317 9.78964 5.65817Z"
        fill="#D2D2D1"
      />
    </svg>
  )
}

export const ChecklistCircle2: React.FC<IconProps> = ({
  className = '',
  size = 14,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-current', className)}
      {...props}
    >
      <path
        d="M8.74355 5.20355L8.7436 5.2036L8.74949 5.19751C9.07859 4.85706 9.08706 4.30995 8.74355 3.96645C8.40329 3.62618 7.84671 3.62618 7.50645 3.96645L5.29 6.18289L4.49355 5.38645C4.15329 5.04618 3.59671 5.04618 3.25645 5.38645C2.91618 5.72671 2.91618 6.28329 3.25645 6.62355L4.67145 8.03855C4.83414 8.20125 5.05589 8.295 5.29 8.295C5.52411 8.295 5.74586 8.20125 5.90855 8.03855L8.74355 5.20355ZM1.5 6C1.5 3.52114 3.52114 1.5 6 1.5C8.47886 1.5 10.5 3.52114 10.5 6C10.5 8.47886 8.47886 10.5 6 10.5C3.52114 10.5 1.5 8.47886 1.5 6Z"
        fill="#D2D2D1"
        stroke="#D2D2D1"
      />
    </svg>
  )
}

export const ChecklistCircleActive: React.FC<IconProps> = ({
  size = 17,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.9987 1.8335C4.32536 1.8335 1.33203 4.82683 1.33203 8.50016C1.33203 12.1735 4.32536 15.1668 7.9987 15.1668C11.672 15.1668 14.6654 12.1735 14.6654 8.50016C14.6654 4.82683 11.672 1.8335 7.9987 1.8335ZM11.1854 6.96683L7.40536 10.7468C7.31203 10.8402 7.18536 10.8935 7.05203 10.8935C6.9187 10.8935 6.79203 10.8402 6.6987 10.7468L4.81203 8.86016C4.6187 8.66683 4.6187 8.34683 4.81203 8.1535C5.00536 7.96016 5.32536 7.96016 5.5187 8.1535L7.05203 9.68683L10.4787 6.26016C10.672 6.06683 10.992 6.06683 11.1854 6.26016C11.3787 6.4535 11.3787 6.76683 11.1854 6.96683Z"
        fill="#00704E"
      />
    </svg>
  )
}
