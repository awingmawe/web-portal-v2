import { InfoIcon } from '@/components/icons/info'
import { MessageQuestionIcon } from '@/components/icons/message-question'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PACKAGE_TYPE } from '@/constant/env'
import { DetailVariant } from '@/constant/types/CheckoutProps'
import { formatCurrency } from '@/lib/utils'
import React from 'react'
import renderHTML from 'react-render-html'
export default function PriceBreakdown({
  detailVariant,
  paymentDetails,
  globalCurrencyRate,
}: {
  detailVariant: DetailVariant
  paymentDetails: any[]
  globalCurrencyRate: number
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="flex flex-col gap-4 max-lg:mx-4 max-lg:gap-2.5 max-lg:rounded-2xl max-lg:border-1 max-lg:border-neutral-100 max-lg:px-3 max-lg:py-4">
      <div className="flex items-center justify-between">
        <h4 className="text-l-semibold">Rincian Pembayaran</h4>
        {detailVariant?.package?.currency === 'USD' && (
          <p className="text-s-regular flex items-center gap-1 text-neutral-500">
            Estimasi 1 USD = {formatCurrency(globalCurrencyRate)}
            <Tooltip open={isOpen} onOpenChange={setIsOpen}>
              <TooltipTrigger onClick={() => setIsOpen(true)}>
                <MessageQuestionIcon size={16} />
              </TooltipTrigger>
              <TooltipContent
                className="z-[9999] max-w-[250px] bg-white p-4"
                arrowColor="bg-white fill-white"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-m-medium text-[#484848]">Estimasi Kurs</p>
                  <p className="text-s-regular text-[#333]">
                    Muslim101 menampilkan estimasi harga akhir dalam rupiah
                    menggunakan data kurs pihak ketiga. Informasi ini ditujukan
                    sebagai perkiraan agar jamaah mendapat gambaran biaya yang
                    lebih jelas.
                    <br />
                    <br />
                    Namun, kurs resmi tetap mengikuti ketentuan dari pihak
                    travel pada saat pembayaran. Jika terdapat perbedaan, maka
                    kurs dari travel menjadi acuan final.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </p>
        )}
      </div>
      <div className="space-y-2">
        {paymentDetails?.map((detail: any, index: any) => (
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
      {detailVariant.package.packageType === PACKAGE_TYPE.UMRAH && (
        <p
          className={`text-s-regular bg-info-100 text-info-800 flex items-center rounded-lg px-3 py-2`}
        >
          <InfoIcon className="text-info-800 mr-2" size={16} />
          Jumlah yang dibayar setelah melakukan pembayaran uang muka.
        </p>
      )}
    </div>
  )
}
