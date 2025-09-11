import { metadata } from '@/app/shared-metadata'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Notification from '@/components/shared/Notification'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export async function generateMetadata() {
  return {
    ...metadata('Muslim101 | Notification', `Notification`),
  }
}

export default async function NotificationMobile() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <Fragment>
      <main className="fixed my-7.5 mt-auto mb-0 h-[100vh] w-full overflow-hidden bg-transparent">
        <MobileTopbar
          variant="plain"
          showBackButton={true}
          title="Notifikasi"
        />
        <Notification token={token} mobile={true} />
      </main>
    </Fragment>
  )
}
