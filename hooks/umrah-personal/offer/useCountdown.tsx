'use client'

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isAfter,
  parseISO,
} from 'date-fns'
import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}
const useCountdown = (expiredDate: string): TimeLeft | null => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft | null => {
      const now = new Date()
      const expiry = parseISO(expiredDate)

      // Check if expiry date is in the future
      if (isAfter(expiry, now)) {
        const totalDays = differenceInDays(expiry, now)
        const totalHours = differenceInHours(expiry, now)
        const totalMinutes = differenceInMinutes(expiry, now)
        const totalSeconds = differenceInSeconds(expiry, now)

        return {
          days: totalDays,
          hours: totalHours % 24,
          minutes: totalMinutes % 60,
          seconds: totalSeconds % 60,
        }
      }
      return null
    }

    // Calculate initial time
    setTimeLeft(calculateTimeLeft())

    // Set up interval to update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(timer)
  }, [expiredDate])

  return timeLeft
}

export default useCountdown
