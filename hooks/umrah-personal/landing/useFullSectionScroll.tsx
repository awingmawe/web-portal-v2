import {
  AnimationControls,
  useAnimation,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ScrollAnimation {
  selector: string
  property: string
  values: [number, number]
  ease?: string
}

interface UseFullSectionScrollOptions {
  totalSteps: number
  scrollThreshold?: number
  scrollDelay?: number
  onStepChange?: (step: number) => void
  enableWheelScroll?: boolean
  enableProgressScroll?: boolean
  scrollAnimations?: ScrollAnimation[]
  enableProgressBar?: boolean
}

interface UseFullSectionScrollReturn {
  currentStep: number
  isScrolling: boolean
  sectionRef: React.RefObject<HTMLElement | null>
  progress: number
  scrollProgress: any
  progressBarControls: AnimationControls
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  isInViewport: boolean
  getStepAnimation: (step: number) => any
}

export const useFullSectionScroll = ({
  totalSteps,
  scrollThreshold = 0.5,
  scrollDelay = 600,
  onStepChange,
  enableWheelScroll = true,
  enableProgressScroll = false,
  scrollAnimations = [],
  enableProgressBar = true,
}: UseFullSectionScrollOptions): UseFullSectionScrollReturn => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Animation controls
  const progressBarControls = useAnimation()

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Transform scroll progress to step progress
  const progress = useTransform(scrollYProgress, [0, 1], [0, totalSteps - 1])

  // Function to check if section is in viewport
  const isElementInViewport = useCallback(
    (element: HTMLElement) => {
      const rect = element.getBoundingClientRect()
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight
      const windowWidth =
        window.innerWidth || document.documentElement.clientWidth

      const verticalInView =
        rect.top <= windowHeight * scrollThreshold &&
        rect.bottom >= windowHeight * scrollThreshold
      const horizontalInView = rect.left <= windowWidth && rect.right >= 0

      return verticalInView && horizontalInView
    },
    [scrollThreshold]
  )

  // Get animation configuration for specific step
  const getStepAnimation = useCallback(
    (step: number) => {
      return {
        scale: step === currentStep ? 1 : 0.9,
        opacity: step === currentStep ? 1 : 0.7,
        y: step === currentStep ? 0 : step < currentStep ? -50 : 50,
        transition: {
          duration: 0.8,
          ease: 'easeInOut',
        },
      }
    },
    [currentStep]
  )

  // Navigation functions
  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps && step !== currentStep) {
        setCurrentStep(step)
        onStepChange?.(step)

        // Animate progress bar
        if (enableProgressBar) {
          progressBarControls.start({
            scaleX: (step + 1) / totalSteps,
            transition: { duration: 0.6, ease: 'easeOut' },
          })
        }
      }
    },
    [
      currentStep,
      totalSteps,
      onStepChange,
      progressBarControls,
      enableProgressBar,
    ]
  )

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1)
    }
  }, [currentStep, totalSteps, goToStep])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1)
    }
  }, [currentStep, goToStep])

  // Apply scroll animations
  useEffect(() => {
    if (!sectionRef.current || scrollAnimations.length === 0) return

    scrollAnimations.forEach((animation) => {
      const elements = sectionRef.current?.querySelectorAll(animation.selector)
      if (elements) {
        elements.forEach((element) => {
          const htmlElement = element as HTMLElement
          const rect = htmlElement.getBoundingClientRect()
          const sectionRect = sectionRef.current!.getBoundingClientRect()

          // Calculate relative position within section
          const relativeY = (rect.top - sectionRect.top) / sectionRect.height
          const [startValue, endValue] = animation.values

          // Interpolate value based on scroll position
          const interpolatedValue =
            startValue + (endValue - startValue) * relativeY

          // Apply the animation property
          if (animation.property === 'y') {
            htmlElement.style.transform = `translateY(${interpolatedValue}px)`
          } else if (animation.property === 'opacity') {
            htmlElement.style.opacity = interpolatedValue.toString()
          } else if (animation.property === 'scale') {
            htmlElement.style.transform = `scale(${interpolatedValue})`
          }
        })
      }
    })
  }, [currentStep, scrollAnimations])

  // Wheel scroll handling
  useEffect(() => {
    if (!enableWheelScroll) return

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || !isElementInViewport(sectionRef.current)) {
        return
      }

      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0

      // Handle boundary conditions
      if (currentStep === 0 && isScrollingUp) {
        return
      }

      if (currentStep === totalSteps - 1 && isScrollingDown) {
        return
      }

      e.preventDefault()

      if (isScrolling) return

      setIsScrolling(true)

      if (isScrollingDown && currentStep < totalSteps - 1) {
        nextStep()
      } else if (isScrollingUp && currentStep > 0) {
        prevStep()
      }

      setTimeout(() => setIsScrolling(false), scrollDelay)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [
    currentStep,
    isScrolling,
    totalSteps,
    enableWheelScroll,
    scrollDelay,
    nextStep,
    prevStep,
    isElementInViewport,
  ])

  // Progress-based scroll handling
  useEffect(() => {
    if (!enableProgressScroll) return

    const unsubscribe = progress.on('change', (latest) => {
      if (!isScrolling) {
        const newStep = Math.round(latest)
        if (newStep !== currentStep && newStep >= 0 && newStep < totalSteps) {
          setCurrentStep(newStep)
          onStepChange?.(newStep)
        }
      }
    })

    return unsubscribe
  }, [
    progress,
    isScrolling,
    currentStep,
    totalSteps,
    onStepChange,
    enableProgressScroll,
  ])

  // Viewport detection
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const inView = isElementInViewport(sectionRef.current)
        setIsInViewport(inView)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isElementInViewport])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInViewport) return

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault()
          nextStep()
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault()
          prevStep()
          break
        case 'Home':
          e.preventDefault()
          goToStep(0)
          break
        case 'End':
          e.preventDefault()
          goToStep(totalSteps - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isInViewport, nextStep, prevStep, goToStep, totalSteps])

  // Initialize progress bar
  useEffect(() => {
    if (enableProgressBar) {
      progressBarControls.set({ scaleX: 1 / totalSteps })
    }
  }, [progressBarControls, totalSteps, enableProgressBar])

  return {
    currentStep,
    isScrolling,
    sectionRef,
    progress: currentStep / (totalSteps - 1),
    scrollProgress: scrollYProgress,
    progressBarControls,
    goToStep,
    nextStep,
    prevStep,
    isInViewport,
    getStepAnimation,
  }
}
