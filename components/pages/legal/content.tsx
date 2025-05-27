import { Legal } from '@/constant/types/LegalProps'
import dayjs from 'dayjs'

export default function ContentLegal({ data }: { data: Legal | undefined }) {
  return (
    <div className="min-h-screen flex-1">
      <h1 className="mb-2 text-2xl font-semibold max-lg:text-xl">
        {data?.title}
      </h1>
      <p className="mb-6 text-sm text-neutral-500 italic max-lg:text-xs">
        Terakhir diperbarui: {dayjs(data?.modifiedAt).format('MMMM YYYY')}
      </p>

      <div
        className="html-content"
        dangerouslySetInnerHTML={{ __html: data?.body || '' }}
      />
    </div>
  )
}
