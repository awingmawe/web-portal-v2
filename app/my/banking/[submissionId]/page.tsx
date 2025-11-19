import { LayoutDetailPembiayaan } from '@/components/pages/my/5-Banking/detail/LayoutDetailPembiayaan'
import LayoutMy from '@/components/pages/my/Layout'
export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ submissionId: string }>
}) {
  const { submissionId } = await params
  return (
    <LayoutMy>
      <LayoutDetailPembiayaan id={Number(submissionId)} />
    </LayoutMy>
  )
}
