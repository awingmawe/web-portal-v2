import { headers } from 'next/headers'

export default async function CheckWebviewPage() {
  const userAgent = (await headers()).get('user-agent') || ''
  const aldanGanteng = (await headers()).get('aldan-ganteng') || ''

  return (
    <div>
      <h1>Headers</h1>
      <p>User Agent : {userAgent}</p>
      <p>aldanGanteng : {aldanGanteng}</p>
    </div>
  )
}
