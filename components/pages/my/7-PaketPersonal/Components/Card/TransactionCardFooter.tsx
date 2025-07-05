/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { TransactionDetail } from '@/components/pages/my/7-PaketPersonal/Components/Detail/TransactionDetail'
import { Button } from '@/components/ui/button'
import { useCanceled } from '@/contexts/canceled-package-context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { Fragment } from 'react'

export interface TransactionCardFooter {
  detailOnly?: boolean

  status: string

  fetchTransactions?: any
  transaction?: any
}

export default function TransactionCardFooter({
  detailOnly,
  status,
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
          Lihat Detail Pesanan
        </Button>
      </div>

      {open && (
        <TransactionDetail
          open={open}
          onOpenChange={setOpen}
          bookingId={'1'}
          statusTahapan={'statusTahapanDetail'}
        />
      )}
    </Fragment>
  )
}
