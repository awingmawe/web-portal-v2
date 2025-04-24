'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as React from 'react'

import { ChevronIcon } from '@/components/icons/chevron'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  noBorder = false,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & {
  noBorder?: boolean
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(`${noBorder ? '' : 'last:border-b-0'}`, className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  noSeparator = false,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  noSeparator?: boolean
}) {
  return (
    <AccordionPrimitive.Header className="flex flex-col">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-3 text-left text-sm font-medium transition-all outline-none focus-visible:outline-0 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        <ChevronIcon size={24} />
      </AccordionPrimitive.Trigger>
      {!noSeparator && <Separator color="#B5B5B5" className="h-[0.5px]" />}
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-6 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
