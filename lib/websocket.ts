// libs/websocket.ts
let socket: WebSocket | null = null

export function createWebSocket(
  url: string,
  onMessage?: (msg: MessageEvent) => void
) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    return socket
  }

  socket = new WebSocket(url)

  socket.onopen = () => {
    console.log('[WebSocket] Connected:', url)
  }

  socket.onclose = () => {
    console.log('[WebSocket] Disconnected')
  }

  socket.onerror = (err) => {
    console.error('[WebSocket] Error:', err)
  }

  if (onMessage) {
    socket.onmessage = onMessage
  }

  return socket
}

export function getWebSocket() {
  return socket
}
