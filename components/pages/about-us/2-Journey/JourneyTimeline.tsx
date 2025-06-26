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
        'Muslim101 bergerak sejak tahun 2023. Bermula dari nama Umroh101, kami berfokus pada pengembangan jasa layanan ibadah Umroh di Indonesia berbasis teknologi. Kini, pada tahun 2024, Muslim101 memperluas visi dan misi sebagai pilihan utama platform marketplace dan e-commerce yang menyediakan kemudahan akses informasi digital, khususnya Umroh, Haji, dan Muslim Trip.',
      image:
        'https://storage.googleapis.com/m101-prods/about-us/Milestone/Frame%201000007196.png',
    },
  },
  {
    id: 'akuisisi-kemitraan',
    title: 'Akuisisi Kemitraan',
    content: {
      title: 'Akuisisi Kemitraan',
      description:
        'Muslim101 memulai dengan produk berupa beragam paket Umroh, bermitra dengan beragam travel tepercaya di seluruh wilayah Indonesia yang memiliki lisensi PPIU dan PIHK. Hingga Februari 2025, kami telah menjalin kerja sama B2B dengan 143 mitra.',
      image:
        'https://storage.googleapis.com/m101-prods/about-us/Milestone/Frame%201000007196-1.png',
    },
  },
  {
    id: 'akuisisi-keagenan',
    title: 'Akuisisi Keagenan',
    content: {
      title: 'Akuisisi Keagenan',
      description:
        'Muslim101 memiliki jaringan keagenan yang disebut Wukala (wakil). Sebanyak lebih dari 700 Wukala yang berbasis affiliate marketing tersebar di 6 kota besar Indonesia.',
      image:
        'https://storage.googleapis.com/m101-prods/about-us/Milestone/Frame%201000007196-2.png',
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
        'https://storage.googleapis.com/m101-prods/about-us/Milestone/Frame%201000007196-3.png',
    },
  },
  {
    id: 'event',
    title: 'Event',
    content: {
      title: 'Event',
      description:
        'Muslim101 telah sukses terlibat dalam berbagai event di berbagai wilayah Indonesia. Salah satunya, pada pameran besar International Islamic Expo (IIE) yang bertemakan Umrah-Hajj & Islamic Tourism. Di sana, Muslim101 menjalankan promosi dan partnership B2B2C langsung dengan para calon mitra terbaru.',
      image:
        'https://storage.googleapis.com/m101-prods/about-us/Milestone/Frame%201000007196-4.png',
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
    }, 12000)
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
    <div className="my-8 space-y-8 max-lg:my-2 md:space-y-8 lg:space-y-12">
      {/* Stepper with overflow handling */}
      <div
        className="scrollbar-hide relative overflow-x-auto"
        ref={stepsContainerRef}
      >
        <div className="flex min-w-max items-center justify-between">
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              ref={index === activeStep ? activeStepRef : null}
              className={cn(
                'first:max-lg:w[80px] relative z-10 flex w-full cursor-pointer flex-col items-center max-lg:w-[180px]',
                'after:absolute after:bottom-[8px] after:left-[calc(100%/2)] after:z-0 after:z-[1] after:mt-[6px] after:h-[1px] after:w-[calc(100%/2)] after:bg-current after:content-[""] max-lg:after:bottom-[12px]',
                'before:absolute before:bottom-[8px] before:left-[0] before:z-[0] before:mt-[6px] before:h-[1px] before:w-[calc(100%/2)] before:bg-current before:content-[""] max-lg:before:bottom-[12px]',
                'first:before:hidden last:after:hidden'
              )}
              onClick={() => changeStep(index)}
            >
              <div className="mb-2 flex h-[60px] flex-col items-center justify-center">
                <span
                  className={cn(
                    'text-center transition-all duration-300 ease-in-out max-lg:text-[14px] max-md:whitespace-nowrap lg:text-[20px]',
                    index === activeStep
                      ? 'text-primary-500 scale-120 font-semibold max-lg:scale-120'
                      : 'text-neutral-500'
                  )}
                >
                  {step.title}
                </span>
                <div
                  ref={(el) => {
                    dotsRef.current[index] = el
                  }}
                  className={cn(
                    'bg-primary-500 step-dot relative -bottom-3.5 z-[2] z-[10] h-[12px] w-[12px] rounded-full transition-all duration-300'
                  )}
                />
              </div>
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
            className="aspect-[4/3] h-auto w-full rounded-md object-contain"
          />
        </div>

        <div className="flex flex-col space-y-3 md:space-y-6">
          <div
            key={`title-${activeStep}`}
            className={cn(
              'animate-dissolve-in mb-3 transition-all duration-500',
              animationDirection === 'right' ? 'translate-x-0' : 'translate-x-0'
            )}
          >
            <h2 className="text-primary-900 font-semibold italic md:text-2xl lg:text-[40px]">
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
              <ChevronLeft
                className="h-5 w-5 text-white md:h-6 md:w-6"
                style={{ color: 'black' }}
              />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              className="h-10 w-10 rounded-full border-none transition-all duration-200 hover:scale-105 md:h-12 md:w-12"
              onClick={handleNext}
            >
              <ChevronRight
                className="h-5 w-5 text-white md:h-6 md:w-6"
                style={{ color: 'black' }}
              />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
