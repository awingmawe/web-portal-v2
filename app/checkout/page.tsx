'use client'

import Checkout from '@/components/pages/checkout/1-CheckoutPage/CheckoutPage'
import MobileCheckoutPage from '@/components/pages/checkout/2-MobileChekoutPage/MobileCheckoutPage'
import Footer from '@/components/shared/Footer'
import MidtransPayment from '@/components/shared/Payment/MidtransPayment'
import Topbar from '@/components/shared/Topbar'
import { CheckoutProvider, useCheckout } from '@/contexts/checkout-context'
import { Fragment } from 'react'

function CheckoutContent() {
  const { token, detailVariant, selectedVariant, paymentToken, booking } =
    useCheckout()

  if (!token || !selectedVariant || !detailVariant) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>
  }

  return (
    <Fragment>
      <div className="hidden sm:block">
        <Topbar token={token} shadow scrolled />
        <Checkout />
        <Footer type="compact" />
      </div>
      <div className="block sm:hidden">
        <MobileCheckoutPage />
      </div>
      <MidtransPayment
        paymentToken={paymentToken}
        onSuccess={() => {
          router.push(
            `/transaction/success?id=${booking?.bookingCode}&status_code=200&transaction_status=settlement&id=${booking?.id}`
          )
        }}
        onPending={() => {
          router.push(`/transaction/${booking?.bookingCode}`)
        }}
        onClose={() => {}}
      />
    </Fragment>
  )
}

export default function CheckoutGeneral() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  )
}
