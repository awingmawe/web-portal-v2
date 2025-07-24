'use client'

import { TickCircleIcon } from '@/components/icons/tick-circle'

const SuccessBatalkanDialogContent = () => {
  return (
    <div className="flex flex-col gap-5 max-lg:gap-3">
      {/* Warning Icon */}
      <div className="flex items-center gap-6 max-lg:gap-3">
        <div className="bg-success-100 flex rounded-lg p-2.5">
          <TickCircleIcon />
        </div>
        <p className="heading-3-semibold max-lg:text-xl max-lg:leading-[26px] max-lg:font-medium">
          Pembayaran Paket Berhasil Dibatalkan
        </p>
      </div>

      {/* Content */}
      <p className="text-m-regular text-neutral-500">
        Anda dapat memilih penawaran lain setelah membatalkan pembayaran.
      </p>
    </div>
  )
}

export default SuccessBatalkanDialogContent
