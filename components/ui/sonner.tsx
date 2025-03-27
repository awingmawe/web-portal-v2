'use client'

import { ChecklistIcon } from '@/components/icons/checkbox'
import ErrorIcon from '@/components/icons/error'
import { InfoIconToast } from '@/components/icons/info'
import { WarningIcon } from '@/components/icons/warning'
import { motion } from 'framer-motion'
import React from 'react'
import { Toaster as Sonner, ToasterProps, toast as sonnerToast } from 'sonner'

// Custom progress bar component using Framer Motion
export const ToastProgressBar = ({ color }: { color?: string }) => {
  return (
    <motion.div
      className={`bg-${color} absolute right-0 bottom-0 left-0 h-[5px] origin-left`}
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0 }}
      transition={{
        duration: 3000 / 1000, // Convert ms to seconds for Framer
        ease: 'linear',
      }}
    />
  )
}

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-neutral-0 group-[.toaster]:border-border group-[.toaster]:shadow-lg !rounded-sm !pb-5 relative',
          title: '!text-base !font-light',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          closeButton:
            '!right-0 !left-auto !bg-transparent !border-0 !top-[15px] !text-base',
        },
        closeButton: true,
      }}
      position="top-center"
      duration={3000}
      icons={{
        success: <ChecklistIcon size={20} />,
        error: <ErrorIcon size={20} />,
        warning: <WarningIcon size={20} />,
        info: <InfoIconToast size={20} />,
      }}
      {...props}
    />
  )
}

// Get progress bar color based on toast type
const getProgressBarColor = (type: string): string => {
  switch (type) {
    case 'success':
      return 'success-500'
    case 'error':
      return 'error-500'
    case 'warning':
      return 'warning-500'
    case 'info':
      return 'info-500'
    default:
      return 'primary-500'
  }
}

// Wrap toast functions to include progress bar
const wrapToastFunction = (
  originalFn: typeof sonnerToast.success,
  type: string
) => {
  return (
    messageOrComponent: React.ReactNode | (() => React.ReactNode),
    options?: any
  ) => {
    const progressBarColor = getProgressBarColor(type)

    // If it's a render function
    if (typeof messageOrComponent === 'function') {
      return originalFn(() => {
        const content = messageOrComponent()
        return (
          <>
            {content}
            <ToastProgressBar color={progressBarColor} />
          </>
        )
      }, options)
    }

    // If it's just a message or component
    return originalFn(
      <>
        {messageOrComponent}
        <ToastProgressBar color={progressBarColor} />
      </>,
      options
    )
  }
}

// Custom toast object with wrapped functions
export const toast = {
  ...sonnerToast,
  success: wrapToastFunction(sonnerToast.success, 'success'),
  error: wrapToastFunction(sonnerToast.error, 'error'),
  info: wrapToastFunction(sonnerToast.info, 'info'),
  warning: wrapToastFunction(sonnerToast.warning, 'warning'),
  promise: sonnerToast.promise,
  loading: sonnerToast.loading,
  dismiss: sonnerToast.dismiss,
}

export { Toaster }
