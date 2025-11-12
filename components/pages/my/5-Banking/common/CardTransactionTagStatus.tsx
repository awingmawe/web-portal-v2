import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'
import { cn } from '@/lib/utils'

type ViewStatus = SubmissionCredit['view_status']

interface CardTransactionBankingStatusProps {
  status: ViewStatus
}

type StatusConfig = {
  [key in ViewStatus]: {
    text: string
    className: string
  }
}

const STATUS_CONFIG: StatusConfig = {
  ongoing: {
    text: 'Dalam Proses',
    className: 'bg-warning-100 text-warning-700',
  },
  'not-available': {
    text: 'Kuota Paket Tidak Tersedia',
    className: 'bg-error-100 text-error-600',
  },
  available: {
    text: 'Kuota Tersedia',
    className: 'bg-info-100 text-info-600',
  },
  rejected: {
    text: 'Pengajuan Ditolak',
    className: 'bg-error-100 text-error-600',
  },
  'package-booked': {
    text: 'Pengajuan Dipilih',
    className: 'bg-success-100 text-success-600',
  },
}

export function CardTransactionBankingStatus({
  status,
}: CardTransactionBankingStatusProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['ongoing']

  return (
    <p
      className={`text-m-medium max-lg:text-xs max-lg:leading-4 max-lg:font-normal ${cn('rounded-full px-4 py-1.5', config.className)}`}
    >
      {config.text}
    </p>
  )
}
