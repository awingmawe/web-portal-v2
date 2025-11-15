import { ViewStatus } from '@/components/pages/my/5-Banking/constants'
import { CardTransactionBankingStatus } from '@/components/pages/my/5-Banking/list/common/CardTransactionTagStatus'
import { formatDateToDDMMYYYYHHmm } from '@/lib/utils'

const InfoRow = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="flex w-full justify-between">
      <p className="text-s-regular">{label}</p>
      <p className="text-m-medium max-lg:text-xs max-lg:leading-4 max-lg:font-medium">
        {value}
      </p>
    </div>
  )
}

const ProductDetailPembiayaan = ({
  packageType,
  submissionId,
  createdAt,
  status,
}: {
  packageType: string
  submissionId: string
  createdAt: string
  status: ViewStatus
}) => {
  const formatCreatedAt = formatDateToDDMMYYYYHHmm(new Date(createdAt))
  return (
    <div className="flex w-full flex-col gap-2 px-8 pt-5 max-lg:px-4 max-lg:pt-0">
      <div className="mb-2 w-fit max-lg:hidden">
        <CardTransactionBankingStatus status={status} />
      </div>
      <InfoRow label="Kategori Produk" value={packageType} />
      <InfoRow label="ID Pengajuan" value={submissionId} />
      <InfoRow label="Tanggal Pengajuan" value={formatCreatedAt} />
    </div>
  )
}

export default ProductDetailPembiayaan
