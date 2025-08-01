'use client'

import { CashReceiptIcon } from '@/components/icons/cash-receipt'
import { InfoIcon } from '@/components/icons/info'
import { LinkAja, LinkAjaSyariah } from '@/components/icons/linkaja'
import ModalCheckout from '@/components/pages/checkout/modal/modalCheckout'
import ModalPengembalianDana from '@/components/pages/checkout/modal/modalPengembalianDana'
import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { LINKAJA_MAX_LIMIT } from '@/constant/env'
import { getLinkAjaTiering } from '@/constant/types/LinkAja'
import { useCheckout } from '@/contexts/checkout-context'
import {
  formatCurrency,
  getLocalReferralCode,
  setLocalReferralCode,
} from '@/lib/utils'
import { PlaneLanding, PlaneTakeoff } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import renderHTML from 'react-render-html'

const CheckoutPage = () => {
  const isLinkAja = sessionStorage.getItem('isLinkAja') === 'true'
  const Placeholder = '/images/no-image-placeholder.png'
  const [isOpenModal, setOpenModal] = useState(false)
  const searchParams = useSearchParams()
  const [isOpenModalPengembalian, setOpenModalPengembalian] = useState(false)
  const [isHaveRefferalCode, setIsHaveReferralCode] = useState(false)
  const [disabledButtonCheckout, setDisabledButtonCheckout] = useState(true)

  const {
    detailVariant,
    selectedVariant,
    prebookingLoading,
    preBooking,
    paymentDetails,
    referralCode,
    setReferralCode,
    handleCheckReferral,
    setPaymentAmount,
    totalPrice,
    sliderValue,
    setSliderValue,
    handleCheckout,
    termsAccepted,
    setTermsAccepted,
    isReferralValid,
    isReferralCodeChecked,
    wukalaSetting,
    handleRemoveReferralCode,
    loading,
    handleInputChange,
    formatNumber,
    rawInputValue,
    setRawInputValue,
    handleSliderChange,
    dataSK,
    parsedContent,
    dataRefundPolicy,
    isEmptyRoomType,
    setSelectedRoomType,
    setShouldRunCheckPre,
    paymentAmount,
    totalQty,
    selectedPayment,
    setSelectedPayment,
    sliderStep,
  } = useCheckout()

  const router = useRouter()

  useEffect(() => {
    const referralCodeFromParams = searchParams.get('referralCode')
    const currentReferralCodeFromStorage = getLocalReferralCode()
    if (referralCodeFromParams) {
      setLocalReferralCode(referralCodeFromParams)
      setReferralCode(referralCodeFromParams)
      setIsHaveReferralCode(true)
    } else if (currentReferralCodeFromStorage) {
      setReferralCode(currentReferralCodeFromStorage)
      setIsHaveReferralCode(true)
    }
  }, [searchParams, setReferralCode])

  useEffect(() => {
    setSelectedRoomType(selectedVariant?.roomType)
  }, [selectedVariant, setSelectedRoomType])

  useEffect(() => {
    if (loading || isEmptyRoomType || !termsAccepted) {
      setDisabledButtonCheckout(true)
    } else {
      if (isLinkAja) {
        if (
          selectedPayment === 'linkAjaSyariah' ||
          selectedPayment === 'linkAja'
        ) {
          setDisabledButtonCheckout(false)
        } else {
          setDisabledButtonCheckout(true)
        }
      } else {
        setDisabledButtonCheckout(false)
      }
    }
  }, [
    selectedVariant,
    isEmptyRoomType,
    loading,
    termsAccepted,
    isLinkAja,
    selectedPayment,
  ])

  return (
    <div className="mt-5 min-h-screen bg-white font-sans">
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Back button */}
        <div className="mb-5">
          <button className="flex items-center text-gray-800">
            <a
              onClick={(e) => {
                e.preventDefault()
                router.back()
              }}
              className="text-black-600 flex cursor-pointer items-center hover:underline"
            >
              <Image
                src="/images/arrow-left.svg"
                width={24}
                height={24}
                alt="arrow"
              />
            </a>

            <span className="heading-3-semibold ml-1">
              Konfirmasi Pembelian Paket
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left section */}
          <div className="w-full space-y-6 lg:w-2/3">
            {/* Flight details */}
            <div className="flex flex-col justify-between rounded-[20px] border border-gray-200 p-4 md:flex-row md:items-center md:space-x-6">
              <div className="mb-4 flex items-center md:mb-0 md:w-1/2">
                <div className="mr-4 flex flex-col items-center">
                  <PlaneTakeoff size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-l-regular text-neutral-900">
                    {detailVariant?.package?.departure?.from?.airport?.cityName}{' '}
                    ({detailVariant?.package?.departure?.from?.airport?.code}) →
                    {detailVariant?.package?.departure?.to?.airport?.cityName} (
                    {detailVariant?.package?.departure?.to?.airport?.code})
                  </p>
                  <p className="text-s-medium text-neutral-500">
                    {detailVariant?.departureDate &&
                      new Date(detailVariant.departureDate).toLocaleDateString(
                        'id-ID',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                  </p>
                </div>
              </div>

              {/* Separator */}
              <div className="hidden h-10 w-px bg-gray-200 md:block" />

              <div className="flex items-center md:w-1/2">
                <div className="mr-4 flex flex-col items-center">
                  <PlaneLanding size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-l-regular text-neutral-900">
                    {detailVariant?.package?.arrival?.from?.airport?.cityName} (
                    {detailVariant?.package?.arrival?.from?.airport?.code}) →
                    {detailVariant?.package?.arrival?.to?.airport?.cityName} (
                    {detailVariant?.package?.arrival?.to?.airport?.code})
                  </p>
                  <p className="text-s-medium text-neutral-500">
                    {detailVariant?.arrivalDate &&
                      new Date(detailVariant.arrivalDate).toLocaleDateString(
                        'id-ID',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                  </p>
                </div>
              </div>
            </div>

            {/* Jamaah data */}
            <div className="rounded-[20px] border border-neutral-100">
              <div className="mb-4 flex items-center justify-between border-b border-neutral-100 p-4">
                <div className="flex items-center  gap-[12px]">
                  <Image
                    src="/images/people.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />

                  <span className="font-semibold text-neutral-900">
                    Jumlah Jemaah Per Kamar
                  </span>
                </div>
              </div>

              <div className="px-4 pb-4">
                <SelectHotel
                  variant="checkout"
                  totalQty={totalQty}
                  isMobile
                  defaultValue={selectedVariant?.roomType}
                  defaultPackageVariant={selectedVariant.variant}
                  defaultPackageVariantId={selectedVariant.variantId}
                  disabled={prebookingLoading}
                  totalManifest={detailVariant?.totalManifest}
                  disabledAddOnly={
                    isLinkAja
                      ? sliderValue >=
                          LINKAJA_MAX_LIMIT -
                            getLinkAjaTiering(
                              selectedVariant.netAmount * (totalQty + 1)
                            ) ||
                        selectedVariant.netAmount * (totalQty + 1) >
                          LINKAJA_MAX_LIMIT -
                            getLinkAjaTiering(
                              selectedVariant.netAmount * (totalQty + 1)
                            )
                      : false
                  }
                  onChange={(roomType) => {
                    setSelectedRoomType(roomType)
                    setShouldRunCheckPre(true)
                    setPaymentAmount(selectedVariant.netAmount)
                    setRawInputValue(String(paymentAmount * totalQty))
                  }}
                />
              </div>
            </div>

            {/* Payment section */}
            {!detailVariant?.isUmrahPersonal && (
              <div className="rounded-[20px] border border-neutral-100 p-6">
                <div className="mb-4 flex items-center gap-[12px]">
                  <Image
                    src="/images/money-3.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />

                  <span className="font-semibold">Jumlah Bayar</span>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-[#D2D2D1]" />

                {/* Description */}
                <div className="mt-3 flex justify-between">
                  <p className="text-m-regular">
                    Gak perlu bayar full dulu, cukup uang muka aja dulu kamu
                    yang atur!
                  </p>
                  {isLinkAja ? (
                    <span className="text-s-regular text-right whitespace-nowrap text-neutral-500">
                      Uang muka minimal{' '}
                      {formatCurrency(selectedVariant.netAmount)} dan limit
                      <br />
                      transaksi bulanan kamu di LinkAja adalah Rp40.000.000
                    </span>
                  ) : (
                    <span className="text-s-regular whitespace-nowrap text-neutral-500">
                      *uang muka minimal{' '}
                      {formatCurrency(selectedVariant.netAmount)}
                      /orang
                    </span>
                  )}
                </div>

                {/* Input & slider */}
                <div className="mt-4">
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
                          onBlur={() => {
                            const value = parseInt(rawInputValue) || 0
                            const minAmount =
                              selectedVariant.netAmount * totalQty
                            const maxAmount = isLinkAja
                              ? LINKAJA_MAX_LIMIT -
                                getLinkAjaTiering(
                                  preBooking?.totalPrice ||
                                    totalPrice * totalQty
                                )
                              : preBooking?.totalPrice || totalPrice * totalQty

                            if (value >= minAmount && value <= maxAmount) {
                              setSliderValue(value)
                              const perJamaahAmount = Math.ceil(
                                value / totalQty
                              )
                              setPaymentAmount(perJamaahAmount)
                              setRawInputValue(value.toString())
                            } else {
                              setRawInputValue(sliderValue.toString())
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              const value = parseInt(rawInputValue) || 0
                              const minAmount =
                                selectedVariant.netAmount * totalQty
                              const maxAmount = isLinkAja
                                ? LINKAJA_MAX_LIMIT -
                                  getLinkAjaTiering(
                                    preBooking?.totalPrice ||
                                      totalPrice * totalQty
                                  )
                                : preBooking?.totalPrice ||
                                  totalPrice * totalQty

                              if (value >= minAmount && value <= maxAmount) {
                                setSliderValue(value)
                                const perJamaahAmount = Math.ceil(
                                  value / totalQty
                                )
                                setPaymentAmount(perJamaahAmount)
                                setRawInputValue(value.toString())
                              } else {
                                setRawInputValue(sliderValue.toString())
                              }
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Sisa Pelunasan */}
                    <span className="text-s-regular mt-10 flex items-center whitespace-nowrap text-neutral-500">
                      Sisa Pelunasan{' '}
                      {prebookingLoading ? (
                        <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
                      ) : (
                        <strong className="text-m-medium ml-2 text-neutral-900">
                          Rp
                          {Number(
                            preBooking?.remainingPayment || 0
                          ).toLocaleString('id-ID')}
                        </strong>
                      )}
                    </span>
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min={
                      totalQty > 0 ? selectedVariant.netAmount * totalQty : 0
                    }
                    max={
                      totalQty > 0
                        ? isLinkAja
                          ? preBooking?.totalPrice >
                            LINKAJA_MAX_LIMIT -
                              getLinkAjaTiering(preBooking?.totalPrice)
                            ? LINKAJA_MAX_LIMIT -
                              getLinkAjaTiering(preBooking?.totalPrice)
                            : preBooking?.totalPrice
                          : preBooking?.totalPrice || totalPrice * totalQty
                        : 0
                    }
                    disabled={prebookingLoading}
                    step={sliderStep()}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-yellow-500 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:shadow"
                  />
                </div>
              </div>
            )}

            {/* Payment Method */}
            {isLinkAja && (
              <div className="bg-white px-4 pt-4">
                <div className="rounded-[16px] border border-b border-neutral-200">
                  <div className="flex items-center border-b border-neutral-200 p-4">
                    <CashReceiptIcon className="text-neutral-900" size={20} />
                    <h2 className="text-m-semibold ml-2.5 text-neutral-900">
                      Metode Pembayaran
                    </h2>
                  </div>
                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={setSelectedPayment}
                    className="p-4"
                  >
                    {/* LinkAja Syariah */}
                    <div
                      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3"
                      onClick={() => setSelectedPayment('linkAjaSyariah')}
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem
                          value="linkAjaSyariah"
                          id="linkAjaSyariah"
                          className="h-4 w-4"
                        />
                        <div className="flex items-center gap-2">
                          <LinkAjaSyariah className="h-4 w-4" />
                          <Label
                            htmlFor="linkAjaSyariah"
                            className="text-l-medium cursor-pointer"
                          >
                            LinkAja Syariah
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* LinkAja */}
                    <div
                      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3"
                      onClick={() => setSelectedPayment('linkAja')}
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem
                          value="linkAja"
                          id="linkaja"
                          className="h-4 w-4"
                        />
                        <div className="flex items-center gap-2">
                          <LinkAja className="h-4 w-4" />
                          <Label
                            htmlFor="linkaja"
                            className="text-l-medium cursor-pointer"
                          >
                            LinkAja
                          </Label>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Referral code */}

            {!isHaveRefferalCode && (
              <div className="rounded-[20px] border border-neutral-100 p-6">
                <div>
                  <div className="mb-4 flex items-center  gap-[12px]">
                    <Image
                      src="/images/discount-shape.svg"
                      width={24}
                      height={24}
                      alt="arrow"
                    />

                    <span className="font-bold text-gray-800">
                      Kode Referral
                    </span>
                  </div>

                  <div className="mb-4 h-[1px] w-full bg-[#D2D2D1]" />

                  <p className="mb-5 font-medium text-gray-600">
                    Apakah kamu punya kode referal? pakai kode tersebut untuk
                    dapetin potongan harga!
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Masukkan kode referal"
                      className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700  placeholder:text-gray-400"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      disabled={wukalaSetting}
                    />
                    <button
                      className="cursor-pointer rounded-full bg-[#FFC100] px-6 py-2 text-sm font-semibold text-[#30302F]  transition hover:opacity-90"
                      onClick={
                        wukalaSetting
                          ? handleRemoveReferralCode
                          : handleCheckReferral
                      }
                    >
                      {wukalaSetting ? 'Hapus' : 'Cek'}
                    </button>
                  </div>
                  {referralCode && isReferralCodeChecked && (
                    <p
                      className={`mt-5 font-medium ${
                        isReferralValid ? 'text-[#00B97D]' : 'text-red-500'
                      }`}
                    >
                      {isReferralValid
                        ? `Kode referral berhasil digunakan`
                        : `Kode referral tidak valid!`}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Terms and conditions */}
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
                  {/* <Link
                    href="/legal/syarat-ketentuan"
                    className="text-m-regular text-neutral-900"
                  > */}{' '}
                  <span
                    className="cursor-pointer text-black underline"
                    onClick={() => {
                      setOpenModal(true)
                    }}
                  >
                    Syarat & Ketentuan
                  </span>
                  , dan{' '}
                  <span
                    className="cursor-pointer text-black underline"
                    onClick={() => {
                      setOpenModalPengembalian(true)
                    }}
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
                onClick={() => {
                  if (!isEmptyRoomType && termsAccepted) {
                    handleCheckout(
                      isLinkAja
                        ? {
                            linkAja: true,
                            linkAjaSyariah:
                              selectedPayment === 'linkAjaSyariah',
                          }
                        : {}
                    )
                  }
                }}
              >
                Lanjut Bayar Sekarang!
              </Button>
            </div>
          </div>

          {/* Right section - Package details */}
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
                  <h3 className="text-l-semibold">
                    {detailVariant?.package?.title}
                  </h3>
                  <div className="mt-1 flex items-start gap-2">
                    <Image
                      src={
                        detailVariant?.package?.organizationInstance
                          ?.thumbnail || Placeholder
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
                        {
                          detailVariant?.package?.organizationInstance?.city
                            ?.name
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Varian & Tipe Kamar di bawah gambar */}

              <div className="mt-2 w-full  text-left">
                <p className="text-s-regular mb-1 text-neutral-500">Varian</p>
                <p className="text-m-regular">{selectedVariant?.name}</p>
                {/* <div>
                  <p className="text-[12px] text-gray-400">Tipe Kamar</p>
                  <p className="text-[14px] font-semibold capitalize">
                    {JSON.stringify(selectedVariant?.roomType)}
                  </p>
                </div> */}
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
        </div>
      </main>
      <ModalCheckout
        open={isOpenModal}
        onOpenChange={setOpenModal}
        dataSK={dataSK}
      />
      <ModalPengembalianDana
        open={isOpenModalPengembalian}
        onOpenChange={setOpenModalPengembalian}
        parsedContent={parsedContent}
        dataRefundPolicy={dataRefundPolicy}
      />
    </div>
  )
}

export default CheckoutPage
