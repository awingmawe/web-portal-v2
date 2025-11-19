// Import Icon yang dibutuhkan secara lokal
import { CloseCircle } from '@/components/icons/close-circle'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import {
  STATUS_CONFIG,
  ViewStatus,
} from '@/components/pages/my/5-Banking/constants'

interface WarningTextDetailProps {
  status: ViewStatus
  expiredDate?: string | null
  isExpired: boolean
}

const WarningTextDetail = ({
  status,
  expiredDate,
  isExpired,
}: WarningTextDetailProps) => {
  // ---------------------------------------------------------
  // 1. LOGIC PENENTUAN STATUS
  // ---------------------------------------------------------
  // Jika status 'available' TAPI sudah 'expired', paksa gunakan style 'rejected'
  const effectiveStatus: ViewStatus =
    status === 'available' && isExpired ? 'rejected' : status

  // Ambil config berdasarkan status yang sudah disesuaikan
  const config = STATUS_CONFIG[effectiveStatus]

  // ---------------------------------------------------------
  // 2. LOGIC VISIBILITY (Kapan harus muncul?)
  // ---------------------------------------------------------

  // Case A: Jika tidak ada config atau warningText tidak didefinisikan -> Hilang
  if (!config || !config.warningText) return null

  // Case B: Logic Khusus 'rejected' (Sesuai request kamu)
  // "Kalo statusnya rejected, kalo expired munculkan, kalo tidak expired jangan"
  if (effectiveStatus === 'rejected' && !isExpired) {
    return null
  }

  // ---------------------------------------------------------
  // 3. RENDER HELPERS
  // ---------------------------------------------------------

  // Helper untuk render icon berdasarkan string dari constants
  const renderIcon = () => {
    switch (config.iconType) {
      case 'info':
        return <InfoCircleIcon size={40} className="text-primary-500" />
      case 'close':
        return <CloseCircle size={40} className="text-error-500" />
      default:
        return null
    }
  }

  const message = config.warningText(expiredDate)

  return (
    <div
      className={`flex flex-col items-center gap-2.5 rounded-[20px] p-2.5 max-lg:flex-row ${config.classNameWarning || ''}`}
    >
      <div className="rounded-full bg-white p-2.5">{renderIcon()}</div>
      <p className="text-m-medium max-lg:text-xs max-lg:leading-4 max-lg:font-normal lg:text-center">
        {message}
      </p>
    </div>
  )
}

export default WarningTextDetail
