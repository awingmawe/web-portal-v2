import { ArrowIcon } from '@/components/icons/arrow'
import { Button } from '@/components/ui/button'
import { useEventTracker } from '@/contexts/event-tracker/context'
import Link from 'next/link'
import { memo } from 'react'

interface HeaderPackageProps {
  title: string
  desc: string
  type: string
}

export const HeaderPackageList = memo(function HeaderPackageList({
  title,
  desc,
  type,
}: HeaderPackageProps) {
  const { pushEvent } = useEventTracker()
  return (
    <div className="mt-[36px] mb-6 flex justify-between max-lg:mt-8">
      <div className="flex flex-col gap-0.5">
        <p className="heading-2-bold max-sm:text-xl max-sm:leading-6.5">
          {title}
        </p>
        <p className="text-m-regular max-sm:text-xs max-sm:leading-4">{desc}</p>
      </div>
      <Link
        href={`/search?section=${type}`}
        id={`link-see-all-${type}`}
        className="max-sm:hidden"
        onClick={() => {
          pushEvent({
            name: 'click_more',
            category: 'home',
            topic: 'umrah',
            data: {
              section: type,
            },
          })
        }}
      >
        <Button className="items-center gap-1 px-3 py-2" size="xs">
          <p className="text-m-regular text-neutral-900">Lihat Paket Lainnya</p>
          <ArrowIcon size={24} className="-rotate-45" />
        </Button>
      </Link>
    </div>
  )
})
