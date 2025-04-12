'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Journey step data
const journeySteps = [
  {
    id: 'ide',
    title: 'Ide (Founded)',
    content: {
      title: 'Ide (Founded)',
      description:
        'Muslim101 bergerak sejak tahun 2023. Bermula dari nama Umroh101, kami berfokus pada pengembangan jasa layanan ibadah Umroh di Indonesia berbasis teknologi. Kini, pada tahun 2024, Muslim101 memperluas visi dan misi sebagai pilihan utama platform marketplace dan e-commerce yang menyediakan kemudahan akses informasi digital, khususnya Umroh, Haji, dan Halal Trip.',
      image: '/images/foto-ceo.png',
    },
  },
  {
    id: 'akuisisi-kemitraan',
    title: 'Akuisisi Kemitraan',
    content: {
      title: 'Akuisisi Kemitraan',
      description:
        'Muslim101 memulai dengan produk berupa beragam paket Umroh, bermitra dengan travel-travel tepercaya di seluruh wilayah Indonesia yang memiliki lisensi PPIU dan PIHK. Hingga Februari 2025, kami telah menjalin kerja sama B2B dengan 143 mitra.',
      image: '/images/no-image-placeholder.png',
    },
  },
  {
    id: 'akuisisi-keagenan',
    title: 'Akuisisi Keagenan',
    content: {
      title: 'Akuisisi Keagenan',
      description:
        'Muslim101 memiliki jaringan keagenan yang disebut Wukala (wakil). Sebanyak lebih dari 700 Wukala yang berbasis affiliate marketing tersebar di 6 kota besar Indonesia.',
      image: '/images/no-image-placeholder.png',
    },
  },
  {
    id: 'rebrand',
    title: 'Rebrand',
    content: {
      title: 'Rebrand',
      description:
        'Kami melakukan perubahan untuk memperkenalkan nama dan identitas baru yang lebih mencerminkan visi besar perusahaan, sehingga dapat menjangkau pasar yang lebih luas. Berawal dari Umroh101 sebagai platform yang hanya berfokus pada perjalanan ibadah Umroh dan Haji, kami berekspansi menjadi all-in-one Muslim digital platform bernama Muslim101 dengan layanan yang lebih beragam, segar, serta modern.',
      image:
        'https://storage.googleapis.com/m101-prods/about-us/b221b62427bc68916fc4d1b4302a01c8.png',
    },
  },
  {
    id: 'event',
    title: 'Event',
    content: {
      title: 'Event',
      description:
        'Muslim101 telah sukses terlibat dalam berbagai event di berbagai wilayah Indonesia. Salah satunya, pada pameran besar International Islamic Expo (lIE) yang bertemakan Umrah-Hajj & Islamic Tourism. Di sana, Muslim101 menjalinkan promosi dan partnership BBC langsung dengan para calon mitra terbaru.',
      image: '/images/no-image-placeholder.png',
    },
  },
]

export function JourneyTimeline() {
  const [activeStep, setActiveStep] = useState(0)
  const [animationDirection, setAnimationDirection] = useState('right')
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])
  const activeStepRef = useRef<HTMLDivElement | null>(null)

  // Set up auto-play timer
  const setupAutoPlayTimer = () => {
    // Clear any existing timer
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
    }

    // Set up new timer
    autoPlayTimerRef.current = setInterval(() => {
      setActiveStep((prev) => {
        const nextStep = prev === journeySteps.length - 1 ? 0 : prev + 1
        setAnimationDirection(nextStep > prev ? 'right' : 'left')
        return nextStep
      })
    }, 3000)
  }

  useEffect(() => {
    setupAutoPlayTimer()
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
    }
  }, [])

  // Set animation direction based on step change
  const changeStep = (newStep: number) => {
    setAnimationDirection(newStep > activeStep ? 'right' : 'left')
    setActiveStep(newStep)

    // Reset the timer to give full 3 seconds on the new step
    setupAutoPlayTimer()
  }

  // Scroll to active step
  useEffect(() => {
    if (activeStepRef.current && stepsContainerRef.current) {
      const container = stepsContainerRef.current
      const activeEl = activeStepRef.current
      const activeElRect = activeEl.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      // If the active element is not fully visible in the container
      if (
        activeElRect.left < containerRect.left ||
        activeElRect.right > containerRect.right
      ) {
        // Calculate scroll position to center the active element
        const scrollLeft =
          activeElRect.left +
          container.scrollLeft -
          containerRect.left -
          containerRect.width / 2 +
          activeElRect.width / 2

        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        })
      }
    }
  }, [activeStep])

  const handleNext = () => {
    if (activeStep < journeySteps.length - 1) {
      changeStep(activeStep + 1)
    } else {
      changeStep(0) // Loop back to the first step
    }
  }

  const handlePrev = () => {
    if (activeStep > 0) {
      changeStep(activeStep - 1)
    } else {
      changeStep(journeySteps.length - 1) // Loop back to the last step
    }
  }

  const currentStep = journeySteps[activeStep]

  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-12">
      {/* Stepper with overflow handling */}
      <div
        className="scrollbar-hide relative overflow-x-auto"
        ref={stepsContainerRef}
      >
        <div className="flex min-w-max items-end justify-between space-x-4 pb-4">
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              ref={index === activeStep ? activeStepRef : null}
              className="relative z-10 flex w-full cursor-pointer flex-col items-center max-lg:w-[100px]"
              onClick={() => changeStep(index)}
            >
              <div className="mb-2 flex h-[60px] items-end justify-center md:h-[70px] lg:h-[80px]">
                <span
                  className={cn(
                    'text-center transition-all duration-300 ease-in-out sm:text-sm md:text-lg lg:text-[20px]',
                    index === activeStep
                      ? 'text-primary-500 scale-150 font-semibold max-lg:scale-120'
                      : 'text-neutral-500'
                  )}
                >
                  {step.title}
                </span>
              </div>
              <div
                ref={(el) => {
                  dotsRef.current[index] = el
                }}
                className={cn(
                  'bg-primary-500 step-dot absolute -bottom-3.5 h-4 w-4 rounded-full transition-all duration-300',
                  index !== journeySteps.length - 1 &&
                    'after:absolute after:top-1/2 after:left-4 after:h-[1px] after:w-[calc(100%+15vw)] after:-translate-y-1/2 after:bg-current after:content-[""] max-sm:after:w-[calc(100%+27vw)]'
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-10 lg:gap-20">
        <div
          key={`image-${activeStep}`}
          className="animate-dissolve-in transition-all delay-200 duration-500 max-lg:order-first lg:order-last"
        >
          <Image
            src={currentStep.content.image || '/placeholder.svg'}
            alt={currentStep.content.title}
            width={0}
            height={0}
            sizes="100vw"
            className="aspect-[4/3] h-auto w-full rounded-md"
          />
        </div>

        <div className="flex flex-col space-y-4 md:space-y-6">
          <div
            key={`title-${activeStep}`}
            className={cn(
              'animate-dissolve-in transition-all duration-500',
              animationDirection === 'right' ? 'translate-x-0' : 'translate-x-0'
            )}
          >
            <h2 className="text-primary-900 lg:heading-2-semibold text-xl font-semibold md:text-2xl">
              {currentStep.content.title}
            </h2>
          </div>

          <div
            key={`desc-${activeStep}`}
            className={cn(
              'animate-dissolve-in transition-all delay-100 duration-500',
              animationDirection === 'right' ? 'translate-x-0' : 'translate-x-0'
            )}
          >
            <p className="text-primary-900 lg:text-l-regular text-sm sm:text-base">
              {currentStep.content.description}
            </p>
          </div>

          <div className="mt-4 flex space-x-4 md:mt-auto md:pt-4">
            <Button
              className="h-10 w-10 rounded-full border-none transition-all duration-200 hover:scale-105 md:h-12 md:w-12"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              className="h-10 w-10 rounded-full border-none transition-all duration-200 hover:scale-105 md:h-12 md:w-12"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5 text-white md:h-6 md:w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
