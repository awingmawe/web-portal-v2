'use client'

import ChecklistIcon from '@/components/icons/checklist'
import { STEP_LEARN } from '@/components/pages/umrah-personal/constant'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const LearnMoreSectionDesktop: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollTime = useRef<number>(0)
  const scrollThrottle = 150 // minimum time between scroll events in ms

  const stepLearn = STEP_LEARN

  // Safe setter function that ensures bounds
  const setCurrentIndexSafely = useCallback(
    (newIndex: number | ((prev: number) => number)) => {
      setCurrentIndex((prev) => {
        const index = typeof newIndex === 'function' ? newIndex(prev) : newIndex
        // Clamp the index to valid bounds
        return Math.max(0, Math.min(stepLearn.length - 1, index))
      })
    },
    [stepLearn.length]
  )

  // Function to check if section is in viewport
  const isElementInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth

    // Check if the element is fully visible in viewport
    const verticalInView = rect.top >= 0 && rect.bottom <= windowHeight
    const horizontalInView = rect.left >= 0 && rect.right <= windowWidth

    return verticalInView && horizontalInView
  }

  // Sync carousel with currentIndex when it changes from wheel scroll
  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(currentIndex, false)
    }
  }, [currentIndex, carouselApi])

  // Handle carousel API events
  useEffect(() => {
    if (!carouselApi) return

    const handleCarouselSelect = () => {
      if (!isScrolling) {
        const selectedIndex = carouselApi.selectedScrollSnap()
        // Ensure the selected index is within bounds
        const clampedIndex = Math.max(
          0,
          Math.min(stepLearn.length - 1, selectedIndex)
        )
        setCurrentIndexSafely(clampedIndex)
      }
    }

    carouselApi.on('select', handleCarouselSelect)
    return () => {
      carouselApi.off('select', handleCarouselSelect)
    }
  }, [carouselApi, isScrolling, stepLearn.length, setCurrentIndexSafely])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Check if we're in the learn more section
      if (!sectionRef.current || !isElementInViewport(sectionRef.current)) {
        return // Allow normal scrolling if not in this section
      }

      // Throttle scroll events to prevent rapid firing
      const now = Date.now()
      if (now - lastScrollTime.current < scrollThrottle) {
        e.preventDefault()
        return
      }
      lastScrollTime.current = now

      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0

      // Get current index in a safe way
      const safeCurrentIndex = Math.max(
        0,
        Math.min(stepLearn.length - 1, currentIndex)
      )

      // Handle boundary conditions for vertical scroll
      if (safeCurrentIndex === 0 && isScrollingUp) {
        // At first item and scrolling up - allow vertical scroll to previous section
        return
      }

      if (safeCurrentIndex === stepLearn.length - 1 && isScrollingDown) {
        // At last item and scrolling down - allow vertical scroll to next section
        return
      }

      // Prevent default scroll for horizontal navigation within the section
      e.preventDefault()

      if (isScrolling) return

      setIsScrolling(true)

      if (isScrollingDown && safeCurrentIndex < stepLearn.length - 1) {
        setCurrentIndexSafely((prev) => prev + 1)
      } else if (isScrollingUp && safeCurrentIndex > 0) {
        setCurrentIndexSafely((prev) => prev - 1)
      }

      // Use longer timeout to prevent rapid scrolling
      setTimeout(() => setIsScrolling(false), 800)
    }

    // Add event listener to the window
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentIndex, isScrolling, stepLearn.length, setCurrentIndexSafely])

  // Safety check: ensure currentIndex is always within bounds
  useEffect(() => {
    if (currentIndex < 0 || currentIndex >= stepLearn.length) {
      setCurrentIndexSafely(
        Math.max(0, Math.min(stepLearn.length - 1, currentIndex))
      )
    }
  }, [currentIndex, stepLearn.length, setCurrentIndexSafely])

  // Get safe current index for rendering
  const safeCurrentIndex = Math.max(
    0,
    Math.min(stepLearn.length - 1, currentIndex)
  )

  return (
    <section
      ref={sectionRef}
      className="relative mt-18 h-screen snap-center overflow-hidden bg-white max-lg:hidden"
      id="section-learn-more-1"
    >
      {/* Background Images with Fade Animation */}
      <div className="absolute inset-0 h-full w-full">
        {stepLearn.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === safeCurrentIndex ? 1 : 0,
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute top-0 left-0 h-full w-full"
          >
            {/* Background Image */}
            <Image
              src={item.image}
              alt={`bg-umrah-personal-${index + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              className="absolute top-0 z-1 h-full w-full object-cover"
              priority={index === 0}
            />

            {/* Gradient Overlay */}
            <div
              className="absolute top-0 z-2 h-full w-full"
              style={{
                background:
                  'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)',
              }}
            />

            {/* Blur Overlay */}
            <div
              className="absolute top-0 z-3 h-full w-full"
              style={{
                background: 'rgba(0, 0, 0, 0.60)',
                backdropFilter: 'blur(6px)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Carousel Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center p-6">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            loop: false,
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
            skipSnaps: false,
            dragFree: false,
            duration: 75,
          }}
          className="w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-2-semibold z-5 mb-10 text-center text-white"
          >
            Mengapa Anda Harus Menggunakan Layanan Umroh Mandiri Muslim101?
          </motion.p>
          <CarouselContent className="mx-auto px-10">
            {stepLearn.map((step, index) => (
              <CarouselItem
                key={index}
                className="flex basis-full items-center justify-center gap-10 px-10"
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: index === safeCurrentIndex ? 1 : 0.8,
                    x: index === safeCurrentIndex ? 0 : -50,
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white max-xl:max-w-[400px]"
                >
                  {/* Slideshow Image */}
                  <Image
                    src={step.slideshow}
                    alt={`slideshow-umrah-personal-${index + 1}`}
                    width={500}
                    height={400}
                    className="mx-auto"
                    priority={index === 0}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: index === safeCurrentIndex ? 1 : 0.8,
                    x: index === safeCurrentIndex ? 0 : 50,
                  }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex max-w-[600px] flex-col gap-4 max-2xl:max-w-[420px] max-xl:max-w-[275px]"
                >
                  <p className="heading-2-bold text-neutral-0">0{index + 1}</p>
                  <p className="heading-1-semibold text-neutral-0">
                    {step.title}
                  </p>
                  <p className="text-l-regular text-neutral-0">
                    {step.description}
                  </p>
                  {step.items &&
                    step.items.map((item, itemIndex) => (
                      <motion.p
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: index === safeCurrentIndex ? 1 : 0.8,
                          y: index === safeCurrentIndex ? 0 : 20,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.4 + itemIndex * 0.1,
                        }}
                        className="text-l-regular text-neutral-0 flex items-center gap-2"
                      >
                        <ChecklistIcon className="min-w-6" />
                        {item}
                      </motion.p>
                    ))}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Scroll Hints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: safeCurrentIndex === 0 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute right-8 bottom-10 z-20"
      >
        <div className="flex flex-col items-center">
          <p className="text-s-regular mb-2 text-center text-white">
            Scroll up to go back or down to continue
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-6 w-1 rounded-full bg-white"
          />
        </div>
      </motion.div>

      {/* Bottom boundary hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: safeCurrentIndex === stepLearn.length - 1 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute right-8 bottom-10 z-20"
      >
        <div className="flex flex-col items-center">
          <p className="text-s-regular mb-2 text-center text-white">
            Scroll down to continue
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-6 w-1 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default LearnMoreSectionDesktop
