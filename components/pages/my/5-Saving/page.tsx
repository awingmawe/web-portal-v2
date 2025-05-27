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
          <span className="bg-yellow-100 font-medium  text-yellow-800">
            Pengajuan Telah Diterima
          </span>
        )
      case 'Verifikasi':
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
      case 'Diterima':
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
      case 'Ditolak':
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
            <div
              className={`rounded-lg border p-3 text-center md:p-4 ${getStatusStyle(data.status)}`}
            >
              {statusPengajuan(data.status)}
            </div>

            {/* Application Details */}
            <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
              <div className="space-y-3 text-sm">
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
                          {/* <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800"> */}
                          {statusPengajuan(historyItem.status)}
                          {/* </span> */}
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
              <Link
                href={`https://wa.me/628888551101?text=Assalamualaikum,+dengan+customer+service+Muslim+101+saya+mau+bertanya+tentang+tabungan?`}
                target="_blank"
              >
                <div className="hidden rounded-lg bg-white p-4 text-center shadow-sm md:p-6 lg:block">
                  <button className="w-full rounded-lg bg-yellow-400 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-500 md:text-base">
                    Bantuan
                  </button>
                </div>
              </Link>
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
            <div className="rounded-lg bg-white p-4 text-center shadow-sm md:p-6">
              <Link
                href={`https://wa.me/628888551101?text=Assalamualaikum,+dengan+customer+service+Muslim+101+saya+mau+bertanya+tentang+tabungan?`}
                target="_blank"
              >
                <div className="fixed right-0 bottom-0 left-0 bg-white p-4 shadow-lg md:hidden">
                  <button className="w-full rounded-lg bg-yellow-400 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-500">
                    Bantuan
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavingPageDetail
