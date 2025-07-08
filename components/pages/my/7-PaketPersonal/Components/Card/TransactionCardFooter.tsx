/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { TransactionDetail } from '@/components/pages/my/7-PaketPersonal/Components/Detail/TransactionDetail'
import { Button } from '@/components/ui/button'
import { useCanceled } from '@/contexts/canceled-package-context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Link from 'next/link'
import { Fragment } from 'react'

export interface TransactionCardFooter {
  detailOnly?: boolean

  status: string
  idJourney?: any
  fetchTransactions?: any
  transaction?: any
}

export default function TransactionCardFooter({
  detailOnly,
  status,
  idJourney,
}: TransactionCardFooter) {
  const { lg } = useTailwindBreakpoint()

  const { open, setOpen } = useCanceled()

  return (
    <Fragment>
      <div className="flex items-center gap-2 max-lg:hidden">
        <Button
          className="text-s-regular mr-1 px-3 font-medium text-nowrap text-gray-900"
          variant="ghost"
          onClick={() => setOpen(true)}
        >
          Lihat Detail Permintaan
        </Button>
        {status === 'offers-available' ? (
          <Link
            href={`/umrah-personal/offer/${idJourney}`}
            className=" w-[100%]"
          >
            <Button
              className="border-primary-500 w-full border-2 px-8 py-3 text-nowrap"
              variant="default"
            >
              Lihat Penawaran
            </Button>
          </Link>
        ) : status === 'no-offers' ||
          status === 'offer-expired' ||
          status === 'canceled' ? (
          <Link href={`/umrah-personal/landing`} className=" w-[100%]">
            <Button
              className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
              variant="ghost"
            >
              Buat Paket Baru
            </Button>
          </Link>
        ) : status === 'offer-selected' ? (
          <Link href={`/my`} className=" w-[100%]">
            <Button
              className="text-s-regular mr-1 px-3 font-medium text-nowrap text-gray-900"
              variant="ghost"
              onClick={() => setOpen(true)}
            >
              Lihat Detail Pilihan
            </Button>
          </Link>
        ) : null}
      </div>
      <div className="hidden max-lg:block">
        {status === 'offers-available' ? (
          <div className="flex items-center justify-between">
            {lg ? (
              <Link
                href={`/umrah-personal/offer/${idJourney}`}
                className=" w-[100%]"
              >
                <Button
                  className="text-s-regular mr-1 h-[40px] w-full px-3 font-medium text-nowrap text-gray-900"
                  variant="default"
                >
                  Lihat Penawaran
                </Button>
              </Link>
            ) : null}
          </div>
        ) : status === 'no-offers' ||
          status === 'offer-expired' ||
          status === 'canceled' ? (
          <div className="flex items-center justify-between">
            {lg ? (
              <Link href={`/umrah-personal/landing`} className=" w-[100%]">
                <Button
                  className="border-primary-500 h-[40px] w-full rounded-full border-2 px-8 py-3 text-nowrap"
                  variant="ghost"
                >
                  Buat Paket Baru
                </Button>
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>

      {open && (
        <TransactionDetail
          open={open}
          onOpenChange={setOpen}
          bookingId={idJourney}
          statusTahapan={'statusTahapanDetail'}
        />
      )}
    </Fragment>
  )
}
