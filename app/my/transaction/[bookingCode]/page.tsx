import TransactionDetailContent from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailContent'
import LayoutMy from '@/components/pages/my/Layout'
export default function TransactionDetailPage({ params }: any) {
  return (
    <LayoutMy>
      <TransactionDetailContent
        bookingId={params.bookingCode}
        statusTahapan={'Akan Datang'}
        isFixedLoading={false}
      ></TransactionDetailContent>
    </LayoutMy>
  )
}
