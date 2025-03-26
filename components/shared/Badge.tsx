import { CornerIcon } from '@/components/icons/corner'

const BadgePromo = ({ title }: { title: string }) => (
  <div className="absolute top-[4%] -left-[7px] z-10 flex h-8 items-center rounded-full rounded-bl-none bg-[#F0143E] py-1 pr-2 pl-2.5">
    <div className="text-m-regular text-neutral-0 font-bold -tracking-[0.28px]">
      {title}
    </div>
    <CornerIcon className="absolute -bottom-[7px] left-0" />
  </div>
)

export default BadgePromo
