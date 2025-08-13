import LayoutDrawerDialog from '@/components/pages/umrah-personal/common/LayoutDrawerDialog'
import OfferDetailDialogContent from '@/components/pages/umrah-personal/offer/dialog/DialogDetailOffer'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

/* eslint-disable @typescript-eslint/no-unused-vars */
export const TransactionDetailMobileAction = ({
  transaction,
}: {
  transaction?: any
}) => {
  const [openDetailOffer, setOpenDetailOffer] = useState(false)
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
    <div className="hidden max-lg:block">
      {transaction.status === 'offers-available' ||
      transaction.status === 'waiting-payment' ? (
        <div className="fixed right-0 bottom-0 left-0 z-50 flex  h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
          <Link
            href={`/umrah-personal/offer/${transaction.id}`}
            className=" w-[100%]"
          >
            <Button
              className="border-primary-500 w-full border-2 px-8 py-3 text-nowrap"
              variant="default"
            >
              Lihat Penawaran
            </Button>
          </Link>
        </div>
      ) : transaction.status === 'no-offers' ||
        transaction.status === 'offer-expired' ||
        transaction.status === 'canceled' ? (
        <div className="fixed right-0 bottom-0 left-0 z-50 flex  h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
          <Link href={`/umrah-personal/landing`} className=" w-[100%]">
            <Button
              className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
              variant="default"
            >
              Buat Paket Baru
            </Button>
          </Link>
        </div>
      ) : transaction.status === 'offer-selected' ? (
        <div className="fixed right-0 bottom-0 left-0 z-50 flex  h-16 items-center gap-2 bg-white px-2 shadow-[0px_-4px_24px_0px_#0000001A]">
          <LayoutDrawerDialog
            trigger={
              <Button
                className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
                variant="default"
              >
                Lihat Detail Pilihan
              </Button>
            }
            title={<></>}
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
                href={`/my/transaction/${dataAll.bookingId}`}
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
        </div>
      ) : // <Button variant="default">Lihat Detail Pilihan</Button>
      null}
    </div>
  )
}
