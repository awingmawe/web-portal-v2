'use client'

import LayoutDrawerDialog from '@/components/pages/umrah-personal/common/LayoutDrawerDialog'
import ProgressIndicator from '@/components/pages/umrah-personal/form/6-ProgressIndicator'
import ExitConfirmationContent from '@/components/pages/umrah-personal/form/dialog/DialogEndForm'
import TopbarMobileFormUmrahPersonal from '@/components/pages/umrah-personal/form/mobile/Topbar'
import Topbar from '@/components/shared/Topbar'
import { Button } from '@/components/ui/button'
import { ACCOUNT_URL } from '@/constant/env'
import { useUmrahPersonal } from '@/contexts/umrah-personal/context'
import { useStepVisibility } from '@/hooks/umrah-personal/form/useVisibilityStepper'
import { ChevronLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'

interface FormUmrahPersonal {
  children: ReactNode
  token: string
}

const LayoutUmrahPersonalForm: React.FC<FormUmrahPersonal> = ({
  children,
  token,
}) => {
  const {
    currentStep,
    totalSteps,
    scrollContainerRef,
    setCurrentStep,
    handlePrevious,
    setOpenDialogDrawerEndForm,
    openDialogDrawerEndForm,
  } = useUmrahPersonal()
  const router = useRouter()
  const loginRef = useRef(false)
  // Use the step visibility hook
  const { isTransitioning } = useStepVisibility({
    currentStep,
    totalSteps,
    scrollContainerRef,
  })

  const handleExitConfirmation = () => {
    setOpenDialogDrawerEndForm?.(false)
    setCurrentStep(1)
    router.push(`/umrah-personal/landing`)
  }

  const handleExitConfirmationClose = () => {
    setOpenDialogDrawerEndForm?.(false)
  }

  // Disable body scroll for better step transitions
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    if (loginRef.current) return
    if (!token) {
      window.location.href = `${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`
      return
    }

    loginRef.current = true
  }, [token])

  // Create the back button trigger
  const BackButtonTrigger = () => (
    <div
      className="sticky top-8 inline-flex cursor-pointer items-center gap-1.5 max-lg:hidden"
      onClick={handlePrevious}
    >
      <ChevronLeftCircle color="#30302F" width={14} height={14} />
      <p className="text-s-semibold">Kembali</p>
    </div>
  )

  return (
    <>
      <Topbar scrolled shadow token={token} />
      <TopbarMobileFormUmrahPersonal handleBack={handlePrevious} />
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <main
        className="scrollbar-hide container mx-auto h-screen overflow-y-auto"
        id="umrah-personal-form-container"
        ref={scrollContainerRef}
      >
        {/* Back button with exit confirmation */}
        <LayoutDrawerDialog
          trigger={<BackButtonTrigger />}
          content={<ExitConfirmationContent />}
          isOpen={openDialogDrawerEndForm}
          setIsOpen={setOpenDialogDrawerEndForm}
          footerContent={
            <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
              <Button
                variant="outline"
                intent="none"
                className="border-primary-500 flex-1 border-2 px-10 py-3"
                onClick={handleExitConfirmationClose}
              >
                Tidak
              </Button>
              <Button
                variant="default"
                onClick={handleExitConfirmation}
                className="flex-1 px-10 py-3"
              >
                Ya
              </Button>
            </div>
          }
        />

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
