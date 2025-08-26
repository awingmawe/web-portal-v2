'use client'

import { InfoIcon } from '@/components/icons/info'
import { MessageQuestionIcon } from '@/components/icons/message-question'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PACKAGE_TYPE } from '@/constant/env'
import {
  DetailVariant,
  PaymentDetails,
  SelectedVariant,
} from '@/constant/types/CheckoutProps'
import { formatCurrency, isEmpty } from '@/lib/utils'
import { addYears, format } from 'date-fns'
import { id } from 'date-fns/locale'
import Image from 'next/image'
import React from 'react'
import renderHTML from 'react-render-html'

interface PackageDetailsProps {
  detailVariant: DetailVariant
  selectedVariant: SelectedVariant
  paymentDetails: PaymentDetails[]
  globalCurrencyRate: number
}

const PackageDetails = ({
  detailVariant,
  selectedVariant,
  paymentDetails,
  globalCurrencyRate,
}: PackageDetailsProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const Placeholder = '/images/no-image-placeholder.png'

  const waitingPeriod =
    !isEmpty(detailVariant?.waitingPeriod) &&
    `- ${format(
      detailVariant?.departureDate
        ? addYears(
            detailVariant.departureDate,
            Number(detailVariant.waitingPeriod)
          )
        : new Date(),
      'yyyy',
      { locale: id }
    )}`
  return (
    <div className="w-full lg:w-1/3">
      <div className="rounded-[20px] border border-neutral-100 p-6 lg:sticky lg:top-25">
        <div className="mb-4 flex">
          {/* Kiri: Gambar dan info bawahnya */}
          <div className="mr-4 flex flex-col items-center">
            <Image
              src={detailVariant?.package?.thumbnail || Placeholder}
              alt="Umrah Package"
              width={100}
              height={100}
              className="rounded-lg"
              style={{
                borderRadius: '20px',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Kanan: Judul dan organisasi */}
          <div>
            <h3 className="text-l-semibold">{detailVariant?.package?.title}</h3>
            <div className="mt-1 flex items-start gap-2">
              <Image
                src={
                  detailVariant?.package?.organizationInstance?.thumbnail ||
                  Placeholder
                }
                alt="Organization"
                width={30}
                height={30}
                className="mt-[5px] rounded-lg"
                style={{
                  borderRadius: '20px',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.currentTarget.src = String(Placeholder)
                }}
              />
              <div>
                <span className="text-s-medium">
                  {detailVariant?.package?.organizationInstanceName}
                </span>
                <p className="text-xs-regular text-neutral-500">
                  {detailVariant?.package?.organizationInstance?.city?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Varian & Tipe Kamar di bawah gambar */}
        {detailVariant?.package?.packageType === PACKAGE_TYPE.UMRAH && (
          <div className="mt-2 w-full text-left">
            <p className="text-s-regular mb-1 text-neutral-500">Varian</p>
            <p className="text-m-regular">{selectedVariant?.name}</p>
          </div>
        )}

        {detailVariant?.package?.packageType === PACKAGE_TYPE.HAJJ && (
          <div className="mt-2 w-full text-left">
            <p className="text-s-regular mb-1 text-neutral-500">
              Estimasi Keberangkatan
            </p>
            <p className="text-m-regular">
              {detailVariant?.package?.variantType === PACKAGE_TYPE.HAJJ_SPECIAL
                ? `${format(detailVariant.departureDate, 'yyyy', { locale: id })} ${waitingPeriod}`
                : `${format(detailVariant.departureDate, 'MMM yyyy', { locale: id })}`}
            </p>
          </div>
        )}

        <div className="my-3 h-px bg-gray-200"></div>

        {/* Price breakdown */}
        <div className="flex flex-col gap-4">
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
                      <p className="text-m-medium text-[#484848]">
                        Estimasi Kurs
                      </p>
                      <p className="text-s-regular text-[#333]">
                        Muslim101 menampilkan estimasi harga akhir dalam rupiah
                        menggunakan data kurs pihak ketiga. Informasi ini
                        ditujukan sebagai perkiraan agar jamaah mendapat
                        gambaran biaya yang lebih jelas.
                        <br />
                        <br />
                        Namun, kurs resmi tetap mengikuti ketentuan dari pihak
                        travel pada saat pembayaran. Jika terdapat perbedaan,
                        maka kurs dari travel menjadi acuan final.
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
      </div>
    </div>
  )
}

export default PackageDetails
