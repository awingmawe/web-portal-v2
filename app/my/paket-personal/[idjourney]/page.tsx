import TransactionDetailContent from '@/components/pages/my/7-PaketPersonal/Components/Detail/TransactionDetailContent'
import LayoutMy from '@/components/pages/my/Layout'
export default async function TransactionDetailPage({ params }: any) {
  const awaitedParams = await params
  return (
    <LayoutMy>
      <TransactionDetailContent
        bookingId={awaitedParams.idjourney}
        isFixedLoading={false}
        // onOpenChange={() => {}}
      ></TransactionDetailContent>
    </LayoutMy>
  )
}
