'use client'
import { useEffect } from 'react'

export default function WebViewAccess() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/article'
    }, 3000)
  }, [])
  return (
    <div>
      <h1>WebView Access</h1>
    </div>
  )
}
