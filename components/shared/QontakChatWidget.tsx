'use client'

import {
  QONTAK_WIDGET_CHAT_ID,
  QONTAK_WIDGET_CHAT_SCRIPT,
} from '@/constant/env'
import { useAuth } from '@/contexts/auth/context'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    qchatInitialized?: boolean
    qchatInitialize?: (config: {
      id: string
      code: string
      user?: string
    }) => void
  }
}

const QontakChatWidget = () => {
  const { profile, isLoadingProfile } = useAuth()
  const widgetLoaded = useRef(false)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      widgetLoaded.current ||
      window.qchatInitialized ||
      isLoadingProfile
    ) {
      return
    }

    const isLoggedIn =
      profile?.name && profile?.email && profile?.persona?.phoneNumber

    if (isLoggedIn) {
      const userData = {
        name: profile.name,
        email: profile.email,
        phone_number: profile.persona?.phoneNumber,
        widget_id: QONTAK_WIDGET_CHAT_ID,
      }
      localStorage.setItem('qchat_user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('qchat_user')
    }

    const qchatInit = document.createElement('script')
    qchatInit.src = `${QONTAK_WIDGET_CHAT_SCRIPT}/qchatInitialize.js`

    const qchatWidget = document.createElement('script')
    qchatWidget.src = `${QONTAK_WIDGET_CHAT_SCRIPT}/js/app.js`

    document.head.prepend(qchatInit)
    document.head.prepend(qchatWidget)

    qchatInit.onload = () => {
      if (typeof window.qchatInitialize === 'function') {
        widgetLoaded.current = true
        window.qchatInitialized = true

        const config = {
          id: String(QONTAK_WIDGET_CHAT_ID),
          code: 'EMyA2Qcb7p-XqD8XCgc-Hg',
          user: isLoggedIn
            ? (localStorage.getItem('qchat_user') ?? undefined)
            : undefined,
        }

        console.log('Initializing Qontak Chat:', config)

        window.qchatInitialize(config)

        // Wait for iframe to appear, then adjust style
        const observer = new MutationObserver(() => {
          const iframe = document.getElementById(
            'qontak-webchat-widget'
          ) as HTMLIFrameElement
          if (iframe) {
            iframe.classList.add('qontak-widget-iframe')

            // Add custom close button
            const closeButton = document.createElement('button')
            closeButton.innerText = 'Close'
            closeButton.className = 'custom-close-button'
            closeButton.onclick = () => {
              iframe.style.display = 'none'
            }

            iframe.contentWindow?.document.body.appendChild(closeButton)
            observer.disconnect()
          }
        })

        observer.observe(document.body, { childList: true, subtree: true })
      }
    }
  }, [isLoadingProfile, profile])

  return null
}

export default QontakChatWidget
