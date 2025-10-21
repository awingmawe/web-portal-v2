import CheckAvailibility from '@/components/pages/detail-package/2-PackageVariant/component/CheckAvaibility'
import { Button } from '@/components/ui/button'
import { PACKAGE_TYPE } from '@/constant/env'
import React, { Fragment } from 'react'

interface ActionButtonsProps {
  variants: any[]
  availableRoomTypes: {
    double: boolean
    triple: boolean
    quad: boolean
  }
  packageType: string
  token: string
  currency: string
  onCheckout: () => void
  handlePushEvent: (name: string, withVariant?: boolean) => void
  setIsPembiayaanModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  variants,
  availableRoomTypes,
  packageType,
  token,
  onCheckout,
  handlePushEvent,
  setIsPembiayaanModalOpen,
}) => {
  if (variants.length > 0) {
    return (
      <Fragment>
        <Button
          className="w-full rounded-full py-3 max-lg:hidden"
          variant="default"
          size="lg"
          id="btn-checkout-desktop"
          disabled={
            availableRoomTypes.double ||
            availableRoomTypes.triple ||
            availableRoomTypes.quad
              ? false
              : true
          }
          onClick={onCheckout}
        >
          Checkout Sekarang
        </Button>

        {packageType === PACKAGE_TYPE.UMRAH && (
          <Fragment>
            <div
              onClick={() => {
                setIsPembiayaanModalOpen(true)
                handlePushEvent('click_paylater')
              }}
              className="relative mt-1 max-lg:hidden"
            >
              <p className="bg-success-500 text-s-semibold absolute bottom-7.5 left-0 rounded-full px-1.5 py-1 text-white">
                Opsi Pembiayaan Tersedia
              </p>
              <Button
                className="border-success-500 w-full rounded-full border-2 py-3"
                variant="outline"
                size="lg"
                id="btn-pay-later-desktop"
              >
                Ajukan Pembiayaan
              </Button>
            </div>
            <CheckAvailibility
              token={token}
              handlePushEvent={handlePushEvent}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Button
        className="w-full rounded-full py-3 max-lg:hidden"
        variant="outline"
        disabled
        size="lg"
      >
        Kursi tidak tersedia
      </Button>
      <CheckAvailibility token={token} handlePushEvent={handlePushEvent} />
    </Fragment>
  )
}

export default ActionButtons
