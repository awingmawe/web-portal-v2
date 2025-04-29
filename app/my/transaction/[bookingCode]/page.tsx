import TransactionDetailContent from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailContent'
import LayoutMy from '@/components/pages/my/Layout'
export default async function TransactionDetailPage({
  params,
  searchParams,
}: any) {
  const awaitedParams = await params
  const awaiteSearchParams = await searchParams

  return (
    <LayoutMy>
      <TransactionDetailContent
        bookingId={awaitedParams.bookingCode}
        statusTahapan={awaiteSearchParams.status}
        isFixedLoading={false}
      ></TransactionDetailContent>
    </LayoutMy>
  )
}
