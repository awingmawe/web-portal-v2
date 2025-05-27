'use client'

import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { getbankCredit } from '@/services/banking-service'
import { getPackageById, getPackageVariantById } from '@/services/umrah-service'
import { Bed, Calendar, Users } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const BankingPageDetail: React.FC = () => {
  const router = useRouter()
  const [data, setData] = useState<any>(null) // Changed from [] to null
  const [loading, setLoading] = useState(true) // Added loading state

  const getDataPengajuan = async () => {
    try {
      setLoading(true)
      const res = await getbankCredit()
      if (res !== '') {
        const resPackage = (await getPackageById(res.packageId)) as any
        const resVariant = (await getPackageVariantById(
          res.packageVariantId
        )) as any

        const saveData = {
          organizationInstanceName: resPackage.organizationInstanceName,
          title: resPackage.title,
          thumbnail: resPackage.thumbnail,
          departureDate: resVariant.departureDate,
          arrivalDate: resVariant.arrivalDate,
          roomType: res.roomType,
          status: res.status,
          submissionCreditHistory: res.submissionCreditHistory || [], // Added fallback
          jumlahJamaah: res.jumlahJemaah,
          tenor: res.tenor,
          totalPrice: res.totalPrice,
          createdAt: res.createdAt,
          packageType: resPackage.packageType,
          slug: resPackage.slug,
        }
        setData(saveData)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDataPengajuan()
  }, [])

  const statusPengajuan = (status: string) => {
    switch (status) {
      case 'Diajukan':
        return (
          <span className="font-medium text-yellow-800">
            Pengajuan Telah Diterima
          </span>
        )
      case 'Proses':
        return (
          <span
            className="font-medium"
            style={{
              backgroundColor: '#C8E4F8',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            Pengajuan Dalam Proses Verifikasi
          </span>
        )
      case 'Selesai':
        return (
          <span
            className="font-medium"
            style={{
              backgroundColor: '#BDFFEA',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            Pengajuan Diterima
          </span>
        )
      default:
        return (
          <span className="text-gray-500 italic">Status tidak diketahui</span>
        )
    }
  }

  const formatTanggal = (tanggal: string) => {
    const date = new Date(tanggal)
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  const formatTanggal2 = (tanggal: string) => {
    const date = new Date(tanggal)
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }
  const formatTanggal3 = (tanggal: string) => {
    const date = new Date(tanggal)
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  // Show error state if data is null
  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Image
          src="/images/tidak-adadata.svg"
          alt="Package Thumbnail"
          width={242}
          height={190}
          // className="h-full w-full object-cover"
        />

        {/* <div className="text-gray-600">Data tidak ditemukan</div> */}
      </div>
    )
  }

  return (
    <div>
      {/* Mobile Topbar - Only visible on mobile */}
      <div className="md:hidden">
        <MobileTopbar
          variant="pendanaanSyariah"
          title="Detail Pendanaan Syariah"
          showBackButton
          onBackClick={() => {
            router.push('/my')
          }}
        />
      </div>

      {/* Desktop Header - Only visible on desktop */}
      <div className="top-0 z-10 hidden md:block">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Detail Pengajuan
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Didukung oleh</span>
            <Image
              src="/images/logo-permata.svg"
              width={129}
              height={32}
              alt="Permata Bank"
              className="ml-4"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-4 md:space-y-6 lg:col-span-2">
            {/* Status Banner */}
            <div className="rounded-lg border border-yellow-200 bg-yellow-100 p-3 text-center md:p-4">
              <div className="text-sm font-medium text-yellow-800 md:text-base">
                {statusPengajuan(data.status)}
              </div>
            </div>

            {/* Application Details */}
            <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">Kategori Produk</span>
                  <p className="text-right font-medium text-gray-800">
                    {data.packageType === 'umrah' ? 'Umroh' : 'Haji'}
                  </p>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">ID Pengajuan</span>
                  <p className="text-right font-medium text-gray-800">
                    UM82192830
                  </p>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">Tanggal Pengajuan</span>
                  <p className="text-right text-xs font-medium text-gray-800 md:text-sm">
                    {formatTanggal(data.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div
              className="cursor-pointer rounded-lg bg-white p-3 shadow-sm md:p-6"
              onClick={() => {
                router.push(
                  `/${data.packageType}/${data.organizationInstanceName}/${data.slug}`
                )
              }}
            >
              <div className="mb-3 flex items-center justify-between md:mb-4">
                {/* Kiri */}
                <span className="text-sm text-gray-600 md:text-base">
                  Detail Produk
                </span>

                {/* Kanan - Always shown, different styling for mobile/desktop */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-yellow-500 md:h-6 md:w-6"></div>
                  <h2 className="text-sm font-medium text-gray-800 md:text-base md:font-semibold">
                    {data.organizationInstanceName}
                  </h2>
                  <svg
                    className=" h-5 w-5 text-gray-400 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4">
                {/* Image Container */}
                <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 md:h-24 md:w-32">
                  <Image
                    src={data.thumbnail}
                    alt="Package Thumbnail"
                    width={242}
                    height={190}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content Container */}
                <div className="min-w-0 flex-1">
                  <h3 className="mb-3 line-clamp-2 text-sm leading-tight font-semibold text-gray-800 md:mb-3 md:text-lg md:leading-normal">
                    {data.title}
                  </h3>

                  <div className="space-y-2 text-gray-600 md:space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
                      <span className="text-xs leading-relaxed md:text-sm">
                        {formatTanggal2(data.departureDate)} →{' '}
                        {formatTanggal2(data.arrivalDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
                      <span className="text-xs md:text-sm">
                        {data.jumlahJamaah} Jemaah
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
                      <span className="text-xs md:text-sm">
                        {data.roomType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
              <h3 className="mb-4 text-base font-semibold text-gray-800 md:text-lg">
                Rincian Pengajuan
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 md:text-base">
                    Jumlah Pengajuan
                  </span>
                  <span className="text-base font-semibold md:text-lg">
                    Rp{Number(data.totalPrice).toLocaleString('ID')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 md:text-base">
                    Tenor
                  </span>
                  <span className="text-sm font-medium md:text-base">
                    {data.tenor} Bulan
                  </span>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-800">
                Status Pengajuan
              </h3>
              {/* Added safe array check */}
              {data.submissionCreditHistory &&
              Array.isArray(data.submissionCreditHistory) &&
              data.submissionCreditHistory.length > 0 ? (
                data.submissionCreditHistory.map(
                  (historyItem: any, index: number) => (
                    <div className="flex items-start gap-4" key={index}>
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        {index < data.submissionCreditHistory.length - 1 && (
                          <div className="mt-2 h-8 w-0.5 bg-gray-200"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-800">
                            {formatTanggal3(historyItem.createdAt)}
                          </span>
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                            {statusPengajuan(historyItem.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Pengajuan kamu telah diterima dan akan segera kami
                          proses
                        </p>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="py-4 text-center text-gray-500">
                  Belum ada riwayat status pengajuan
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-4 text-center shadow-sm md:p-6">
              <button className="w-full rounded-lg bg-yellow-400 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-500 md:text-base">
                Bantuan
              </button>
            </div>

            {/* Banking Illustration - Hidden on mobile */}
            <div className="absolute bottom-12  ml-20 hidden lg:block">
              <Image
                src="/images/image-bangking.svg"
                alt="Banking Illustration"
                width={242}
                height={190}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankingPageDetail
