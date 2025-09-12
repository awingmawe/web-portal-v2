'use client'

import CardNotification from '@/components/shared/Notification/CardNotification'
import { Category } from '@/constant/types/NotificationProps'
import { useTopbarNotification } from '@/hooks/common/useTopbarNotification'
import { isEmpty } from '@/lib/utils'
import Link from 'next/link'

interface NotificationComponentProps {
  token: string
  //ini untuk dari pathname my/notifiakasi
  fromMy: boolean
  mobile?: boolean
  setCountBadge?: React.Dispatch<React.SetStateAction<number>>
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  token,
  fromMy,
  mobile,
  setCountBadge,
}) => {
  // Traditional pagination hook (for fromMy and dropdown)
  const {
    categories,

    notifications,
  } = useTopbarNotification({ token })

  return (
    <div className={`p-4 max-lg:mt-10`}>
      {/* Header */}

      <div
        className={`${fromMy ? 'heading-3-medium' : 'text-l-semibold '} mb-3 text-neutral-800 max-lg:hidden`}
      >
        Notifikasi
        {fromMy && (
          <p className="text-l-regular text-left text-neutral-800 max-lg:hidden">
            Dapatkan informasi terbaru anda disini!
          </p>
        )}
      </div>

      {!fromMy && (
        <div className="mb-4 flex justify-between">
          {categories.map((category: Category, index: number) => (
            <Link href={category.href} key={index}>
              <div className="relative flex h-15 w-15 flex-col items-center gap-2">
                <span className="absolute -top-2 -right-0.5 z-10 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#B3261E] text-xs font-medium text-white">
                  {category.count > 99 ? '99+' : category.count}
                </span>
                <div className="flex h-10 w-10 items-center justify-center">
                  {category.icon}
                </div>
                <span className="text-m-regular text-center leading-tight text-neutral-900">
                  {category.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!fromMy && <div className="mb-1 h-0.5 w-full bg-neutral-100" />}
      <CardNotification
        token={token}
        fromMy={fromMy}
        mobile={mobile}
        setCountBadge={setCountBadge}
      />

      {!isEmpty(notifications) && !fromMy && !mobile && (
        <Link href={'/my/notification'}>
          <div className={`max-lg:mt-5 max-lg:mb-0`}>
            <button className="text-m-medium w-full cursor-pointer py-1 text-center text-neutral-900">
              Lihat Selengkapnya
            </button>
          </div>
        </Link>
      )}
    </div>
  )
}

export default NotificationComponent
