import {
  DataSK,
  DetailVariant,
  LegalActions,
} from '@/constant/types/CheckoutProps'
import { Legal } from '@/constant/types/LegalProps'
import { getSlugByVariantPackage } from '@/lib/utils'
import { getLegalSyarat } from '@/services/general-service'
import { checkRefundPolicy } from '@/services/identity-service'

interface UseLegalActionsProps {
  setDataSk: (data: DataSK) => void
  detailVariant: DetailVariant
  setDataRefundPolicy: (policy: string) => void
  setParsedContent: (
    content: {
      jumlah: string
      berlaku: string
    }[]
  ) => void
  setDataLegal: (legal: Legal) => void
}

export const useLegalActions = ({
  setDataSk,
  detailVariant,
  setDataRefundPolicy,
  setParsedContent,
  setDataLegal,
}: UseLegalActionsProps): LegalActions => {
  const getLegal = async (): Promise<void> => {
    try {
      const res = await getLegalSyarat('syarat-dan-ketentuan')
      setDataSk(res.results[0])
    } catch (error) {
      console.log(error)
    }
  }

  const getLegalByVariant = async (variantType: string): Promise<void> => {
    try {
      const { slug } = getSlugByVariantPackage(variantType)
      const res = await getLegalSyarat(slug)
      setDataLegal(res.results[0])
    } catch (error) {
      console.log(error)
    }
  }
  const getRefundPolicy = async (): Promise<void> => {
    try {
      const response = await checkRefundPolicy(
        detailVariant.package?.organizationInstance?.id
      )
      setDataRefundPolicy(response)
      const parsedContent = response?.kondisi
        ? JSON.parse(response?.kondisi)
        : ''
      setParsedContent(parsedContent)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getLegal,
    getRefundPolicy,
    getLegalByVariant,
  }
}
