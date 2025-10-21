import CheckoutPage from '@/components/pages/checkout/CheckoutPage'
import Footer from '@/components/shared/Footer'
import Topbar from '@/components/shared/Topbar'
import { CheckoutProvider } from '@/contexts/checkout-context-v2'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'

export default async function CheckoutContent() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <CheckoutProvider>
      <Topbar token={token} shadow scrolled />
      <CheckoutPage />
      <Footer type="compact" className="max-lg:hidden" />

      <EventTrackerImpression
        nameDidMount="impression_checkout"
        nameDidUnmount="exit_checkout"
        topic={'umrah'}
        category="checkout"
      />
    </CheckoutProvider>
  )
}
