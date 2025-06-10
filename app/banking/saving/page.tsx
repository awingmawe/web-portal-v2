import TabunganPage from '@/components/pages/banking/1-Tabungan/TabunganPage'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export default async function SearchGeneral() {
  const cookieStore = cookies()
  const token = (await cookieStore).get(cookieNames.USER_ACCESS_TOKEN)
    ?.value as string

  return (
    <Fragment>
      <Topbar shadow scrolled token={token} />

      {/* Mobile (tanpa wrapper) */}
      <div className="container mx-auto block lg:hidden">
        <MobileTopbar variant="plainBank" showBackButton title="Tabungan" />
        <TabunganPage />
      </div>

      {/* Desktop (dengan wrapper) */}
      <div className="container mx-auto hidden lg:block">
        <MobileTopbar variant="plainBank" showBackButton title="Tabungan" />
        <TabunganPage />
      </div>

      <Footer type="compact" className="hidden md:block" />
    </Fragment>
  )
}
