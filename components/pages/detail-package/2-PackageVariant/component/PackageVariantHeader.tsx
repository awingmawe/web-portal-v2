import React from 'react'

interface PackageVariantHeaderProps {
  className?: string
}

const PackageVariantHeader: React.FC<PackageVariantHeaderProps> = ({
  className,
}) => {
  return (
    <div className={`flex items-center justify-between ${className || ''}`}>
      <p className="heading-4-medium text-neutral-900 max-lg:hidden">
        Cek Harga!
      </p>
      <p className="text-m-semibold text-neutral-900 lg:hidden">Varian Paket</p>
    </div>
  )
}

export default PackageVariantHeader
