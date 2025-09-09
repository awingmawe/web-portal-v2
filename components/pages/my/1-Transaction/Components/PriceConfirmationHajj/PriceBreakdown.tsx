import { InfoIcon } from '@/components/icons/info'
import { Separator } from '@/components/ui/separator'
import { PaymentDetails } from '@/constant/types/CheckoutProps'
import { formatCurrency } from '@/lib/utils'
import renderHTML from 'react-render-html'
export default function PriceBreakdown({
  paymentDetails,
  value,
  organizationName,
  currency,
}: {
  paymentDetails: PaymentDetails[]
  organizationName: string
  value: string
  currency: string
}) {
  return (
    <div className="flex flex-col gap-4 max-lg:py-3">
      <div
        className={`bg-warning-100 flex items-center justify-between rounded-lg p-2 lg:hidden lg:px-3 lg:py-2`}
      >
        <div className="flex items-center">
          <InfoIcon className="text-warning-700 mr-2 flex-none" size={16} />
          <p className="text-s-regular text-warning-700">
            {`Kurs Travel `}
            <span className="text-warning-700 font-bold">
              {organizationName}
            </span>
          </p>
        </div>
        <p className="text-s-semibold text-right">
          1 USD = {formatCurrency(value, currency)}
        </p>
      </div>
      <div className="flex justify-between gap-1.5 max-lg:flex-col lg:items-center">
        <p className="text-m-medium">Rincian Pembayaran</p>
      </div>
      <div className="space-y-2">
        {paymentDetails?.map((detail: PaymentDetails, index: any) => (
          <div key={index}>
            {detail.label === 'divider' ? (
              <Separator />
            ) : (
              <div className="flex justify-between">
                <span className="text-s-regular text-neutral-500">
                  {renderHTML(detail.label.replace(/\n/g, '<br/>'))}
                </span>
                <div className="flex flex-col items-end">
                  {detail.amount.map((item: any, index2: any) => (
                    <span
                      style={{
                        color: item.color,
                        fontSize:
                          item.style == 'small'
                            ? '12px'
                            : item.style == 'medium'
                              ? '14px'
                              : '16px',
                        fontWeight: item.style == 'small' ? 400 : 600,
                      }}
                      key={'amount-' + index2}
                    >
                      {item.amountLabel}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <p
        className={`text-s-regular bg-info-100 text-info-800 flex items-center rounded-lg px-3 py-2 lg:hidden`}
      >
        <InfoIcon className="mr-2 flex-none" color="#092b44" size={16} />
        Saat ini kamu hanya membayar uang muka, setelah berhasil lakukan
        pelunasan kepada travel.
      </p>
    </div>
  )
}
