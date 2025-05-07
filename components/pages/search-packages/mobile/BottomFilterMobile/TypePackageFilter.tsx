'use client'

import { Checkbox } from '@/components/ui/checkbox'

export function TypeDrawer() {
  const types = ['Hotel', 'Villa', 'Apartment', 'Resort', 'Homestay']

  return (
    <div className="space-y-3 py-4">
      {types.map((type) => (
        <div key={type} className="flex items-start space-x-2">
          <Checkbox id={`type-${type}`} />
          <label
            htmlFor={`type-${type}`}
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {type}
          </label>
        </div>
      ))}
    </div>
  )
}
