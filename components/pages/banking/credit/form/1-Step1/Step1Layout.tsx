'use client'

import StepperIndicator from '@/components/pages/banking/common/StepperIndicator'
import DetailPackagePembiayaan from '@/components/pages/banking/credit/form/1-Step1/DetailPackage/DetailPackage'
import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import { Facility } from '@/constant/types/FacilityProps'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { useLocalStorageListener } from '@/hooks/common/useLocalStorageListener'

const Step1Layout = ({ dataTenor }: { dataTenor: Facility[] }) => {
  const [dataPembiayaan] = useLocalStorageListener<PembiayaanDataLocalStorage>(
    LOCAL_STORAGE_PEMBIAYAAN
  )

  const isLoading = dataPembiayaan === null

  return (
    <main className="my-6 flex flex-col gap-8 max-lg:gap-6">
      <StepperIndicator />
      <DetailPackagePembiayaan
        isLoading={isLoading}
        dataPembiayaan={dataPembiayaan}
        dataTenor={dataTenor}
      />
    </main>
  )
}

export default Step1Layout
