import { ArrowDiagonalIcon } from '@/components/icons/arrow'
import { Button } from '@/components/ui/button'
import { useEventTracker } from '@/contexts/event-tracker/context'
import Link from 'next/link'
import { memo } from 'react'

interface HeaderPackageProps {
  title: string
  desc: string
  type: string
  params: string
  packageType: string
}

export const HeaderPackageList = memo(function HeaderPackageList({
  title,
  desc,
  type,
  params = 'section',
  packageType = 'umrah',
}: HeaderPackageProps) {
  const { pushEvent } = useEventTracker()
  return (
    <div
      className={`${params !== 'section' ? 'mt-0 max-lg:pl-0' : 'mt-[36px] max-lg:mt-8 max-lg:pl-4'}  mb-6 flex items-center justify-between`}
    >
      <div className="flex flex-col gap-0.5">
        <p className="heading-3-bold max-lg:text-xl max-lg:leading-6.5">
          {title}
        </p>
        <p className="text-m-regular max-lg:text-xs max-lg:leading-4">{desc}</p>
      </div>
      <Link
        href={`/search?${params}=${type}`}
        id={`link-see-all-${type}`}
        className="max-sm:hidden"
        onClick={() => {
          pushEvent({
            name: 'click_more',
            category: 'home',
            topic: packageType,
            data: {
              section: type,
            },
          })
        }}
      >
        <Button className="items-center gap-1 px-3 py-2" size="xs">
          <p className="text-m-regular text-neutral-900">Lihat Paket Lainnya</p>
          <ArrowDiagonalIcon size={24} />
        </Button>
      </Link>
    </div>
  )
})
