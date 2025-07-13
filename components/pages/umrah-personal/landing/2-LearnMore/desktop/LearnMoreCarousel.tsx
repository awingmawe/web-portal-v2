'use client'

import ChecklistIcon from '@/components/icons/checklist'
import { STEP_LEARN } from '@/components/pages/umrah-personal/landing/constant'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const LearnMoreSectionDesktop: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  const stepLearn = STEP_LEARN

  // Handle carousel API events
  useEffect(() => {
    if (!carouselApi) return

    const handleCarouselSelect = () => {
      const selectedIndex = carouselApi.selectedScrollSnap()
      setCurrentIndex(selectedIndex)
    }

    carouselApi.on('select', handleCarouselSelect)
    return () => {
      carouselApi.off('select', handleCarouselSelect)
    }
  }, [carouselApi])

  // Safe current index for rendering
  const safeCurrentIndex = Math.max(
    0,
    Math.min(stepLearn.length - 1, currentIndex)
  )

  return (
    <section
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

          {/* Navigation Buttons */}
          <CarouselPrevious className="absolute top-1/2 left-8 z-20 h-12 w-12 -translate-y-1/2 border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/30" />
          <CarouselNext className="absolute top-1/2 right-8 z-20 h-12 w-12 -translate-y-1/2 border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/30" />
        </Carousel>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {stepLearn.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === safeCurrentIndex
                ? 'scale-125 bg-white'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => {
              if (carouselApi) {
                carouselApi.scrollTo(index)
              }
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default LearnMoreSectionDesktop
