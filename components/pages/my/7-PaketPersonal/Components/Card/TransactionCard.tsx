/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { Calendar, Calendar2 } from '@/components/icons/calendar'
import { UsersIcon } from '@/components/icons/user'
import TransactionCardFooter from '@/components/pages/my/7-PaketPersonal/Components/Card/TransactionCardFooter'
import TransactionCardHeader from '@/components/pages/my/7-PaketPersonal/Components/Card/TransactionCardHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { CanceledProvider } from '@/contexts/canceled-package-context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { Hotel, PlaneLanding, PlaneTakeoff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'

export interface TransactionCardProps {
  status: string
  id: string
  packageName: string
  startDate: string
  endDate: string
  createdDate: string
  jemaah: number
  noFooter?: boolean
  arival?: any
  departure?: any
  noHeader?: boolean
  fetchTransactions?: any
  transaction?: any
  meccaHotel?: any
  medinaHotel?: any
  totalOffers?: any
  approvedAt?: any
  modifiedAt?: any
  idJourney?: any
  offersAboutToExpire?: any
}

const RenderLinkToDetail = ({
  lg,
  bookingId,
  children,
}: {
  lg: boolean
  bookingId: string
  statusTahapan: string
  children: React.ReactNode
}) => {
  if (lg) {
    return <Link href={`/my/paket-personal/${bookingId}`}>{children}</Link>
  }

  return <div>{children}</div>
}

export default function TransactionCard({
  status,
  id,
  packageName,
  totalOffers,
  startDate,
  endDate,
  createdDate,
  jemaah,
  meccaHotel,
  medinaHotel,
  arival,
  departure,
  noFooter,
  noHeader,
  fetchTransactions,
  transaction,
  approvedAt,
  modifiedAt,
  idJourney,
  offersAboutToExpire,
}: TransactionCardProps) {
  const { lg } = useTailwindBreakpoint()
  const [orderPayment, setOrderPayment] = useState<any>(null)
  const [orderPaymentLoading, setOrderPaymentLoading] = useState<any>(
    lg ? true : false
  )
  const renderStatusTahapanColor = (status: string) => {
    if (status === 'offer-selected') {
      return 'bg-success-100 text-success-700'
    } else if (
      status == 'canceled' ||
      status == 'offer-expired' ||
      status == 'no-offers'
    ) {
      return 'bg-error-100 text-error-700'
    } else if (status == 'waiting-offers') {
      return 'bg-warning-100 text-warning-700'
    } else {
      return 'bg-info-100 text-info-700'
    }
  }

  const renderStatusTahapanText = (status: string, totalOffers: any) => {
    if (status === 'waiting-offers') {
      return 'Menunggu Penawaran'
    } else if (status === 'offers-available') {
      return `${totalOffers} Penawaran Tersedia`
    } else if (status === 'no-offers') {
      return 'Penawaran Tidak Tersedia'
    } else if (status === 'offer-expired') {
      return 'Penawaran Hangus'
    } else if (status === 'waiting-payment') {
      return 'Menunggu Pembayaran'
    } else if (status === 'offer-selected') {
      return 'Penawaran Telah Dipilih'
    } else {
      return 'Dibatalkan Sistem'
    }
  }

  return (
    <div className="mt-6 rounded-3xl border border-neutral-200 ">
      <RenderLinkToDetail
        lg={lg}
        bookingId={idJourney}
        statusTahapan={'statusTahapan'}
      >
        {!noHeader && offersAboutToExpire > 0 && approvedAt !== null && (
          <TransactionCardHeader
            status={status}
            totalOffers={totalOffers}
            createdDate={approvedAt}
            offersAboutToExpire={offersAboutToExpire}
          />
        )}
      </RenderLinkToDetail>

      <div
        className={`${!noHeader ? '-mt-0' : ''} overflow-hidden rounded-3xl bg-white shadow-[0px_-5px_4px_0px_#ACACAC1A]`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2 max-lg:block">
            <p className="font-medium max-lg:text-[11px]">Umroh Personal</p>
            <p className="font-medium max-lg:hidden">/ </p>
            <p className="text-neutral-500 max-lg:hidden">ID : {id}</p>
            <p className="hidden text-neutral-500 max-lg:block max-lg:text-[11px]">
              Diperbarui pada:{' '}
              {dayjs(modifiedAt).locale(id).format('DD MMM YYYY')}
            </p>
          </div>
          <div className="flex items-center">
            <p
              className={` text-m-medium text-center ${renderStatusTahapanColor(status)} rounded-full px-6 py-2 max-lg:px-2 max-lg:py-1 max-lg:text-[11px]`}
            >
              {renderStatusTahapanText(status, totalOffers)}
            </p>
          </div>
        </div>
        <RenderLinkToDetail
          lg={lg}
          bookingId={idJourney}
          statusTahapan={'statusTahapan'}
        >
          <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-8 lg:gap-4">
            <p className="text-s-regular hidden text-neutral-500 max-lg:block">
              ID : {id}
            </p>
            <div className="flex gap-4 md:col-span-3">
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-l-semibold leading-[16px] uppercase max-lg:text-xs">
                    {packageName}
                  </h2>
                  <div className="mt-4 flex items-center gap-2 max-lg:hidden">
                    <Calendar2 className="h-5 w-5 text-neutral-500" />
                    <p className="text-m-regular flex items-center text-neutral-500">
                      {dayjs(startDate).locale('id').format('DD MMMM YYYY')}{' '}
                      <ArrowIcon size={20} className="mx-2 text-neutral-500" />{' '}
                      {dayjs(endDate).locale('id').format('DD MMMM YYYY')}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 max-lg:hidden">
                    <UsersIcon className="h-5 w-5 text-neutral-500" />
                    <p className="text-m-regular text-neutral-500">
                      {jemaah} Jemaah
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 max-lg:hidden">
                    <Hotel className="h-5 w-5 text-neutral-500" />
                    <p className="text-m-regular text-neutral-500">
                      {meccaHotel?.selectedHotel?.name &&
                      medinaHotel?.selectedHotel?.name
                        ? `${meccaHotel.selectedHotel.name} & ${medinaHotel.selectedHotel.name}`
                        : meccaHotel?.selectedHotel?.name ||
                          medinaHotel?.selectedHotel?.name ||
                          'Hotel belum tersedia'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Flight info di kolom kanan */}
            <div className="hidden flex-col border-t border-neutral-100 pt-4 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-4 lg:flex">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="mt-8 flex items-center gap-2">
                    <PlaneTakeoff className="h-5 w-5 text-neutral-500" />
                    <p className="text-m-regular flex items-center text-neutral-500">
                      {departure?.from?.code}
                      <ArrowIcon
                        size={20}
                        className="mx-2 text-neutral-500"
                      />{' '}
                      {departure?.to?.code}
                      <span className="mr-2 ml-2 inline-block h-1 w-1 rounded-full bg-neutral-400"></span>
                      {departure?.airline?.logo && (
                        <Image
                          src={departure.airline.logo}
                          alt="Airline Logo"
                          width={20}
                          height={20}
                        />
                      )}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2">
                    <PlaneLanding className="h-5 w-5 text-neutral-500" />
                    <p className="text-m-regular flex items-center text-neutral-500">
                      {arival?.from?.code}
                      <ArrowIcon
                        size={20}
                        className="mx-2 text-neutral-500"
                      />{' '}
                      {arival?.to?.code}
                      <span className="mr-2 ml-2 inline-block h-1 w-1 rounded-full bg-neutral-400"></span>
                      {arival?.airline?.logo && (
                        <Image
                          src={arival.airline.logo}
                          alt="Airline Logo"
                          width={20}
                          height={20}
                        />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Basic info ditampilkan di atas */}
            <div className="hidden items-center gap-2 max-lg:flex">
              <Calendar2 className="h-4 w-4 text-neutral-500" />
              <p className="flex items-center text-xs text-neutral-500">
                {dayjs(startDate).locale('id').format('DD MMMM YYYY')}{' '}
                <ArrowIcon size={18} className="mx-2 text-neutral-500" />{' '}
                {dayjs(endDate).locale('id').format('DD MMMM YYYY')}
              </p>
            </div>
            <div className="mt-1 hidden items-center gap-2 max-lg:flex">
              <UsersIcon className="h-4 w-4 text-neutral-500" />
              <p className="text-xs text-neutral-500">{jemaah} Jemaah</p>
            </div>

            {/* Mobile: Hotel info */}
            <div className="mt-1 hidden items-center gap-2 max-lg:flex">
              <Hotel className="h-4 w-4 text-neutral-500" />
              <p className="text-xs text-neutral-500">
                {meccaHotel?.selectedHotel?.name &&
                medinaHotel?.selectedHotel?.name
                  ? `${meccaHotel.selectedHotel.name} & ${medinaHotel.selectedHotel.name}`
                  : meccaHotel?.selectedHotel?.name ||
                    medinaHotel?.selectedHotel?.name ||
                    'Hotel belum tersedia'}
              </p>
            </div>

            {/* Mobile: Flight info di paling bawah */}
            <div className="mt-2 flex flex-row gap-2 max-lg:flex lg:hidden">
              <div className="flex items-center gap-2">
                <PlaneTakeoff className="h-4 w-4 text-neutral-500" />
                <p className="flex items-center text-xs text-neutral-500">
                  {departure?.from?.code}
                  <ArrowIcon size={12} className="mx-2 text-neutral-500" />{' '}
                  {departure?.to?.code}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PlaneLanding className="h-4 w-4 text-neutral-500" />
                <p className="flex items-center text-xs text-neutral-500">
                  {arival?.from?.code}
                  <ArrowIcon size={12} className="mx-2 text-neutral-500" />{' '}
                  {arival?.to?.code}
                </p>
              </div>
            </div>
          </div>
        </RenderLinkToDetail>
        <div
          className={`flex items-center justify-between border-t border-neutral-200 p-4 max-lg:py-2 ${noFooter ? 'max-lg:hidden' : 'max-lg:block'}`}
        >
          <div className="flex items-center gap-2 text-gray-500 max-lg:hidden">
            <p className="text-s-regular text-neutral-500">
              Informasi terakhir diperbarui pada
            </p>
            <Calendar className="h-4 w-4 text-neutral-500" />
            <p className="text-m-regular text-neutral-500">
              {dayjs(modifiedAt).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>
          {!noFooter && (
            <Fragment>
              {orderPaymentLoading ? (
                <div className="flex hidden items-center justify-between p-4 max-lg:block">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <div className="flex gap-2 max-lg:hidden">
                    <Skeleton className="h-10 w-32 rounded-full" />
                    <Skeleton className="h-10 w-40 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              ) : (
                <CanceledProvider>
                  <TransactionCardFooter
                    status={status}
                    idJourney={idJourney}
                    fetchTransactions={fetchTransactions}
                    transaction={transaction}
                  />
                </CanceledProvider>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
