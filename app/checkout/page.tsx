import { metadata } from '@/app/shared-metadata'
import Checkout from '@/components/pages/checkout/1-CheckoutPage/CheckoutPage'
import MobileCheckoutPage from '@/components/pages/checkout/2-MobileChekoutPage/MobileCheckoutPage'
import Footer from '@/components/shared/Footer'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Checkout', `Muslim 101 Checkout`),
  }
}

export default async function CheckoutGeneral() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <Fragment>
      <div className="hidden sm:block">
        <Topbar token={token} shadow scrolled />
        <Checkout token={token} />

        <Footer type="compact" />
      </div>
      <div className="block sm:hidden">
        <MobileCheckoutPage />
      </div>
    </Fragment>
  )
}
