'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollShadowWrapperProps {
  children: React.ReactNode
  mobileTopbarFilter: React.ReactNode
}

export default function ScrollShadowWrapper({
  children,
  mobileTopbarFilter,
}: ScrollShadowWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      setIsScrolled(scrollContainer.scrollTop > 0)
    }

    scrollContainer.addEventListener('scroll', handleScroll)

    // Check initial scroll position
    handleScroll()

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      className={`scrollbar-hide container mx-auto mt-25 grid grid-cols-12 gap-5 overflow-x-hidden max-lg:absolute max-lg:top-[55px] max-lg:bottom-0 max-lg:z-11 max-lg:mt-0 max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:gap-0 max-lg:overflow-y-auto max-lg:rounded-tl-3xl max-lg:rounded-tr-3xl max-lg:bg-white max-lg:pb-20 max-lg:shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]`}
      ref={scrollContainerRef}
    >
      <div
        className={`sticky top-0 z-30 col-span-12 bg-white px-4 pb-2 transition-shadow duration-200 lg:hidden ${
          isScrolled ? 'shadow-[0_6px_20px_0_rgba(0,0,0,0.15)]' : ''
        }`}
      >
        {mobileTopbarFilter}
      </div>
      {children}
    </section>
  )
}
