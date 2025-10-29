import CardProvider from '@/components/pages/banking/credit/form/step-2/ProviderList/CardProvider'
import SkeletonCardProvider from '@/components/pages/banking/credit/form/step-2/ProviderList/SkeletonCardProvider'
import { Checkbox } from '@/components/ui/checkbox'
import {
  PembiayaanDataLocalStorage,
  ProviderSubmission,
} from '@/constant/types/Pembiayaan'
import { Provider } from '@/constant/types/Providers'
import { useGetProviderPublic } from '@/services/hooks/banking-service/credits-api'
import { useMemo, useState } from 'react'

const ProviderList = ({
  dataPembiayaan,
  isLoading,
}: {
  dataPembiayaan?: PembiayaanDataLocalStorage | null
  isLoading: boolean
}) => {
  const [selectedProviders, setSelectedProviders] = useState<
    ProviderSubmission[]
  >([])
  const { data: dataProvider, isLoading: isLoadingProvider } =
    useGetProviderPublic({
      page: 1,
      size: 20,
      district_id: dataPembiayaan?.formData?.districtId,
    })

  const { supported, notSupportedByLocation, notSupportedByOrg } =
    useMemo(() => {
      const categorized = {
        supported: [] as Provider[],
        notSupportedByLocation: [] as Provider[],
        notSupportedByOrg: [] as Provider[],
      }

      if (!dataProvider || !dataPembiayaan?.selectedPackage?.organizationId) {
        return categorized
      }

      const orgId = String(dataPembiayaan.selectedPackage.organizationId)

      dataProvider.forEach((provider) => {
        const isOrgSupported = provider.supported_organizations.includes(orgId)
        const isAreaSupported = provider.coverage_area

        if (isOrgSupported && isAreaSupported) {
          categorized.supported.push(provider)
        } else if (isOrgSupported && !isAreaSupported) {
          categorized.notSupportedByLocation.push(provider)
        } else if (!isOrgSupported) {
          categorized.notSupportedByOrg.push(provider)
        }
      })

      return categorized
    }, [dataProvider, dataPembiayaan])

  const handleSelectProvider = (providerId: number, isChecked: boolean) => {
    if (dataPembiayaan?.tenor) {
      setSelectedProviders((prev) => {
        if (isChecked) {
          const newSelection: ProviderSubmission = {
            id: providerId,
            tenor: Number(dataPembiayaan.tenor),
          }
          return [...prev, newSelection]
        } else {
          return prev.filter((item) => item.id !== providerId)
        }
      })
    }
  }

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      if (dataPembiayaan?.tenor) {
        const allSupportedSubmissions: ProviderSubmission[] = supported.map(
          (p) => ({
            id: p.id,
            tenor: Number(dataPembiayaan.tenor),
          })
        )
        setSelectedProviders(allSupportedSubmissions)
      }
    } else {
      setSelectedProviders([])
    }
  }

  const isAllSelected =
    supported.length > 0 && selectedProviders.length === supported.length

  if (isLoading || isLoadingProvider)
    return (
      <div className="container mx-auto grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCardProvider key={index} />
        ))}
      </div>
    )

  return (
    <div className="container mx-auto flex flex-col gap-8 max-lg:px-4">
      {/* --- Provider List Supported --- */}
      {supported.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-m-semibold">Pilihan Mitra Tersedia</p>
            <Checkbox
              label="Pilih Semua"
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              classNameParent="!p-0"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
            {supported.map((provider) => (
              <CardProvider
                key={provider.id}
                logo={provider.logo}
                providerName={provider.name}
                checked={selectedProviders.some(
                  (item) => item.id === provider.id
                )}
                onCheckedChange={(isChecked) =>
                  handleSelectProvider(provider.id, isChecked)
                }
                supportType="supported"
                description={provider.description}
              />
            ))}
          </div>
        </div>
      )}

      {/* --- Provider List Not Supported --- */}
      {(notSupportedByLocation.length > 0 || notSupportedByOrg.length > 0) && (
        <div className="flex flex-col gap-4">
          <p className="text-m-semibold">
            Mitra pembiayaan yang belum memenuhi syarat
          </p>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
            {notSupportedByLocation.map((provider) => (
              <CardProvider
                key={provider.id}
                providerId={provider.id}
                logo={provider.logo}
                providerName={provider.name}
                supportType="not-supported-location"
                description={provider.description}
              />
            ))}
            {notSupportedByOrg.map((provider) => (
              <CardProvider
                key={provider.id}
                logo={provider.logo}
                providerName={provider.name}
                supportType="not-supported-org"
                description={provider.description}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProviderList
