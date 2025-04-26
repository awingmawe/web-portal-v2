'use client'

import { Badge } from '@/components/ui/badge'
import { Tag } from 'lucide-react'

export function PromoDrawer() {
  const promos = [
    { name: 'Flash Sale', discount: '30%' },
    { name: 'End of Month', discount: '25%' },
    { name: 'Weekend Deal', discount: '15%' },
    { name: 'TRAVELOKA8', discount: '8%' },
    { name: 'NewUser', discount: '10%' },
  ]

  return (
    <div className="space-y-3 py-4">
      {promos.map((promo) => (
        <div
          key={promo.name}
          className="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-neutral-50"
        >
          <div className="flex items-center gap-2">
            <Tag className="size-4 text-red-500" />
            <span className="font-medium">{promo.name}</span>
          </div>
          <Badge className="bg-red-100 font-semibold text-red-500">
            {promo.discount}
          </Badge>
        </div>
      ))}
    </div>
  )
}
