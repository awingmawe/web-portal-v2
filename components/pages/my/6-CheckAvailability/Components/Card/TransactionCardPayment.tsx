import { UsersIcon } from '@/components/icons/user'
import 'dayjs/locale/id'

export interface TransactionCardPayment {
  jumlahJamaah?: any
  responTravel?: any
}

export default function TransactionCardPayment({
  jumlahJamaah,
  responTravel,
}: TransactionCardPayment) {
  return (
    <div className="flex flex-col border-t border-neutral-100 pt-4 max-lg:hidden md:border-t-0 md:border-l md:pt-0 md:pl-4">
      <p className="text-m-medium text-neutral-500">Jumlah Permintaan</p>
      <div className="mt-2 flex items-center gap-2 max-lg:hidden">
        <UsersIcon className="h-5 w-5 text-neutral-900" />
        <p className="text-m-regular text-neutral-900">{jumlahJamaah} Jemaah</p>
      </div>
      {responTravel !== null && (
        <>
          {' '}
          <p className="text-m-medium mt-3 text-neutral-500">
            Jumlah Kursi Tersedia
          </p>
          <div className="mt-2 flex items-center gap-2 max-lg:hidden">
            <UsersIcon className="h-5 w-5 text-neutral-900" />
            <p className="text-m-regular text-neutral-900">
              {responTravel} Jemaah
            </p>
          </div>
        </>
      )}

      {/* {!noLabelNotif &&
          renderLunas(
            isPaidOff,
            loadingPaymentTransaction,
            paymentTransaction,
            startDate
          )} */}
    </div>
  )
}
