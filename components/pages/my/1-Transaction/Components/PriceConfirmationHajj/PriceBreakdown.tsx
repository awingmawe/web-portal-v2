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
    <div className="flex flex-col gap-4 max-lg:mx-4 max-lg:py-4">
      <div
        className={`bg-warning-100  flex items-center justify-between rounded-lg px-3 py-2 lg:hidden`}
      >
        <p className="text-s-regular text-info-800">
          <InfoIcon className="text-warning-800 mr-2" size={16} />
          Kurs Travel <span className="font-bold">{organizationName}</span>
        </p>
        <p className="text-m-semibold">
          1 USD = {formatCurrency(value, currency)}
        </p>
      </div>
      <div className="flex justify-between gap-1.5 max-lg:flex-col lg:items-center">
        <h4 className="text-l-semibold max-lg:text-sm max-lg:leading-5 max-lg:font-semibold">
          Rincian Pembayaran
        </h4>
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
        <InfoIcon className="text-info-800 mr-2" size={16} />
        Saat ini kamu hanya membayar uang muka, setelah berhasil lakukan
        pelunasan kepada travel.
      </p>
    </div>
  )
}
