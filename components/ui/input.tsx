'use client'

import { dissolve } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'
import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  align?: string
  model?: 'compact' | 'normal' | 'expended'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      disabled,
      align,
      model = 'compact',
      ...props
    },
    ref
  ) => {
    const containerSizeClasses = {
      compact: 'py-[10px]',
      normal: 'py-[14px]',
      expended: 'py-[14px]',
    }

    const textSizeClasses = {
      compact: 'text-m-regular',
      normal: 'text-m-regular',
      expended: 'text-l-regular',
    }

    const iconSizeClasses = {
      compact: 'h-4 w-4',
      normal: 'h-4 w-4',
      expended: 'h-[18px] w-[18px]',
    }
    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className="text-s-regular mb-1 block text-neutral-800"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            'bg-neutral-0 flex w-full items-center gap-1 rounded-full border border-neutral-200 px-4',
            containerSizeClasses[model],
            endIcon ? 'justify-between' : '',
            disabled ? 'cursor-not-allowed text-neutral-300' : '',
            error ? 'border-error-500' : '',
            'focus-within:border-info-500',
            dissolve,
            className
          )}
        >
          {startIcon && React.isValidElement(startIcon)
            ? React.cloneElement(startIcon as React.ReactSVGElement, {
                className: cn(
                  iconSizeClasses[model],
                  (startIcon as React.ReactSVGElement).props.className
                ),
              })
            : startIcon}

          <input
            type={type}
            className={cn(
              'focus-within:border-info-500 focus:border-info-500 h-full w-full bg-transparent text-neutral-900 placeholder:text-neutral-300 focus:outline-none disabled:cursor-not-allowed max-lg:!text-base',
              align,
              textSizeClasses[model]
            )}
            disabled={disabled}
            ref={ref}
            {...props}
          />

          {endIcon && React.isValidElement(endIcon)
            ? React.cloneElement(endIcon as React.ReactSVGElement, {
                className: cn(
                  iconSizeClasses[model],
                  (endIcon as React.ReactSVGElement).props.className
                ),
              })
            : endIcon}
        </div>

        {error && <p className="text-s-regular text-error-500 mt-1">{error}</p>}

        {helperText && !error && (
          <p className="text-s-regular mt-1 text-neutral-600">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
