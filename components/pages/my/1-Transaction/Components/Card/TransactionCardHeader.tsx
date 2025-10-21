import ButtonInfoTrans from '@/components/pages/detail-package/2-PackageVariant/component/ButtonInfoTrans'
import { STATUS_BOOKING } from '@/constant/env'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useGetStatusValidation } from '@/hooks/my-hooks/common/useGetStatusValidation'
import { addHours, format } from 'date-fns'
import { id } from 'date-fns/locale'

export interface TransactionCardHeader {
  status: string
  isCompletedManifest: boolean
  isManifestCommitted: boolean
  isPaidOff: boolean
  packageType: string
  modifiedAt?: string
  variantType?: string
  currency: string
}

export default function TransactionCardHeader({
  status,
  isManifestCommitted,
  packageType,
  isPaidOff,
  modifiedAt,
  variantType,
  currency,
}: TransactionCardHeader) {
  const { isCompletedHajjKhusus, isCompletedHajjRegular, isCompletedUmrah } =
    useGetStatusValidation({
      status,
      isManifestCommitted,
      isPaidOff,
      variantType,
      packageType,
    })

  const { lg } = useTailwindBreakpoint()

  const renderStatusColor = () => {
    // if user has paid off and has completed manifest
    // or if user is booking hajj package and has commited manifest
    // then status is success
    if (isCompletedHajjRegular || isCompletedUmrah) {
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

  const renderStatusText = () => {
    // if user has paid off and has completed manifest
    // or if user is booking hajj package and has commited manifest
    // then status is success
    if (isCompletedHajjRegular || isCompletedUmrah) {
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
    } else if (isCompletedHajjKhusus) {
      return 'Menunggu kelengkapan data jemaah'
    } else {
      return 'Menunggu kelengkapan data jemaah dan pelunasan pembayaran'
    }
  }

  return (
    <div
      className={`rounded-t-3xl px-4 pt-4 pb-8 max-lg:px-3  ${renderStatusColor()}`}
    >
      <div className="flex justify-between">
        <h3 className="text-l-medium leading-[16px] text-inherit max-lg:text-xs">
          {renderStatusText()}
        </h3>
        {lg && (
          <ButtonInfoTrans
            currency={currency}
            packageType={packageType}
            title={''}
          />
        )}
      </div>
    </div>
  )
}
