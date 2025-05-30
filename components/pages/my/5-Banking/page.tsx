'use client'

import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { getbankCredit } from '@/services/banking-service'
import { getPackageById, getPackageVariantById } from '@/services/umrah-service'
import { BedDouble, CalendarDays, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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
          submissionId: res.submissionId,
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
          <span className=" text-[14px] font-medium  text-yellow-800">
            Pengajuan Telah Diterima
          </span>
        )
      case 'Verifikasi':
        return (
          <span
            className="text-[14px] font-medium"
            style={{
              // backgroundColor: '#C8E4F8',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            Pengajuan Dalam Proses Verifikasi
          </span>
        )
      case 'Diterima':
        return (
          <span
            className="text-[14px] font-medium"
            style={{
              // backgroundColor: '#BDFFEA',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            Pengajuan Disetujui
          </span>
        )
      case 'Ditolak':
        return (
          <span
            className="text-[14px] font-medium"
            style={{
              // backgroundColor: '#BDFFEA',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            Pengajuan Ditolak
          </span>
        )
      default:
        return (
          <span className="text-gray-500 italic">Status tidak diketahui</span>
        )
    }
  }

  const textStatusPengajuan = (status: string, textColor?: string) => {
    const colorClass = textColor ? `text-${textColor}` : ''

    switch (status) {
      case 'Diajukan':
        return (
          <span className={`text-[14px] font-medium ${colorClass} `}>
            Pengajuan kamu telah diterima dan akan segera kami proses.
          </span>
        )
      case 'Verifikasi':
        return (
          <span className={`text-[14px] font-medium ${colorClass}`}>
            Pengajuan kamu sedang dalam proses verifikasi oleh pihak mitra.
          </span>
        )
      case 'Diterima':
        return (
          <span className={`text-[14px] font-medium ${colorClass}`}>
            Pengajuan kamu disetujui oleh pihak mitra.
          </span>
        )
      case 'Ditolak':
        return (
          <span className={`text-[14px] font-medium ${colorClass}`}>
            Pengajuan kamu ditolak oleh pihak mitra.
          </span>
        )
      default:
        return (
          <span className={`italic ${colorClass || 'text-gray-500'}`}>
            Status tidak diketahui
          </span>
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
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/images/tidak-adadata.svg"
            alt="Package Thumbnail"
            width={242}
            height={190}
          />
          <Link href={'/banking?page=pembiayaan'}>
            <button className="w-[191px] rounded-[100px] bg-yellow-400 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-500 md:text-[12px]">
              Ajukan Pendanaan
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const getStatusStyle = (status: string, isOlderStatus: boolean = false) => {
    // If it's an older status and there are multiple statuses, make it gray
    if (isOlderStatus) {
      return 'border-gray-200 bg-gray-100 text-gray-500'
    }

    switch (status) {
      case 'Diajukan':
        return 'border-yellow-200 bg-yellow-100 text-yellow-800'
      case 'Verifikasi':
        return 'border-blue-200 bg-blue-100 text-blue-800'
      case 'Diterima':
        return 'border-emerald-200 bg-emerald-100 text-emerald-800'
      case 'Ditolak':
        return 'border-red-200 bg-red-100 text-red-800'
      default:
        return 'border-gray-200 bg-gray-100 text-gray-800'
    }
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
      <div className="top-0 z-10 hidden md:block md:border-b md:border-[#E8E8E8]">
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

      <div className="pb-10 ">
        <div className="mt-0 grid grid-cols-1 gap-4 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)] md:gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-4 md:space-y-6 md:border-r md:border-[#E8E8E8] lg:col-span-2">
            {/* Status Banner */}

            {/* Application Details */}
            <div className="rounded-lg bg-white p-4  md:p-6">
              <div className="space-y-3 text-sm">
                <div
                  className={`flex h-8 items-center justify-center rounded-[100px] border text-center md:h-9 md:p-4 ${getStatusStyle(data.status)}`}
                >
                  {statusPengajuan(data.status)}
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">Kategori Produk</span>
                  <p className="text-right font-medium text-gray-800">
                    {data.packageType === 'umrah' ? 'Umroh' : 'Haji'}
                  </p>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">ID Pengajuan</span>
                  <p className="text-right font-medium text-gray-800">
                    {data.submissionId}
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
            <div className="h-[6px] w-full bg-neutral-100 opacity-50" />
            {/* Product Details */}
            <Link
              href={`/${data.packageType}/${data.organizationInstanceName}/${data.slug}`}
            >
              <div className="mt-0 cursor-pointer rounded-lg bg-white p-4 pt-0 md:mt-0 md:p-2 md:pt-0">
                {/* Header - Different layout for mobile/desktop */}
                <div className="mb-3 md:mb-4">
                  {/* Mobile Layout */}
                  <div className="flex items-center justify-between md:hidden">
                    <span className="text-sm text-gray-600">Detail Produk</span>
                    <div className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1">
                      <Image
                        src="/images/logo-koper.svg"
                        alt="Package Thumbnail"
                        width={16}
                        height={16}
                      />
                      <span className="text-xs font-medium text-orange-600">
                        {data.organizationInstanceName}
                      </span>
                      <svg
                        className="h-4 w-4 text-orange-600"
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

                  {/* Desktop Layout */}
                  <div className="hidden items-center justify-between md:flex">
                    <span className="text-[12px] font-[500] text-neutral-900">
                      Detail Produk
                    </span>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/logo-koper.svg"
                        alt="Package Thumbnail"
                        width={20}
                        height={20}
                      />
                      <h2 className="text-base font-semibold text-gray-800">
                        {data.organizationInstanceName}
                      </h2>
                      <svg
                        className="h-5 w-5 text-gray-400"
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
                </div>

                <div className="flex flex-col gap-3 md:gap-4">
                  {/* Image Container */}
                  <div className="flex !flex-row items-center gap-3 md:gap-4">
                    <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 md:h-24 md:w-32">
                      <Image
                        src={data.thumbnail}
                        alt="Package Thumbnail"
                        width={242}
                        height={190}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className=" flex h-full min-w-0 flex-1 items-center">
                      <h3 className="line-clamp-2 text-[12px] leading-tight font-semibold text-neutral-900 md:text-lg md:leading-normal">
                        {data.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="min-w-0 flex-1">
                    <div className="space-y-2 text-gray-600 md:space-y-2">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-3 w-3 flex-shrink-0 text-neutral-500 md:h-4 md:w-4" />
                        <span className="text-xs leading-relaxed text-neutral-500 md:text-sm">
                          {formatTanggal2(data.departureDate)} →{' '}
                          {formatTanggal2(data.arrivalDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 flex-shrink-0 text-neutral-500 md:h-4 md:w-4" />
                        <span className="text-xs text-neutral-500 md:text-sm">
                          {data.jumlahJamaah} Jemaah
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BedDouble className="h-3 w-3 flex-shrink-0 text-neutral-500 md:h-4 md:w-4 " />
                        <span className="text-xs text-neutral-500 md:text-sm">
                          {data.roomType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className="h-[6px] w-full bg-neutral-100 opacity-50" />
            {/* Pricing Details */}
            <div className="rounded-lg bg-white p-4 pt-0 md:p-2 md:pt-0 ">
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
            <div className="h-[6px] w-full bg-neutral-100 opacity-50" />
            {/* Status Timeline */}
            <div className="rounded-lg bg-white p-4 pt-0 md:p-6 md:pt-0">
              <h3 className="mb-4 font-semibold text-gray-800">
                Status Pengajuan
              </h3>
              {data.submissionCreditHistory &&
              Array.isArray(data.submissionCreditHistory) &&
              data.submissionCreditHistory.length > 0 ? (
                data.submissionCreditHistory.map(
                  (historyItem: any, index: number) => {
                    // Check if this is an older status (not the first/latest one)
                    const isOlderStatus =
                      index > 0 && data.submissionCreditHistory.length > 1

                    return (
                      <div
                        className="flex flex-row items-start gap-2 sm:gap-4"
                        key={index}
                      >
                        {/* Tanggal di kanan */}
                        <span
                          className={`mt-1 w-24 text-right text-sm font-medium ${isOlderStatus ? 'text-gray-400' : 'text-[#8E8E8B]'}`}
                        >
                          {formatTanggal3(historyItem.createdAt)}
                        </span>

                        {/* Icon bulat + garis */}
                        <div className="relative flex flex-col items-center">
                          <Image
                            src="/images/icon-bulet.svg"
                            alt="Package Thumbnail"
                            width={32}
                            height={32}
                            className={
                              isOlderStatus ? 'brightness-[90%] grayscale' : ''
                            }
                          />
                          {index < data.submissionCreditHistory.length - 1 && (
                            <div className="absolute top-8 h-20 w-0.5 bg-gray-200"></div>
                          )}
                        </div>

                        {/* Konten status */}
                        <div className="flex flex-1 flex-col pb-5">
                          <div
                            className={`mb-1 inline-flex h-8 max-h-full w-fit max-w-full items-center gap-2 rounded-[100px] border px-3 py-2 text-center text-xs md:h-9 md:px-4 md:py-3 md:text-[14px] ${getStatusStyle(historyItem.status, isOlderStatus)}`}
                          >
                            {isOlderStatus ? (
                              <span className="text-[14px] font-medium text-gray-500">
                                {historyItem.status === 'Diajukan' &&
                                  'Pengajuan Telah Diterima'}
                                {historyItem.status === 'Verifikasi' &&
                                  'Pengajuan Dalam Proses Verifikasi'}
                                {historyItem.status === 'Diterima' &&
                                  'Pengajuan Disetujui'}
                                {historyItem.status === 'Ditolak' &&
                                  'Pengajuan Ditolak'}
                              </span>
                            ) : (
                              statusPengajuan(historyItem.status)
                            )}
                          </div>

                          {textStatusPengajuan(
                            historyItem.status,
                            isOlderStatus ? 'gray-400' : undefined
                          )}
                        </div>
                      </div>
                    )
                  }
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
            <Link
              href={`https://wa.me/628888551101?text=Assalamualaikum,+dengan+customer+service+Muslim+101+saya+mau+bertanya+tentang+pendanaan?`}
              target="_blank"
              className="hidden lg:block"
            >
              <button className="mt-5 w-full rounded-[100px] border border-[#FFC100] px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-500 md:text-base">
                Bantuan
              </button>
            </Link>

            {/* Banking Illustration - Hidden on mobile */}
            <div className="absolute bottom-12  ml-20 hidden lg:block">
              <Image
                src="/images/image-bangking.svg"
                alt="Banking Illustration"
                width={242}
                height={190}
              />
            </div>

            <Link
              href={`https://wa.me/628888551101?text=Assalamualaikum,+dengan+customer+service+Muslim+101+saya+mau+bertanya+tentang+pendanaan?`}
              target="_blank"
            >
              <div className="fixed right-0 bottom-0 left-0 bg-white p-4 shadow-[0_-4px_6px_rgba(0,0,0,0.1)] md:hidden">
                <button className="w-full rounded-[100px] border border-[#FFC100] px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-500 md:text-base">
                  Bantuan
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankingPageDetail
