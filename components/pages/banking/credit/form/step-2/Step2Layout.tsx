'use client'

import StepperIndicator from '@/components/pages/banking/common/StepperIndicator'
import FinancingSimulation from '@/components/pages/banking/common/TenorCalculation'
import EmptyDataPembiayaan from '@/components/pages/banking/credit/form/step-1/EmptyDataPembiayaan'
import ProviderList from '@/components/pages/banking/credit/form/step-2/ProviderList/ProviderList'
import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import { Facility } from '@/constant/types/FacilityProps'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { useLocalStorageListener } from '@/hooks/common/useLocalStorageListener'
import { Fragment } from 'react'

const Step2Layout = ({ dataTenor }: { dataTenor: Facility[] }) => {
  const [dataPembiayaan, isLoading] =
    useLocalStorageListener<PembiayaanDataLocalStorage>(
      LOCAL_STORAGE_PEMBIAYAAN
    )

  // Kalo belum ada data pembiayaan di local storage
  if (!dataPembiayaan && !isLoading) return <EmptyDataPembiayaan />

  return (
    <Fragment>
      <StepperIndicator />
      <div className="container mx-auto flex flex-col gap-3 max-lg:px-4">
        <p className="text-l-semibold">Tenor & Estimasi Pembiayaan</p>
        <FinancingSimulation
          dataTenor={dataTenor}
          price={dataPembiayaan?.price}
        />
      </div>
      <ProviderList dataPembiayaan={dataPembiayaan} isLoading={isLoading} />
    </Fragment>
  )
}

export default Step2Layout
