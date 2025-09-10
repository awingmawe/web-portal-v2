'use client'

import { useEffect, useRef, useState } from 'react'
import { createWebSocket, getWebSocket } from '@/lib/websocket'
import { WEBSOCKET_URL } from '@/constant/env'

const RECONNECT_INTERVAL = 3000 // ms
const MAX_RETRIES = 10

export function useWebSocket<T = any>(token: string) {
  const [messages, setMessages] = useState<T[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<WebSocket | null>(null)
  const retries = useRef(0)
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let ws: WebSocket | null = null

    const connect = () => {
      const url = `${WEBSOCKET_URL}?token=${token}`

      ws = createWebSocket(url, (msg) => {
        try {
          const data = JSON.parse(msg.data)
          setMessages((prev) => [...prev, data])
        } catch {
          console.warn('[WebSocket] Non-JSON message:', msg.data)
        }
      })

      socketRef.current = ws

      ws.onopen = () => {
        setIsConnected(true)
        retries.current = 0
      }

      ws.onclose = () => {
        setIsConnected(false)
        if (retries.current < MAX_RETRIES) {
          retries.current += 1
          reconnectTimeout.current = setTimeout(connect, RECONNECT_INTERVAL)
        } else {
        }
      }

      ws.onerror = (err) => {
        console.error('❌ error:', err)
        ws?.close()
      }
    }

    connect()

    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current)
      ws?.close()
    }
  }, [token])

  const sendMessage = (data: any) => {
    const socket = getWebSocket()
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data))
    } else {
    }
  }

  return { messages, sendMessage, isConnected }
}
