'use client'

import { InfoIcon } from '@/components/icons/info'
import { Button } from '@/components/ui/button'
import { PACKAGE_TYPE } from '@/constant/env'
import { PaymentMethod } from '@/constant/types/PaymentMethod'

interface TermsAndCheckoutProps {
  termsAccepted: boolean
  setTermsAccepted: (accepted: boolean) => void
  setOpenModal: (open: boolean) => void
  setOpenModalPengembalian: (open: boolean) => void
  isEmptyRoomType: boolean
  disabledButtonCheckout: boolean
  currency: string
  preBookingLoading: boolean
  setOpenModalDisclaimer: (open: boolean) => void
  handleCheckout: (paymentMethod?: PaymentMethod) => void
  isLinkAja: boolean
  selectedPayment: string
  packageType: string
}

const TermsAndCheckout = ({
  termsAccepted,
  setTermsAccepted,
  setOpenModal,
  setOpenModalPengembalian,
  setOpenModalDisclaimer,
  handleCheckout,
  isEmptyRoomType,
  disabledButtonCheckout,
  currency,
  preBookingLoading,
  isLinkAja,
  selectedPayment,
  packageType,
}: TermsAndCheckoutProps) => {
  const handleCheckoutClick = () => {
    if (!isEmptyRoomType && termsAccepted) {
      if (packageType === PACKAGE_TYPE.HAJJ) {
        setOpenModalDisclaimer(true)
      } else {
        handleCheckout(
          isLinkAja
            ? {
                linkAja: true,
                linkAjaSyariah: selectedPayment === 'linkAjaSyariah',
              }
            : {}
        )
      }
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {currency === 'USD' && (
        <p
          className={`text-s-regular bg-info-100 text-info-800 flex items-center gap-2 rounded-lg px-3 py-2`}
        >
          <InfoIcon
            className="text-info-800 stroke-0"
            color="black"
            size={16}
          />
          Saat ini, kamu tidak akan dikenakan biaya apapun. Kamu dapat
          melanjutkan pembayaran uang muka ketika tagihan sudah diterbitkan.
        </p>
      )}
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2 h-4 w-4 accent-yellow-500"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <span className="text-sm text-gray-600">
          Dengan memesan, anda menyetujui{' '}
          <span
            className="cursor-pointer text-black underline"
            onClick={() => setOpenModal(true)}
          >
            Syarat & Ketentuan
          </span>
          , dan{' '}
          <span
            className="cursor-pointer text-black underline"
            onClick={() => setOpenModalPengembalian(true)}
          >
            Pengembalian Dana
          </span>{' '}
          yang berlaku.
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {isEmptyRoomType && (
          <p className="text-m-regular text-error-500">
            Harap pilih minimal 1 jemaah
          </p>
        )}

        {!isEmptyRoomType && !termsAccepted && (
          <p className="text-sm text-red-500">
            *Harap setujui syarat & ketentuan
          </p>
        )}
        <Button
          disabled={disabledButtonCheckout || preBookingLoading}
          className="w-full font-medium text-neutral-900"
          onClick={handleCheckoutClick}
        >
          Lanjut Bayar Sekarang!
        </Button>
      </div>
    </div>
  )
}

export default TermsAndCheckout
