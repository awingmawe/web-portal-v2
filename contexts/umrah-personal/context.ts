'use client'

import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { INITIAL_STEP, TOTAL_STEPS } from '@/contexts/umrah-personal/constant'
import { createContext, useContext } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface UmrahPersonalContextType {
  // Step management
  // currentStep: number represents the current step in the form
  // setCurrentStep: function to update the current step
  // totalSteps: total number of steps in the form
  // setTotalSteps: function to update the total number of steps
  // isStepValid: function to check if a step is valid
  // scrollToStep: function to scroll to a specific step
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  setTotalSteps: (totalSteps: number) => void
  isStepValid: (step: number) => boolean
  scrollToStep?: (stepNumber: number) => void

  // Navigation handlers
  // handlePrevious: function to handle going back to the previous step
  // handleNext: function to handle going to the next step, which can trigger validation
  // and return a promise that resolves to a boolean indicating success or failure
  handlePrevious?: () => void
  handleNext?: (
    trigger: () => Promise<boolean>,
    form: UseFormReturn<UmrahPersonalFormType>
  ) => Promise<void>

  // Dialog management
  // openDialogDrawerEndForm: function to open drawer(mobile) or dialog(desktop) if want to back
  // setOpenDialogDrawerEndForm: function to update openDialogDrawerEndForm
  openDialogDrawerEndForm: boolean
  setOpenDialogDrawerEndForm: (open: boolean) => void

  // This can be used to reference the scrollable container for smooth scrolling
  scrollContainerRef?: React.RefObject<HTMLDivElement>
}

export const UmrahPersonalContext = createContext<UmrahPersonalContextType>({
  currentStep: INITIAL_STEP,
  setCurrentStep: () => {},
  totalSteps: TOTAL_STEPS,
  setTotalSteps: () => {},
  isStepValid: () => false,
  scrollToStep: () => {},
  handlePrevious: () => {},
  openDialogDrawerEndForm: false,
  setOpenDialogDrawerEndForm: () => {},
  handleNext: async () => {
    return Promise.resolve()
  },
  scrollContainerRef: undefined,
})

export const useUmrahPersonal = () => {
  const context = useContext(UmrahPersonalContext)
  if (context === undefined) {
    throw new Error(
      'useUmrahPersonal must be used within a UmrahPersonalProvider'
    )
  }
  return context
}
