import { PACKAGE_TYPE } from '@/constant/env'
import React from 'react'

interface PackageVariantHeaderProps {
  className?: string
  packageType: string
}

const PackageVariantHeader: React.FC<PackageVariantHeaderProps> = ({
  className,
  packageType,
}) => {
  return (
    <div
      className={`flex items-center justify-between ${className || ''} ${packageType === PACKAGE_TYPE.HAJJ && 'max-lg:hidden'}`}
    >
      <p className="heading-4-medium text-neutral-900 max-lg:hidden">
        Cek Harga!
      </p>
      {packageType === PACKAGE_TYPE.UMRAH && (
        <p className="text-m-semibold text-neutral-900 lg:hidden">
          Varian Paket
        </p>
      )}
    </div>
  )
}

export default PackageVariantHeader
