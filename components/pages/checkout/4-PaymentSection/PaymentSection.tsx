'use client'

import { LINKAJA_MAX_LIMIT, PACKAGE_TYPE } from '@/constant/env'
import { DetailVariant, SelectedVariant } from '@/constant/types/CheckoutProps'
import { getLinkAjaTiering } from '@/constant/types/LinkAja'
import { PreBookingResponse } from '@/constant/types/PaymentCheckout'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

interface PaymentSectionProps {
  detailVariant: DetailVariant
  selectedVariant: SelectedVariant
  totalQty: number
  isLinkAja: boolean
  rawInputValue: string
  formatNumber: (value: string) => string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  prebookingLoading: boolean
  setSliderValue: (value: number) => void
  setPaymentAmount: (amount: number) => void
  setRawInputValue: (value: string) => void
  preBooking: PreBookingResponse
  totalPrice: number
  sliderValue: number
  handleSliderChange: (e: any) => void
  sliderStep: () => number
}

const PaymentSection = ({
  detailVariant,
  selectedVariant,
  totalQty,
  isLinkAja,
  rawInputValue,
  formatNumber,
  handleInputChange,
  prebookingLoading,
  setSliderValue,
  setPaymentAmount,
  setRawInputValue,
  preBooking,
  totalPrice,
  sliderValue,
  handleSliderChange,
  sliderStep,
}: PaymentSectionProps) => {
  if (
    detailVariant?.isUmrahPersonal ||
    detailVariant?.package.packageType === PACKAGE_TYPE.HAJJ
  ) {
    return null
  }

  const handleInputBlur = () => {
    const value = parseInt(rawInputValue) || 0
    const minAmount = selectedVariant.netAmount * totalQty
    const maxAmount = isLinkAja
      ? LINKAJA_MAX_LIMIT - getLinkAjaTiering(Number(rawInputValue))
      : preBooking?.totalPrice || totalPrice * totalQty

    if (value >= minAmount && value <= maxAmount) {
      setSliderValue(value)
      const perJamaahAmount = Math.ceil(value / totalQty)
      setPaymentAmount(perJamaahAmount)
      setRawInputValue(value.toString())
    } else {
      setRawInputValue(sliderValue.toString())
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleInputBlur()
    }
  }

  return (
    <div className="rounded-[20px] border border-neutral-100 max-lg:mx-4 max-lg:p-3 lg:p-4">
      <div className="flex items-center max-lg:mb-2.5 max-lg:gap-1 lg:mb-4 lg:gap-3">
        <Image src="/images/money-3.svg" width={24} height={24} alt="money" />
        <p className="text-m-semibold">Jumlah Bayar</p>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-[#D2D2D1] max-lg:hidden" />

      {/* Description */}
      <div className="flex justify-between lg:mt-3">
        <p className="text-m-regular">
          Gak perlu bayar full dulu, cukup uang muka aja dulu kamu yang atur!
        </p>
        {isLinkAja ? (
          <span className="text-s-regular text-right whitespace-nowrap text-neutral-500">
            Uang muka minimal{' '}
            {formatCurrency(selectedVariant.netAmount, detailVariant?.currency)}{' '}
            dan limit
            <br />
            transaksi bulanan kamu di LinkAja adalah Rp40.000.000
          </span>
        ) : (
          <span className="text-s-regular whitespace-nowrap text-neutral-500">
            *uang muka minimal{' '}
            {formatCurrency(selectedVariant.netAmount, detailVariant?.currency)}
            /orang
          </span>
        )}
      </div>

      {/* Input & slider */}
      <div className="mt-4 max-lg:mt-2.5">
        {/* Jumlah Bayar + Sisa Pelunasan */}
        <div className="mb-4 flex items-center justify-between">
          {/* Label + Input */}
          <div className="flex items-center space-x-4">
            <label className="text-m-medium whitespace-nowrap">
              Jumlah Bayar
            </label>
            <div className="relative">
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                className="w-44 rounded-full border border-neutral-200 py-2 pr-4 pl-10 text-right font-medium text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                value={formatNumber(rawInputValue)}
                onChange={handleInputChange}
                disabled={prebookingLoading}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
              />
            </div>
          </div>

          {/* Sisa Pelunasan */}
          <span className="text-s-regular mt-10 flex items-center whitespace-nowrap text-neutral-500 max-lg:hidden">
            Sisa Pelunasan{' '}
            {prebookingLoading ? (
              <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
            ) : (
              <strong className="text-m-medium ml-2 text-neutral-900">
                Rp
                {Number(preBooking?.remainingPayment || 0).toLocaleString(
                  'id-ID'
                )}
              </strong>
            )}
          </span>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={totalQty > 0 ? selectedVariant.netAmount * totalQty : 0}
          max={
            totalQty > 0
              ? isLinkAja
                ? preBooking?.totalPrice >
                  LINKAJA_MAX_LIMIT - getLinkAjaTiering(Number(rawInputValue))
                  ? LINKAJA_MAX_LIMIT - getLinkAjaTiering(Number(rawInputValue))
                  : preBooking?.totalPrice
                : preBooking?.totalPrice || totalPrice * totalQty
              : 0
          }
          disabled={prebookingLoading}
          step={sliderStep()}
          value={sliderValue}
          onChange={handleSliderChange}
          className="bg-primary-200 h-2 w-full cursor-pointer appearance-none rounded-full accent-yellow-500 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:shadow"
        />

        <span className="text-s-regular mt-2.5 flex items-center whitespace-nowrap text-neutral-500 lg:hidden">
          Sisa Pelunasan{' '}
          {prebookingLoading ? (
            <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
          ) : (
            <strong className="text-m-medium ml-2 text-neutral-900">
              Rp
              {Number(preBooking?.remainingPayment || 0).toLocaleString(
                'id-ID'
              )}
            </strong>
          )}
        </span>
      </div>
    </div>
  )
}

export default PaymentSection
