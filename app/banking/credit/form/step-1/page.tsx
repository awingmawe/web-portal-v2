import { metadata } from '@/app/shared-metadata'
import Step1Layout from '@/components/pages/banking/credit/form/1-Step1/Step1Layout'
import Footer from '@/components/shared/Footer'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { getFacilityEnum } from '@/services/general-service'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim101 | Form Talangan Umroh',
      `Form Pengajuan Talangan Umroh`
    ),
  }
}

export default async function TalanganFormStep1() {
  const cookieStore = cookies()
  const token = (await cookieStore).get(cookieNames.USER_ACCESS_TOKEN)
    ?.value as string
  const dataTenor = await getFacilityEnum('credit_tenor')
  return (
    <Fragment>
      <Topbar scrolled token={token} />

      <Step1Layout dataTenor={dataTenor.data.results} />

      <Footer type="compact" className="hidden lg:block" />
    </Fragment>
  )
}
