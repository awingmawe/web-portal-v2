'use client'

import { API_URL, HMAC_SECRET } from '@/constant/env'
import { getMyProfile } from '@/contexts/auth/shared/api'
import { Profile } from '@/contexts/auth/shared/type'
import { EventTrackerContext } from '@/contexts/event-tracker/context'
import { getAccessToken } from '@/services/common/auth'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

export type EventAttribute = {
  name: string
  category: string
  topic?: string
  data?: any
  backgroundProcess?: boolean
}

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

async function createHmacSHA256(key: string, message: string) {
  // Encode the key and message to Uint8Array
  const encoder = new TextEncoder()
  const keyData = encoder.encode(key)
  const messageData = encoder.encode(message)

  // Import the key
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  // Sign the message
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)

  // Convert signature (ArrayBuffer) to hex string
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function EventTrackerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const firstLoad = useRef(true)

  const [profile, setProfile] = useState<Profile>()
  const [sessionId, setSessionId] = useState<string>()
  const [queue, setQueue] = useState<any>([])

  const onIntersect = useRef<any>(null)
  const observer = useRef<any>(null)
  const observerCallback = useRef<any>({})

  async function getProfile() {
    try {
      const res = await getMyProfile()
      setProfile(res.data)
    } catch (error) {
      console.warn(error)
    }
  }

  function initObserver() {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((e: any) => {
        const { entered, observerId } = e.target.dataset
        if (
          e &&
          e.isIntersecting &&
          (entered === 'false' || entered === undefined)
        ) {
          e.target.setAttribute('data-entered', 'true')
          if (e.target) {
            if (onIntersect.current) onIntersect.current(e.target.dataset)
            const callback = observerCallback.current[observerId]
            if (callback) callback()
          }
        }
      })
    })
  }

  function setOnIntersect(callback?: () => void) {
    onIntersect.current = callback
  }

  function observe(elem: any, callback: () => void) {
    const { entered } = elem?.dataset
    if (observer.current && (entered === 'false' || entered === undefined)) {
      observer.current.observe(elem)
      const observerId = uuid()
      elem.setAttribute('data-observer-id', observerId)
      observerCallback.current[observerId] = callback
    }
  }

  async function pushEvent(opt: EventAttribute) {
    console.log('Add queue push event', opt.name)
    const { name, category, topic, data = {}, backgroundProcess } = opt

    try {
      const payload = {
        event: {
          name,
          category,
          timestamp: new Date(),
          topic,
        },
        eventData: data,
        property: {
          url: window.location.href,
          device: isMobile() ? 'mobile' : 'desktop',
          platform: 'web',
          latitude: '',
          longitude: '',
        },
        __v: 0,
      }

      const isLoggedIn = hasLoggedIn()
      if (sessionId && (isLoggedIn ? (profile ? true : false) : true))
        execute(payload, backgroundProcess)
      else {
        const newQueue = [...queue, payload]
        setQueue(newQueue)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  async function execute(payload: any, backgroundProcess?: boolean) {
    console.log(`Push Event : ${payload.event?.name}`)
    payload.user = {
      sessionId,
      userId: profile?.id,
      email: profile?.email,
      role: profile?.role,
      fullName: profile?.name,
      username: profile?.username,
      joinDate: profile?.createdAt,
    }

    try {
      const signature = await createHmacSHA256(
        HMAC_SECRET as string,
        JSON.stringify(payload)
      )

      const headers: any = {
        'x-signature': signature,
      }

      const url = `${API_URL}/public/event/v1`

      if (backgroundProcess) {
        const blob = new Blob([JSON.stringify(payload)], headers)
        navigator.sendBeacon(url, blob)
      } else await axios.post(url, payload, { headers })
    } catch (error) {
      console.warn(error)
    }
  }

  function hasLoggedIn() {
    return typeof window !== 'undefined' && !!getAccessToken()
  }

  function beforeUnload(e: any) {
    if (window.pushEventUnmount) window.pushEventUnmount()
  }

  useEffect(() => {
    if (hasLoggedIn()) getProfile()
    const __sessionId = window?.sessionStorage.getItem('session-id') || uuid()
    window.sessionStorage.setItem('session-id', __sessionId)
    setSessionId(__sessionId)
    initObserver()

    window.addEventListener('beforeunload', beforeUnload)
    return () => {
      window.removeEventListener('beforeunload', beforeUnload)
    }
  }, [])

  useEffect(() => {
    console.log(pathname, !firstLoad.current, window.pushEventUnmount)
    if (!firstLoad.current && window.pushEventUnmount) {
      window.pushEventUnmount()
    }
    firstLoad.current = false
  }, [pathname])

  useEffect(() => {
    if (sessionId && queue.length > 0 && (hasLoggedIn() ? profile : true)) {
      for (const each of queue) {
        execute(each)
      }
      setQueue([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, queue, profile])

  return (
    <EventTrackerContext.Provider
      value={{
        sessionId,
        pushEvent,
        observe,
        setOnIntersect,
      }}
    >
      {children}
    </EventTrackerContext.Provider>
  )
}
