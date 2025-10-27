'use client'

import DetailPackagePembiayaan from '@/components/pages/banking/credit/form/step-1/DetailPackage/DetailPackage'
import EmptyDataPembiayaan from '@/components/pages/banking/credit/form/step-1/EmptyDataPembiayaan'
import SubmissionStep1 from '@/components/pages/banking/credit/form/step-1/MainForm'
import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import { Facility } from '@/constant/types/FacilityProps'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { useLocalStorageListener } from '@/hooks/common/useLocalStorageListener'
import { Fragment } from 'react'

const Step1Layout = ({
  dataTenor,
  dataPekerjaan,
}: {
  dataTenor: Facility[]
  dataPekerjaan: Facility[]
}) => {
  const [dataPembiayaan, isLoading] =
    useLocalStorageListener<PembiayaanDataLocalStorage>(
      LOCAL_STORAGE_PEMBIAYAAN
    )

  // Kalo belum ada data pembiayaan di local storage
  if (!dataPembiayaan && !isLoading) return <EmptyDataPembiayaan />

  return (
    <Fragment>
      <DetailPackagePembiayaan
        isLoading={isLoading}
        dataPembiayaan={dataPembiayaan}
        dataTenor={dataTenor}
      />
      <SubmissionStep1
        dataPembiayaan={dataPembiayaan}
        dataPekerjaan={dataPekerjaan}
        loading={isLoading}
      />
    </Fragment>
  )
}

export default Step1Layout
