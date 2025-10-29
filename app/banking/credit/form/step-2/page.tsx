import { metadata } from '@/app/shared-metadata'
import Step2Layout from '@/components/pages/banking/credit/form/step-2/Step2Layout'
import { getFacilityEnum } from '@/services/general-service'
import { Fragment } from 'react'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim101 | Form Talangan Umroh',
      `Form Pengajuan Talangan Umroh`
    ),
  }
}

export default async function TalanganFormStep2() {
  const [dataTenor] = await Promise.all([getFacilityEnum('credit_tenor')])

  return (
    <Fragment>
      <Step2Layout dataTenor={dataTenor.data.results} />
    </Fragment>
  )
}
