import { metadata } from '@/app/shared-metadata'
import Checkout from '@/components/pages/checkout/1-CheckoutPage/CheckoutPage'
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
      <Topbar token={token} shadow scrolled />
      <Checkout token={token} />
      <Footer type="compact" />
    </Fragment>
  )
}
