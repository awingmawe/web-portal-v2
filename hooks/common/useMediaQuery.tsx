'use client'

import { useMediaQuery as useResponsiveMediaQuery } from 'react-responsive'

/**
 * Hook that returns whether the viewport matches Tailwind's breakpoints.
 * Uses react-responsive under the hood for reliable media query detection.
 * @returns An object with boolean values for each Tailwind breakpoint.
 */
export function useTailwindBreakpoint() {
  // Define breakpoints according to Tailwind's default theme
  const xs = useResponsiveMediaQuery({ query: '(max-width: 639px)' })
  const sm = useResponsiveMediaQuery({ query: '(min-width: 640px)' })
  const md = useResponsiveMediaQuery({ query: '(min-width: 768px)' })
  const lg = useResponsiveMediaQuery({ query: '(min-width: 1024px)' })
  const xl = useResponsiveMediaQuery({ query: '(min-width: 1280px)' })
  const xxl = useResponsiveMediaQuery({ query: '(min-width: 1536px)' }) // 2xl in Tailwind

  return { xs, sm, md, lg, xl, xxl }
}

/**
 * Hook that returns whether a specific media query matches.
 * Wrapper around react-responsive's useMediaQuery for easier usage.
 * @param query The media query to check (e.g., "(min-width: 800px)")
 * @returns A boolean indicating whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  return useResponsiveMediaQuery({ query })
}
