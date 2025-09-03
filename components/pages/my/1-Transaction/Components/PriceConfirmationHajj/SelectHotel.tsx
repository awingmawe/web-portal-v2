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
      <SelectHotel
        className="flex-col"
        variant={isMobile ? 'normal' : 'checkout'}
        totalQty={transaction?.quantity}
        isMobile
        defaultValue={{
          double: transaction?.roomTypeQuantity.double ?? 0,
          triple: transaction?.roomTypeQuantity?.triple ?? 0,
          quad: transaction?.roomTypeQuantity?.quad ?? 0,
        }}
        defaultPackageVariant={transaction?.packageSnapshot?.snapshot}
        defaultPackageVariantId={transaction?.packageVariantId}
        disabled={prebookingLoading}
        onChange={(roomType) => {
          setSelectedRoomType(roomType)
          setShouldRunCheckPre(true)
        }}
      />
    )
  }

  return Object.entries(transaction?.roomInfo).map(
    ([roomType, roomInfo]: [string, any]) => {
      if (!isValidRoomInfo(roomInfo)) return null // Skip if room is null or invalid

      const roomConfig = roomTypeMapping[roomType as RoomTypeString]

      if (!roomConfig) return null

      return (
        <div
          className="flex flex-col items-start justify-between gap-2"
          key={roomType}
        >
          <p className="text-m-medium">Rincian Jemaah</p>
          <div>
            <p className="text-[10px] text-neutral-500">Tipe Kamar</p>
            <p className="mt-0.5 text-[14px] font-medium text-neutral-900 max-lg:text-xs">
              {roomConfig.label}{' '}
              <span className="text-[14px] text-neutral-500 max-lg:block max-lg:text-xs">
                {roomConfig.subLabel}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-neutral-500">Jumlah Jemaah</p>
            <p className="mt-0.5 text-[14px] font-medium text-neutral-900 max-lg:text-xs max-lg:font-medium">
              {roomInfo?.quantity} Jemaah
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-neutral-500">Harga/Jemaah</p>
            <p className="mt-0.5 text-sm font-medium text-neutral-900 max-lg:text-xs max-lg:font-medium">
              {formatCurrency(
                parseInt(roomInfo?.price),
                transaction?.packageSnapshot?.snapshot?.package?.currency
              )}
            </p>
          </div>
        </div>
      )
    }
  )
}

export default TransactionRoomInfo
