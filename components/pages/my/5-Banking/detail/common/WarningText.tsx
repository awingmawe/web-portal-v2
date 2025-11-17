import {
  STATUS_CONFIG,
  ViewStatus,
} from '@/components/pages/my/5-Banking/constants'

const WarningTextDetail = ({
  status,
  expiredDate,
}: {
  status: ViewStatus
  expiredDate?: string | null
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['ongoing']
  const text = config?.warningText?.(expiredDate || null)

  if (config.warningText === undefined) return null

  return (
    <div
      className={`flex flex-col items-center gap-2.5 rounded-[20px] p-2.5 max-lg:flex-row ${config.classNameWarning}`}
    >
      <div className="rounded-full bg-white p-2.5">{config.iconWarning}</div>
      <p className="text-m-medium max-lg:text-xs max-lg:leading-4 max-lg:font-normal lg:text-center">
        {text}
      </p>
    </div>
  )
}

export default WarningTextDetail
