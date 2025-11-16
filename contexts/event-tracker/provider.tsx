'use client'

import {
  API_URL,
  HMAC_SECRET,
  LOCAL_STORAGE_USERID,
  LOCAL_STORAGE_UTM,
} from '@/constant/env'
import { getMyProfile } from '@/contexts/auth/shared/api'
import { Profile } from '@/contexts/auth/shared/type'
import { EventTrackerContext } from '@/contexts/event-tracker/context'
import { getAccessToken } from '@/services/common/auth'
import { cookieNames, getCookie } from '@/services/common/cookie'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import queryString from 'query-string'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

export type EventAttribute = {
  name: string
  category: string
  topic?: string
  data?: any
  backgroundProcess?: boolean
  user?: Partial<Profile>
}

interface UTMData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  expiry: number
}

// UTM Storage Utilities
const UTM_EXPIRY_DAYS = 7

function setUTMToLocalStorage(utmParams: Partial<UTMData>) {
  const expiryTime = Date.now() + UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000 // 7 days from now

  const utmData: UTMData = {
    ...utmParams,
    expiry: expiryTime,
  }

  // Only store if there's at least one UTM parameter
  const hasUTMParams = Object.keys(utmParams).some(
    (key) => key.startsWith('utm_') && utmParams[key as keyof typeof utmParams]
  )

  if (hasUTMParams) {
    localStorage.setItem(LOCAL_STORAGE_UTM, JSON.stringify(utmData))
  }
}

function getUTMFromLocalStorage(): Partial<UTMData> | null {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_UTM)
    if (!storedData) return null

    const utmData: UTMData = JSON.parse(storedData)

    // Check if expired
    if (Date.now() > utmData.expiry) {
      localStorage.removeItem(LOCAL_STORAGE_UTM)
      return null
    }

    // Return UTM parameters without expiry
    const { ...utmParams } = utmData
    return utmParams
  } catch (error) {
    console.warn('Error reading UTM from localStorage:', error)
    localStorage.removeItem(LOCAL_STORAGE_UTM) // Clean up corrupted data
    return null
  }
}

function extractUTMFromURL(): Partial<UTMData> {
  if (typeof window === 'undefined') return {}

  const parsedUrl = queryString.parseUrl(window.location.href)
  const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } =
    parsedUrl?.query || {}

  return {
    utm_source: utm_source as string,
    utm_medium: utm_medium as string,
    utm_campaign: utm_campaign as string,
    utm_term: utm_term as string,
    utm_content: utm_content as string,
  }
}

function getCurrentUTMParams(): Partial<UTMData> {
  // First try to get from URL (current visit)
  const urlUTM = extractUTMFromURL()
  const hasCurrentUTM = Object.values(urlUTM).some((value) => value)

  if (hasCurrentUTM) {
    // If URL has UTM, use and store it
    setUTMToLocalStorage(urlUTM)
    return urlUTM
  }

  // Otherwise, use stored UTM
  return getUTMFromLocalStorage() || {}
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
    const { name, category, topic, data = {}, backgroundProcess } = opt

    try {
      // Get current UTM parameters (from URL or localStorage)
      const utmParams = getCurrentUTMParams()

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
        utm: {
          source: utmParams.utm_source,
          medium: utmParams.utm_medium,
          campaign: utmParams.utm_campaign,
          term: utmParams.utm_term,
          content: utmParams.utm_content,
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
    let localUserId = localStorage.getItem(LOCAL_STORAGE_USERID)
    if (localUserId == null || localUserId === 'null' || localUserId === '') {
      localUserId = uuid()
      localStorage.setItem(LOCAL_STORAGE_USERID, localUserId)
    }

    payload.user = {
      sessionId,
      userId: profile?.id || localUserId,
      email: profile?.email,
      role: profile?.role,
      fullName: profile?.name || 'guest',
      username: profile?.username,
      joinDate: profile?.createdAt,
      ...(payload.event.category === 'umrah-personal'
        ? {
            phoneNumber: profile?.persona?.phoneNumber,
            phoneNumberVerified: profile?.phonenumberVerified,
          }
        : {}),
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
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify(payload),
          keepalive: true,
        })
      } else {
        await axios.post(url, payload, { headers })
      }
    } catch (error) {
      console.warn(backgroundProcess, error)
    }
  }

  function hasLoggedIn() {
    return !!getAccessToken()
  }

  function beforeUnload() {
    if (window.pushEventUnmount) window.pushEventUnmount()
  }

  useEffect(() => {
    if (hasLoggedIn()) getProfile()

    // Initialize UTM handling on first load
    const urlUTM = extractUTMFromURL()
    const hasCurrentUTM = Object.values(urlUTM).some((value) => value)

    if (hasCurrentUTM) {
      // Store UTM parameters from URL
      setUTMToLocalStorage(urlUTM)
    }

    const __sessionIdFromCookie = getCookie(cookieNames.SESSION_ID)
    const __sessionId = window?.sessionStorage.getItem('session-id') || uuid()
    window.sessionStorage.setItem('session-id', __sessionId)
    setSessionId(__sessionId ?? __sessionIdFromCookie)
    initObserver()

    window.addEventListener('beforeunload', beforeUnload)
    return () => {
      window.removeEventListener('beforeunload', beforeUnload)
    }
  }, [])

  useEffect(() => {
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
