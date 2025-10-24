import { cn } from '@/lib/utils'

const ItemsInformation = ({
  icon,
  title,
  value,
}: {
  icon?: React.ReactNode
  title: string
  value: string | React.ReactNode
}) => {
  return (
    <div className={cn('m-0 flex items-center gap-3 max-sm:col-span-12')}>
      {icon}
      <div className="flex flex-col">
        <p className="text-s-medium text-neutral-500">{title}</p>
        {typeof value === 'string' ? (
          <p className="text-m-regular ">{value}</p>
        ) : (
          <>{value}</>
        )}
      </div>
    </div>
  )
}

export default ItemsInformation
