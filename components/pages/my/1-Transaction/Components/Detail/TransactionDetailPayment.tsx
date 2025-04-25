'use client'
import { DocumentTextIcon } from '@/components/icons/document'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/sonner'
import { formatCurrency } from '@/lib/utils'
import { getInvoiceTranasction } from '@/services/umrah-service'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ChevronRight, DownloadIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePDF } from 'react-to-pdf'

interface TransactionDetailPaymentProps {
  totalJemaah: string
  bookingCode: string
  totalPayment: number
  remainigPayment: number
  statusTahapan: string
}

export default function TransactionDetailPayment({
  bookingCode,
  totalJemaah,
  remainigPayment,
  totalPayment,
  statusTahapan,
}: TransactionDetailPaymentProps) {
  const [printData, setPrintData] = useState<string>()
  const { toPDF, targetRef } = usePDF({
    filename: `Invoice-${bookingCode}.pdf`,
    page: {
      format: [130, 225],
    },
  })

  async function fetchData() {
    try {
      const response = await getInvoiceTranasction(bookingCode)
      setPrintData(response)
      console.log('response', response)
      console.log(printData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (bookingCode && statusTahapan !== 'Dibatalkan') fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingCode])

  return (
    <div className="mb-6 px-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-m-semibold">Rincian Pembayaran</h3>
        {statusTahapan !== 'Dibatalkan' && (
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex cursor-pointer items-center">
                <div
                  className="mr-2 rounded-md p-1"
                  style={{
                    background:
                      'linear-gradient(134.15deg, #FFC100 17.72%, #FFA500 104.07%, #9D7A42 128.84%, #4D2B17 195.91%, #785214 236.89%)',
                  }}
                >
                  <DocumentTextIcon className="text-white" />
                </div>
                <span className="text-m-semibold">Invoice Pembayaran</span>
                <ChevronRight className="ml-1 h-5 w-5" />
              </div>
            </DialogTrigger>
            <DialogContent className="block h-[90vh] min-w-fit">
              <DialogTitle asChild>
                <div className="flex justify-between !px-5 !pt-5">
                  <Button onClick={() => toPDF()} className="!px-5">
                    <DownloadIcon className="h-4 w-4" /> Download
                  </Button>
                  <DialogClose asChild>
                    <button className="cursor-pointer">
                      <X />
                    </button>
                  </DialogClose>
                </div>
              </DialogTitle>
              {printData ? (
                <div className="h-full overflow-auto" ref={targetRef}>
                  <div dangerouslySetInnerHTML={{ __html: printData }}></div>
                </div>
              ) : (
                <div className="grid h-full place-content-center">
                  <svg
                    className="h-8 w-8 animate-spin text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </div>
              )}
              {/* Add content for the dialog here */}
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* <div className="mb-4 flex items-center rounded-lg bg-emerald-50 p-4">
      <Check className="mr-2 h-5 w-5 text-emerald-500" />
      <span className="text-emerald-700">
        Lunas pada 10 Jan 2024, 15:00
      </span>
    </div> */}

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-s-regular text-neutral-500">
            Metode Pembayaran
          </span>
          <span className="text-m-regular text-neutral-900">
            BCA Virtual Account
          </span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-s-regular text-neutral-500">
            Total Harga Paket ({totalJemaah} Jemaah)
          </span>
          <span className="text-m-semibold">
            {formatCurrency(totalPayment)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-s-regular text-neutral-500">Diskon</span>
          <span className="text-m-semibold text-error-500">-Rp1.000.000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-s-regular text-neutral-500">
            Diskon Agen (10%)
          </span>
          <span className="text-m-semibold text-error-500">- Rp1.000.000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-s-regular text-neutral-500">Uang muka</span>
          <span className="text-m-semibold text-error-500">- Rp15.000.000</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-s-regular text-neutral-500">
            Sisa Pelunasan
          </span>
          <span className="text-l-semibold">
            {formatCurrency(remainigPayment)}
          </span>
        </div>
      </div>
    </div>
  )
}
