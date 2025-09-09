import { metadata } from '@/app/shared-metadata'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import NotificationComponent from '@/components/shared/Notification'
import { Fragment } from 'react'

export async function generateMetadata() {
  return {
    ...metadata('Muslim101 | Notification', `Notification`),
  }
}

export default async function NotificationMobile() {
  return (
    <Fragment>
      <main className="fixed my-7.5 mt-auto mb-0 h-[100vh] w-full overflow-hidden bg-transparent">
        <MobileTopbar
          variant="plain"
          showBackButton={true}
          title="Notifikasi"
        />
        <NotificationComponent />
      </main>
    </Fragment>
  )
}
