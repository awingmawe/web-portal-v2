import { metadata } from '@/app/shared-metadata'
import TabunganPage from '@/components/pages/banking/saving/TabunganPage'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { Fragment } from 'react'
export async function generateMetadata() {
  return {
    ...metadata('Muslim101 | Tabungan Umroh', `Tabungan Umroh`),
  }
}
export default async function SearchGeneral() {
  const cookieStore = cookies()
  const token = (await cookieStore).get(cookieNames.USER_ACCESS_TOKEN)
    ?.value as string

  return (
    <Fragment>
      <Topbar shadow scrolled token={token} />
      <MobileTopbar variant="plainBank" showBackButton title="Tabungan" />
      {/* Mobile (tanpa wrapper) */}
      <div className="mx-auto block lg:container lg:hidden">
        <TabunganPage />
      </div>

      {/* Desktop (dengan wrapper) */}
      <div className="container mx-auto hidden lg:block">
        <TabunganPage />
      </div>

      <Footer type="compact" className="hidden lg:block" />
    </Fragment>
  )
}
