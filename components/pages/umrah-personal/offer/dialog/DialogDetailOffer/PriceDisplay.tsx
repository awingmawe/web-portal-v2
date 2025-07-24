import { formatCurrency } from '@/lib/utils'

const PriceDisplay = ({
  price,
  roomType,
}: {
  price: string
  roomType: string
}) => {
  const notes =
    roomType === 'double'
      ? '1 Kamar Berdua'
      : roomType === 'triple'
        ? '1 Kamar Bertiga'
        : '1 Kamar Berempat'

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-xs-regular text-neutral-500">Tipe Kamar</p>
        <p className="text-m-regular capitalize">
          {roomType} <span className="text-neutral-500">({notes})</span>
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-xs-regular text-neutral-500">Harga/jemaah</p>
        <p className="text-m-regular text-neutral-900">
          {formatCurrency(price)}
        </p>
      </div>
    </div>
  )
}

export default PriceDisplay
