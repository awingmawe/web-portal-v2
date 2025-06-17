'use client'

import ChecklistIcon from '@/components/icons/checklist'
import { STEP_LEARN } from '@/components/pages/umrah-personal/constant'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { animate, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const LearnMoreSectionDesktop: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [snapPosition, setSnapPosition] = useState<'before' | 'in' | 'after'>(
    'before'
  )
  const [isSnapAnimating, setIsSnapAnimating] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const lastScrollTime = useRef<number>(0)
  const scrollThrottle = 150
  const snapThrottle = useRef<number>(0)

  const stepLearn = STEP_LEARN

  // Safe setter function that ensures bounds
  const setCurrentIndexSafely = useCallback(
    (newIndex: number | ((prev: number) => number)) => {
      setCurrentIndex((prev) => {
        const index = typeof newIndex === 'function' ? newIndex(prev) : newIndex
        return Math.max(0, Math.min(stepLearn.length - 1, index))
      })
    },
    [stepLearn.length]
  )

  // Function to get section position info
  const getSectionPositions = useCallback(() => {
    if (!sectionRef.current) return null

    const sectionRect = sectionRef.current.getBoundingClientRect()
    const sectionTop = sectionRef.current.offsetTop
    const sectionHeight = sectionRef.current.offsetHeight
    const windowHeight = window.innerHeight
    const currentScroll = window.scrollY

    return {
      sectionTop,
      sectionHeight,
      sectionBottom: sectionTop + sectionHeight,
      windowHeight,
      currentScroll,
      sectionRect,
    }
  }, [])

  // Function to determine current snap position
  const getCurrentSnapPosition = useCallback(() => {
    const positions = getSectionPositions()
    if (!positions) return 'before'

    const { sectionTop, sectionHeight, currentScroll, windowHeight } = positions
    const scrollCenter = currentScroll + windowHeight / 2

    // Snap zones
    const beforeZone = sectionTop - windowHeight * 0.3
    const afterZone = sectionTop + sectionHeight + windowHeight * 0.3

    if (scrollCenter < beforeZone) return 'before'
    if (scrollCenter > afterZone) return 'after'
    return 'in'
  }, [getSectionPositions])

  // Function to snap to a position
  const snapToPosition = useCallback(
    (targetPosition: 'before' | 'in' | 'after') => {
      const positions = getSectionPositions()
      if (!positions || isSnapAnimating) return

      const { sectionTop, sectionHeight, windowHeight } = positions
      let targetScroll: number

      switch (targetPosition) {
        case 'before':
          targetScroll = sectionTop - windowHeight
          break
        case 'in':
          targetScroll = sectionTop
          break
        case 'after':
          targetScroll = sectionTop + sectionHeight
          break
      }

      setIsSnapAnimating(true)
      setSnapPosition(targetPosition)

      animate(window.scrollY, targetScroll, {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (value) => {
          window.scrollTo({
            top: value,
            behavior: 'auto',
          })
        },
        onComplete: () => {
          setIsSnapAnimating(false)
        },
      })
    },
    [getSectionPositions, isSnapAnimating]
  )

  // Update snap position on scroll (but only when not animating)
  useEffect(() => {
    if (isSnapAnimating) return

    const updateSnapPosition = () => {
      const newPosition = getCurrentSnapPosition()
      if (newPosition !== snapPosition) {
        setSnapPosition(newPosition)
      }
    }

    const handleScroll = () => {
      if (!isSnapAnimating) {
        updateSnapPosition()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [snapPosition, getCurrentSnapPosition, isSnapAnimating])

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
      const now = Date.now()

      // Prevent rapid firing
      if (now - lastScrollTime.current < scrollThrottle) {
        e.preventDefault()
        return
      }
      lastScrollTime.current = now

      // Skip if we're already animating a snap
      if (isSnapAnimating) {
        e.preventDefault()
        return
      }

      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0
      const currentSnapPos = getCurrentSnapPosition()

      // Handle snap navigation
      if (now - snapThrottle.current > 800) {
        // Prevent rapid snap changes
        snapThrottle.current = now

        if (currentSnapPos === 'before' && isScrollingDown) {
          e.preventDefault()
          snapToPosition('in')
          return
        }

        if (currentSnapPos === 'in') {
          // Handle carousel navigation within the section
          const safeCurrentIndex = Math.max(
            0,
            Math.min(stepLearn.length - 1, currentIndex)
          )

          if (isScrollingUp && safeCurrentIndex === 0) {
            // At first carousel item, snap to before section
            e.preventDefault()
            snapToPosition('before')
            return
          }

          if (isScrollingDown && safeCurrentIndex === stepLearn.length - 1) {
            // At last carousel item, snap to after section
            e.preventDefault()
            snapToPosition('after')
            return
          }

          // Navigate within carousel
          e.preventDefault()
          if (isScrolling) return

          setIsScrolling(true)

          if (isScrollingDown && safeCurrentIndex < stepLearn.length - 1) {
            setCurrentIndexSafely((prev) => prev + 1)
          } else if (isScrollingUp && safeCurrentIndex > 0) {
            setCurrentIndexSafely((prev) => prev - 1)
          }

          setTimeout(() => setIsScrolling(false), 800)
          return
        }

        if (currentSnapPos === 'after' && isScrollingUp) {
          e.preventDefault()
          snapToPosition('in')
          return
        }
      } else if (currentSnapPos === 'in') {
        // Always prevent scrolling when in the section (unless it's carousel navigation)
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [
    currentIndex,
    isScrolling,
    stepLearn.length,
    setCurrentIndexSafely,
    getCurrentSnapPosition,
    snapToPosition,
    isSnapAnimating,
  ])

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
      className="relative h-screen overflow-hidden bg-white pt-20 max-lg:hidden"
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

      {/* Dynamic Scroll Hints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: snapPosition === 'in' && safeCurrentIndex === 0 ? 1 : 0,
        }}
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
        animate={{
          opacity:
            snapPosition === 'in' && safeCurrentIndex === stepLearn.length - 1
              ? 1
              : 0,
        }}
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
