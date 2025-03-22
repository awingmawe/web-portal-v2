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
      image: '/images/no-image-placeholder.png',
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
  const [linePosition, setLinePosition] = useState({
    left: 0,
    width: 0,
    activeWidth: 0,
  })

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

    // Reset the timer to give full 2 seconds on the new step
    setupAutoPlayTimer()
  }

  // Calculate dot positions and line dimensions
  useEffect(() => {
    if (
      stepsContainerRef.current &&
      dotsRef.current.filter(Boolean).length === journeySteps.length
    ) {
      const containerRect = stepsContainerRef.current.getBoundingClientRect()

      // Calculate center position of each dot
      const positions = dotsRef.current.map((dot) => {
        if (!dot) return 0
        const dotRect = dot.getBoundingClientRect()
        return dotRect.left + dotRect.width / 2 - containerRect.left
      })

      // Calculate line dimensions
      if (positions.length >= 2) {
        const firstDotPos = positions[0]
        const lastDotPos = positions[positions.length - 1]
        const activeDotPos = positions[activeStep]

        setLinePosition({
          left: firstDotPos,
          width: lastDotPos - firstDotPos,
          activeWidth: activeDotPos - firstDotPos,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, journeySteps.length])

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
    <div className="space-y-12">
      {/* Stepper */}
      <div className="relative" ref={stepsContainerRef}>
        <div className="flex items-end justify-between">
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              className="z-10 flex cursor-pointer flex-col items-center"
              onClick={() => changeStep(index)}
            >
              <div className="mb-2 flex h-[80px] items-end justify-center">
                <span
                  className={cn(
                    'text-center transition-all duration-300 ease-in-out',
                    index === activeStep
                      ? 'text-primary-500 text-[32px] font-semibold'
                      : 'text-[26px] text-neutral-500'
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
                  'bg-primary-500 step-dot h-4 w-4 rounded-full transition-all duration-300'
                )}
              />
            </div>
          ))}
        </div>

        {/* Background line (gray) */}
        <div
          className="absolute bottom-[8px] -z-0 h-[2px] bg-gray-300"
          style={{
            left: `${linePosition.left}px`,
            width: `${linePosition.width}px`,
          }}
        />

        {/* Active progress line (yellow) */}
        <div
          className="absolute bottom-[8px] -z-0 h-[2px] bg-gray-300 transition-all duration-300 ease-in-out"
          style={{
            left: `${linePosition.left}px`,
            width: `${linePosition.activeWidth}px`,
          }}
        />
      </div>

      {/* Content */}
      <div className="grid gap-20 md:grid-cols-2">
        <div className="flex flex-col space-y-6 overflow-hidden">
          <div
            key={`title-${activeStep}`}
            className={cn(
              'animate-dissolve-in transition-all duration-500',
              animationDirection === 'right' ? 'translate-x-0' : 'translate-x-0'
            )}
          >
            <h2 className="heading-2-semibold text-primary-900">
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
            <p className="text-primary-900 text-l-regular">
              {currentStep.content.description}
            </p>
          </div>

          <div className="mt-auto flex space-x-4 pt-4">
            <Button
              className="h-12 w-12 rounded-full border-none transition-all duration-200 hover:scale-105"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              className="h-12 w-12 rounded-full border-none transition-all duration-200 hover:scale-105"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6 text-white" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        <div
          key={`image-${activeStep}`}
          className="animate-dissolve-in transition-all delay-200 duration-500"
        >
          <Image
            src={currentStep.content.image || '/placeholder.svg'}
            alt={currentStep.content.title}
            width={300}
            height={400}
            className="h-[400px] w-full rounded-md"
          />
        </div>
      </div>
    </div>
  )
}
