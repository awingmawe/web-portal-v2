'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

interface FilterActionButtonsProps {
  onCancel: () => void
  onConfirm: () => void
  className?: string
}

const FilterActionButtons: React.FC<FilterActionButtonsProps> = ({
  onCancel,
  onConfirm,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <Button
        className={`border-primary-500 w-full py-3`}
        variant="outline"
        onClick={onCancel}
      >
        Batal
      </Button>
      <Button variant="default" className={`w-full py-3`} onClick={onConfirm}>
        Pilih
      </Button>
    </div>
  )
}

export default FilterActionButtons
