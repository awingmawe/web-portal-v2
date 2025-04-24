import { EventAttribute } from '@/contexts/event-tracker/provider'
import { createContext, useContext } from 'react'

type EventTrackerContextProps = {
  sessionId?: string
  pushEvent: (opt: EventAttribute) => Promise<void> | any
  observe: (elem: any, callback: () => void) => void
  setOnIntersect: (data: any) => void
}

export const EventTrackerContext = createContext<EventTrackerContextProps>({
  sessionId: undefined,
  pushEvent: () => {
    return
  },
  observe: () => {
    return
  },
  setOnIntersect: () => {
    return
  },
})

export const useEventTracker = () => useContext(EventTrackerContext)
