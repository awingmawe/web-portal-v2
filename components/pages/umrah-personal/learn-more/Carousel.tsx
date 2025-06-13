'use client'

import ChecklistIcon from '@/components/icons/checklist'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const STORAGE_LINK =
  'https://storage.googleapis.com/m101-prods/umroh-personal/bg-umrah-personal-'

const LearnMoreSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const sectionRef = useRef<HTMLElement>(null)

  const learnMoreDescription = [
    {
      title: 'Flexibilitas',
      description:
        'Seluruh kendali dan rencana perjalanan Anda dapat dikontrol penuh sesuai dengan keinginan Anda.',
      items: ['Tanggal Keberangkatan', 'Lokasi Embarkasi', 'Jumlah Jemaah'],
    },
    {
      title: 'Beragam Pilihan Maskapai',
      description:
        'Sesuaikan anggaran perjalanan anda dengan memilih maskapai sesuai kebutuhan Anda.',
    },
    {
      title: 'Beragam Pilihan Hotel',
      description:
        'Plihan hotel mulai dari bintang 3 hingga bintang 5. Pilih dan sesuaikan hotel yang Anda butuhkan untuk perjalanan Umroh Anda',
    },
    {
      title: 'Beragam Moda Transportasi',
      description:
        'Banyaknya pilihan moda transportasi yang dapat anda pilih sesuai kebutuhan Anda untuk menemani perjalanan Umroh Anda.',
    },
    {
      title: 'Muthowif Berpengalaman',
      description:
        'Seluruh kendali dan rencana perjalanan Anda dapat dikontrol penuh sesuai dengan keinginan Anda.',
    },
  ]

  const stepLearn = learnMoreDescription.map((item, index) => {
    return {
      id: item,
      image: `${STORAGE_LINK}${index + 1}.jpg`,
      slideshow: `/images/slideshow-umrah-personal-${index + 1}.png`,
      ...item,
    }
  })

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
        setCurrentIndex(carouselApi.selectedScrollSnap())
      }
    }

    carouselApi.on('select', handleCarouselSelect)
    return () => {
      carouselApi.off('select', handleCarouselSelect)
    }
  }, [carouselApi, isScrolling])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Check if we're in the learn more section
      if (!sectionRef.current || !isElementInViewport(sectionRef.current)) {
        return // Allow normal scrolling if not in this section
      }

      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0

      // Handle boundary conditions for vertical scroll
      if (currentIndex === 0 && isScrollingUp) {
        // At first item and scrolling up - allow vertical scroll to previous section
        return
      }

      if (currentIndex === stepLearn.length - 1 && isScrollingDown) {
        // At last item and scrolling down - allow vertical scroll to next section
        return
      }

      // Prevent default scroll for horizontal navigation within the section
      e.preventDefault()

      if (isScrolling) return

      setIsScrolling(true)

      if (isScrollingDown && currentIndex < stepLearn.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else if (isScrollingUp && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
      }

      setTimeout(() => setIsScrolling(false), 600)
    }

    // Add event listener to the window
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentIndex, isScrolling, stepLearn.length])

  return (
    <section
      ref={sectionRef}
      className="relative h-[calc(100dvh-70px)] snap-center overflow-hidden bg-white max-lg:h-[100dvh]"
      id="section-learn-more"
    >
      {/* Background Images with Fade Animation */}
      <div className="absolute inset-0 h-full w-full">
        {stepLearn.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
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
            align: 'center',
            loop: false,
            skipSnaps: false,
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
          <CarouselContent className="mx-auto max-w-6xl px-10">
            {stepLearn.map((step, index) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-center gap-10"
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0.8,
                    x: index === currentIndex ? 0 : -50,
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white"
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
                    opacity: index === currentIndex ? 1 : 0.8,
                    x: index === currentIndex ? 0 : 50,
                  }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col gap-4"
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
                          opacity: index === currentIndex ? 1 : 0.8,
                          y: index === currentIndex ? 0 : 20,
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
        animate={{ opacity: currentIndex === 0 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <p className="text-m-regular mb-2 text-center text-white">
            {currentIndex === 0
              ? 'Scroll up to go back or down to continue'
              : 'Scroll to navigate'}
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-8 w-1 rounded-full bg-white"
          />
        </div>
      </motion.div>

      {/* Bottom boundary hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: currentIndex === stepLearn.length - 1 ? 1 : 0 }}
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

export default LearnMoreSection
