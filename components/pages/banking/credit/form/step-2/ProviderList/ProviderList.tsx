import CardProvider from '@/components/pages/banking/credit/form/step-2/ProviderList/CardProvider'
import SkeletonCardProvider from '@/components/pages/banking/credit/form/step-2/ProviderList/SkeletonCardProvider'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  PembiayaanDataLocalStorage,
  ProvidersLocaStorage,
  ProviderSubmission,
} from '@/constant/types/Pembiayaan'
import { Provider } from '@/constant/types/Providers'
import { useGetProviderPublic } from '@/services/hooks/banking-service/credits-api'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

const ProviderList = ({
  dataPembiayaan,
  isLoading,
}: {
  dataPembiayaan?: PembiayaanDataLocalStorage | null
  isLoading: boolean
}) => {
  const router = useRouter()
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

  const handleSelectProvider = (provider: Provider, isChecked: boolean) => {
    if (dataPembiayaan?.tenor) {
      setSelectedProviders((prev) => {
        if (isChecked) {
          const newSelection: ProvidersLocaStorage = {
            id: provider.id,
            tenor: Number(dataPembiayaan.tenor),
            providerName: provider.name,
            logo: provider.logo,
          }
          return [...prev, newSelection]
        } else {
          return prev.filter((item) => item.id !== provider.id)
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
            providerName: p.name,
            logo: p.logo,
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
                  handleSelectProvider(provider, isChecked)
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

      {/* --- Tombol Submit Utama --- */}
      <div className="ml-auto flex min-w-[300px] items-center gap-4 max-lg:hidden">
        <Button
          variant="outline"
          size="md"
          className="border-primary-500 flex-1 border-2 px-10"
          onClick={() => router.push('/banking/credit/form/step-1')}
        >
          Kembali
        </Button>
        <Button
          type="submit"
          size="md"
          className="flex-1 px-10"
          disabled={selectedProviders.length === 0}
        >
          Kirim
        </Button>
      </div>
    </div>
  )
}

export default ProviderList
