'use client'

import { useWebSocket } from '@/hooks/websocket/useWebcoket'
import { useEffect } from 'react'

type WebSocketWidget = {
  token?: string
}

const WebSocketWidget = ({ token }: WebSocketWidget) => {
  const { messages } = useWebSocket<{ type: string; content: string }>(
    token ?? ''
  )

  useEffect(() => {
    console.log('messages', messages)
    console.log('token', token)
  }, [messages, token])

  return null
}

export default WebSocketWidget
