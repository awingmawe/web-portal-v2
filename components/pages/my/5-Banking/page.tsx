'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { BedIcon2, BedIcon3 } from '@/components/icons/bed'
import { Calendar2 } from '@/components/icons/calendar'
import { UsersIcon } from '@/components/icons/user'
import TransactionSkeletonLoading from '@/components/pages/my/1-Transaction/Components/TransactionSkeletonLoading'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { CALL_CENTER, PACKAGE_TYPE } from '@/constant/env'
import { getbankCredit } from '@/services/banking-service'
import { getPackageById, getPackageVariantById } from '@/services/umrah-service'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { BedDouble } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'

const BankingPageDetail: React.FC = () => {
  const router = useRouter()
  const [data, setData] = useState<any>(null) // For single API application
  const [localApplications, setLocalApplications] = useState<any[]>([]) // For multiple localStorage applications
  const [loading, setLoading] = useState(true) // Added loading state
  const [viewMode, setViewMode] = useState<'detail' | 'list'>('detail') // To switch between layouts

  const getDataPengajuan = async () => {
    try {
      setLoading(true)
      
      // Check localStorage first for talangan applications
      if (typeof window !== 'undefined') {
        const localApplicationsData = localStorage.getItem('talanganApplications')
        
        if (localApplicationsData) {
          try {
            const applications = JSON.parse(localApplicationsData)
            
            if (applications && applications.length > 0) {
              setLocalApplications(applications)
              setViewMode('list') // Use list layout for localStorage data
              setLoading(false)
              return
            }
          } catch (error) {
            console.error('Error parsing localStorage applications:', error)
          }
        }
      }
      
      // Fallback to API if no localStorage data
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
          roomTypeQuantity: res.roomTypeQuantity,
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
      <div className="flex !h-[500px] items-center justify-center">
        <TransactionSkeletonLoading noTabs noFilter noPagination />
      </div>
    )
  }

  // Show error state if data is null
  if (!data && viewMode !== 'list') {
    return (
      <Fragment>
        <div className="md:hidden">
          <MobileTopbar
            variant="pendanaanSyariah"
            title="Detail Pembiayaan Umroh"
            showBackButton
            onBackClick={() => {
              router.push('/my')
            }}
          />
        </div>
        <div className="flex !h-[500px]  items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/images/tidak-adadata.svg"
              alt="Package Thumbnail"
              width={242}
              height={190}
            />
            <Link href={'/banking/credit'}>
              <button className="w-[191px] rounded-[100px] bg-yellow-400 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-yellow-500 md:text-[12px]">
                Ajukan Pendanaan
              </button>
            </Link>
          </div>
        </div>
      </Fragment>
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

  // Render list layout for localStorage applications
  if (viewMode === 'list' && localApplications.length > 0) {
    return <TalanganListLayout applications={localApplications} />
  }

  return (
    <div>
      {/* Mobile Topbar - Only visible on mobile */}
      <div className="md:hidden">
        <MobileTopbar
          variant="pendanaanSyariah"
          title="Detail Pembiayaan Umroh"
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
                    {data.packageType === PACKAGE_TYPE.UMRAH ? 'Umroh' : 'Haji'}
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
                    <span className="text-s-medium text-neutral-900">
                      Detail Produk
                    </span>
                    <div className="flex items-center gap-1 rounded-full px-2 py-1">
                      <Image
                        src="/images/logo-koper.svg"
                        alt="Package Thumbnail"
                        width={16}
                        height={16}
                      />
                      <span className="text-s-medium">
                        {data.organizationInstanceName}
                      </span>
                      <svg
                        className="h-4 w-4"
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
                    <span className="text-m-semibold text-neutral-900">
                      Detail Produk
                    </span>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/logo-koper.svg"
                        alt="Package Thumbnail"
                        width={20}
                        height={20}
                      />
                      <h2 className="text-m-semibold text-neutral-900">
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

                <div className="flex gap-4 max-lg:items-center md:col-span-2">
                  <div className="h-32 w-32 flex-shrink-0 max-lg:h-20 max-lg:w-20">
                    {data.thumbnail ? (
                      <Image
                        src={data.thumbnail}
                        alt="Umroh Package"
                        width={128}
                        height={128}
                        className="block h-full w-full rounded-md object-cover max-xl:hidden"
                      />
                    ) : (
                      <Image
                        src={'/thumbnail.png'}
                        alt="Umroh Package"
                        width={60}
                        height={60}
                        className="block h-full w-full rounded-md object-cover max-xl:hidden"
                      />
                    )}
                    {data.thumbnail ? (
                      <Image
                        src={data.thumbnail}
                        alt="Umroh Package"
                        width={60}
                        height={60}
                        className="hidden h-full w-full rounded-md object-cover max-xl:block"
                      />
                    ) : (
                      <Image
                        src={'/thumbnail.png'}
                        alt="Umroh Package"
                        width={60}
                        height={60}
                        className="hidden h-full w-full rounded-md object-cover max-xl:block"
                      />
                    )}
                  </div>
                  <div className="mb-5 flex w-1/2 flex-col justify-between">
                    <h2 className="text-l-semibold leading-[16px] uppercase max-xl:text-xs">
                      {data.title}
                    </h2>
                    <div className="mt-4 flex items-center gap-2 max-xl:hidden">
                      <Calendar2 className="h-5 w-5 text-neutral-500" />
                      <p className="text-m-regular flex items-center text-neutral-500">
                        {dayjs(data.departureDate)
                          .locale('id')
                          .format('DD MMMM YYYY')}{' '}
                        <ArrowIcon
                          size={20}
                          className="mx-2 text-neutral-500"
                        />{' '}
                        {dayjs(data.arrivalDate)
                          .locale('id')
                          .format('DD MMMM YYYY')}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 max-xl:hidden">
                      <UsersIcon className="h-5 w-5 text-neutral-500" />
                      <p className="text-m-regular text-neutral-500">
                        {data.jumlahJamaah} Jemaah
                      </p>
                    </div>
                    {data.roomType !== null ? (
                      <div className="flex flex-col gap-3 md:gap-4">
                        {/* Content Container */}
                        <div className="mt-3 min-w-0 flex-1">
                          <div className="space-y-2 text-gray-600 md:space-y-2">
                            <div className="flex items-center gap-2">
                              <BedDouble className="h-3 w-3 flex-shrink-0 text-neutral-500 md:h-4 md:w-4 " />
                              <span className="text-xs text-neutral-500 md:text-sm">
                                {data.roomType}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 max-xl:hidden">
                        <div className="flex w-full justify-between">
                          <div className="flex items-center gap-2">
                            <BedIcon3 className="h-6 w-6 flex-shrink-0 text-center text-neutral-500" />
                            <div className="flex flex-col">
                              <p className="text-s-regular text-neutral-500">
                                Double
                              </p>
                              <p className="text-s-regular text-neutral-500">
                                {data.roomTypeQuantity?.double} Jemaah
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <BedIcon2 className="h-6 w-6 flex-shrink-0 text-center text-neutral-500" />
                            <div className="flex flex-col">
                              <p className="text-s-regular text-neutral-500">
                                Triple
                              </p>
                              <p className="text-s-regular text-neutral-500">
                                {data.roomTypeQuantity?.triple} Jemaah
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <BedIcon3 className="h-6 w-6 flex-shrink-0 text-center text-neutral-500" />
                            <div className="flex flex-col">
                              <p className="text-s-regular text-neutral-500">
                                Quad
                              </p>
                              <p className="text-s-regular text-neutral-500">
                                {data.roomTypeQuantity?.quad} Jemaah
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4  hidden items-center gap-2 max-xl:flex">
                  <Calendar2 className="h-5 w-5 text-neutral-500" />
                  <p className="text-s-regular flex items-center text-neutral-500">
                    {dayjs(data.departureDate)
                      .locale('id')
                      .format('DD MMMM YYYY')}{' '}
                    <ArrowIcon size={20} className="mx-2 text-neutral-500" />{' '}
                    {dayjs(data.arrivalDate)
                      .locale('id')
                      .format('DD MMMM YYYY')}
                  </p>
                </div>
                <div className="mt-4 hidden items-center gap-2 max-xl:flex">
                  <UsersIcon className="h-5 w-5 text-neutral-500" />
                  <p className="text-m-regular text-neutral-500">
                    {data.jumlahJamaah} Jemaah
                  </p>
                </div>
                <div className="mt-4 hidden max-xl:flex">
                  <div className="flex w-full justify-between gap-5">
                    <div className="flex items-center gap-2">
                      <BedIcon3 className="h-6 w-6 flex-shrink-0 text-center text-neutral-500" />
                      <div className="flex flex-col">
                        <p className="text-s-regular text-neutral-500">
                          Double
                        </p>
                        <p className="text-s-regular text-neutral-500">
                          {data.roomTypeQuantity?.double} Jemaah
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedIcon2 className="h-6 w-6 flex-shrink-0 text-center text-neutral-500" />
                      <div className="flex flex-col">
                        <p className="text-s-regular text-neutral-500">
                          Triple
                        </p>
                        <p className="text-s-regular text-neutral-500">
                          {data.roomTypeQuantity?.triple} Jemaah
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedIcon2 className="h-6 w-6 flex-shrink-0 text-center text-neutral-500" />
                      <div className="flex flex-col">
                        <p className="text-s-regular text-neutral-500">Quad</p>
                        <p className="text-s-regular text-neutral-500">
                          {data.roomTypeQuantity?.quad} Jemaah
                        </p>
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
              href={`https://wa.me/${CALL_CENTER}?text=Assalamualaikum,+dengan+customer+service+Muslim+101+saya+mau+bertanya+tentang+pendanaan?`}
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
              href={`https://wa.me/${CALL_CENTER}?text=Assalamualaikum,+dengan+customer+service+Muslim+101+saya+mau+bertanya+tentang+pendanaan?`}
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

// List Layout Component for localStorage applications
const TalanganListLayout: React.FC<{ applications: any[] }> = ({ applications }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredApplications, setFilteredApplications] = useState(applications)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    let filtered = applications
    if (searchQuery) {
      filtered = applications.filter(app => 
        app.personalData?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.packageData?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    setFilteredApplications(filtered)
    setCurrentPage(1) // Reset to first page when search changes
  }, [searchQuery, applications])

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentApplications = filteredApplications.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return { text: 'Dalam Proses Pengajuan', color: 'bg-yellow-100 text-yellow-800' }
      case 'in_review':
        return { text: '1 Penawaran Talangan Tersedia', color: 'bg-blue-100 text-blue-800' }
      case 'approved':
        return { text: 'Pengajuan Disetujui', color: 'bg-green-100 text-green-800' }
      case 'rejected':
        return { text: 'Pengajuan Ditolak', color: 'bg-red-100 text-red-800' }
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800' }
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return ''
    }
  }

  const safeParsePrice = (price: any): number => {
    if (!price) return 0
    const parsed = typeof price === 'string' ? parseInt(price.replace(/\D/g, '')) : parseInt(price.toString())
    return isNaN(parsed) ? 0 : parsed
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Cari berdasarkan ID / Travel / Personan"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Semua Produk</option>
                </select>
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {currentApplications.map((app, index) => {
                const statusInfo = getStatusBadge(app.status)
                return (
                  <div key={app.id} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      {/* Left - Package Info */}
                      <div className="flex gap-4 flex-1">
                        <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {app.packageData?.src ? (
                            <img 
                              src={app.packageData.src} 
                              alt={app.packageData.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 mb-1">
                            Umroh / ID : {app.id}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 uppercase text-sm">
                            {app.packageData?.title || 'Package Title'}
                          </h3>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <span>{app.packageData?.departureDate} → {app.packageData?.arrivalDate}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <span>3 Jamaah</span>
                          </div>
                          
                          <div className="text-sm text-gray-500">
                            Dibuat pada {formatDate(app.submittedAt)}, {formatTime(app.submittedAt)}
                          </div>
                        </div>
                      </div>

                      {/* Right - Status and Actions */}
                      <div className="flex flex-col items-end gap-3 ml-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.text}
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Jumlah Talangan</div>
                          <div className="text-lg font-bold text-gray-900">
                            Rp{safeParsePrice(app.financing?.requestedAmount).toLocaleString('id-ID')}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Tenor</div>
                          <div className="font-semibold text-gray-900">{app.financing?.tenor || 24} Bulan</div>
                        </div>
                        
                        <button className="text-sm text-gray-600 hover:text-gray-800 border border-gray-300 px-3 py-1 rounded">
                          Lihat Detail Pesanan
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8 space-x-2">
                <button 
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  ←
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button 
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 rounded font-medium ${
                      page === currentPage 
                        ? 'bg-yellow-500 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  →
                </button>
              </div>
            )}
      </div>
    </div>
  )
}

export default BankingPageDetail
