'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export interface CardProps {
  // Support both single image string and array of listImages
  images: string | string[]
  date: string
  title: string
  content: string
  imageChangeDelay?: number // Optional delay between images changes (in ms)
  autoPlayOnMobile?: boolean // Whether to auto-play animation on mobile when in view
}

export default function CardMoment({
  images,
  date,
  title,
  content,
  imageChangeDelay = 2500,
  autoPlayOnMobile = true,
}: CardProps) {
  // Convert single images to array if needed
  const listImages = Array.isArray(images) ? images : [images]

  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Refs for element and timers
  const cardRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const imageTimerRef = useRef<NodeJS.Timeout | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Check if device is mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768) // Common breakpoint for mobile
    }

    // Check initially
    checkIfMobile()

    // Set up listener for window resize
    window.addEventListener('resize', checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Set up intersection observer for detecting when card is in view
  useEffect(() => {
    if (!cardRef.current || !autoPlayOnMobile) return

    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.5, // When 50% of the card is visible
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting)
      })
    }

    observerRef.current = new IntersectionObserver(
      handleIntersection,
      observerOptions
    )
    observerRef.current.observe(cardRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [autoPlayOnMobile])

  // Function to handle the image cycling with consistent timing
  const startImageCycle = () => {
    // Clear any existing timers first
    if (intervalRef.current) {
      clearTimeout(intervalRef.current)
      intervalRef.current = null
    }

    if (imageTimerRef.current) {
      clearTimeout(imageTimerRef.current)
      imageTimerRef.current = null
    }

    // Start the scaling animation
    setIsAnimating(true)

    // Schedule the image change after the delay
    imageTimerRef.current = setTimeout(() => {
      // Change to the next image
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listImages.length)

      // If still active (hover on desktop or in view on mobile), schedule the next cycle
      if ((isHovered || (isMobile && isInView)) && listImages.length > 1) {
        startImageCycle()
      }
    }, imageChangeDelay)
  }

  // Handle hover state changes and view changes
  useEffect(() => {
    // Determine if animation should play
    const shouldAnimate =
      (isHovered || (isMobile && isInView)) && listImages.length > 1

    // Clear any existing timers when animation state changes
    if (intervalRef.current) {
      clearTimeout(intervalRef.current)
      intervalRef.current = null
    }

    if (imageTimerRef.current) {
      clearTimeout(imageTimerRef.current)
      imageTimerRef.current = null
    }

    if (shouldAnimate) {
      // Start the first cycle with a slight delay
      intervalRef.current = setTimeout(() => {
        startImageCycle()
      }, 100) // Small delay to ensure animation starts smoothly
    } else {
      // When not animating, stop animation and reset to first image
      setIsAnimating(false)
      setCurrentImageIndex(0)
    }

    // Cleanup when component unmounts or dependencies change
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
      }
      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, isInView, isMobile, listImages.length])

  // Make sure we have at least one image
  const currentImage = listImages[currentImageIndex] || listImages[0]

  return (
    <div
      ref={cardRef}
      className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="flex h-full flex-col p-3">
        <div className="mb-4 h-56 overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="relative h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="h-full w-full"
                animate={{
                  scale: isAnimating ? 1.1 : 1,
                }}
                transition={{
                  type: 'tween',
                  duration: isAnimating ? imageChangeDelay / 1000 : 0.4,
                  ease: 'linear',
                }}
              >
                <Image
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => {
                    setIsHovered(false)
                  }}
                  src={currentImage}
                  alt={title}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover transition-all duration-500"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <h3 className="text-l-medium mb-2">{title}</h3>
        <p className="text-s-regular mb-6">{content}</p>
        <div className="text-s-regular mt-auto text-gray-500">{date}</div>
      </div>
    </div>
  )
}
