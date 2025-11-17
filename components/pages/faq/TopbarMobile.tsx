'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import FaqSearch from '@/components/pages/faq/FaqSearch'
import { useCustomNavigation } from '@/hooks/common/useCustomNavigation'
import Image from 'next/image'

const TopbarMobileFaq = ({
  title,
  isWebview,
}: {
  title: string
  isWebview: boolean
}) => {
  const { goBack } = useCustomNavigation()

  const handleClose = () => {
    window.location.href = '/close-web-view'
  }

  // Cari index dari step yang sedang aktif
  return (
    <div className="bg-primary-500 absolute -top-[22px] h-[125px] w-full lg:hidden">
      <Image
        src="/images/circle-1.svg"
        alt="bg-search"
        width={0}
        height={0}
        sizes="100vw"
        priority
        className={`absolute right-0 bottom-0 z-9 h-auto w-1/4`}
      />
      <Image
        src="/images/circle-2.svg"
        alt="bg-search"
        width={0}
        height={0}
        sizes="100vw"
        priority
        className={`absolute top-2 left-0 z-9 h-auto w-1/2`}
      />
      <div className="relative z-99 h-full">
        <div className="absolute top-6 flex h-full w-full flex-col items-center justify-center gap-3.5">
          <div className="flex w-full items-center justify-between px-4">
            <ArrowIcon
              size={20}
              className="rotate-180"
              onClick={() => (isWebview ? handleClose() : goBack())}
            />

            <p className="text-l-semibold">{title}</p>

            {/* Ini hanya untuk mentrigger supaya textnya tetap center */}
            <ArrowIcon size={20} className="invisible" />
          </div>
          <div className="w-full px-3 lg:hidden">
            <FaqSearch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopbarMobileFaq
