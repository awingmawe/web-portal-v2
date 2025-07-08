'use client'

import ChecklistIcon from '@/components/icons/checklist'
import { ChevronCircleDown } from '@/components/icons/chevron'
import { STEP_LEARN } from '@/components/pages/umrah-personal/landing/constant'
import { Button } from '@/components/ui/button'
import { animate, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const LearnMoreSectionMobile: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(-1)
  const [isScrolling, setIsScrolling] = useState(false)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  // Smooth scroll to specific section
  const scrollToSection = useCallback((sectionIndex: number) => {
    const targetElement = sectionRefs.current[sectionIndex]
    if (!targetElement) return

    const currentScroll = window.scrollY
    const targetScroll = targetElement.offsetTop
    const distance = Math.abs(targetScroll - currentScroll)

    if (distance < 50) return

    setIsScrolling(true)

    animate(currentScroll, targetScroll, {
      duration: Math.min(1.2 + distance / 4000, 2.0),
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (value) => {
        window.scrollTo({ top: value, behavior: 'auto' })
      },
      onComplete: () => {
        setIsScrolling(false)
        setCurrentSection(sectionIndex)
      },
    })
  }, [])

  // Handle wheel scroll events
  useEffect(() => {
    // Handle touch scroll for mobile
    let touchStartY = 0
    let touchEndY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return

      touchEndY = e.changedTouches[0].screenY
      const deltaY = touchStartY - touchEndY
      const threshold = 50 // Minimum swipe distance

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0 && currentSection < STEP_LEARN.length - 1) {
          // Swipe up - go to next section
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          // Swipe down - go to previous section
          scrollToSection(currentSection - 1)
        }
      }
    }

    // Add event listeners
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSection, isScrolling, scrollToSection])

  // Button click handler
  const onClickNextSection = (index: number) => {
    const nextIndex = index + 1
    const element = document.getElementById('umrah-personal-start')

    if (nextIndex >= STEP_LEARN.length) {
      // Go to top or next major section
      if (!element) {
        console.warn('Target section not found')
        return
      }

      const currentScroll = window.scrollY
      const targetScroll = element.offsetTop
      const distance = Math.abs(targetScroll - currentScroll)

      // Skip animation if already close to target
      if (distance < 50) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      const duration = Math.min(1.8 + distance / 5000, 3.0)

      animate(currentScroll, targetScroll, {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (value) => {
          window.scrollTo({
            top: value,
            behavior: 'auto',
          })
        },
        onComplete: () => {
          window.scrollTo({
            top: targetScroll,
            behavior: 'auto',
          })
        },
      })
      return
    }

    scrollToSection(nextIndex)
  }

  const onClickPreviousSection = (index: number) => {
    const nextIndex = index - 1

    if (nextIndex < 0) {
      // Go to top or next major section
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    scrollToSection(nextIndex)
  }

  return (
    <>
      {STEP_LEARN.map((step, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el
          }}
          id={`section-learn-more-${index + 1}`}
          className={`relative h-screen ${index === 0 && 'min-h-[850px]'} overflow-hidden bg-white`}
        >
          {/* Background Images with Overlays */}
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={step.image}
              alt={`bg-umrah-personal-${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)',
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background: 'rgba(0, 0, 0, 0.60)',
                backdropFilter: 'blur(6px)',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
            <X
              onClick={() => onClickPreviousSection(index)}
              className="absolute top-10 right-10"
              color="white"
              size={24}
            />
            <div className="flex w-full max-w-xl flex-col items-center">
              {index === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mb-12 text-center"
                >
                  <h2 className="heading-3-semibold text-neutral-0 mx-auto text-center">
                    Mengapa Anda Harus Menggunakan Layanan Umroh Mandiri
                    Muslim101?
                  </h2>
                </motion.div>
              )}

              {/* Slideshow Image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-6 aspect-square w-[200px] flex-1"
              >
                <Image
                  src={step.slideshow}
                  alt={`slideshow-umrah-personal-${index + 1}`}
                  width={200}
                  height={200}
                  className="mx-auto w-full"
                  priority={index === 0}
                />
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-1 flex-col gap-4"
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-neutral-0 heading-3-bold"
                >
                  0{index + 1}
                </motion.p>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-neutral-0 heading-3-bold"
                >
                  {step.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-neutral-0 text-m-regular"
                >
                  {step.description}
                </motion.p>

                {/* Items List */}
                {step.items && (
                  <div className="flex flex-col gap-3">
                    {step.items.map((item, itemIndex) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.7 + itemIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <ChecklistIcon className="min-w-6 flex-shrink-0" />
                        <span className="text-neutral-0 text-m-regular">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Navigation Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2"
              >
                <Button
                  variant="outline"
                  className="border-neutral-0 flex items-center gap-1.5 border-2 px-10 py-4"
                  onClick={() => onClickNextSection(index)}
                >
                  <p className="text-neutral-0 text-xs-semibold">
                    {index === STEP_LEARN.length - 1 ? 'Tutup' : 'Selanjutnya'}
                  </p>
                  {index !== STEP_LEARN.length - 1 && (
                    <ChevronCircleDown size={14} />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export default LearnMoreSectionMobile
