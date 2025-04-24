'use client'

import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'

export default function HomeEventTracker() {
  return (
    <EventTrackerImpression
      nameDidMount="impression_home"
      topic="umrah"
      category="home"
    />
  )
}
