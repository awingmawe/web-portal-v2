import React from 'react'

interface FilterSectionProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  showViewAll?: boolean
  onViewAll?: () => void
}
const FilterSection: React.FC<FilterSectionProps> = ({
  icon,
  title,
  children,
  showViewAll,
  onViewAll,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {icon}
          <p className="text-m-semibold">{title}</p>
        </div>
        {showViewAll && (
          <p onClick={onViewAll} className="text-s-medium text-primary-500">
            Lihat Semua
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

export default FilterSection
