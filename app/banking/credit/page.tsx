import { metadata } from '@/app/shared-metadata'
import PembiayaanPage from '@/components/pages/banking/2-Pembiayaan/PembiayaanPage'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { Fragment } from 'react'
export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Talangan Umroh', `Talangan Umroh`),
  }
}
export default async function SearchGeneral() {
  const cookieStore = cookies()
  const token = (await cookieStore).get(cookieNames.USER_ACCESS_TOKEN)
    ?.value as string

  return (
    <Fragment>
      <Topbar shadow scrolled token={token} />

      {/* Mobile (tanpa wrapper) */}
      <MobileTopbar variant="plainBank" showBackButton title="Talangan Umroh" />
      <div className="mx-auto block lg:container lg:hidden">
        <PembiayaanPage />
      </div>

      {/* Desktop (dengan wrapper) */}
      <div className="container mx-auto hidden lg:block">
        <PembiayaanPage />
      </div>

      <Footer type="compact" className="hidden lg:block" />
    </Fragment>
  )
}
