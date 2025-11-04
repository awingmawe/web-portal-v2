'use client'

import { useCustomNavigation } from '@/hooks/common/useCustomNavigation'
import { Check, ChevronLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'

const StepperIndicator = () => {
  const { goBack } = useCustomNavigation()
  const pathname = usePathname()

  // Ambil step dari URL (contoh: /bank/credit/form/step-1 -> step-1)
  const currentStep = pathname.split('/').pop() || 'step-1'

  const steps = [
    { id: 'step-1', number: 1, label: 'Isi Formulir Pengajuan' },
    { id: 'step-2', number: 2, label: 'Pilih Mitra Pembiayaan' },
  ]

  return (
    <section className="container mx-auto space-y-10 max-lg:hidden">
      <p
        onClick={() => goBack()}
        className="heading-3-semibold inline-flex w-fit cursor-pointer items-center gap-1 max-lg:hidden"
      >
        <ChevronLeft size={24} />
        Kembali
      </p>
      <div className="mx-auto max-w-2xl">
        <div className="relative flex w-full justify-between">
          {/* Garis penghubung */}
          <div className="absolute top-[25px] left-1/2 z-0 h-[2px] w-[65%] -translate-x-1/2 bg-neutral-200" />

          {steps.map((step) => {
            const isActive = currentStep === step.id
            const isCompleted =
              steps.findIndex((s) => s.id === currentStep) >
              steps.findIndex((s) => s.id === step.id)

            return (
              <div key={step.id} className="flex flex-col items-center gap-3">
                <div
                  className={`text-l-medium relative z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full border-5 ${
                    isActive || isCompleted
                      ? 'bg-primary-100 border-primary-500'
                      : 'border-neutral-300 bg-neutral-100'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={24} className="text-primary-500" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <p className={`heading-4-regular`}>{step.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StepperIndicator
