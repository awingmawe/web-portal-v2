import { PACKAGE_TYPE } from '@/constant/env'
import { useMemo } from 'react'

interface StatusValidation {
  isCompletedHajjKhusus: boolean
  isCompletedHajjRegular: boolean
  isCompletedUmrah: boolean
}

interface StatusValidationProps {
  status: string
  isManifestCommitted: boolean
  isPaidOff: boolean
  variantType?: string
  packageType?: string
}

export const useGetStatusValidation = ({
  status,
  isManifestCommitted,
  isPaidOff,
  variantType,
  packageType,
}: StatusValidationProps): StatusValidation => {
  return useMemo(() => {
    const isCompletedHajjKhusus =
      variantType === PACKAGE_TYPE.HAJJ_SPECIAL && status === 'approved'
    const isCompletedHajjRegular =
      (variantType === PACKAGE_TYPE.HAJJ_DAKHILI ||
        variantType === PACKAGE_TYPE.HAJJ_FURODA) &&
      status === 'approved' &&
      isManifestCommitted
    const isCompletedUmrah =
      packageType === PACKAGE_TYPE.UMRAH &&
      isManifestCommitted &&
      isPaidOff &&
      status === 'approved'

    return {
      isCompletedHajjKhusus,
      isCompletedHajjRegular,
      isCompletedUmrah,
    }
  }, [variantType, status, isManifestCommitted, packageType, isPaidOff])
}
