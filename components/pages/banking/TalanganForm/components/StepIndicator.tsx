import { Check } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
}

const steps = [
  { number: 1, title: 'Data Diri' },
  { number: 2, title: 'Form Pengajuan' },
  { number: 3, title: 'Pemilihan Mitra' },
]

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                  step.number < currentStep
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : step.number === currentStep
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-neutral-300 bg-white text-neutral-400'
                }`}
              >
                {step.number < currentStep ? (
                  <Check size={16} />
                ) : (
                  <span className="text-s-semibold">{step.number}</span>
                )}
              </div>
              
              {/* Step Title */}
              <div className="mt-2 text-center">
                <span
                  className={`text-s-semibold ${
                    step.number <= currentStep
                      ? 'text-neutral-900'
                      : 'text-neutral-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="mx-4 mb-6 lg:mx-8">
                <div
                  className={`h-0.5 w-16 lg:w-24 ${
                    step.number < currentStep
                      ? 'bg-primary-500'
                      : 'bg-neutral-300'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}