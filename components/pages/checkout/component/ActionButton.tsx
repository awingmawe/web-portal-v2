import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

interface ActionButtonProps {
  disabledButtonCheckout: boolean
  preBookingLoading: boolean
  downPayment: number
  currency: string
  handleCheckoutClick: () => void
}

const ActionButton = ({
  disabledButtonCheckout,
  preBookingLoading,
  downPayment,
  currency,
  handleCheckoutClick,
}: ActionButtonProps) => {
  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-between bg-white px-3 py-2 lg:hidden">
      <div className="flex flex-col gap-1">
        <p className="text-xs-medium">Total</p>
        <p className="text-m-semibold">
          {formatCurrency(downPayment, currency)}
        </p>
      </div>
      <Button
        disabled={disabledButtonCheckout || preBookingLoading}
        className="w-[175px] font-medium text-neutral-900"
        onClick={handleCheckoutClick}
      >
        Pesan Sekarang
      </Button>
    </div>
  )
}

export default ActionButton
