/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import { CardPackage2 } from '@/components/shared/CardPackage2'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/sonner'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useCustomInfiniteScroll } from '@/hooks/common/useInfiniteScroll'
import { getPackageVariantList } from '@/services/umrah-service'
import { ChevronLeft, Edit3, Loader2, Search } from 'lucide-react'

// Form schema for step 2
export const pembiayaanStep2Schema = z.object({
  kamarHotel: z
    .object({
      double: z.number().min(0),
      triple: z.number().min(0),
      quad: z.number().min(0),
    })
    .refine((obj) => Object.values(obj).some((val) => val > 0), {
      message: 'Pilih kamar hotel',
    }),
  varian: z.string().min(1, 'Pilih varian paket'),
  selectedPackage: z.string().min(1, 'Paket umrah wajib dipilih'),
  tenor: z.string().min(1, 'Tenor wajib dipilih'),
})

type PembiayaanStep2Values = z.infer<typeof pembiayaanStep2Schema>

export interface PembiayaanFormStep2Ref {
  submit: () => void
  isValid: () => boolean
}

interface PembiayaanStep2Props {
  onSubmit: (values: any) => Promise<void>
  onBack: () => void
  isLoading?: boolean
  screenSize: any
  onCancel?: any
}

export const PembiayaanFormStep2 = forwardRef<
  PembiayaanFormStep2Ref,
  PembiayaanStep2Props
>(({ onSubmit, onBack, isLoading = false, screenSize, onCancel }, ref) => {
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const { getPrice, getTotalQty } = usePackageVariant()
  const [dataVariant, setDataVariant] = useState<any>([])
  const [showPackageSelection, setShowPackageSelection] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  )
  const [selectedVariantDetails, setSelectedVariantDetails] =
    useState<any>(null)

  // Define form with default values
  const form = useForm<PembiayaanStep2Values>({
    resolver: zodResolver(pembiayaanStep2Schema),
    defaultValues: {
      kamarHotel: {
        double: 0,
        triple: 0,
        quad: 0,
      },
      varian: '',
      selectedPackage: '',
      tenor: '24',
    },
  })

  // Use the infinite scroll hook
  const {
    packages: dataPaket,
    hasMore,
    isLoading: packagesLoading,
    loadMore,
    resetItems,
    fetchInitialPackages,
    totalPackages,
  } = useCustomInfiniteScroll(20)

  // Watch form values for dynamic calculation
  const watchedValues = form.watch()

  // Get data variant function
  const getDataVariant = async (id: any) => {
    try {
      const res = await getPackageVariantList({
        packageId: id,
        page: 1,
        size: 50,
        orderBy: 'createdAt',
        order: 'asc',
      })
      setDataVariant(res.results)
      return res.results
    } catch (error) {
      toast.error('Gagal memuat varian paket')
      return []
    }
  }

  // Handle package selection
  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
    setSelectedVariantDetails(null)
    form.setValue('selectedPackage', packageId)
    setShowPackageSelection(false)

    // Check if this package matches sessionStorage variant
    try {
      const variantPaylater = sessionStorage.getItem('variantPaylater')
      if (variantPaylater) {
        const variantData = JSON.parse(variantPaylater)
        const sessionPackageId = variantData.packageId?.toString()
        const selectedPackageId = packageId.toString()

        if (sessionPackageId === selectedPackageId && variantData.name) {
          // Auto-select variant after variants are loaded
          setTimeout(() => {
            form.setValue('varian', variantData.name)
            setSelectedVariantDetails(variantData)
          }, 1000)
        }
      }
    } catch (error) {
      // Silently handle error
    }
  }

  // Form submit handler
  const handleSubmit = useCallback(
    async (values: PembiayaanStep2Values) => {
      try {
        if (!dataPaket || dataPaket.length === 0) {
          toast.error('Data paket tidak tersedia. Silakan muat ulang halaman.')
          return
        }

        if (!dataVariant || dataVariant.length === 0) {
          toast.error(
            'Data varian tidak tersedia. Silakan pilih paket terlebih dahulu.'
          )
          return
        }

        if (!selectedVariantDetails) {
          toast.error(
            'Detail varian tidak tersedia. Silakan pilih varian terlebih dahulu.'
          )
          return
        }

        const selectedPkg = dataPaket.find(
          (pkg: any) =>
            pkg.id === values.selectedPackage ||
            pkg.slugPackage === values.selectedPackage ||
            pkg.id?.toString() === values.selectedPackage
        )

        if (!selectedPkg) {
          toast.error('Paket yang dipilih tidak ditemukan.')
          return
        }

        const totalPrice = getPrice()
        const totalFunding = totalPrice * 0.0139
        const tenorMonths = Number(values.tenor)
        const monthlyInstallment = totalPrice / tenorMonths + totalFunding

        const submitData = {
          ...values,
          packageDetails: selectedPkg,
          selectedVariantDetails,
          jumlahJemaah:
            form.getValues('kamarHotel').double +
            form.getValues('kamarHotel').triple +
            form.getValues('kamarHotel').quad,
          totalPrice,
          totalFunding,
          monthlyInstallment,
        }

        await onSubmit(submitData)

        // Clear sessionStorage after successful submit
        try {
          sessionStorage.removeItem('variantPaylater')
        } catch (error) {
          // Silently handle error
        }
      } catch (error: any) {
        const errorMsg =
          error?.message || 'Terjadi kesalahan. Silakan coba lagi.'
        toast.error(errorMsg)
      }
    },
    [dataPaket, dataVariant, selectedVariantDetails, onSubmit, getPrice, form]
  )

  // Imperative handle
  useImperativeHandle(
    ref,
    () => ({
      submit: () => {
        form.handleSubmit(handleSubmit)()
      },
      isValid: () => {
        return form.formState.isValid
      },
    }),
    [form, handleSubmit]
  )

  // Handle variant change
  const handleVariantChange = (variantName: string) => {
    const selectedVariant = dataVariant.find(
      (variant: any) => variant.name === variantName
    )
    setSelectedVariantDetails(selectedVariant)
    form.setValue('varian', variantName)
  }

  // Calculate dynamic pricing
  const calculatedPricing = useMemo(() => {
    if (
      !selectedVariantDetails ||
      !watchedValues.kamarHotel ||
      !watchedValues.tenor
    ) {
      return {
        totalPrice: 0,
        totalFunding: 0,
        monthlyInstallment: 0,
      }
    }

    const totalPrice = getPrice()
    const totalFunding = totalPrice * 0.0139
    const tenorMonths = Number(watchedValues.tenor)
    const monthlyInstallment = totalPrice / tenorMonths + totalFunding

    return {
      totalPrice,
      totalFunding,
      monthlyInstallment,
    }
  }, [
    selectedVariantDetails,
    watchedValues.kamarHotel,
    watchedValues.tenor,
    getPrice,
  ])

  // Create search parameters
  const createSearchParams = useCallback(() => {
    return {
      [`query`]: searchTerm ? `%${searchTerm}%` : undefined,
      packageType: 'umrah',
    }
  }, [searchTerm])

  // Auto-select package and variant from sessionStorage
  useEffect(() => {
    const autoSelectFromSession = () => {
      const variantPaylater = sessionStorage.getItem('variantPaylater')

      if (variantPaylater && dataPaket?.length > 0 && !selectedPackage) {
        try {
          const variantData = JSON.parse(variantPaylater)
          const targetPackageId = variantData.packageId

          const foundPackage = dataPaket.find(
            (pkg: any) =>
              pkg.id == targetPackageId ||
              pkg.id?.toString() === targetPackageId?.toString()
          )

          if (foundPackage) {
            const packageIdentifier =
              foundPackage.slugPackage || foundPackage.id?.toString()
            handlePackageSelect(packageIdentifier)
          }
        } catch (error) {
          // Silently handle error
        }
      }
    }

    if (dataPaket?.length > 0 && !selectedPackage) {
      const timer = setTimeout(autoSelectFromSession, 300)
      return () => clearTimeout(timer)
    }
  }, [dataPaket, selectedPackage])

  // Fetch initial packages
  useEffect(() => {
    const params = createSearchParams()
    fetchInitialPackages(params)
  }, [fetchInitialPackages, createSearchParams])

  // Handle search with debouncing
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    const timeout = setTimeout(() => {
      const params = createSearchParams()
      resetItems()
      fetchInitialPackages(params)
    }, 500)

    setSearchTimeout(timeout)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [searchTerm, createSearchParams, resetItems, fetchInitialPackages])

  // Fetch variants when package changes
  useEffect(() => {
    const selectedPkg = dataPaket.find(
      (pkg: any) =>
        pkg.slugPackage === selectedPackage ||
        pkg.id === selectedPackage ||
        pkg.id?.toString() === selectedPackage
    )

    if (selectedPkg?.id) {
      getDataVariant(selectedPkg.id)
    } else {
      setDataVariant([])
      setSelectedVariantDetails(null)
      form.setValue('varian', '')
    }
  }, [selectedPackage, dataPaket, form])

  // Set default variant when variants load
  useEffect(() => {
    if (dataVariant.length > 0) {
      const currentVariant = form.getValues('varian')

      if (!currentVariant) {
        const firstVariant = dataVariant[0]
        setSelectedVariantDetails(firstVariant)
        form.setValue('varian', firstVariant.name)
      } else {
        const selectedVariant = dataVariant.find(
          (variant: any) => variant.name === currentVariant
        )
        if (selectedVariant) {
          setSelectedVariantDetails(selectedVariant)
        }
      }
    }
  }, [dataVariant, form])

  // Handle load more packages
  const handleLoadMore = useCallback(() => {
    if (!packagesLoading && hasMore) {
      const params = createSearchParams()
      loadMore(params)
    }
  }, [packagesLoading, hasMore, loadMore, createSearchParams])

  // Scroll event handler for infinite scroll
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        handleLoadMore()
      }
    },
    [handleLoadMore]
  )

  return (
    <div>
      {/* Back button for mobile */}
      {showPackageSelection && (
        <div className="mb-4 flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
            <ChevronLeft size={20} />
          </Button>
          <span className="text-sm font-medium">Kembali</span>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={`space-y-4 ${screenSize !== 'desktop' ? 'pb-20' : 'pb-2'}`}
        >
          {/* Package Selection Modal/Overlay */}
          {showPackageSelection && (
            <div
              className={
                screenSize === 'desktop'
                  ? 'fixed z-5 w-[480px] bg-white p-4'
                  : 'fixed inset-0 z-50 bg-white p-4'
              }
            >
              {/* Header */}
              <div className="mb-4 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPackageSelection(false)}
                  className="p-1"
                >
                  <ChevronLeft size={20} />
                </Button>
                <span className="text-sm font-medium">Kembali</span>
              </div>

              {/* Search Bar and Date Filter */}
              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Cari Paket"
                    className="rounded-full border border-gray-300 pl-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[black]"
                    size={16}
                  />
                </div>
                <div className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-[200px] max-w-[200px] truncate rounded-full p-0 text-left text-xs"
                  >
                    Semua Tanggal Keberangkatan
                  </Button>
                </div>
              </div>

              {/* Package List with Infinite Scroll */}
              <div
                className={`grid flex-1 justify-items-center space-y-3 overflow-y-auto ${
                  screenSize === 'mobile'
                    ? ''
                    : screenSize === 'tab'
                      ? 'h-[750px]'
                      : 'h-[350px]'
                }`}
                onScroll={handleScroll}
                style={
                  screenSize === 'mobile'
                    ? { maxHeight: 'calc(100vh - 160px)' }
                    : undefined
                }
              >
                {dataPaket.length === 0 && !packagesLoading ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">
                      {searchTerm
                        ? 'Tidak ada paket yang ditemukan'
                        : 'Belum ada paket tersedia'}
                    </p>
                  </div>
                ) : (
                  <>
                    {dataPaket.map((pkg: any, index: number) => (
                      <div
                        key={`packages-${pkg.slugPackage}-${index}`}
                        className="w-[350px] cursor-pointer"
                        onClick={() =>
                          handlePackageSelect(pkg.slugPackage || pkg.id)
                        }
                      >
                        <CardPackage2
                          data={pkg}
                          eventCategory="search"
                          onClick={() =>
                            handlePackageSelect(pkg.slugPackage || pkg.id)
                          }
                        />
                      </div>
                    ))}

                    {packagesLoading && (
                      <div className="flex justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        <span className="ml-2 text-sm text-gray-500">
                          Memuat paket...
                        </span>
                      </div>
                    )}

                    {!packagesLoading && hasMore && (
                      <div className="flex justify-center py-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleLoadMore}
                          className="rounded-full"
                        >
                          Muat Lebih Banyak
                        </Button>
                      </div>
                    )}

                    {!hasMore && dataPaket.length > 0 && (
                      <div className="py-4 text-center">
                        <p className="text-sm text-gray-500">
                          Semua paket telah ditampilkan ({totalPackages} paket)
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Main Form */}
          <div className="h-[700px] flex-1 space-y-4 overflow-y-auto px-4 pb-4">
            {/* Package Selection Button */}
            <div className="space-y-2">
              {!selectedPackage && (
                <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="text-sm text-gray-600">
                        Pilih paket terlebih dahulu
                      </span>
                    </div>
                    <div className="ml-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-0 bg-yellow-400 px-6 py-2 text-sm font-medium text-white hover:bg-yellow-500"
                        onClick={() => setShowPackageSelection(true)}
                      >
                        Pilih Paket
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {selectedPackage && (
                <div className="rounded-2xl border border-gray-200 bg-white p-3">
                  <div className="flex gap-3">
                    {(() => {
                      const selectedPkg = dataPaket.find(
                        (pkg: any) =>
                          pkg.slugPackage === selectedPackage ||
                          pkg.id === selectedPackage ||
                          pkg.id?.toString() === selectedPackage
                      )
                      return selectedPkg ? (
                        <>
                          <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={
                                selectedPkg.src || '/api/placeholder/400/200'
                              }
                              alt={selectedPkg.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-2 text-sm leading-tight font-medium text-gray-800">
                              {selectedPkg.title}
                            </h4>
                            <div className="mt-1 flex items-center gap-1">
                              <span
                                className="inline-flex cursor-pointer items-center gap-1 text-xs text-blue-600"
                                onClick={() => setShowPackageSelection(true)}
                              >
                                <Edit3 size={10} />
                                Ganti Paket
                              </span>
                            </div>
                          </div>
                        </>
                      ) : null
                    })()}
                  </div>
                </div>
              )}

              {/* Hidden field for form validation */}
              <FormField
                control={form.control}
                name="selectedPackage"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Varian */}
              <FormField
                control={form.control}
                name="varian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-600">
                      Varian *
                    </FormLabel>
                    <Select
                      onValueChange={handleVariantChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full rounded-2xl border-gray-300">
                          <SelectValue placeholder="Pilih varian paket" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full rounded-2xl border-gray-300">
                        {dataVariant.map((res: any, index: any) => (
                          <SelectItem
                            key={`variant-${res.id || index}`}
                            value={res.name}
                          >
                            {res.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedVariantDetails && (
                      <p className="mt-1 text-xs text-gray-500">
                        {selectedVariantDetails.departureDate &&
                        selectedVariantDetails.arrivalDate
                          ? `${new Date(
                              selectedVariantDetails.departureDate
                            ).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })} → ${new Date(
                              selectedVariantDetails.arrivalDate
                            ).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })}`
                          : 'Tanggal belum tersedia'}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kamar Hotel */}
              <FormField
                control={form.control}
                name="kamarHotel"
                render={({ field }) => (
                  <FormItem>
                    <SelectHotel
                      defaultPackageVariant={selectedVariantDetails}
                      variant="normal"
                      hideTotalPrice
                      isMobile
                      onChange={(roomType) => {
                        form.setValue(
                          'kamarHotel',
                          roomType
                            ? {
                                double: roomType.double || 0,
                                triple: roomType.triple || 0,
                                quad: roomType.quad || 0,
                              }
                            : { double: 0, triple: 0, quad: 0 }
                        )
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tenor */}
              <FormField
                control={form.control}
                name="tenor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-600">
                      Tenor *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="mt-1 w-full rounded-2xl border-gray-300">
                          <SelectValue placeholder="Pilih tenor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="12">12 Bulan</SelectItem>
                        <SelectItem value="24">24 Bulan</SelectItem>
                        <SelectItem value="36">36 Bulan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Simulasi Pendanaan */}
              <div className="space-y-2 rounded-2xl border border-[#E8E8E8] p-4">
                <h4 className="text-sm font-medium text-neutral-900">
                  Simulasi Pendanaan
                </h4>
                <div className="space-y-1">
                  {calculatedPricing.totalPrice > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-[12px] text-gray-400">
                        Total Pendanaan
                      </span>
                      <span className="font-medium">
                        Rp{calculatedPricing.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-[12px] text-gray-400">
                      Angsuran Per Bulan
                    </span>
                    <span className="font-medium">
                      Rp
                      {Math.round(
                        calculatedPricing.monthlyInstallment
                      ).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                <p className="text-center text-[12px] text-neutral-500">
                  *Perhitungan ini hanya simulasi, data dapat berubah sesuai
                  dengan ketentuan syariah terkait.
                </p>
              </div>
            </div>
          </div>

          {screenSize !== 'desktop' && (
            <div className="fixed right-0 bottom-0 left-0 mt-10 border-t border-gray-100 bg-white p-4">
              <Button
                type="submit"
                className="w-full rounded-full bg-yellow-500 py-3 font-medium text-white hover:bg-yellow-600"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Kirim Permintaan
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
})
