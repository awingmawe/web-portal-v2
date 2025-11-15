'use client'

import { ProviderSkeleton } from '@/components/pages/search-packages/2-FilterLeftbar/ProviderFilter/ProviderSkeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { Provider } from '@/constant/types/Providers'
import { useCheckboxSelection } from '@/hooks/filter-product-hooks/useCheckboxSelection'
import { useIsProviderFilterLocked } from '@/hooks/pembiayaan/useIsProviderFilterLocked'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface ProviderOptionsProps {
  dataProvider: Provider[]
  selectedProvider?: string
  onProviderChangeAction: (facilityCode: string) => void
  isLoadingSkeleton?: boolean
}

export const ProviderOptions: React.FC<ProviderOptionsProps> = ({
  dataProvider,
  selectedProvider,
  onProviderChangeAction,
  isLoadingSkeleton,
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const providerParam = searchParams.get('pV')
  const isDisabled = useIsProviderFilterLocked()

  // Set default value based on 'pV' param from URL on initial load.
  React.useEffect(() => {
    if (providerParam && !selectedProvider) {
      onProviderChangeAction(providerParam)
    }
  }, [providerParam, selectedProvider, onProviderChangeAction, router])
  const { isItemSelected, handleSelectionChange } = useCheckboxSelection({
    selectedValues: selectedProvider,
    onSelectionChange: onProviderChangeAction,
    paramName: 'pV',
  })

  if (isLoadingSkeleton) {
    return <ProviderSkeleton count={dataProvider.length || 5} />
  }

  return (
    <div className="max-h-[200px] space-y-2 overflow-y-auto">
      {dataProvider.map((provider, index) => (
        <Checkbox
          id={`provider-${provider.id}`}
          key={`provider-${index}`}
          checked={isItemSelected(String(provider.id))}
          label={provider.name}
          onCheckedChange={(checked) =>
            handleSelectionChange(String(provider.id), checked as boolean)
          }
          disabled={isDisabled}
        />
      ))}
    </div>
  )
}
