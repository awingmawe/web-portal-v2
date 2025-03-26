'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Memoized content component
const TermsContent = React.memo(({ content }: { content: string }) => (
  <div
    dangerouslySetInnerHTML={{ __html: content }}
    className="list-terms-condition text-sm"
  />
))

TermsContent.displayName = 'TermsContent'

const TermsConditionTemplate = ({
  termsCondition,
}: {
  termsCondition: string
}) => {
  const [expanded, setExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { lg } = useTailwindBreakpoint()

  // Memoize constants
  const maxHeight = useMemo(() => 190, []) // Height when collapsed

  // Check overflow with useCallback
  const checkOverflow = useCallback(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight)
    }
  }, [maxHeight])

  // Check overflow when terms condition changes
  useEffect(() => {
    checkOverflow()

    // Optional: add resize listener for better responsiveness
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [termsCondition, checkOverflow])

  // Toggle expand with useCallback
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

  // Memoize the button text
  const buttonText = useMemo(
    () => (expanded ? 'Lihat Lebih Sedikit' : 'Lihat Selengkapnya'),
    [expanded]
  )

  // Memoize chevron animation
  const chevronAnimation = useMemo(
    () => ({
      animate: { rotate: expanded ? 90 : 0 },
      transition: { duration: 0.3 },
    }),
    [expanded]
  )

  // Render only if there's content
  if (!termsCondition) {
    return null
  }

  return (
    <div className="flex flex-col gap-3 border-b border-b-neutral-200 pb-4">
      <div className="flex gap-3">
        <div className="bg-primary-500 h-auto w-[6px] rounded-full" />
        <p className="heading-3-semibold font-semibold max-lg:text-sm max-lg:leading-5">
          Syarat Ketentuan
        </p>
      </div>

      {/* Content with gradient fade effect when collapsed */}
      <div className="relative">
        <motion.div
          ref={contentRef}
          {...animationProps}
          className="overflow-hidden"
        >
          <TermsContent content={termsCondition} />
        </motion.div>

        {/* Gradient overlay for fade effect when collapsed */}
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

      {/* Desktop expand/collapse button */}
      {isOverflowing && !lg && (
        <div
          onClick={toggleExpand}
          className="text-s-medium flex w-fit cursor-pointer items-center gap-0.5 text-[#000] underline"
        >
          {buttonText}
          <motion.div {...chevronAnimation}>
            <ChevronRight size={16} />
          </motion.div>
        </div>
      )}

      {/* Mobile drawer */}
      {isOverflowing && lg && (
        <Drawer>
          <DrawerTrigger asChild>
            <button className="text-s-medium flex items-center gap-0.5 text-[#000] underline">
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
                    Syarat Ketentuan
                  </p>
                </div>
                <DrawerClose>
                  <X className="text-primary-900" />
                </DrawerClose>
              </DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 pb-4 text-sm">
              <TermsContent content={termsCondition} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}

export default TermsConditionTemplate
