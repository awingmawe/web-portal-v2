import { InfoIcon } from '@/components/icons/info'
import { PackageVariant } from '@/constant/types/PackageProps'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ComponentProps } from 'react'

type BookingReleasedInfoProps = ComponentProps<'div'> & {
  variant: PackageVariant
}

export default function BookingReleasedInfo({
  variant,
  className = '',
  ...props
}: BookingReleasedInfoProps) {
  return (
    <div
      className={`bg-primary-100 flex items-center gap-[5px] rounded-lg p-1 ${className}`}
      {...props}
    >
      <InfoIcon size={20} className="text-primary-700 stroke-0" />
      <p className="text-s-regular text-primary-700">
        Batas booking{' '}
        {format(variant.releasedAt, 'dd MMM yyyy', {
          locale: id,
        })}
      </p>
    </div>
  )
}
