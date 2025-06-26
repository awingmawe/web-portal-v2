'use client'

import { dissolve } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import * as React from 'react'

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label?: string
    description?: string
  }
>(({ className, label, description, ...props }, ref) => {
  const id = React.useId()

  return (
    <div className="flex items-center gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={props.id || id}
        className={cn(
          'peer data-[state=checked]:bg-neutral-0 data-[state=checked]:text-neutral-0 disabled:bg-neutral-0 data-[state=checked]:border-primary-500 h-[16px] w-[16px] shrink-0 cursor-pointer rounded-full border-[0.5px] border-neutral-300 bg-white outline-none disabled:cursor-not-allowed',
          dissolve,
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle
            className={cn(
              'text-primary-500 fill-primary-500 h-[14px] w-full data-[state=checked]:scale-100 data-[state=unchecked]:scale-0',
              dissolve
            )}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {(label || description) && (
        <div className="grid gap-1">
          {label && (
            <label
              htmlFor={props.id || id}
              className="cursor-pointer text-sm font-medium text-neutral-900"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-neutral-600">{description}</p>
          )}
        </div>
      )}
    </div>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
