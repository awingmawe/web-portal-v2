import { STATUS_BOOKING } from '@/constant/env'
import { addHours, format } from 'date-fns'
import { id } from 'date-fns/locale'

export interface TransactionCardHeader {
  status: string
  isCompletedManifest: boolean
  isPaidOff: boolean
  modifiedAt?: string
}

export default function TransactionCardHeader({
  status,
  isCompletedManifest,
  isPaidOff,
  modifiedAt,
}: TransactionCardHeader) {
  const renderStatusColor = (
    status: string,
    isPaidOff?: boolean,
    isCompletedManifest?: boolean
  ) => {
    if (isPaidOff && isCompletedManifest) {
      return 'bg-success-100 text-success-700'
    } else if (
      status === 'waiting-approval' ||
      status == STATUS_BOOKING.WAITING_FOR_BILL ||
      status == STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION ||
      status == STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ
    ) {
      return 'bg-warning-100 text-warning-700'
    } else if (
      status == 'waiting-cancellation' ||
      status == 'canceled-by-travel' ||
      status == 'canceled-by-user' ||
      status == 'expired'
    ) {
      return 'bg-error-100 text-error-700'
    } else {
      return 'bg-info-100/50 text-info-700/90'
    }
  }

  const renderStatusText = (
    status: string,
    isPaidOff?: boolean,
    isCompletedManifest?: boolean
  ) => {
    if (isPaidOff && isCompletedManifest) {
      return 'Siap Berangkat!'
    } else if (status === 'waiting-approval') {
      return 'Menunggu konfirmasi'
    } else if (
      status == 'waiting-cancellation' ||
      status == 'canceled-by-travel' ||
      status == 'canceled-by-user' ||
      status == 'expired'
    ) {
      return 'Dalam Proses Pembatalan'
    } else if (status == STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION) {
      return 'Menunggu Penerbitan Tagihan'
    } else if (status == STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ) {
      return 'Tagihan sudah diterbitkan, harap segera membayar uang muka'
    } else if (status == STATUS_BOOKING.WAITING_FOR_BILL) {
      return `Menunggu Penerbitan Tagihan. Otomatis batal pada ${modifiedAt && format(addHours(modifiedAt, 24), 'dd MMM yyyy, HH:mm', { locale: id })}`
    } else {
      return 'Menunggu kelengkapan data jemaah dan pelunasan pembayaran'
    }
  }

  return (
    <div
      className={`rounded-t-3xl px-4 pt-4 pb-8 max-lg:px-3  ${renderStatusColor(status, isPaidOff, isCompletedManifest)}`}
    >
      <h3 className="text-l-medium leading-[16px] text-inherit max-lg:text-xs">
        {renderStatusText(status, isPaidOff, isCompletedManifest)}
      </h3>
    </div>
  )
}
