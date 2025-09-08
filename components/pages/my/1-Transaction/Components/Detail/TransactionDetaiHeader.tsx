import { TimerIcon } from '@/components/icons/timer'
import { STATUS_BOOKING } from '@/constant/env'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useGetStatusValidation } from '@/hooks/my-hooks/common/useGetStatusValidation'
import { ellipsis } from '@/lib/utils'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

interface TransactionDetaiHeaderProps {
  statusTahapan: string
  status: string
  isPaidOff: boolean
  createdDate: string
  packageType: string
  isManifestCommitted: boolean
  variantType: string
}

export function TransactionDetailHeader({
  statusTahapan,
  status,
  isPaidOff,
  createdDate,
  packageType,
  isManifestCommitted,
  variantType,
}: TransactionDetaiHeaderProps) {
  const { lg } = useTailwindBreakpoint()
  const { isCompletedHajjKhusus, isCompletedHajjRegular, isCompletedUmrah } =
    useGetStatusValidation({
      status,
      isManifestCommitted,
      isPaidOff,
      packageType,
      variantType,
    })

  const renderStatusTahapanColor = (status: string) => {
    if (status == 'Akan Datang') {
      return 'bg-info-100 text-info-700'
    } else if (status === 'Selesai') {
      return 'bg-success-100 text-success-700'
    } else if (
      status == 'Dibatalkan Jemaah' ||
      status == 'Dibatalkan Travel' ||
      status == 'Dibatalkan Sistem' ||
      status == 'Dibatalkan' ||
      status == 'Dalam Proses Pembatalan'
    ) {
      return 'bg-error-100 text-error-700'
    } else if (status == 'Waiting' || status == 'Waiting Hajj') {
      return 'bg-warning-100 text-warning-700'
    } else {
      return 'bg-neutral-100 text-neutral-700'
    }
  }

  const renderStatusText = (status: string) => {
    switch (statusTahapan) {
      case 'Akan Datang':
        if (
          isCompletedHajjKhusus ||
          isCompletedHajjRegular ||
          isCompletedUmrah
        ) {
          return 'Siap Berangkat!'
        } else if (status === 'waiting-approval') {
          return 'Menunggu konfirmasi'
        } else if (
          status == 'waiting-cancellation' ||
          status == 'canceled-by-travel' ||
          status == 'canceled-by-user'
        ) {
          return 'Dalam Proses Pembatalan'
        } else if (
          status === STATUS_BOOKING.WAITING_FOR_BILL ||
          status === STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION
        ) {
          return 'Menunggu Penerbitan Tagihan'
        } else {
          return lg
            ? ellipsis(
                'Menunggu kelengkapan data jemaah dan pelunasan pembayaran',
                window.innerWidth <= 450 ? 30 : 100
              )
            : 'Menunggu kelengkapan data jemaah dan pelunasan pembayaran'
        }
      case 'Dibatalkan':
        if (status == 'canceled-by-user') {
          return 'Dibatalkan Jemaah'
        } else if (status == 'canceled-by-travel') {
          return 'Dibatalkan Travel'
        } else {
          return 'Dibatalkan Sitem'
        }

      default:
        break
    }
  }

  const renderStatusColor = (status: string, statusTahapan: string) => {
    switch (statusTahapan) {
      case 'Akan Datang':
        if (
          isCompletedHajjKhusus ||
          isCompletedHajjRegular ||
          isCompletedUmrah
        ) {
          return 'bg-success-100 text-success-700'
        } else if (
          status === 'waiting-approval' ||
          status === STATUS_BOOKING.WAITING_FOR_BILL ||
          status === STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION
        ) {
          return 'bg-warning-100 text-warning-700'
        } else if (
          status == 'waiting-cancellation' ||
          status == 'canceled-by-travel' ||
          status == 'canceled-by-user'
        ) {
          return 'bg-error-100 text-error-700'
        } else {
          return 'bg-info-100/50 text-info-700/90'
        }
      case 'Dibatalkan':
        return 'bg-error-100 text-error-700'

      default:
        break
    }
  }

  return (
    <div
      className={`mb-4 flex items-center space-x-2 px-4  ${lg && (statusTahapan == 'Waiting' || status == 'Waiting Hajj') && 'w-full  max-lg:mb-0 max-lg:flex-col'} max-lg:px-3`}
    >
      <p
        className={`text-m-medium ${renderStatusTahapanColor(statusTahapan)} relative z-20 rounded-full px-6 py-2 ${statusTahapan !== 'Selesai' && 'shadow-[2px_0px_4.8px_0px_#202B3324]'} ${lg && (statusTahapan == 'Waiting' || status == 'Waiting Hajj') && 'w-full'} max-lg:py-1 max-lg:text-xs`}
      >
        {statusTahapan === 'Waiting' || statusTahapan === 'Waiting Hajj' ? (
          <span className="text-warning-700 flex">
            <TimerIcon className="mr-2" />
            Bayar uang muka sebelum{' '}
            {dayjs(createdDate)
              .add(1, 'day')
              .locale('id')
              .format('DD MMMM YYYY HH:mm')}
          </span>
        ) : statusTahapan === 'waiting-approval' ? (
          'Menunggu Konfirmasi'
        ) : (
          statusTahapan
        )}
      </p>
      <p
        className={`text-s-medium ${renderStatusColor(status, statusTahapan)} relative z-10 -ml-10 rounded-full px-6 py-2.5 pl-10 max-lg:py-1.5 max-lg:text-xs`}
      >
        {renderStatusText(status)}
      </p>
    </div>
  )
}
