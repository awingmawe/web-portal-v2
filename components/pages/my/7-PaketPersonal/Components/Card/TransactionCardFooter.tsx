/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { TransactionDetail } from '@/components/pages/my/7-PaketPersonal/Components/Detail/TransactionDetail'
import LayoutDrawerDialog from '@/components/pages/umrah-personal/common/LayoutDrawerDialog'
import OfferDetailDialogContent from '@/components/pages/umrah-personal/offer/dialog/DialogDetailOffer'
import { Button } from '@/components/ui/button'
import { useCanceled } from '@/contexts/canceled-package-context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'

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
  transaction,
}: TransactionCardFooter) {
  const { lg } = useTailwindBreakpoint()
  const [openDetailOffer, setOpenDetailOffer] = useState(false)
  const { open, setOpen } = useCanceled()
  const handleExitDetailOffer = () => {
    setOpenDetailOffer(false)
  }
  const { PackagePersonal, ...restTransaction } = transaction || {}
  const transactionData = transaction?.PackagePersonal?.find(
    (item: any) => item.isBooked
  )
  const dataAll = {
    ...transactionData,
    JourneyInformation: restTransaction,
  }

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
          <LayoutDrawerDialog
            trigger={
              <Button
                className="text-s-regular mr-1 px-3 font-medium text-nowrap text-gray-900"
                variant="ghost"
              >
                Lihat Detail Pilihan
              </Button>
            }
            content={
              <OfferDetailDialogContent
                data={dataAll}
                isOpen={openDetailOffer}
                onCancel={handleExitDetailOffer}
              />
            }
            isOpen={openDetailOffer}
            setIsOpen={setOpenDetailOffer}
            footerContent={
              <Link
                href={
                  '/my/transaction?type=upcoming&page=1&query=&status=all&date='
                }
                className="w-[100%]"
              >
                <Button
                  className="w-full flex-1 px-10 py-3"
                  // onClick={handleCheckout}
                >
                  Lihat Transaksi
                  <Image
                    src="/images/arrow-circle-right.svg"
                    width={14}
                    height={14}
                    alt="arrow"
                  />
                </Button>
              </Link>
            }
          />
        ) : // <Link href={`/my`} className=" w-[100%]">
        // <Button
        //   className="text-s-regular mr-1 px-3 font-medium text-nowrap text-gray-900"
        //   variant="ghost"
        //   onClick={() => setOpenDetailOffer(true)}
        // >
        //   Lihat Detail Pilihan
        // </Button>
        // </Link>
        null}
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
        ) : status === 'offer-selected' ? (
          <LayoutDrawerDialog
            trigger={
              <Button
                className="border-primary-500 h-[40px] w-full rounded-full border-2 px-8 py-3 text-nowrap"
                variant="ghost"
              >
                Lihat Detail Pilihan
              </Button>
            }
            content={
              <OfferDetailDialogContent
                data={dataAll}
                isOpen={openDetailOffer}
                onCancel={handleExitDetailOffer}
              />
            }
            isOpen={openDetailOffer}
            setIsOpen={setOpenDetailOffer}
            footerContent={
              <Link
                href={
                  '/my/transaction?type=upcoming&page=1&query=&status=all&date='
                }
                className="w-[100%]"
              >
                <Button
                  className="w-full flex-1 px-10 py-3"
                  // onClick={handleCheckout}
                >
                  Lihat Transaksi
                  <Image
                    src="/images/arrow-circle-right.svg"
                    width={14}
                    height={14}
                    alt="arrow"
                  />
                </Button>
              </Link>
            }
          />
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
      {/* {openDetailOffer && (
        <OfferDetailDialogContent
          data={dataAll}
          isOpen={openDetailOffer}
          onCancel={handleExitDetailOffer}
        />
      )} */}
    </Fragment>
  )
}
