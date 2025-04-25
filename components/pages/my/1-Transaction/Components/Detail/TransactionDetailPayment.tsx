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
import { Fragment, useEffect, useState } from 'react'
import { usePDF } from 'react-to-pdf'

interface TransactionDetailPaymentProps {
  bookingCode: string
  statusTahapan: string
  paymentDetails: {
    label: string
    amount: number | string
    isBank: boolean
  }[]
}

export default function TransactionDetailPayment({
  bookingCode,
  paymentDetails,
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
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (
      bookingCode &&
      statusTahapan !== 'Dibatalkan' &&
      statusTahapan !== 'Waiting'
    )
      fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingCode])

  return (
    <div className="mb-6 px-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-m-semibold">Rincian Pembayaran</h3>
        {statusTahapan !== 'Dibatalkan' && statusTahapan !== 'Waiting' && (
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
      {paymentDetails && paymentDetails.length > 0 && (
        <div className="space-y-2">
          {paymentDetails?.map((item, index) => (
            <div key={index}>
              {item.label === 'divider' ? (
                <Separator />
              ) : (
                <Fragment>
                  {item.isBank ? (
                    <div className="flex justify-between">
                      <span className="text-s-regular text-neutral-500">
                        {item.label}
                      </span>
                      <span className="text-m-semibold">
                        {item.amount === 'bank_transfer'
                          ? 'Bank Transfer'
                          : item.amount}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-s-regular text-neutral-500">
                        {item.label}
                      </span>
                      <span
                        className={`text-m-semibold ${Number(item.amount) < 0 ? 'text-error-500' : ''}`}
                      >
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
