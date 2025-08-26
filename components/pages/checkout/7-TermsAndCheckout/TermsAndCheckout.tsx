'use client'

import { Button } from '@/components/ui/button'
import { PaymentMethod } from '@/constant/types/PaymentMethod'

interface TermsAndCheckoutProps {
  termsAccepted: boolean
  setTermsAccepted: (accepted: boolean) => void
  setOpenModal: (open: boolean) => void
  setOpenModalPengembalian: (open: boolean) => void
  isEmptyRoomType: boolean
  disabledButtonCheckout: boolean
  handleCheckout: (paymentMethod?: PaymentMethod) => void
  isLinkAja: boolean
  selectedPayment: string
}

const TermsAndCheckout = ({
  termsAccepted,
  setTermsAccepted,
  setOpenModal,
  setOpenModalPengembalian,
  isEmptyRoomType,
  disabledButtonCheckout,
  handleCheckout,
  isLinkAja,
  selectedPayment,
}: TermsAndCheckoutProps) => {
  const handleCheckoutClick = () => {
    if (!isEmptyRoomType && termsAccepted) {
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

  return (
    <div className="">
      <div className="mb-4 flex items-center">
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

      {isEmptyRoomType && (
        <p className="text-m-regular text-error-500 my-3">
          Harap pilih minimal 1 jemaah
        </p>
      )}

      {!isEmptyRoomType && !termsAccepted && (
        <p className="mb-2 text-sm text-red-500">
          *Harap setujui syarat & ketentuan
        </p>
      )}

      <Button
        disabled={disabledButtonCheckout}
        className="w-full font-medium text-neutral-900"
        onClick={handleCheckoutClick}
      >
        Lanjut Bayar Sekarang!
      </Button>
    </div>
  )
}

export default TermsAndCheckout
