/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { Calendar, Calendar2 } from '@/components/icons/calendar'
import { UsersIcon } from '@/components/icons/user'
import TransactionCardFooter from '@/components/pages/my/6-CheckAvailability/Components/Card/TransactionCardFooter'
import TransactionCardPayment from '@/components/pages/my/6-CheckAvailability/Components/Card/TransactionCardPayment'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'

export interface TransactionCardProps {
  status: string
  id: string
  packageName: string
  thumbnail: string
  startDate: string
  endDate: string
  updateDate: any
  jumlahJamaah: any
  responTravel: any
  noHeader?: boolean
  noAmountLeft?: boolean
  detailOnly?: boolean
  noLabelNotif?: boolean
  travelName: any
  noFooter?: boolean
  slug: any
  transaction?: any
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
    return <Link href={`/my/transaction/${bookingId}`}>{children}</Link>
  }

  return <div>{children}</div>
}

export default function TransactionCard({
  status,
  id,
  packageName,
  thumbnail,
  startDate,
  endDate,
  updateDate,
  jumlahJamaah,
  responTravel,
  noHeader,
  detailOnly,
  noFooter,
  transaction,
  travelName,
  slug,
}: TransactionCardProps) {
  const { lg } = useTailwindBreakpoint()
  const [orderPayment, setOrderPayment] = useState<any>(null)
  const [orderPaymentLoading, setOrderPaymentLoading] = useState<any>(
    lg ? true : false
  )

  const renderStatusTahapanColor = (status: string) => {
    if (status === 'Kursi Tersedia') {
      return 'bg-success-100 text-success-700'
    } else if (status == 'Kursi Tidak Tersedia' || status === 'Expired') {
      return 'bg-error-100 text-error-700'
    } else {
      return 'bg-[#C8E4F8] text-[#0D4269]'
    }
  }

  const renderStatusTahapanText = (status: string) => {
    return status
  }

  return (
    <div className="mt-6 rounded-3xl border border-neutral-200 ">
      <div
        className={`${!noHeader ? '-mt-5' : ''} overflow-hidden rounded-3xl bg-white shadow-[0px_-5px_4px_0px_#ACACAC1A]`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2 max-lg:block">
            <p className="font-medium max-lg:text-xs">Umroh</p>
            <p className="font-medium max-lg:hidden">/ </p>
            <p className="text-neutral-500 max-lg:hidden">ID : {id}</p>
            <p className="hidden text-neutral-500 max-lg:block max-lg:text-xs">
              Update Terakhir:{' '}
              {dayjs(updateDate).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>
          <div className="flex items-center">
            <p
              className={`text-center ${renderStatusTahapanColor(status)} rounded-full px-3 py-1 text-[11px] max-lg:text-[11px]`}
            >
              {renderStatusTahapanText(status)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-3 lg:gap-4">
          <p className="text-s-regular hidden text-neutral-500 max-lg:block">
            ID : {id}
          </p>
          <div className="flex gap-4 md:col-span-2">
            <div className="h-32 w-32 flex-shrink-0 max-lg:h-20 max-lg:w-20">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="Umroh Package"
                  width={128}
                  height={128}
                  className="block h-full w-full rounded-md object-cover max-lg:hidden"
                />
              ) : (
                <div className="block h-full w-full rounded-md bg-neutral-100 max-lg:hidden" />
              )}
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="Umroh Package"
                  width={60}
                  height={60}
                  className="hidden h-full w-full rounded-md object-cover max-lg:block"
                />
              ) : (
                <div className="hidden h-full w-full rounded-md bg-neutral-100 max-lg:block" />
              )}
            </div>
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
              </div>
            </div>
          </div>
          <TransactionCardPayment
            jumlahJamaah={jumlahJamaah}
            responTravel={responTravel}
          />
          <div className="hidden items-center gap-2 max-lg:flex">
            <Calendar2 className="h-4 w-4 text-neutral-500" />
            <p className="flex items-center text-xs text-neutral-500">
              {dayjs(startDate).locale('id').format('DD MMMM YYYY')}{' '}
              <ArrowIcon size={18} className="mx-2 text-neutral-500" />{' '}
              {dayjs(endDate).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 lg:hidden">
            {/* Jumlah Permintaan */}
            <div className="flex flex-col">
              <p className="text-s-medium mb-1 text-neutral-500">
                Jumlah Permintaan
              </p>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-neutral-500" />
                <p className="text-m-medium text-neutral-900">
                  {jumlahJamaah} Jemaah
                </p>
              </div>
            </div>

            {/* Jumlah Kursi Tersedia */}
            {responTravel !== null && (
              <div className="flex flex-col">
                <p className="text-s-medium mb-1 text-neutral-500">
                  Jumlah Kursi Tersedia
                </p>
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-neutral-500" />
                  <p className="text-m-medium text-neutral-900">
                    {responTravel} Jemaah
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`flex items-center justify-between border-t border-neutral-200 p-4 max-lg:py-2 ${noFooter ? 'max-lg:hidden' : 'max-lg:block'}`}
        >
          <div className="flex items-center gap-2 text-gray-500 max-lg:hidden">
            <p className="text-s-regular text-neutral-500">
              Informasi terakhir diperbarui pada:
            </p>
            <Calendar className="h-4 w-4 text-neutral-500" />
            <p className="text-m-regular text-neutral-500">
              {dayjs(updateDate).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>

          <Fragment>
            <TransactionCardFooter
              // detailOnly={detailOnly}
              status={status}
              transaction={transaction}
              travelName={travelName}
              slug={slug}
            />
          </Fragment>
        </div>
      </div>
    </div>
  )
}
