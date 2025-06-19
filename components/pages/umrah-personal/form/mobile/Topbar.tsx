'use client'

import { ArrowIcon } from '@/components/icons/arrow'

const TopbarMobileFormUmrahPersonal = ({
  handleBack,
}: {
  handleBack?: () => void
}) => {
  return (
    <div className="bg-neutral-0 absolute top-0 z-99 flex w-full items-center justify-between border-b border-neutral-100 px-4 py-3 lg:hidden">
      <ArrowIcon size={20} className="rotate-180" onClick={handleBack} />
      <p className="text-l-semibold">Umrah Personal</p>
      <div />
    </div>
  )
}

export default TopbarMobileFormUmrahPersonal
