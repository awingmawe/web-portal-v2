import { MessageQuestionIcon } from '@/components/icons/message-question'
import CardProvider from '@/components/pages/banking/credit/form/step-2/ProviderList/CardProvider'
import SkeletonCardProvider from '@/components/pages/banking/credit/form/step-2/ProviderList/SkeletonCardProvider'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/components/ui/sonner'
import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import {
  PembiayaanDataLocalStorage,
  ProvidersLocaStorage,
  ProviderSubmission,
  RequestSubmissionPembiayaan,
} from '@/constant/types/Pembiayaan'
import { Provider } from '@/constant/types/Providers'
import { localStorageUtils } from '@/hooks/common/useLocalStorage'
import { useGetProviderPublic } from '@/services/hooks/banking-service/credits-api'
import { useCreateSubmissionPembiayaan } from '@/services/hooks/banking-service/submission-credits-api'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmationOpen, setIsConfirmationsOpen] = useState(false)

  const { data: dataProvider, isLoading: isLoadingProvider } =
    useGetProviderPublic({
      page: 1,
      size: 20,
      district_id: dataPembiayaan?.formData?.districtId,
    })

  const { create: submitPembiayaan } = useCreateSubmissionPembiayaan()

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
        // Pengecekan disini ada beberapa kondisi:
        // 1. Ambil semua provider berdasarkan kecamatan yang user pilih sebelumnya ada di baris 36-41
        // 2. Cek provider dulu apakah aktif providernya
        // 3. Cek juga kalo provider tersebut menyediakan credit atau tidak
        // 4. Cek spesifik travel dari provider tersebut, kalo true lakukan pengecekan lagi dari paket travel tersebut apakah supported providernya atau tidak, kalo spesifik travel false tidak usah ada pengecekan langsung jadi true
        // 5. Cek area dari provider tersebut, kalo true lakukan pengecekan lagi dari coverage area providernya, kalo by coverage areanya false tidak usah ada pengecekan langsung jadi true
        // 6. Semua kondisi dari 2-5 harus true untuk mendapatkan data provider supported
        const isActive = provider.isActive
        const isProviderCredit = provider.provider_credit
        const isOrgSupported = provider.specific_travel
          ? provider.supported_organizations.includes(orgId)
          : true
        const isAreaSupported = provider.by_coverage_area
          ? provider.coverage_area
          : true

        if (isOrgSupported && isAreaSupported && isActive && isProviderCredit) {
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
    setSelectedProviders((prev) => {
      if (isChecked) {
        const newSelection: ProvidersLocaStorage = {
          id: provider.id,
          tenor: Number(dataPembiayaan?.tenor),
          providerName: provider.name,
          logo: provider.logo,
        }
        return [...prev, newSelection]
      } else {
        return prev.filter((item) => item.id !== provider.id)
      }
    })
  }

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      const allSupportedSubmissions: ProviderSubmission[] = supported.map(
        (p) => ({
          id: p.id,
          tenor: Number(dataPembiayaan?.tenor),
          providerName: p.name,
          logo: p.logo,
        })
      )
      setSelectedProviders(allSupportedSubmissions)
    } else {
      setSelectedProviders([])
    }
  }

  const isAllSelected =
    supported.length > 0 && selectedProviders.length === supported.length

  const onClickSubmission = () => {
    if (
      !dataPembiayaan ||
      !dataPembiayaan.formData ||
      !dataPembiayaan.selectedPackage
    ) {
      toast.error('Data pengajuan tidak lengkap. Harap kembali ke langkah 1.')
      return
    }

    setIsSubmitting(true)

    const payload: RequestSubmissionPembiayaan = {
      providers: selectedProviders.map((provider) => ({
        id: provider.id,
        tenor: provider.tenor,
      })),
      name: dataPembiayaan.formData.name,
      email: dataPembiayaan.formData.email || '',
      phone_number: dataPembiayaan.formData.phone_number,
      born: dataPembiayaan.formData.born,
      gender: dataPembiayaan.formData.gender,
      job: dataPembiayaan.formData.job,
      manifests: dataPembiayaan.formData.manifest.map((item) => ({
        name: item.name || '',
        phone_number: item.phoneNumber || '',
      })),

      // Data lokasi
      province_name: dataPembiayaan.formData.provinceName,
      province_id: dataPembiayaan.formData.provinceId,
      city_name: dataPembiayaan.formData.cityName,
      city_id: dataPembiayaan.formData.cityId,
      postcode: dataPembiayaan.formData.postalCode,
      district_name: dataPembiayaan.formData.districtName,
      district_id: dataPembiayaan.formData.districtId,
      address: dataPembiayaan.formData.address,

      // Data dari local storage & state
      total_price: dataPembiayaan.price,
      jumlah_jemaah: dataPembiayaan.totalQty,
      tenor: Number(dataPembiayaan.tenor),

      // Data dari rincian paket & kamar
      room_type: null, // Sesuai permintaan
      room_type_quantity: {
        double: dataPembiayaan.selectedRoomType?.double || 0,
        triple: dataPembiayaan.selectedRoomType?.triple || 0,
        quad: dataPembiayaan.selectedRoomType?.quad || 0,
      },
      packagePrice: dataPembiayaan.price, // Menggunakan 'price' dari local storage
      discountAmount: 0, // Placeholder, bisa disesuaikan jika ada data diskon
      downPaymentPerPerson: 0, // Placeholder, bisa disesuaikan jika ada data DP

      // Data dari paket yang dipilih
      package_name: dataPembiayaan.selectedPackage.packageName,
      package_id: dataPembiayaan.selectedPackage.packageId,
      package_variant_id: dataPembiayaan.selectedPackage.packageVariantId,
      organization_instance_id: String(
        dataPembiayaan.selectedPackage.organizationId
      ),
    }

    submitPembiayaan(payload)
      .then((res) => {
        toast.success(res.message || 'Berhasil mengajukan pembiayaan')
        localStorageUtils.updateJSON(LOCAL_STORAGE_PEMBIAYAAN, (prev) => ({
          ...(prev as PembiayaanDataLocalStorage),
          provider: selectedProviders,
          isSubmitted: true,
        }))
        router.push('/banking/credit/success-pengajuan')
      })
      .catch(() => {
        // Toast error sudah di-handle oleh hook `useSubmissionPembiayaan`
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

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
        <div className="mb-[100px] flex flex-col gap-4">
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
      <div className="z-10 ml-auto flex min-w-[300px] items-center gap-4 max-lg:fixed max-lg:right-0 max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:bg-white max-lg:p-4 max-lg:shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <Button
          variant="outline"
          size="sm"
          className="border-primary-500 flex-1 border-2 px-10 max-lg:hidden"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Kembali
        </Button>
        <LayoutDrawerDialog
          isOpen={isConfirmationOpen}
          setIsOpen={setIsConfirmationsOpen}
          trigger={
            <Button
              size="sm"
              className="flex-1 px-10 max-lg:w-full"
              disabled={selectedProviders.length === 0 || isSubmitting}
            >
              Kirim
            </Button>
          }
          content={
            <p className="text-m-regular">
              Formulir pengajuan kamu akan dikirimkan ke pihak mitra untuk
              diperiksa lebih lanjut. kamu akan menerima notifikasi setelah
              mitra memberikan keputusan.
            </p>
          }
          title={
            <div className="flex items-center gap-6 pt-4 max-lg:px-4">
              <div className="bg-warning-100 rounded-lg p-2.5 max-lg:hidden">
                <MessageQuestionIcon size={36} />
              </div>
              <p className="heading-3-semibold max-lg:text-[14px] max-lg:leading-5 max-lg:font-semibold">
                Apakah kamu yakin untuk mengajukan pembiayaan?
              </p>
            </div>
          }
          footerContent={
            <div className="ml-auto flex min-w-[400px] items-center gap-3 max-lg:w-full">
              <Button
                variant="outline"
                size="sm"
                disabled={isSubmitting}
                onClick={() => setIsConfirmationsOpen(false)}
                className="border-primary-500 flex-1 border-2 px-10 max-lg:w-full"
              >
                Batal
              </Button>
              <Button
                size="sm"
                disabled={isSubmitting}
                className="flex-1 px-10 max-lg:w-full"
                onClick={onClickSubmission}
              >
                Ajukan Sekarang
              </Button>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default ProviderList
