import { DocumentTextIcon } from '@/components/icons/document'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/utils'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ChevronRight, X } from 'lucide-react'

interface TransactionDetailPaymentProps {
  totalJemaah: string
  bookingCode: string
  totalPayment: number
  remainigPayment: number
}

export default function TransactionDetailPayment({
  bookingCode,
  totalJemaah,
  remainigPayment,
  totalPayment,
}: TransactionDetailPaymentProps) {
  return (
    <div className="mb-6 px-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-m-semibold">Rincian Pembayaran</h3>
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
          <DialogContent className="block h-[90vh] min-w-[90vw]">
            <DialogTitle asChild>
              <div className="text-right">
                <DialogClose asChild>
                  <button className="cursor-pointer">
                    <X />
                  </button>
                </DialogClose>
              </div>
            </DialogTitle>
            <div className="h-full overflow-hidden p-10">
              <iframe
                src={`/invoice-transaction/${bookingCode}?noBack=true`}
                frameBorder="0"
                className="h-full w-full overflow-hidden"
              ></iframe>
            </div>
            {/* Add content for the dialog here */}
          </DialogContent>
        </Dialog>
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
