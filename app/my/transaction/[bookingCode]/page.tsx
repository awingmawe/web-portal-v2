import TransactionDetailContent from '@/components/pages/my/1-Transaction/Components/Detail/TransactionDetailContent'
import LayoutMy from '@/components/pages/my/Layout'
import { STATUS_BOOKING } from '@/constant/env'
import { cookieNames } from '@/services/common/cookie'
import { getOrderPayment, getTransactionDetail } from '@/services/umrah-service'
import { cookies } from 'next/headers'
export default async function TransactionDetailPage({ params }: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  const awaitedParams = await params
  const dataDetail = await getTransactionDetail(
    awaitedParams.bookingCode,
    token
  )
  let transactionData

  if (
    dataDetail?.status?.slug !== 'canceled-by-user' &&
    dataDetail?.status?.slug !== 'canceled-by-travel' &&
    dataDetail?.status?.slug !== 'expired' &&
    dataDetail?.status?.slug !== 'waiting-approval' &&
    dataDetail?.status?.slug !== STATUS_BOOKING.WAITING_FOR_BILL &&
    dataDetail?.status?.slug !== STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION &&
    dataDetail?.status?.slug !== STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ
  ) {
    transactionData = await getOrderPayment(awaitedParams.bookingCode, token)
  }

  return (
    <LayoutMy>
      <TransactionDetailContent
        bookingId={awaitedParams.bookingCode}
        isFixedLoading={false}
        paymentToken={transactionData?.paymentToken ?? ''}
        paymentLink={transactionData?.paymentLink ?? ''}
        // onOpenChange={() => {}}
      ></TransactionDetailContent>
    </LayoutMy>
  )
}
