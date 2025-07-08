import { Legal } from '@/constant/types/LegalProps'
import dayjs from 'dayjs'
import renderHTML from 'react-render-html'

export default function ContentLegal({ data }: { data: Legal | undefined }) {
  return (
    <div className="min-h-screen flex-1">
      <h1 className="mb-2 text-2xl font-semibold max-lg:text-xl">
        {data?.title}
      </h1>
      <p className="mb-6 text-sm text-neutral-500 italic max-lg:text-xs">
        Terakhir diperbarui: {dayjs(data?.modifiedAt).format('MMMM YYYY')}
      </p>

      <div className="prose prose-img:inline prose-ul:[list-style:inherit] prose-ol:[list-style:inherit] prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs prose-li:[:marker:initial]  break-word min-w-full marker:text-inherit">
        {renderHTML(data?.body || '')}
      </div>
    </div>
  )
}
