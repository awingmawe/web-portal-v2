import {
  DataSK,
  DetailVariant,
  LegalActions,
} from '@/constant/types/CheckoutProps'
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
}

export const useLegalActions = ({
  setDataSk,
  detailVariant,
  setDataRefundPolicy,
  setParsedContent,
}: UseLegalActionsProps): LegalActions => {
  const getLegal = async (): Promise<void> => {
    try {
      const res = await getLegalSyarat()
      setDataSk(res.results[0])
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
  }
}
