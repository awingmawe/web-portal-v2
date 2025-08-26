'use client'

import MobileCheckoutPage from '@/components/pages/checkout/2-MobileChekoutPage/MobileCheckoutPage'
import CheckoutPage from '@/components/pages/checkout/CheckoutPage'
import Footer from '@/components/shared/Footer'
import Topbar from '@/components/shared/Topbar'
import { MIDTRANS_CLIENT_KEY, SNAP_URL } from '@/constant/env'
import { CheckoutProvider, useCheckout } from '@/contexts/checkout-context-v2'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import Script from 'next/script'
import { Fragment } from 'react'

function CheckoutContent() {
  const { token, detailVariant, selectedVariant } = useCheckout()

  if (!token || !selectedVariant || !detailVariant) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>
  }
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

      <Script
        src={SNAP_URL}
        data-client-key={MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onError={() => {}}
      />
    </Fragment>
  )
}

export default function CheckoutGeneral() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
      <EventTrackerImpression
        nameDidMount="impression_checkout"
        nameDidUnmount="exit_checkout"
        topic={'umrah'}
        category="checkout"
      />
    </CheckoutProvider>
  )
}
