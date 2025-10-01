import { WarningIconInfo } from '@/components/icons/info'
import React, { Fragment } from 'react'

const VariantsNotAvailable: React.FC = () => {
  return (
    <Fragment>
      {/* Divider */}
      <div className="h-[1px] w-full bg-[#c9c9c9] max-lg:hidden" />
      <div className="bg-primary-100 border-primary-500 flex items-center gap-1 rounded-xl border p-2">
        <WarningIconInfo size={20} />
        <p className="text-xs-regular">
          Mohon maaf, kursi untuk paket ini sudah tidak tersedia.
        </p>
      </div>
    </Fragment>
  )
}

export default VariantsNotAvailable
