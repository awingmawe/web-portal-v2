import { metadata } from '@/app/shared-metadata'
import TalanganFormPage from '@/components/pages/banking/TalanganForm/TalanganFormPage'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export async function generateMetadata() {
  return {
    ...metadata('Muslim101 | Form Talangan Umroh', `Form Pengajuan Talangan Umroh`),
  }
}

export default async function TalanganForm() {
  const cookieStore = cookies()
  const token = (await cookieStore).get(cookieNames.USER_ACCESS_TOKEN)
    ?.value as string

  return (
    <Fragment>
      <Topbar shadow scrolled token={token} />
      
      {/* Mobile Topbar */}
      <MobileTopbar 
        variant="plainBank" 
        showBackButton 
        title="Form Talangan Umroh"
      />
      
      {/* Mobile Content */}
      <div className="mx-auto block lg:container lg:hidden">
        <TalanganFormPage />
      </div>

      {/* Desktop Content */}
      <div className="container mx-auto hidden lg:block">
        <TalanganFormPage />
      </div>

      <Footer type="compact" className="hidden lg:block" />
    </Fragment>
  )
}