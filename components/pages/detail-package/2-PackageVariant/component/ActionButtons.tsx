import CheckAvailibility from '@/components/pages/detail-package/2-PackageVariant/component/CheckAvaibility'
import { Button } from '@/components/ui/button'
import { PACKAGE_TYPE } from '@/constant/env'
import Link from 'next/link'
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
  selectedVariant?: any
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  variants,
  availableRoomTypes,
  packageType,
  token,
  onCheckout,
  handlePushEvent,
  selectedVariant,
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
            <div className="text-s-regular text-center text-neutral-500 max-lg:hidden">
              atau
            </div>
            <Link
              href={`/banking/credit`}
              onClick={() => {
                handlePushEvent('click_paylater')
                sessionStorage.setItem(
                  'variantPaylater',
                  JSON.stringify(selectedVariant)
                )
              }}
            >
              <Button
                className="border-primary-500 text-primary-500 w-full rounded-full py-3 max-lg:hidden"
                variant="outline"
                size="lg"
                id="btn-pay-later-desktop"
              >
                Pesan Sekarang, Bayar Nanti
              </Button>
            </Link>
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
