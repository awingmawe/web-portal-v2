'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { BedIcon2, BedIcon3 } from '@/components/icons/bed'
import { Calendar2 } from '@/components/icons/calendar'
import { ChevronRightIcon } from '@/components/icons/chevron'
import { PeopleIcon } from '@/components/icons/people'
import PackagePembiayaanSkeleton from '@/components/pages/banking/credit/success-pengajuan/SkeletonPackageSelection'
import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { localStorageUtils } from '@/hooks/common/useLocalStorage'
import { formatCurrency, isEmpty } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const PackageSelection = () => {
  const router = useRouter()
  const [dataPembiayaan, setDataPembiayaan] =
    useState<PembiayaanDataLocalStorage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Pastikan kode ini hanya berjalan di client-side
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(LOCAL_STORAGE_PEMBIAYAAN)

      if (storedData) {
        try {
          const parsedData: PembiayaanDataLocalStorage = JSON.parse(storedData)

          // Cek apakah pengajuan sudah berhasil disubmit
          if (!parsedData.isSubmitted) {
            console.warn(
              'Akses ke halaman sukses tanpa pengajuan yang valid. Mengarahkan kembali ke langkah 1.'
            )
            router.replace('/banking/credit/form/step-1') // Arahkan kembali ke step 1
            return // Hentikan eksekusi lebih lanjut
          }

          // Jika isSubmitted true, simpan data ke state
          setDataPembiayaan(parsedData)

          // Hancurkan data dari localStorage setelah berhasil ditampilkan
          // Ini mencegah halaman sukses diakses lagi tanpa pengajuan baru
          localStorageUtils.remove(LOCAL_STORAGE_PEMBIAYAAN)
        } catch (error) {
          console.error('Gagal parse data pembiayaan:', error)
          // Jika data korup, anggap tidak ada dan redirect
          router.replace('/banking/credit') // Ganti dengan URL step 1 Anda
        }
      } else {
        // C. SAFETY NET: Jika data tidak ada (user refresh/akses langsung)
        // Arahkan kembali ke halaman awal stepper
        console.warn('Data pembiayaan tidak ditemukan, mengarahkan kembali...')
        router.replace('/banking/credit') // Ganti dengan URL step 1 Anda
      }

      // Selesai loading
      setIsLoading(false)
    }
  }, [router]) // tambahkan router sebagai dependency

  if (isEmpty(dataPembiayaan) && !isLoading) router.push('/banking/credit')

  // Show skeleton while loading
  if (isLoading) {
    return <PackagePembiayaanSkeleton />
  }

  if (!dataPembiayaan) return null

  return (
    <div className="flex flex-col gap-4 rounded-3xl border-1 border-neutral-200 bg-white px-8 py-5 max-lg:gap-2 max-lg:p-4">
      {/* Organization Name */}
      <div className="flex items-center gap-1">
        <div className="flex w-full items-center justify-between">
          <p className="text-m-semibold max-lg:text-xs max-lg:leading-4 max-lg:font-semibold">
            Data Produk
          </p>
          <div className="flex items-center gap-1">
            <Image
              width={32}
              height={32}
              src={dataPembiayaan.selectedPackage?.organizationThumbnail}
              alt={dataPembiayaan.selectedPackage.organizationName}
              className="max-lg:!h-5 max-lg:!w-5"
            />
            <p className="text-m-semibold capitalize max-lg:text-xs max-lg:leading-4 max-lg:font-medium">
              {dataPembiayaan.selectedPackage.organizationName}
            </p>
            <ChevronRightIcon size={20} />
          </div>
        </div>
      </div>
      <div className="flex gap-3 max-lg:flex-col lg:items-center">
        {/* Package Thumbnail */}
        <div className="flex items-center gap-3">
          <Image
            src={dataPembiayaan.selectedPackage.packageThumbnail}
            alt={dataPembiayaan.selectedPackage.packageName}
            width={144}
            height={144}
            className="rounded-xl max-lg:h-15 max-lg:w-15"
          />
          {/* Package Name Mobile*/}
          <p className="text-s-medium lg:hidden">
            {dataPembiayaan.selectedPackage.packageName}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {/* Package Name Desktop*/}
          <p className="text-m-semibold max-lg:hidden">
            {dataPembiayaan.selectedPackage.packageName}
          </p>

          {/* Date Departure and Arrival */}
          <div className="flex items-center gap-2">
            <Calendar2 size={20} className="text-neutral-500" />
            <div className="flex items-center gap-1">
              <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4">
                {dataPembiayaan.selectedPackage.departureDate}
              </p>
              <ArrowIcon size={18} className="inline-flex text-neutral-500" />
              <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4">
                {dataPembiayaan.selectedPackage.arrivalDate}
              </p>
            </div>
          </div>

          {/* Quantity Jemaah */}
          <div className="flex items-center gap-2">
            <PeopleIcon size={20} className="text-neutral-500" />
            <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4">
              {dataPembiayaan.totalQty} Jemaah
            </p>
          </div>

          {/* Room Type Information */}
          <div className="flex items-center justify-between gap-4 max-lg:w-full">
            {/* Double */}
            {!isEmpty(dataPembiayaan?.selectedRoomType?.double) && (
              <div className="flex items-center gap-2">
                <BedIcon3 size={20} className="flex-none text-neutral-500" />
                <div className="flex flex-1 flex-col">
                  <p className="text-s-regular text-neutral-500">Double</p>
                  <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4">
                    {dataPembiayaan?.selectedRoomType?.double} Jemaah
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="w-[1px] self-stretch bg-neutral-100 lg:hidden" />

            {/* Triple */}
            {!isEmpty(dataPembiayaan?.selectedRoomType?.triple) && (
              <div className="flex items-center gap-2">
                <BedIcon2 size={20} className="flex-none text-neutral-500" />
                <div className="flex flex-col">
                  <p className="text-s-regular text-neutral-500">Triple</p>
                  <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4">
                    {dataPembiayaan?.selectedRoomType?.triple} Jemaah
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="w-[1px] self-stretch bg-neutral-100 lg:hidden" />

            {/* Quad */}
            {!isEmpty(dataPembiayaan?.selectedRoomType?.quad) && (
              <div className="flex items-center gap-2">
                <BedIcon2 size={20} className="flex-none text-neutral-500" />
                <div className="flex flex-col">
                  <p className="text-s-regular text-neutral-500">Quad</p>
                  <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4">
                    {dataPembiayaan?.selectedRoomType?.quad} Jemaah
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="text-s-regular">Total Harga Paket</p>
        <p className="text-m-medium">{formatCurrency(dataPembiayaan.price)}</p>
      </div>
      <p className="text-m-semibold">Mitra Pembiayaan</p>
      <div className="flew-wrap flex gap-4">
        {dataPembiayaan.provider?.map((provider, index) => (
          <div
            className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 p-2"
            key={`${provider.providerName}-${index}`}
          >
            <Image
              src={provider.logo || '/images/logo-koper.svg'}
              alt={provider.providerName}
              width={20}
              height={20}
            />
            <p className="text-s-medium">{provider.providerName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PackageSelection
