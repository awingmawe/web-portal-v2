'use client'

import { ACTIVITY_TYPES } from '@/constant/schema/umrah-personal-schema/constant'
import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { useEventTracker } from '@/contexts/event-tracker/context'
import {
  INITIAL_STEP,
  STEP_1,
  STEP_2,
  STEP_3,
  STEP_4,
  STEP_5,
  TOTAL_STEPS,
} from '@/contexts/umrah-personal/constant'
import { UmrahPersonalContext } from '@/contexts/umrah-personal/context'
import React, { useState } from 'react'
import { UseFormReturn, UseFormTrigger } from 'react-hook-form'

export const UmrahPersonalProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  // Use useState instead of useRef for reactive state
  const { pushEvent } = useEventTracker()
  const [currentStep, setCurrentStep] = useState<number>(INITIAL_STEP)
  const [totalSteps, setTotalSteps] = useState<number>(TOTAL_STEPS)
  const [openDialogDrawerEndForm, setOpenDialogDrawerEndForm] = useState(false)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null!) // non-null assertion for context type compatibility

  const isStepValid = (step: number) => {
    return step >= 1 && step <= TOTAL_STEPS
  }
  const setCurrentStepFunction = (step: number) => {
    if (isStepValid(step)) {
      setCurrentStep(step)
    }
  }

  // Function to scroll to specific step with smooth animation
  const scrollToStep = (stepNumber: number) => {
    const stepElement = document.getElementById(
      `umrah-personal-step-${stepNumber}`
    )
    const container = scrollContainerRef.current

    if (stepElement && container) {
      // Get the position of the step element relative to the container
      const containerRect = container.getBoundingClientRect()
      const stepRect = stepElement.getBoundingClientRect()

      // Calculate the scroll position
      const scrollTop = stepRect.top - containerRect.top + container.scrollTop

      // Smooth scroll within the container
      container.scrollTo({
        top: scrollTop, // Adjust for top bar height if needed
        behavior: 'smooth',
      })
    }
  }

  // Move to previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)

      // Scroll to previous step after state update
      setTimeout(() => {
        scrollToStep(prevStep)
      }, 100)
    } else if (currentStep === 1) {
      setOpenDialogDrawerEndForm(true)
    }
  }

  // helper functions for find index of error in input field
  const findFirstErrorPath = (
    errors: any,
    basePath: string = ''
  ): string | null => {
    if (!errors || typeof errors !== 'object') {
      return null
    }

    for (const [key, value] of Object.entries(errors)) {
      const currentPath = basePath ? `${basePath}.${key}` : key

      // If this is an error object with a message, we found an error
      if (value && typeof value === 'object' && 'message' in value) {
        return currentPath
      }

      // If this is a nested object, recurse into it
      if (value && typeof value === 'object' && !('message' in value)) {
        const nestedPath = findFirstErrorPath(value, currentPath)
        if (nestedPath) {
          return nestedPath
        }
      }
    }

    return null
  }

  // Validate current step and move to next
  const handleNext = async (
    trigger: UseFormTrigger<any>,
    form: UseFormReturn<UmrahPersonalFormType>
  ) => {
    let isValid = false
    let currentStepKey = ''
    let titleStepName = ''

    form.clearErrors()

    switch (currentStep) {
      case 1:
        currentStepKey = STEP_1
        titleStepName = 'Informasi Perjalanan'
        isValid = await trigger(STEP_1)
        break
      case 2:
        currentStepKey = STEP_2
        titleStepName = 'Detail Keberangkatan'
        isValid = await trigger(STEP_2)
        break
      case 3:
        currentStepKey = STEP_3
        titleStepName = 'Penginapan Makkah'
        break
      case 4:
        currentStepKey =
          form.getValues(`${STEP_1}.activity`) === ACTIVITY_TYPES.MECCA
            ? STEP_5
            : STEP_4
        titleStepName =
          form.getValues(`${STEP_1}.activity`) === ACTIVITY_TYPES.MECCA
            ? 'Transportasi'
            : 'Penginapan Madinah'
        break
      case 5:
        currentStepKey = STEP_5
        titleStepName = 'Transportasi'
        isValid = true
        break
    }

    if (!isValid && currentStep < 3) {
      const stepErrors =
        form.formState.errors[
          currentStepKey as keyof typeof form.formState.errors
        ]

      if (stepErrors) {
        const firstErrorPath = findFirstErrorPath(stepErrors, currentStepKey)

        if (firstErrorPath) {
          const errorElement = document.getElementById(firstErrorPath)
          if (errorElement && scrollContainerRef.current) {
            const containerRect =
              scrollContainerRef.current.getBoundingClientRect()
            const errorRect = errorElement.getBoundingClientRect()

            const scrollTop =
              errorRect.top -
              containerRect.top +
              scrollContainerRef.current.scrollTop

            // Smooth scroll within the container
            scrollContainerRef.current.scrollTo({
              top: scrollTop,
              behavior: 'smooth',
            })
          }
        }
      }
      return
    }

    pushEvent({
      name: 'click_next_umroh_personal',
      category: 'umrah-personal',
      topic: 'umrah',
      data: {
        stepName: titleStepName,
      },
    })

    const nextStep = currentStep + 1
    setCurrentStep(nextStep)
    setTimeout(() => {
      scrollToStep(nextStep)
    }, 100)
  }

  const value = {
    currentStep,
    setCurrentStep: setCurrentStepFunction,
    totalSteps,
    setTotalSteps,
    isStepValid,
    scrollToStep,
    handlePrevious,
    handleNext,
    scrollContainerRef,
    openDialogDrawerEndForm,
    setOpenDialogDrawerEndForm,
  }

  return (
    <UmrahPersonalContext.Provider value={value}>
      {children}
    </UmrahPersonalContext.Provider>
  )
}

// Custom hook to use the context
export { UmrahPersonalContext }
