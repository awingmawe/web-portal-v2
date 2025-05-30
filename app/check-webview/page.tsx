import { cookies, headers } from 'next/headers'
import Link from 'next/link'

export default async function CheckWebviewPage() {
  const cookieStore = await cookies()

  const userAgent = (await headers()).get('user-agent') || ''
  const sessioNId = cookieStore.get('session-id') || ''

  return (
    <div>
      <h1>Headers</h1>
      <p>User Agent : {userAgent}</p>
      <p>sessionId : {JSON.stringify(sessioNId)}</p>
      <Link href="/check-webview-2">Kesini</Link>
    </div>
  )
}
