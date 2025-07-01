'use client'

import { Warning2Icon } from '@/components/icons/warning'
import { Button } from '@/components/ui/button'
import React from 'react'

interface ExitConfirmationContentProps {
  dialogCancel: () => void
  dialogConfirm: () => void
}

const ExitConfirmationContent: React.FC<ExitConfirmationContentProps> = ({
  dialogCancel,
  dialogConfirm,
}) => {
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

      {/* Desktop Buttons */}
      <div className="ml-auto flex w-full max-w-sm justify-end gap-3 max-lg:hidden">
        <Button
          variant="outline"
          intent="none"
          className="border-primary-500 flex-1 border-2 px-10 py-3"
          onClick={dialogCancel}
        >
          Tidak
        </Button>
        <Button
          variant="default"
          onClick={dialogConfirm}
          className="flex-1 px-10 py-3"
        >
          Ya
        </Button>
      </div>
    </div>
  )
}

export default ExitConfirmationContent
