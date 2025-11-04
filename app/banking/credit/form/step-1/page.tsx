import { metadata } from '@/app/shared-metadata'
import Step1Layout from '@/components/pages/banking/credit/form/step-1/Step1Layout'
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

export default async function TalanganFormStep1() {
  const [dataTenor, dataPekerjaan] = await Promise.all([
    getFacilityEnum('credit_tenor'),
    getFacilityEnum('work'),
  ])

  return (
    <Fragment>
      <Step1Layout
        dataTenor={dataTenor.data.results}
        dataPekerjaan={dataPekerjaan.data.results}
      />
    </Fragment>
  )
}
