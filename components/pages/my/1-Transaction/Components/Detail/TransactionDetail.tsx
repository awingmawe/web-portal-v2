import TransactionDetailContent from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailContent'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface TransactionDetailProps {
  open: boolean
  bookingId: string
  statusTahapan: string
  onOpenChange: (open: boolean) => void
}

export function TransactionDetail({
  open,
  bookingId,
  onOpenChange,
}: TransactionDetailProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl gap-0 overflow-hidden rounded-3xl border-0 p-0">
        <DialogTitle className="hidden px-5">Detail Transaksi</DialogTitle>
        <TransactionDetailContent
          bookingId={bookingId}
          isFixedLoading={true}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  )
}
