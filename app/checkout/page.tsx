import CheckoutPage from '@/components/pages/checkout/CheckoutPage'
import MobileCheckoutPage from '@/components/pages/checkout/MobileChekoutPage/MobileCheckoutPage'
import Footer from '@/components/shared/Footer'
import Topbar from '@/components/shared/Topbar'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export default async function CheckoutContent() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  return (
    <Fragment>
      <div className="hidden lg:block">
        <Topbar token={token} shadow scrolled />
        <CheckoutPage />
        <Footer type="compact" />
      </div>
      <div className="block lg:hidden">
        <MobileCheckoutPage />
      </div>

      {/* <Script
        src={SNAP_URL}
        data-client-key={MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onError={() => {}}
      /> */}

      <EventTrackerImpression
        nameDidMount="impression_checkout"
        nameDidUnmount="exit_checkout"
        topic={'umrah'}
        category="checkout"
      />
    </Fragment>
  )
}
