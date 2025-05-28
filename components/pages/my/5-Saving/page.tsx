'use client'

import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { getSaving } from '@/services/banking-service'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SavingPageDetail: React.FC = () => {
  const router = useRouter()
  const [data, setData] = useState<any>(null) // Changed from [] to null
  const [loading, setLoading] = useState(true) // Added loading state

  const getDataPengajuan = async () => {
    try {
      setLoading(true)
      const res = await getSaving()

      // const resPackage = (await getPackageById(res.packageId)) as any
      // const resVariant = (await getPackageVariantById(
      //   res.packageVariantId
      // )) as any
      if (res !== '') {
        const saveData = {
          status: res.status,
          submissionCreditHistory: res.submissionSavingsHistory || [], // Added fallback
          submissionId: res.submissionId,
          createdAt: res.createdAt,
          packageType: 'Tabungan Umroh',
        }
        // console.log(saveData)

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
  const getStatusStyle = (status: string) => {
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
            Pengajuan Diterima
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
          <Link href={'/banking?page=tabungan'}>
            <button className="w-[191px] rounded-[100px] bg-yellow-400 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-500 md:text-[12px]">
              Ajukan Tabungan
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Mobile Topbar - Only visible on mobile */}
      <div className="md:hidden">
        <MobileTopbar
          variant="pendanaanSyariah"
          title="Tabungan"
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

      <div className="px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-4 md:space-y-6 md:border-r md:border-[#E8E8E8] lg:col-span-2">
            {/* Status Banner */}

            {/* Application Details */}
            <div className="rounded-lg bg-white p-4  md:p-6">
              <div className="space-y-3 text-sm">
                <div
                  className={`rounded-[100px] border p-3 text-center md:p-4 ${getStatusStyle(data.status)}`}
                >
                  {statusPengajuan(data.status)}
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">Kategori Produk</span>
                  <p className="text-right font-medium text-gray-800">
                    {data.packageType}
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
            <div className="h-[8px] w-full bg-[#E8E8E8]" />
            {/* Status Timeline */}
            <div className="rounded-lg bg-white p-6 ">
              <h3 className="mb-4 font-semibold text-gray-800">
                Status Pengajuan
              </h3>
              {/* Added safe array check */}
              {data.submissionCreditHistory &&
              Array.isArray(data.submissionCreditHistory) &&
              data.submissionCreditHistory.length > 0 ? (
                data.submissionCreditHistory.map(
                  (historyItem: any, index: number) => (
                    <div
                      className="mb-5 flex flex-row items-start gap-2 sm:gap-4"
                      key={index}
                    >
                      {/* Tanggal di kanan */}
                      <span className="mt-1 w-24 text-right text-sm font-medium text-[#8E8E8B]">
                        {formatTanggal3(historyItem.createdAt)}
                      </span>

                      {/* Icon bulat + garis */}
                      <div className="flex flex-col items-center">
                        <Image
                          src="/images/icon-bulet.svg"
                          alt="Package Thumbnail"
                          width={32}
                          height={32}
                        />
                        {index < data.submissionCreditHistory.length - 1 && (
                          <div className="mt-2 h-10 w-0.5 bg-gray-200"></div>
                        )}
                      </div>

                      {/* Konten status */}
                      <div className="flex-1">
                        <div
                          className={`mb-1 inline-flex max-h-full w-fit max-w-full items-center gap-2 rounded-[100px] border px-3 py-2 text-center text-xs md:px-4 md:py-3 md:text-[14px] ${getStatusStyle(historyItem.status)}`}
                        >
                          {statusPengajuan(historyItem.status)}
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
            {/* <div className="rounded-lg bg-white p-4 text-center shadow-sm md:p-6"> */}
            <Link
              href={`https://wa.me/628888551101?text=Assalamualaikum,+dengan+customer+service+Muslim+101+saya+mau+bertanya+tentang+tabungan?`}
              target="_blank"
              className="hidden lg:block"
            >
              {/* <div className="hidden rounded-lg bg-white p-4 text-center shadow-sm md:p-6 lg:block"> */}
              <button className="w-full rounded-[100px] border border-[#FFC100] px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-500 md:text-base">
                Bantuan
              </button>
            </Link>
            {/* </div> */}

            {/* Banking Illustration - Hidden on mobile */}
            <div className="absolute bottom-12  ml-20 hidden lg:block">
              <Image
                src="/images/image-bangking.svg"
                alt="Banking Illustration"
                width={242}
                height={190}
              />
            </div>
            {/* <div className="rounded-lg bg-white p-4 text-center shadow-sm md:hidden md:p-6"> */}
            <Link
              href={`https://wa.me/628888551101?text=Assalamualaikum,+dengan+customer+service+Muslim+101+saya+mau+bertanya+tentang+tabungan?`}
              target="_blank"
            >
              <div className="fixed right-0 bottom-0 left-0 bg-white p-4 shadow-lg md:hidden">
                <button className="w-full rounded-[100px] border border-[#FFC100] px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-500 md:text-base">
                  Bantuan
                </button>
              </div>
            </Link>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavingPageDetail
