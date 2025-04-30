import TransactionDetailContent from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailContent'
import LayoutMy from '@/components/pages/my/Layout'
export default async function TransactionDetailPage({ params }: any) {
  const awaitedParams = await params

  return (
    <LayoutMy>
      <TransactionDetailContent
        bookingId={awaitedParams.bookingCode}
        isFixedLoading={false}
      ></TransactionDetailContent>
    </LayoutMy>
  )
}
