import dayjs from 'dayjs'

export interface TransactionCardHeader {
  status: string
  totalOffers?: any
  createdDate?: any
  offersAboutToExpire?: any
}

export default function TransactionCardHeader({
  status,
  totalOffers,
  createdDate,
  offersAboutToExpire,
}: TransactionCardHeader) {
  const renderStatusColor = () => {
    return 'bg-[#FCF2CF] text-[#CAA10C]'
  }

  const renderStatusText = (status: string) => {
    if (status === 'offers-available' && offersAboutToExpire > 0) {
      return `${totalOffers} Penawaran akan hangus dalam 12 jam`
    } else {
      const expiredAt = dayjs(createdDate).add(24, 'hour')
      return `Otomatis batal pada ${expiredAt.format('DD MMM YYYY, HH:mm')}`
    }
  }

  return (
    <div
      className={`rounded-t-3xl px-4 pt-4 pb-8 max-lg:px-3  ${renderStatusColor()}`}
    >
      <h3 className="text-l-medium leading-[16px] text-inherit max-lg:text-xs">
        {renderStatusText(status)}
      </h3>
    </div>
  )
}
