import { InfoIcon } from '@/components/icons/info'
import { MessageQuestionIcon } from '@/components/icons/message-question'
import { TimerIcon } from '@/components/icons/timer'
import PriceBreakdown from '@/components/pages/my/1-Transaction/Components/PriceConfirmationHajj/PriceBreakdown'
import TransactionRoomInfo from '@/components/pages/my/1-Transaction/Components/PriceConfirmationHajj/SelectHotel'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import { PaymentDetails } from '@/constant/types/CheckoutProps'
import { RoomType } from '@/contexts/package-variant-context'
import { formatCurrency } from '@/lib/utils'
import { createHajj, preBookingCreateHajj } from '@/services/umrah-service'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'

type RoomTypeString = 'double' | 'triple' | 'quad'

const TransactionActionButtonHajj = ({
  transaction,
  textTitle = 'Bayar',
}: {
  transaction: any
  textTitle?: string
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
  const [selectedRoomType, setSelectedRoomType] = React.useState<RoomType>(
    transaction?.roomTypeQuantity
  )
  const [paymentDetails, setPaymentDetails] = React.useState<PaymentDetails[]>(
    []
  )
  const [transactionNew, setTransactionNew] = React.useState<any>(transaction)
  const [isPrebookingLoading, setPreBookingLoading] = React.useState(false)

  const bayarDpHajj = async () => {
    setPreBookingLoading(true)
    try {
      const response = await createHajj({
        bookingId: transaction?.id,
        double: selectedRoomType?.double || 0,
        triple: selectedRoomType?.triple || 0,
        quad: selectedRoomType?.quad || 0,
      })

      if (response?.order?.paymentToken) {
        document.body.style.pointerEvents = 'auto'
        window.snap.pay(response?.order?.paymentToken, {
          onSuccess: async (result: any) => {
            console.log(result)
            window.location.reload()
          },
          onPending: async (result: any) => {
            console.log('Payment pending', result)
            window.location.reload()
          },
          onError: (error: any) => {
            console.log(error)
            setPreBookingLoading(false)
          },
          onClose: () => {
            setPreBookingLoading(false)
            window.location.reload()
          },
        })
      }
    } catch (e) {
      setPreBookingLoading(false)
      console.log(e)
    }
  }

  const checkPre = React.useCallback(async () => {
    setPreBookingLoading(true)
    try {
      const response = await preBookingCreateHajj({
        bookingId: transaction?.id,
        double: selectedRoomType?.double || 0,
        triple: selectedRoomType?.triple || 0,
        quad: selectedRoomType?.quad || 0,
      })

      setPaymentDetails(response.paymentDetails)

      const mergedTransaction = {
        ...transaction,
        roomTypeQuantity: {
          double: selectedRoomType?.double || 0,
          triple: selectedRoomType?.triple || 0,
          quad: selectedRoomType?.quad || 0,
        },
        roomInfo: response.roomInfo,
        packageSnapshot: {
          ...transaction?.packageSnapshot,
          snapshot: {
            ...transaction?.packageSnapshot?.snapshot,
            // Update current prices (in IDR from response)
            priceDouble: response.doublePrice.toString(),
            priceTriple: response.triplePrice.toString(),
            priceQuad: response.quadPrice.toString(),
            // Update original prices (in IDR from response)
            originalPriceDouble: response.originalDoublePrice.toString(),
            originalPriceTriple: response.originalTriplePrice.toString(),
            originalPriceQuad: response.originalQuadPrice.toString(),
          },
        },
      }
      setTransactionNew(mergedTransaction)
      setPreBookingLoading(false)
    } catch (e) {
      setPreBookingLoading(false)
      console.log(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction?.id, selectedRoomType])

  useEffect(() => {
    if (transaction && isOpenTransaction) {
      checkPre().finally(() => {
        setPreBookingLoading(false)
      })
    }
  }, [checkPre, isOpenTransaction, selectedRoomType, transaction])

  return (
    <LayoutDrawerDialog
      hideCloseButton={false}
      isOpen={isOpenTransaction}
      setIsOpen={setIsOpenTransaction}
      trigger={
        <Button className="w-full px-8 py-3 max-lg:px-5 max-lg:py-2">
          <span className="font-medium">{textTitle}</span>
        </Button>
      }
      title={
        <div className="flex flex-col gap-3 max-lg:p-3">
          <div className="flex items-center justify-between gap-2 lg:hidden">
            <span className="text-s-regular block text-neutral-500 ">
              Bayar Sebelum
            </span>
            <span className="text-s-regular text-warning-600 flex items-center">
              <TimerIcon className="mr-1" size={16} />
              {dayjs(transactionNew?.createdAt)
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
                  transactionNew?.packageSnapshot?.snapshot.package
                    .organizationInstance.name
                }
              </strong>
            </p>
            <p className="text-s-semibold">
              1 USD = {formatCurrency(transactionNew?.bookingExchange?.value)}
            </p>
          </div>
          <div className="flex justify-between max-lg:flex-col lg:gap-5">
            <div className="flex-1">
              <TransactionRoomInfo
                transaction={transactionNew}
                isEditable={isEditing}
                roomTypeMapping={roomTypeMapping}
                setShouldRunCheckPre={setPreBookingLoading}
                setSelectedRoomType={setSelectedRoomType}
                prebookingLoading={isPrebookingLoading}
              />
            </div>
            <PriceBreakdown
              paymentDetails={paymentDetails}
              currency={
                transactionNew?.packageSnapshot?.snapshot?.package.currency ||
                'IDR'
              }
              organizationName={
                transactionNew?.packageSnapshot?.snapshot.package
                  .organizationInstance.name || ''
              }
              value={transactionNew?.bookingExchange?.value || 0}
            />
          </div>
          <p
            className={`text-s-regular bg-info-100 text-info-800 flex items-center rounded-lg px-3 py-2 max-lg:hidden`}
          >
            <InfoIcon className="mr-2 flex-none" color="#092b44" size={16} />
            Saat ini kamu hanya membayar uang muka, setelah berhasil lakukan
            pelunasan kepada travel.
          </p>
        </div>
      }
      footerContent={
        <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
          <Button
            variant="ghost"
            className="px-10 py-3 text-nowrap max-lg:w-full"
            onClick={() => {
              setIsEditing((prev) => !prev)
            }}
            disabled={isPrebookingLoading}
          >
            {isEditing ? 'Batalkan Perubahan' : 'Ubah Pesanan'}
          </Button>
          <Button
            variant="default"
            className="px-10 py-3 text-nowrap max-lg:w-full"
            onClick={bayarDpHajj}
            disabled={isPrebookingLoading}
          >
            {isEditing ? 'Simpan & Bayar' : 'Bayar'}
          </Button>
        </div>
      }
    />
  )
}

export default TransactionActionButtonHajj
