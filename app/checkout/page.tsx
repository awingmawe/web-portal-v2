/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Checkout from '@/components/pages/checkout/1-CheckoutPage/CheckoutPage'
import MobileCheckoutPage from '@/components/pages/checkout/2-MobileChekoutPage/MobileCheckoutPage'
import Footer from '@/components/shared/Footer'
import Topbar from '@/components/shared/Topbar'
import { MIDTRANS_CLIENT_KEY, SNAP_URL } from '@/constant/env'
import { CheckoutProvider, useCheckout } from '@/contexts/checkout-context'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Fragment, useState } from 'react'

function CheckoutContent() {
  const { token, detailVariant, selectedVariant, paymentToken } = useCheckout()
  const [snapReady, setSnapReady] = useState(false)
  const router = useRouter()

  if (!token || !selectedVariant || !detailVariant) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>
  }
  return (
    <Fragment>
      <div className="hidden lg:block">
        <Topbar token={token} shadow scrolled />
        <Checkout />
        <Footer type="compact" />
      </div>
      <div className="block lg:hidden">
        <MobileCheckoutPage />
      </div>

      <Script
        src={SNAP_URL}
        data-client-key={MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onLoad={() => setSnapReady(true)}
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
