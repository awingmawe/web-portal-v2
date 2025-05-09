// components/ui/custom-infinite-scroll.tsx
'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface CustomInfiniteScrollProps {
  isLoading: boolean
  hasMore: boolean
  next: () => void
  threshold?: number
  className?: string
  loaderClassName?: string
}

export const CustomInfiniteScroll: React.FC<CustomInfiniteScrollProps> = ({
  isLoading,
  hasMore,
  next,
  threshold = 0.8,
  className = '',
  loaderClassName = '',
}) => {
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip if we're already loading or there's nothing more to load
    if (isLoading || !hasMore) return

    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver(
      (entries) => {
        // If the loader element is visible and we have more items to load
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          next()
        }
      },
      {
        // Set the root to null (viewport)
        root: null,
        // Set the root margin to 0px
        rootMargin: '0px',
        // Set the threshold (how much of the element needs to be visible)
        threshold,
      }
    )

    // Get the current loader element
    const currentLoader = loaderRef.current

    // If we have a loader element, observe it
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    // Cleanup: disconnect the observer when the component unmounts
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
      observer.disconnect()
    }
  }, [isLoading, hasMore, next, threshold])

  return (
    <div className={className} ref={loaderRef}>
      {/* Only show the loader when we have more items and we're in a loading state */}
      {isLoading && hasMore && (
        <div
          className={`flex items-center justify-center py-4 ${loaderClassName}`}
        >
          <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
        </div>
      )}
    </div>
  )
}
