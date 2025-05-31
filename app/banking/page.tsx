import TabunganPage from '@/components/pages/banking/1-Tabungan/TabunganPage'
import PembiayaanPage from '@/components/pages/banking/2-Pembiayaan/PembiayaanPage'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

interface SearchGeneralProps {
  searchParams: any
}

export default async function SearchGeneral({
  searchParams,
}: SearchGeneralProps) {
  const cookieStore = cookies()
  const token = (await cookieStore).get(cookieNames.USER_ACCESS_TOKEN)
    ?.value as string

  const awaitedParams = await searchParams

  return (
    <Fragment>
      <Topbar shadow scrolled token={token} />

      {/* Mobile (tanpa wrapper) */}
      <div className="container mx-auto block lg:hidden">
        {awaitedParams.page === 'pembiayaan' ? (
          <>
            <MobileTopbar
              variant="plainBank"
              showBackButton
              title="Talangan Umroh"
            />
            <PembiayaanPage />
          </>
        ) : (
          <>
            <MobileTopbar variant="plainBank" showBackButton title="Tabungan" />
            <TabunganPage />
          </>
        )}
      </div>

      {/* Desktop (dengan wrapper) */}
      <div className="container mx-auto hidden lg:block">
        {awaitedParams.page === 'pembiayaan' ? (
          <>
            <MobileTopbar
              variant="plainBank"
              showBackButton
              title="Talangan Umroh"
            />
            <PembiayaanPage />
          </>
        ) : (
          <>
            <MobileTopbar variant="plainBank" showBackButton title="Tabungan" />
            <TabunganPage />
          </>
        )}
      </div>

      <Footer type="compact" className="hidden md:block" />
    </Fragment>
  )
}
