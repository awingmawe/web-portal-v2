'use client'

import { Warning2Icon } from '@/components/icons/warning'

const ExitConfirmationContent = () => {
  return (
    <div className="flex flex-col gap-5 max-lg:gap-3">
      {/* Warning Icon */}
      <div className="flex items-center gap-6 max-lg:gap-3">
        <div className="bg-warning-100 flex rounded-lg p-2.5">
          <Warning2Icon className="text-primary-500" />
        </div>
        <p className="heading-3-semibold max-lg:text-xl max-lg:leading-[26px] max-lg:font-medium">
          Pengisian Form Belum Selesai
        </p>
      </div>

      {/* Content */}
      <p className="text-m-regular text-neutral-500">
        Apakah Anda yakin ingin keluar dari pembuatan paket Umrah mandiri?
      </p>
    </div>
  )
}

export default ExitConfirmationContent
