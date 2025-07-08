import dayjs from 'dayjs'
import 'dayjs/locale/id'

interface TransactionDetaiHeaderProps {
  status: string
  createdDate: string
  totalOffers: any
}

export function TransactionDetailHeader({
  status,
  totalOffers,
  createdDate,
}: TransactionDetaiHeaderProps) {
  const renderStatusColor = () => {
    return 'bg-[#FCF2CF] text-[#CAA10C]'
  }

  const renderStatusText = (status: string) => {
    if (status === 'offers-available') {
      return `${totalOffers} Penawaran akan hangus dalam 12 jam`
    } else {
      const expiredAt = dayjs(createdDate).add(24, 'hour')
      return `Otomatis batal pada ${expiredAt.format('DD MMM YYYY, HH:mm')}`
    }
  }

  return (
    <div className="mb-4 flex items-center justify-center space-x-2 px-4 max-lg:px-3">
      <p
        className={`text-s-medium ${renderStatusColor()} relative z-10 w-[80%] rounded-full px-6 py-2.5 text-center max-lg:py-1.5 max-lg:text-xs`}
      >
        {renderStatusText(status)}
      </p>
    </div>
  )
}
