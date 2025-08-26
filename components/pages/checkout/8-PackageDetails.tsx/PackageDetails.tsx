'use client'

import { InfoIcon } from '@/components/icons/info'
import { Separator } from '@/components/ui/separator'
import {
  DetailVariant,
  PaymentDetails,
  SelectedVariant,
} from '@/constant/types/CheckoutProps'
import Image from 'next/image'
import renderHTML from 'react-render-html'

interface PackageDetailsProps {
  detailVariant: DetailVariant
  selectedVariant: SelectedVariant
  paymentDetails: PaymentDetails[]
}

const PackageDetails = ({
  detailVariant,
  selectedVariant,
  paymentDetails,
}: PackageDetailsProps) => {
  const Placeholder = '/images/no-image-placeholder.png'

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
        <div className="mt-2 w-full text-left">
          <p className="text-s-regular mb-1 text-neutral-500">Varian</p>
          <p className="text-m-regular">{selectedVariant?.name}</p>
        </div>

        <div className="my-3 h-px bg-gray-200"></div>

        {/* Price breakdown */}
        <div>
          <h4 className="text-l-semibold mb-3">Rincian Pembayaran</h4>
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
          <p
            className={`text-s-regular bg-info-100 text-info-800 mt-3 flex items-center rounded-lg px-3 py-2`}
          >
            <InfoIcon className="text-info-800 mr-2" size={16} />
            Jumlah yang dibayar setelah melakukan pembayaran uang muka.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PackageDetails
