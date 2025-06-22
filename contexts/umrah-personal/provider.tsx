'use client'

import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import {
  INITIAL_STEP,
  STEP_1,
  STEP_2,
  STEP_3,
  STEP_4,
  TOTAL_STEPS,
} from '@/contexts/umrah-personal/constant'
import { UmrahPersonalContext } from '@/contexts/umrah-personal/context'
import React, { useState } from 'react'
import { UseFormReturn, UseFormTrigger } from 'react-hook-form'

export const UmrahPersonalProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  // Use useState instead of useRef for reactive state
  const [currentStep, setCurrentStep] = useState<number>(INITIAL_STEP)
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
    }
  }

  // Validate current step and move to next
  const handleNext = async (
    trigger: UseFormTrigger<any>,
    form: UseFormReturn<UmrahPersonalFormType>
  ) => {
    let isValid = false
    let stepToValidate = ''

    switch (currentStep) {
      case 1:
        stepToValidate = STEP_1
        isValid = await trigger(STEP_1)
        break
      case 2:
        stepToValidate = STEP_2
        isValid = await trigger(STEP_2)
        break
      case 3:
        stepToValidate = STEP_3
        isValid = await trigger(STEP_3)
        break
      case 4:
        stepToValidate = STEP_4
        isValid = await trigger(STEP_4)
        break
      case 5:
        isValid = true
        break
    }

    // Enhanced debugging
    console.log('=== VALIDATION DEBUG ===')
    console.log('Current Step:', currentStep)
    console.log('Step to Validate:', stepToValidate)
    console.log('Is Valid:', isValid)
    console.log('Form Values:', form.getValues())
    console.log('Form Errors:', form.formState.errors)
    console.log('Touched Fields:', form.formState.touchedFields)
    console.log('========================')

    // Check specific field values for step 2
    if (currentStep === 2) {
      const flightInfo = form.getValues('flightInformation')
      console.log('Flight Info Values:', flightInfo)
      console.log(
        'Departure Airport ID:',
        flightInfo?.departure?.from?.airport?.id
      )
      console.log('Arrival Airport ID:', flightInfo?.departure?.to?.airport?.id)
    }

    if (Object.keys(form.formState.errors).length > 0) {
      const firstError = Object.keys(form.formState.errors)[0]
      const firstErrorStep = Object.keys(
        (form.formState.errors as Record<string, any>)[firstError] ?? {}
      )[0]

      console.log('First Error:', firstError)
      console.log('First Error Step:', firstErrorStep)

      const errorElement = document.getElementById(
        `${firstError}.${firstErrorStep}`
      )
      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        })
      }
    }

    if (isValid) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      setTimeout(() => {
        scrollToStep(nextStep)
      }, 100)
    }
  }

  const value = {
    currentStep,
    setCurrentStep: setCurrentStepFunction,
    totalSteps: TOTAL_STEPS,
    isStepValid,
    scrollToStep,
    handlePrevious,
    handleNext,
    scrollContainerRef,
  }

  return (
    <UmrahPersonalContext.Provider value={value}>
      {children}
    </UmrahPersonalContext.Provider>
  )
}

// Custom hook to use the context
export { UmrahPersonalContext }
