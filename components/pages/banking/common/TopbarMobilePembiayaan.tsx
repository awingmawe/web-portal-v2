'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { useCustomNavigation } from '@/hooks/common/useCustomNavigation'
import Image from 'next/image'

const TopbarMobilePembiayaan = () => {
  const { goBack } = useCustomNavigation()

  return (
    <div className="bg-primary-500 absolute -top-[22px] h-[100px] w-full max-w-xl lg:hidden">
      <Image
        src="/images/circle-1.svg"
        alt="bg-search"
        width={0}
        height={0}
        sizes="100vw"
        className={`absolute right-0 bottom-0 z-9 h-auto w-1/4`}
      />
      <Image
        src="/images/circle-2.svg"
        alt="bg-search"
        width={0}
        height={0}
        sizes="100vw"
        className={`absolute top-0 left-0 z-9 h-auto w-1/2`}
      />
      <button
        onClick={() => goBack()}
        className="bg-neutral-0 rounded-[20px] p-1"
      >
        <ArrowIcon size={20} className="rotate-180" />
      </button>
    </div>
  )
}

export default TopbarMobilePembiayaan
