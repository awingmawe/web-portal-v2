import { animate } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'

import { Easing } from 'framer-motion'

interface SmoothScrollOptions {
  duration?: number
  ease?: Easing | Easing[]
}

/**
 * Custom hook for smooth scrolling to elements or positions in a container
 */
export const useSmoothScroll = <T extends HTMLElement>() => {
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollContainerRef = useRef<T | null>(null)
  const hasScrolledRef = useRef(false)

  /**
   * Scroll to a specific position in the container
   * @param position Scroll position (in pixels)
   * @param options Animation options
   */
  const scrollToPosition = useCallback(
    (
      position: number,
      options: SmoothScrollOptions = {
        duration: 0.5,
        ease: [0.32, 0.72, 0, 1],
      }
    ) => {
      const container = scrollContainerRef.current
      if (!container) return false

      const { duration = 0.5, ease = [0.32, 0.72, 0, 1] } = options
      const currentScrollTop = container.scrollTop

      setIsScrolling(true)

      // Use framer-motion's animate function for smooth scrolling
      animate(currentScrollTop, position, {
        duration,
        ease,
        onUpdate: (value) => {
          if (container) {
            container.scrollTop = value
          }
        },
        onComplete: () => {
          setIsScrolling(false)
          hasScrolledRef.current = true
        },
      })

      return true
    },
    []
  )

  /**
   * Scroll to an index in a list of items
   * @param index Item index to scroll to
   * @param itemHeight Height of each item (in pixels)
   * @param options Animation options
   */
  const scrollToIndex = useCallback(
    (index: number, itemHeight: number, options?: SmoothScrollOptions) => {
      const container = scrollContainerRef.current
      if (!container || index < 0 || hasScrolledRef.current) return false

      const containerHeight = container.clientHeight
      const scrollTop =
        index * itemHeight - containerHeight / 2 + itemHeight * 2 + 30

      return scrollToPosition(Math.max(0, scrollTop), options)
    },
    [scrollToPosition]
  )

  /**
   * Reset the scroll state
   */
  const resetScroll = useCallback(() => {
    hasScrolledRef.current = false
  }, [])

  /**
   * Check if the component has already performed a scroll
   */
  const hasScrolled = useCallback(() => {
    return hasScrolledRef.current
  }, [])

  /**
   * Reset scroll position to top
   */
  const scrollToTop = useCallback(
    (animate = true) => {
      const container = scrollContainerRef.current
      if (!container) return false

      if (animate) {
        return scrollToPosition(0)
      } else {
        container.scrollTop = 0
        return true
      }
    },
    [scrollToPosition]
  )

  return {
    scrollContainerRef,
    scrollToPosition,
    scrollToIndex,
    scrollToTop,
    isScrolling,
    hasScrolled,
    resetScroll,
  }
}
