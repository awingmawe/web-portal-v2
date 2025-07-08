import { TickCircleIcon } from '@/components/icons/tick-circle'
import { cn, isEmpty } from '@/lib/utils'
import { X } from 'lucide-react'

const LayoutPerItem = ({
  icon,
  titleItem,
  children,
  isAvailable,
}: {
  icon?: React.ReactNode
  titleItem: string
  children: React.ReactNode
  isAvailable?: boolean
}) => {
  return (
    <div className="rounded-2xl border-1 border-neutral-100 bg-[#F7F7F7]">
      {/* Header Item */}
      <div className="flex justify-between rounded-2xl border-b-1 border-b-neutral-100 bg-white px-3 py-4">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-m-regular text-neutral-500">{titleItem}</p>
        </div>
        {!isEmpty(isAvailable) && (
          <div
            className={cn(
              `flex items-center gap-1.5 rounded-full px-2 py-1`,
              isAvailable
                ? 'bg-success-100 text-success-700'
                : 'bg-error-100 text-error-700'
            )}
          >
            {isAvailable ? (
              <TickCircleIcon size={18} color="#00704E" />
            ) : (
              <X
                size={18}
                className="bg-error-700 rounded-full p-1"
                color="white"
              />
            )}
            <p className="text-s-regular text-inherit">
              {isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
            </p>
          </div>
        )}
      </div>
      {/* Content Item */}
      <div className="flex flex-col gap-2 p-4 pt-2">{children}</div>
    </div>
  )
}

export default LayoutPerItem
