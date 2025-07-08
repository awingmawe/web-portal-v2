import TransactionDetailContent from '@/components/pages/my/7-PaketPersonal/Components/Detail/TransactionDetailContent'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface TransactionDetailProps {
  open: boolean
  bookingId: string
  statusTahapan: string
  onOpenChange: (open: boolean) => void
  setOpenBatalkan?: any
}

export function TransactionDetail({
  open,
  bookingId,
  onOpenChange,
  setOpenBatalkan,
}: TransactionDetailProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl gap-0 overflow-hidden rounded-3xl border-0 p-0">
        <DialogTitle
          className="border-b border-neutral-100 px-6 py-5 max-lg:hidden"
          asChild
        >
          <div className="flex items-center justify-between">
            <span>Detail Paket Personal</span>
            <DialogClose>
              <X />
            </DialogClose>
          </div>
        </DialogTitle>
        <TransactionDetailContent
          bookingId={bookingId}
          isFixedLoading={true}
          onOpenChange={onOpenChange}
          setOpenBatalkan={setOpenBatalkan}
        />
      </DialogContent>
    </Dialog>
  )
}
