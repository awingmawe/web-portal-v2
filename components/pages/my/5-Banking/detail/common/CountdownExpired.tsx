'use client'

import { ViewCta } from '@/components/pages/my/5-Banking/constants'
import useCountdown from '@/hooks/umrah-personal/offer/useCountdown'

const CountdownExpired = ({
  expiredDate,
  status,
}: {
  expiredDate: string
  status: ViewCta
}) => {
  const timeLeft = useCountdown(expiredDate)
  const formatTime = (time: number): string => {
    return time.toString().padStart(2, '0')
  }
  const dontShowCountdown =
    !expiredDate ||
    !timeLeft ||
    (status !== 'ready-to-checkout' && status !== 'waiting-payment')
  if (dontShowCountdown) return null

  return (
    <div className="bg-info-100 flex justify-between gap-1 rounded-xl px-4 py-2 text-white max-lg:w-full max-lg:justify-evenly">
      <div className="flex flex-col items-center">
        <p className="text-s-semibold text-info-500">
          {formatTime(timeLeft.days)}
        </p>
        <p className="text-xs-regular text-info-500">hari</p>
      </div>
      <span className="text-s-regular self-center">:</span>
      <div className="flex flex-col items-center">
        <p className="text-s-semibold text-info-500">
          {formatTime(timeLeft.hours)}
        </p>
        <p className="text-xs-regular text-info-500">jam</p>
      </div>
      <span className="text-s-regular self-center">:</span>
      <div className="flex flex-col items-center">
        <p className="text-s-semibold text-info-500">
          {formatTime(timeLeft.minutes)}
        </p>
        <p className="text-xs-regular text-info-500">menit</p>
      </div>
      <span className="text-s-regular self-center">:</span>
      <div className="flex flex-col items-center">
        <p className="text-s-semibold text-info-500">
          {formatTime(timeLeft.seconds)}
        </p>
        <p className="text-xs-regular text-info-500">detik</p>
      </div>
    </div>
  )
}

export default CountdownExpired
