import { CornerIcon } from '@/components/icons/corner'
import { PACKAGE_TYPE } from '@/constant/env'
import { cn } from '@/lib/utils'

const BadgePromo = ({
  showDiscount,
  variantType,
  className,
  title,
}: {
  showDiscount?: boolean
  variantType?: string
  className?: string
  title?: string
}) => {
  return (
    <div className="absolute top-[4%] -left-[7px] z-10 flex flex-col gap-2.5">
      {showDiscount && (
        <div
          className={cn(
            ' flex h-8 items-center rounded-full rounded-bl-none bg-[#F0143E] py-1 pr-3 pl-2.5 text-nowrap',
            className
          )}
        >
          <div className="text-m-regular text-neutral-0 font-bold -tracking-[0.28px] max-lg:text-xs max-lg:leading-4 max-lg:font-semibold">
            PROMO 🎉
          </div>
          <CornerIcon className="absolute -bottom-[7px] left-0" />
        </div>
      )}
      {variantType === PACKAGE_TYPE.HAJJ_FURODA && (
        <div
          className={cn(
            ' bg-info-500 flex h-8 items-center rounded-full rounded-bl-none py-1 pr-3 pl-2.5 text-nowrap'
          )}
        >
          <div className="text-m-regular text-neutral-0 font-bold -tracking-[0.28px] max-lg:text-xs max-lg:leading-4 max-lg:font-semibold">
            FURODA
          </div>
          <CornerIcon
            className="absolute -bottom-[7px] left-0"
            color="#092B44"
          />
        </div>
      )}
      {title && (
        <div
          className={cn(
            'absolute top-[4%] -left-[7px] z-10 flex h-8 items-center rounded-full rounded-bl-none bg-[#F0143E] py-1 pr-3 pl-2.5 text-nowrap',
            className
          )}
        >
          <div className="text-m-regular text-neutral-0 font-bold -tracking-[0.28px] max-lg:text-xs max-lg:leading-4 max-lg:font-semibold">
            {title}
          </div>
          <CornerIcon className="absolute -bottom-[7px] left-0" />
        </div>
      )}
    </div>
  )
}
export default BadgePromo
