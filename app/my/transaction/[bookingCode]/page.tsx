import TransactionDetailContent from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailContent'
import LayoutMy from '@/components/pages/my/Layout'
import { cookieNames } from '@/services/common/cookie'
import { getOrderPayment } from '@/services/umrah-service'
import { cookies } from 'next/headers'
export default async function TransactionDetailPage({ params }: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  const awaitedParams = await params
  const transactionData = await getOrderPayment(
    awaitedParams.bookingCode,
    token
  )

  return (
    <LayoutMy>
      <TransactionDetailContent
        bookingId={awaitedParams.bookingCode}
        isFixedLoading={false}
        paymentToken={transactionData.paymentToken ?? undefined}
        paymentLink={transactionData.paymentLink ?? undefined}
        // onOpenChange={() => {}}
      ></TransactionDetailContent>
    </LayoutMy>
  )
}
