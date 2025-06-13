'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Agenda } from '@/constant/types/PackageProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Separate memoized component for each activity
const Activity = React.memo(
  ({ time, activity }: { time: string; activity: string }) => (
    <div className="flex items-start justify-between gap-3">
      <p className="text-m-regular min-w-[75px] flex-2 text-neutral-900 max-[600px]:flex-4">
        {time}
      </p>
      <p className="text-m-regular text-neutral-900">-</p>
      <p className="text-m-regular flex-16 text-neutral-900 ">{activity}</p>
    </div>
  )
)

Activity.displayName = 'Activity'

// Separate memoized component for each day
const ItineraryDay = React.memo(
  ({
    title,
    activities,
  }: {
    day: number
    title: string
    activities: { time: string; activity: string }[]
  }) => (
    <div className="mb-4 flex flex-col gap-1">
      <p className="text-m-semibold text-neutral-900">{title}</p>
      {activities.map((activity, index) => (
        <Activity
          key={`activity-${index}`}
          time={activity.time}
          activity={activity.activity}
        />
      ))}
    </div>
  )
)

ItineraryDay.displayName = 'ItineraryDay'

// The main Itinerary component
export default function Itinerary({ itinerary }: { itinerary: Agenda[] }) {
  const [expanded, setExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { lg } = useTailwindBreakpoint()

  const maxHeight = useMemo(() => 350, []) // Height when collapsed

  // Check overflow using useCallback
  const checkOverflow = useCallback(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight)
    }
  }, [maxHeight])

  // Effect for checking overflow
  useEffect(() => {
    checkOverflow()

    // Optional: Add resize listener for more accurate overflow detection
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [itinerary, checkOverflow])

  // Use callback for toggle
  const toggleExpand = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  // Memoize animation props
  const animationProps = useMemo(
    () => ({
      initial: { maxHeight },
      animate: {
        maxHeight: expanded || !isOverflowing ? 'fit-content' : maxHeight,
      },
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    }),
    [expanded, isOverflowing, maxHeight]
  )

  // Memoize itinerary content to avoid re-renders
  const itineraryContent = useMemo(
    () =>
      itinerary.map((item, index) => (
        <ItineraryDay
          key={`itinerary-${index}`}
          day={index + 1}
          title={item.title}
          activities={item.activities}
        />
      )),
    [itinerary]
  )

  // Memoize drawer content to avoid re-renders
  const drawerContent = useMemo(
    () =>
      itinerary.map((item, index) => (
        <ItineraryDay
          key={`itinerary-drawer-${index}`}
          day={index + 1}
          title={item.title}
          activities={item.activities}
        />
      )),
    [itinerary]
  )

  return (
    <div className="flex flex-col gap-3 pb-4">
      <div className="flex gap-3">
        <div className="bg-primary-500 h-auto w-[6px] rounded-full" />
        <p className="heading-3-semibold font-semibold max-lg:text-sm max-lg:leading-5">
          Detail Perjalanan
        </p>
      </div>

      {/* Content with gradient fade effect when collapsed */}
      <div className="relative">
        <motion.div
          ref={contentRef}
          {...animationProps}
          className="overflow-hidden"
        >
          {itineraryContent}
        </motion.div>

        {/* Gradient overlay for fade effect */}
        <AnimatePresence>
          {!expanded && isOverflowing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute right-0 bottom-0 left-0 h-[173px] bg-gradient-to-t from-white to-transparent"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Conditionally render desktop expand button or mobile drawer */}
      {isOverflowing && (
        <>
          {/* Desktop expand/collapse button */}
          {!lg && (
            <div className="z-9 flex justify-end">
              <button
                onClick={toggleExpand}
                className="text-s-medium flex w-fit cursor-pointer items-center gap-0.5 text-[#000] underline"
              >
                {expanded ? 'Lihat Lebih Sedikit' : 'Lihat Selengkapnya'}
                <motion.div
                  animate={{ rotate: expanded ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight size={16} />
                </motion.div>
              </button>
            </div>
          )}

          {/* Mobile drawer */}
          {lg && (
            <div className="flex justify-start">
              <Drawer>
                <DrawerTrigger asChild>
                  <button className="text-s-medium z-9 flex items-center gap-0.5 text-[#000] underline">
                    Lihat Selengkapnya
                    <ChevronRight size={16} />
                  </button>
                </DrawerTrigger>
                <DrawerContent className="border-0 outline-0">
                  <DrawerHeader className="p-3">
                    <DrawerTitle className="flex justify-between">
                      <div className="flex gap-3">
                        <div className="bg-primary-500 h-auto w-[6px] rounded-full" />
                        <p className="heading-3-semibold font-semibold max-lg:text-sm max-lg:leading-5">
                          Detail Perjalanan
                        </p>
                      </div>
                      <DrawerClose>
                        <X className="text-primary-900" />
                      </DrawerClose>
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="max-h-[70vh] overflow-y-auto px-4 pb-4">
                    {drawerContent}
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          )}
        </>
      )}
    </div>
  )
}
