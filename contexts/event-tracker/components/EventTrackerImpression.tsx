'use client'

import { useEventTracker } from '@/contexts/event-tracker/context'
import dayjs from 'dayjs'
import { usePathname } from 'next/navigation'
import { ComponentProps, useEffect, useRef, useState } from 'react'

type EventTrackerImpressionProps = ComponentProps<'div'> & {
  nameDidMount: string
  nameDidUnmount?: string
  category: string
  topic: string
  onIntersect?: any
  data?: any
}

export default function EventTrackerImpression({
  nameDidMount,
  nameDidUnmount,
  category,
  topic,
  onIntersect,
  data = {},
  ...props
}: EventTrackerImpressionProps) {
  const pathname = usePathname()
  const { pushEvent, setOnIntersect } = useEventTracker()
  const pathnameRef = useRef<any>(null)
  const [startTime] = useState(new Date())
  const impressed = useRef(false)

  useEffect(() => {
    if (!impressed.current) {
      pathnameRef.current = pathname
      setOnIntersect(onIntersect)
      pushEvent({
        name: nameDidMount,
        topic,
        category,
        data,
      })

      function handleUnmount() {
        pushEvent({
          name: nameDidUnmount as string,
          topic,
          category,
          data: {
            ...data,
            startTime,
            endTime: new Date(),
            duration: dayjs(new Date()).diff(startTime, 'second'),
          },
          backgroundProcess: true,
        })
      }

      if (nameDidUnmount) {
        setTimeout(() => (window.pushEventUnmount = handleUnmount), 500)
      }
      impressed.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="hidden" {...props} />
}
