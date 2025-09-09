'use client'

import { CashReceiptIcon } from '@/components/icons/cash-receipt'
import { LinkAja, LinkAjaSyariah } from '@/components/icons/linkaja'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface PaymentMethodSectionProps {
  isLinkAja: boolean
  selectedPayment: string
  setSelectedPayment: (payment: string) => void
}

const PaymentMethodSection = ({
  isLinkAja,
  selectedPayment,
  setSelectedPayment,
}: PaymentMethodSectionProps) => {
  if (!isLinkAja) {
    return null
  }

  return (
    <div className="mx-4 rounded-[20px] border border-neutral-100 lg:hidden">
      <div className="flex items-center border-b border-neutral-100 p-4">
        <CashReceiptIcon className="text-neutral-900" size={24} />
        <p className="text-m-semibold ml-3 text-neutral-900">
          Metode Pembayaran
        </p>
      </div>
      <RadioGroup
        value={selectedPayment}
        onValueChange={setSelectedPayment}
        className="p-4"
      >
        {/* LinkAja Syariah */}
        <div
          className="cursor-pointer rounded-lg border border-neutral-100 bg-white p-3"
          onClick={() => setSelectedPayment('linkAjaSyariah')}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="linkAjaSyariah"
              id="linkAjaSyariah"
              className="h-4 w-4"
            />
            <div className="flex items-center gap-2">
              <LinkAjaSyariah className="h-4 w-4" />
              <Label
                htmlFor="linkAjaSyariah"
                className="text-s-regular cursor-pointer"
              >
                LinkAja Syariah
              </Label>
            </div>
          </div>
        </div>

        {/* LinkAja */}
        <div
          className="cursor-pointer rounded-lg border border-neutral-100 bg-white p-3"
          onClick={() => setSelectedPayment('linkAja')}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="linkAja" id="linkaja" className="h-4 w-4" />
            <div className="flex items-center gap-2">
              <LinkAja className="h-4 w-4" />
              <Label
                htmlFor="linkaja"
                className="text-s-regular cursor-pointer"
              >
                LinkAja
              </Label>
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}

export default PaymentMethodSection
