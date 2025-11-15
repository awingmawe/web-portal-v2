import {
  STATUS_CONFIG,
  ViewStatus,
} from '@/components/pages/my/5-Banking/constants'
import { cn } from '@/lib/utils'

interface CardTransactionBankingStatusProps {
  status: ViewStatus
}

export function CardTransactionBankingStatus({
  status,
}: CardTransactionBankingStatusProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['ongoing']

  return (
    <p
      className={`text-m-medium text-center max-lg:text-xs max-lg:leading-4 max-lg:font-normal ${cn('rounded-full px-4 py-1.5', config.className)}`}
    >
      {config.text}
    </p>
  )
}
