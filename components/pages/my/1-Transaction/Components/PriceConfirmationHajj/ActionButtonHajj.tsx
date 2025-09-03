import { InfoIcon } from '@/components/icons/info'
import { MessageQuestionIcon } from '@/components/icons/message-question'
import { TimerIcon } from '@/components/icons/timer'
import PriceBreakdown from '@/components/pages/my/1-Transaction/Components/PriceConfirmationHajj/PriceBreakdown'
import TransactionRoomInfo from '@/components/pages/my/1-Transaction/Components/PriceConfirmationHajj/SelectHotel'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import { PaymentDetails } from '@/constant/types/CheckoutProps'
import { formatCurrency } from '@/lib/utils'
import dayjs from 'dayjs'
import React from 'react'

type RoomTypeString = 'double' | 'triple' | 'quad'

const TransactionActionButtonHajj = ({
  transaction,
  handleDirectPayment,
}: {
  transaction: any
  handleDirectPayment: () => void
}) => {
  const roomTypeMapping: Record<
    RoomTypeString,
    { label: string; type: string; subLabel: string }
  > = {
    double: {
      label: 'Double',
      subLabel: '(1 Kamar Berdua)',
      type: 'Double',
    },
    triple: {
      label: 'Triple ',
      subLabel: '(1 Kamar Bertiga)',
      type: 'Triple',
    },
    quad: {
      label: 'Quad ',
      subLabel: '(1 Kamar Berempat)',
      type: 'Quad',
    },
  }
  const [isOpenTransaction, setIsOpenTransaction] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)

  return (
    <LayoutDrawerDialog
      hideCloseButton={false}
      isOpen={isOpenTransaction}
      setIsOpen={setIsOpenTransaction}
      trigger={
        <Button className="border-primary-500 w-full border-2 max-lg:py-2">
          <span className="font-medium">Bayar</span>
        </Button>
      }
      title={
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 lg:hidden">
            <span className="text-s-regular block text-neutral-500 ">
              Bayar Sebelum
            </span>
            <span className="text-s-regular text-warning-600 flex items-center">
              <TimerIcon className="mr-1" size={16} />
              {dayjs(transaction?.createdAt)
                .add(1, 'day')
                .locale('id')
                .format('DD MMM YYYY HH:mm')}
            </span>
          </div>
          <div className="flex items-center gap-6 max-lg:gap-3">
            <div className="bg-warning-100 flex rounded-lg p-2.5 max-lg:p-1">
              <MessageQuestionIcon
                size={36}
                className="max-lg:h-3 max-lg:w-3"
              />
            </div>
            <p className="heading-3-semibold max-lg:text-sm max-lg:leading-[20px] max-lg:font-semibold">
              Konfirmasi Pembayaran Haji
            </p>
          </div>
        </div>
      }
      content={
        <div className="scrollbar-hide flex max-h-[70vh] flex-col gap-5 lg:overflow-y-auto">
          <div
            className={`bg-warning-100  flex items-center justify-between rounded-lg px-3 py-2 max-lg:hidden`}
          >
            <p className="text-s-regular text-warning-700 flex items-center">
              <InfoIcon className="text-warning-700 mr-2" size={16} />
              Kurs Travel
              <strong className="text-warning-700 ml-1">
                {
                  transaction?.packageSnapshot?.snapshot.package
                    .organizationInstance.name
                }
              </strong>
            </p>
            <p className="text-m-semibold">
              1 USD = {formatCurrency(transaction?.bookingExchange?.value)}
            </p>
          </div>
          <div className="flex justify-between lg:gap-5">
            <div className="flex-1">
              <TransactionRoomInfo
                transaction={transaction}
                isEditable={isEditing}
                roomTypeMapping={roomTypeMapping}
                setShouldRunCheckPre={() => {}}
                setSelectedRoomType={() => {}}
                prebookingLoading={false}
              />
            </div>
            <PriceBreakdown
              paymentDetails={transaction?.paymentDetails as PaymentDetails[]}
              currency={
                transaction?.packageSnapshot?.snapshot?.package.currency ||
                'IDR'
              }
              organizationName={
                transaction?.packageSnapshot?.snapshot.package
                  .organizationInstance.name || ''
              }
              value={transaction?.bookingExchange?.value || 0}
            />
          </div>
        </div>
      }
      footerContent={
        <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
          <Button
            variant="ghost"
            className="px-10 py-3 max-lg:w-full"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? 'BatalkanPerubahan' : 'Ubah Pesanan'}
          </Button>
          <Button
            variant="default"
            className="px-10 py-3 max-lg:w-full"
            onClick={handleDirectPayment}
          >
            {isEditing ? 'Simpan & Bayar' : 'Bayar'}
          </Button>
        </div>
      }
    />
  )
}

export default TransactionActionButtonHajj
