'use client'

import { MessageQuestionIcon } from '@/components/icons/message-question'

const BatalkanDialogContent = () => {
  return (
    <div className="flex flex-col gap-5 max-lg:gap-3">
      {/* Warning Icon */}
      <div className="flex items-center gap-6 max-lg:gap-3">
        <div className="bg-warning-100 flex rounded-lg p-2.5">
          <MessageQuestionIcon size={36} />
        </div>
        <p className="heading-3-semibold max-lg:text-xl max-lg:leading-[26px] max-lg:font-medium">
          Batalkan Pembayaran
        </p>
      </div>

      {/* Content */}
      <p className="text-m-regular text-neutral-500">
        Anda akan membatalkan pembayaran untuk penawaran 1. Anda dapat memilih
        penawaran lain setelah membatalkan pembayaran.
      </p>
    </div>
  )
}

export default BatalkanDialogContent
