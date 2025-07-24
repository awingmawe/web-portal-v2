/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'

interface UseStepVisibilityProps {
  currentStep: number
  totalSteps: number
  scrollContainerRef?: React.RefObject<HTMLElement>
}

export const useStepVisibility = ({
  currentStep,
  totalSteps,
  scrollContainerRef,
}: UseStepVisibilityProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set([1]))

  // Function to show/hide specific steps
  const setStepVisibility = useCallback(
    (stepNumber: number, visible: boolean) => {
      const element = document.getElementById(
        `umrah-personal-step-${stepNumber}`
      )
      if (element) {
        element.style.display = visible ? 'block' : 'none'
        element.style.opacity = visible ? '1' : '0'
        element.style.transition = 'opacity 0.3s ease-in-out'
      }
    },
    []
  )

  // Function to show all steps (for scrolling)
  const showAllSteps = useCallback(() => {
    Array.from({ length: totalSteps }, (_, i) => i + 1).forEach((step) => {
      setStepVisibility(step, true)
    })
  }, [totalSteps, setStepVisibility])

  // Function to hide all steps except target
  const showOnlyStep = useCallback(
    (stepNumber: number) => {
      Array.from({ length: totalSteps }, (_, i) => i + 1).forEach((step) => {
        setStepVisibility(step, step === stepNumber)
      })
      setVisibleSteps(new Set([stepNumber]))
    },
    [totalSteps, setStepVisibility]
  )

  // Function to scroll to specific step with animation
  const scrollToStep = useCallback(
    async (stepNumber: number) => {
      const stepElement = document.getElementById(
        `umrah-personal-step-${stepNumber}`
      )
      const container = scrollContainerRef?.current

      if (!stepElement || !container) {
        showOnlyStep(stepNumber)
        return
      }

      setIsTransitioning(true)

      try {
        // Step 1: Show all steps for smooth scrolling
        showAllSteps()

        // Step 2: Wait for DOM to update
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Step 3: Calculate and perform scroll
        const elementRect = stepElement.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const scrollTop = container.scrollTop
        const targetScrollTop = scrollTop + elementRect.top - containerRect.top

        container.scrollTo({
          top: targetScrollTop - 200000,
          behavior: 'smooth',
        })

        // Step 4: Wait for scroll animation
        await new Promise((resolve) => setTimeout(resolve, 600))

        // Step 5: Hide non-active steps
        showOnlyStep(stepNumber)
      } catch (error) {
        console.error('Error during step transition:', error)
        showOnlyStep(stepNumber)
      } finally {
        setIsTransitioning(false)
      }
    },
    [scrollContainerRef, showAllSteps, showOnlyStep]
  )

  // Initialize visibility on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      showOnlyStep(currentStep || 1)
    }, 100)

    return () => clearTimeout(timer)
  }, []) // Only run on mount

  // Handle step changes
  useEffect(() => {
    if (currentStep && !visibleSteps.has(currentStep)) {
      scrollToStep(currentStep)
    }
  }, [currentStep, visibleSteps, scrollToStep])

  return {
    isTransitioning,
    scrollToStep,
    showOnlyStep,
    showAllSteps,
    setStepVisibility,
  }
}
