'use client'

import ProgressIndicator from '@/components/pages/umrah-personal/form/6-ProgressIndicator'
import TopbarMobileFormUmrahPersonal from '@/components/pages/umrah-personal/form/mobile/Topbar'
import Topbar from '@/components/shared/Topbar'
import { useUmrahPersonal } from '@/contexts/umrah-personal/context'
import { useStepVisibility } from '@/hooks/umrah-personal/form/useVisibilityStepper'
import { ChevronLeftCircle } from 'lucide-react'
import { ReactNode, useEffect } from 'react'

interface FormUmrahPersonal {
  children: ReactNode
}

const LayoutUmrahPersonalForm: React.FC<FormUmrahPersonal> = ({ children }) => {
  const { currentStep, totalSteps, handlePrevious, scrollContainerRef } =
    useUmrahPersonal()

  // Use the step visibility hook
  const { isTransitioning } = useStepVisibility({
    currentStep,
    totalSteps,
    scrollContainerRef,
  })

  // Disable body scroll for better step transitions
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <>
      <Topbar scrolled shadow />
      <TopbarMobileFormUmrahPersonal handleBack={handlePrevious} />
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <main
        className="scrollbar-hide container mx-auto h-screen overflow-y-auto"
        id="umrah-personal-form-container"
        ref={scrollContainerRef}
      >
        {/* Back button */}
        <div
          className="sticky top-8 inline-flex cursor-pointer items-center gap-1.5 max-lg:hidden"
          onClick={handlePrevious}
        >
          <ChevronLeftCircle color="#30302F" width={14} height={14} />
          <p className="text-s-semibold">Kembali</p>
        </div>

        {/* Form content */}
        {children}

        {/* Transition overlay */}
        {isTransitioning && (
          <div className="fixed inset-0 z-52 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              {/* Loading spinner */}
              <div className="border-primary-500 h-8 w-8 animate-spin rounded-full border-3 border-t-transparent"></div>

              {/* Loading text */}
              <div className="text-center">
                <p className="text-l-medium text-neutral-900">
                  Beralih ke langkah {currentStep}
                </p>
                <p className="text-s-regular text-neutral-500">
                  Mohon tunggu sebentar...
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex gap-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i + 1}
                    className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                      i + 1 === currentStep
                        ? 'bg-primary-500'
                        : i + 1 < currentStep
                          ? 'bg-primary-300'
                          : 'bg-neutral-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default LayoutUmrahPersonalForm
