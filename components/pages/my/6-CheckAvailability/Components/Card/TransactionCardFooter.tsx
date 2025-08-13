/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import {
  LOCAL_STORAGE_DETAIL_VARIANT,
  LOCAL_STORAGE_SELECTED_VARIANT,
} from '@/constant/env'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'

export interface TransactionCardFooter {
  detailOnly?: boolean
  id: string
  status: string
  transaction?: any
  travelName: any
  slug: any
}

export default function TransactionCardFooter({
  status,
  id,
  transaction,
  detailOnly,
  travelName,
  slug,
}: TransactionCardFooter) {
  const router = useRouter()
  const renderActionButton = () => {
    return (
      <>
        {status === 'Kursi Tidak Tersedia' && (
          <Link href={'/search'}>
            <Button
              variant="outline"
              className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
            >
              Cari Paket Lain
            </Button>
          </Link>
        )}
        {status === 'Kursi Tersedia' && (
          // <Link href={`/umrah/${travelName}/${slug}`}>
          <Button
            className="mt-2 w-full px-4 py-3 text-nowrap"
            onClick={checkoutKursi}
          >
            Checkout
          </Button>
          //</Link>
        )}
      </>
    )
  }
  const checkoutKursi = () => {
    const dataSelectedVariant = {
      roomType: {
        double: 0,
        triple: 0,
        quad: 0,
      },
      variantId: transaction.packageVariant,
      netAmount: transaction.packageVariants.package.dpAmount,
      name: transaction.packageVariants.name,
      variant: transaction.packageVariants,
    }

    localStorage.setItem(
      LOCAL_STORAGE_DETAIL_VARIANT,
      JSON.stringify(transaction.packageVariants)
    )

    localStorage.setItem(
      LOCAL_STORAGE_SELECTED_VARIANT,
      JSON.stringify(dataSelectedVariant)
    )

    router.push('/checkout')
  }

  return (
    <Fragment>
      <div className="flex items-center gap-2 max-lg:hidden">
        <Link href={`/umrah/${travelName}/${slug}`}>
          <Button
            className="text-s-regular mr-1 px-3 font-medium text-nowrap text-gray-900"
            variant="ghost"
            // onClick={() => setOpen(true)}
          >
            Lihat Detail Paket
          </Button>
        </Link>
        {status === 'Kursi Tidak Tersedia' && (
          <Link href={'/search'}>
            <Button
              variant="outline"
              className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
            >
              Cari Paket Lain
            </Button>
          </Link>
        )}
        {status === 'Kursi Tersedia' && (
          // <Link href={`/umrah/${travelName}/${slug}`}>
          <Button
            className="w-full px-4 py-3 text-nowrap"
            onClick={checkoutKursi}
          >
            Checkout
          </Button>
          // </Link>
        )}

        {/* {renderCancelAction()} */}
      </div>
      <div className="hidden max-lg:block">
        <Fragment>{renderActionButton()}</Fragment>
      </div>
    </Fragment>
  )
}
