'use client'

import { InfoIcon } from '@/components/icons/info'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface TermsAndCheckoutProps {
  termsAccepted: boolean
  setTermsAccepted: (accepted: boolean) => void
  setOpenModal: (open: boolean) => void
  setOpenModalPengembalian: (open: boolean) => void
  isEmptyRoomType: boolean
  disabledButtonCheckout: boolean
  currency: string
  preBookingLoading: boolean
  handleCheckout: () => void
}

const TermsAndCheckout = ({
  termsAccepted,
  setTermsAccepted,
  setOpenModal,
  setOpenModalPengembalian,
  isEmptyRoomType,
  disabledButtonCheckout,
  currency,
  preBookingLoading,
  handleCheckout,
}: TermsAndCheckoutProps) => {
  return (
    <div className="flex flex-col gap-5 max-lg:mx-4">
      {currency === 'USD' && (
        <div
          className={`text-s-regular bg-info-100 text-info-800 flex items-center gap-2 rounded-lg px-3 py-2`}
        >
          <InfoIcon
            className="text-info-800 h-5 w-5 flex-none stroke-0"
            color="black"
            size={20}
          />
          <p className="text-xs-regular">
            Saat ini, kamu tidak akan dikenakan biaya apapun. Kamu dapat
            melanjutkan pembayaran uang muka ketika tagihan sudah diterbitkan.
          </p>
        </div>
      )}
      <div className="flex items-center max-lg:rounded-[20px] max-lg:border-1 max-lg:border-neutral-100 max-lg:p-3">
        <Checkbox
          className="accent-primary-500 mr-2 h-4 w-4"
          checked={termsAccepted}
          onCheckedChange={(e) => setTermsAccepted(e as boolean)}
        />
        <span className="pb-2 text-sm text-gray-600">
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
          className="w-full font-medium text-neutral-900 max-lg:hidden"
          onClick={handleCheckout}
        >
          Lanjut Bayar Sekarang!
        </Button>
      </div>
    </div>
  )
}

export default TermsAndCheckout
