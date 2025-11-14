import { InfoIcon } from '@/components/icons/info'
import { PACKAGE_TYPE } from '@/constant/env'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import React, { useMemo } from 'react'

interface PackageVariantHeaderProps {
  className?: string
  packageType: string
  releasedAt: string
}

const PackageVariantHeader: React.FC<PackageVariantHeaderProps> = ({
  className,
  packageType,
  releasedAt,
}) => {
  const formattedReleasedAt = useMemo(() => {
    try {
      return format(releasedAt, 'dd MMM yyyy', { locale: id })
    } catch (error) {
      console.error('Error formatting releasedAt:', error)
      return ''
    }
  }, [releasedAt])

  return (
    <div
      className={`flex items-center justify-between ${className || ''} ${packageType === PACKAGE_TYPE.HAJJ && 'max-lg:hidden'}`}
    >
      <div className="flex w-full flex-col gap-2">
        <p className="heading-4-medium text-neutral-900 max-lg:hidden">
          Cek Harga!
        </p>

        <div className="bg-primary-100 flex items-center gap-[5px] rounded-lg p-1 max-lg:hidden">
          <InfoIcon size={20} className="text-primary-700 stroke-0" />
          <p className="text-s-regular text-primary-700">
            Batas booking {formattedReleasedAt}
          </p>
        </div>
      </div>

      {packageType === PACKAGE_TYPE.UMRAH && (
        <p className="text-m-semibold text-neutral-900 lg:hidden">
          Varian Paket
        </p>
      )}
    </div>
  )
}

export default PackageVariantHeader
