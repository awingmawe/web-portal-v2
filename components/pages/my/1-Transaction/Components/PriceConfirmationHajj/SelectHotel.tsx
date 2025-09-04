import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import { RoomType } from '@/contexts/package-variant-context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { formatCurrency } from '@/lib/utils'

type RoomTypeString = 'double' | 'triple' | 'quad'

interface TransactionRoomInfoProps {
  // Transaction Data
  transaction: any

  // Package Data
  prebookingLoading: boolean

  // Setter Function
  setSelectedRoomType: (roomType: RoomType) => void
  setShouldRunCheckPre: (shouldRunCheckPre: boolean) => void

  // Other
  roomTypeMapping: Record<
    RoomTypeString,
    { label: string; type: string; subLabel: string }
  >
  isEditable?: boolean
}

const TransactionRoomInfo: React.FC<TransactionRoomInfoProps> = ({
  // Transaction Data
  transaction,

  // Package Data
  prebookingLoading,

  // Setter Function
  setSelectedRoomType,
  setShouldRunCheckPre,

  // Other
  roomTypeMapping,
  isEditable = false,
}) => {
  const isValidRoomInfo = (roomInfo: any): boolean => {
    return roomInfo && roomInfo.quantity && roomInfo.price
  }

  const { lg: isMobile } = useTailwindBreakpoint()

  if (isEditable) {
    return (
      <div className="flex w-full flex-col gap-2">
        <SelectHotel
          className="flex-col"
          titleText="Ubah Jumlah Jemaah"
          variant={isMobile ? 'normal' : 'checkout'}
          isMobile
          defaultValue={transaction?.roomTypeQuantity}
          defaultPackageVariant={transaction?.packageSnapshot?.snapshot}
          defaultPackageVariantId={transaction?.packageVariantId}
          disabled={prebookingLoading}
          onChange={(roomType) => {
            setSelectedRoomType(roomType)
            setShouldRunCheckPre(true)
          }}
        />
      </div>
    )
  }

  return Object?.entries(transaction?.roomInfo).map(
    ([roomType, roomInfo]: [string, any]) => {
      if (!isValidRoomInfo(roomInfo)) return null // Skip if room is null or invalid

      const roomConfig = roomTypeMapping[roomType as RoomTypeString]

      if (!roomConfig) return null

      return (
        <div
          className="flex w-full flex-col items-start justify-between gap-2"
          key={roomType}
        >
          <p className="text-m-medium">Rincian Jemaah</p>
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <p className="text-xs-regular text-neutral-500">Tipe Kamar</p>
              <p className="text-s-regular text-neutral-900">
                {roomConfig.label}
              </p>
              <p className="text-s-regular text-neutral-500">
                {roomConfig.subLabel}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs-regular text-neutral-500">Harga/Jemaah</p>
              <p className="text-s-regular text-neutral-900">
                {roomInfo?.quantity} Jemaah x{' '}
                {formatCurrency(
                  parseInt(roomInfo?.price),
                  transaction?.packageSnapshot?.snapshot?.package?.currency
                )}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="text-xs-regular text-neutral-500">Total Jemaah</p>
            <p className="text-s-medium text-neutral-900">
              {transaction?.quantity} Jemaah
            </p>
          </div>
        </div>
      )
    }
  )
}

export default TransactionRoomInfo
