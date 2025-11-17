import { LayoutDetailPembiayaan } from '@/components/pages/my/5-Banking/detail/LayoutDetailPembiayaan'
import LayoutMy from '@/components/pages/my/Layout'
import { submissionPembiayaanDetail } from '@/services/banking-service'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ submissionId: string }>
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  const { submissionId } = await params

  const dataDetail = await submissionPembiayaanDetail(
    Number(submissionId),
    token
  )
  return (
    <LayoutMy>
      <LayoutDetailPembiayaan detail={dataDetail.data} />
    </LayoutMy>
  )
}
