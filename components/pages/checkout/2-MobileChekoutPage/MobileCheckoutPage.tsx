'use client'

import { CashReceiptIcon } from '@/components/icons/cash-receipt'
import { InfoIcon } from '@/components/icons/info'
import { LinkAja, LinkAjaSyariah } from '@/components/icons/linkaja'
import ModalCheckout from '@/components/pages/checkout/modal/modalCheckout'
import ModalPengembalianDana from '@/components/pages/checkout/modal/modalPengembalianDana'
import SelectHotel from '@/components/pages/detail-package/2-PackageVariant/component/SelectHotel'
import DrawerPengembalianDana from '@/components/pages/detail-package/mobile/DrawerPengemalianDana'
import DrawerSK from '@/components/pages/detail-package/mobile/DrawerSK'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useCheckout } from '@/contexts/checkout-context'
import {
  formatCurrency,
  getLocalReferralCode,
  setLocalReferralCode,
} from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import renderHTML from 'react-render-html'

const MobileCheckoutPage = ({}) => {
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenModalPengembalian, setOpenModalPengembalian] = useState(false)
  const [isHaveRefferalCode, setIsHaveReferralCode] = useState(false)
  const searchParams = useSearchParams()
  const isLinkAja = sessionStorage.getItem('isLinkAja') === 'true'
  const [disabledButtonCheckout, setDisabledButtonCheckout] = useState(true)

  const {
    detailVariant,
    selectedVariant,
    preBooking,
    prebookingLoading,
    paymentDetails,
    referralCode,
    setReferralCode,
    paymentAmount,
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
    handleCheckReferral,
    handleInputChange,
    formatNumber,
    rawInputValue,
    setRawInputValue,
    handleSliderChange,
    dataSK,
    parsedContent,
    dataRefundPolicy,
    totalQty,
    isEmptyRoomType,
    setSelectedRoomType,
    setShouldRunCheckPre,
    selectedPayment,
    setSelectedPayment,
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
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center border-b border-[#E8E8E8] bg-white px-4">
        <a
          className="mr-3"
          onClick={(e) => {
            e.preventDefault()
            router.back()
          }}
        >
          <Image
            src="/images/arrow-left-2.svg"
            width={24}
            height={24}
            alt="arrow"
          />
        </a>
        <h1 className="text-l-semibold absolute left-1/2 -translate-x-1/2">
          Checkout
        </h1>
      </header>

      {/* Main content */}
      <main className="bg-white pt-5 pb-36">
        {/* Package Info */}
        <div className="m-[20px] mt-0 rounded-[20px]  border border-neutral-100 p-3">
          <h2 className="text-m-semibold mb-4 text-neutral-900">
            Detail Pembelian
          </h2>

          <div className="mb-4 flex items-center">
            <div className="mr-2">
              <Image
                src={detailVariant?.package?.thumbnail || Placeholder}
                alt="Umrah Package"
                width={80}
                height={80}
                className="rounded-lg"
                style={{
                  borderRadius: '20px',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className="w-2/3">
              <h3 className="text-s-semibold text-neutral-900">
                {detailVariant?.package?.title}
              </h3>

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

          <div className="my-2 w-full  text-left">
            <p className="text-xs-medium mb-1 text-neutral-500">Varian</p>
            <p className="text-s-regular">{selectedVariant?.name}</p>
            {/* <div>
                  <p className="text-[12px] text-gray-400">Tipe Kamar</p>
                  <p className="text-[14px] font-semibold capitalize">
                    {JSON.stringify(selectedVariant?.roomType)}
                  </p>
                </div> */}
          </div>

          <div className="flex items-center justify-between border-t border-b border-neutral-200 py-3">
            <div>
              <p className="mb-1 text-sm text-[10px] text-gray-500">
                Tanggal Berangkat
              </p>
              <p className="text-[12px] font-medium">
                {detailVariant?.departureDate &&
                  new Date(detailVariant.departureDate).toLocaleDateString(
                    'id-ID',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
              </p>
            </div>

            <div className="flex flex-col items-center px-4">
              <div className="mb-1 text-[12px] text-[#BBBBB9]">
                {detailVariant?.departureDate &&
                  detailVariant?.arrivalDate &&
                  Math.ceil(
                    (new Date(detailVariant.arrivalDate).getTime() -
                      new Date(detailVariant.departureDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + ' Hari'}
                {(!detailVariant?.departureDate ||
                  !detailVariant?.arrivalDate) &&
                  '7 Hari'}
              </div>
              <div>
                <Image
                  src={'/images/arrow-right.svg'}
                  width={60}
                  height={24}
                  alt="arrow"
                />
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm text-[10px] text-gray-500">
                Tanggal Pulang
              </p>
              <p className="text-[12px] font-medium">
                {detailVariant?.arrivalDate &&
                  new Date(detailVariant.arrivalDate).toLocaleDateString(
                    'id-ID',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
              </p>
            </div>
          </div>

          <div className="mx-5 flex justify-between py-3">
            <div className="flex items-center">
              <div className="mr-5">
                <Image
                  src="/images/pesawat-pergi.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                />
              </div>
              <div>
                <p className="text-xs-medium mb-1 text-neutral-500">
                  Keberangkatan
                </p>
                <p className="text-s-regular text-neutral-900">
                  {detailVariant?.package?.departure?.from?.airport?.code} →
                  {detailVariant?.package?.departure?.to?.airport?.code}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-5">
                <Image
                  src="/images/pesawat-pulang.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                />
              </div>
              <div>
                <p className="text-xs-medium mb-1 text-neutral-500">
                  Kedatangan
                </p>
                <p className="text-s-regular text-neutral-900">
                  {detailVariant?.package?.arrival?.from?.airport?.code} →
                  {detailVariant?.package?.arrival?.to?.airport?.code}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[4px] w-full bg-neutral-100" />
        {/* Jamaah Section */}
        <div className="bg-white p-4">
          <div className="rounded-2xl border border-neutral-100 p-3">
            <SelectHotel
              isMobile
              variant="normal"
              defaultValue={selectedVariant?.roomType}
              defaultPackageVariant={selectedVariant.variant}
              defaultPackageVariantId={selectedVariant.variantId}
              disabled={prebookingLoading}
              onChange={(roomType) => {
                setSelectedRoomType(roomType)
                setShouldRunCheckPre(true)
                setPaymentAmount(selectedVariant.netAmount)
                setRawInputValue(String(paymentAmount * totalQty))
              }}
            />
            {isEmptyRoomType && (
              <p className="text-error-500 text-s-regular mt-2">
                Harap pilih minimal 1 jemaah{' '}
              </p>
            )}
          </div>
        </div>
        <div className="h-[4px] w-full bg-neutral-100" />
        {/* Payment section */}
        <div className=" bg-white p-4">
          {/* Payment method */}
          <div className="mb-4 rounded-[16px] border border-neutral-200 bg-white p-3">
            {/* <div className="mb-3 rounded-lg bg-yellow-50 p-3">
              <p className="text-xs font-medium text-yellow-800">
                Minimal pembayaran untuk saat ini: Rp{' '}
                {(selectedVariant.netAmount * jamaahList.length).toLocaleString(
                  'id-ID'
                )}
              </p>
            </div> */}
            <div className="border-primary-500 bg-primary-100 mb-4 rounded-[12px] border p-2.5">
              <div className="flex items-center">
                <div className="text-primary-500 flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 6.55228 10.5523 7 10 7C9.44772 7 9 6.55228 9 6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6ZM10 9C9.44772 9 9 9.44772 9 10V14C9 14.5523 9.44772 15 10 15C10.5523 15 11 14.5523 11 14V10C11 9.44772 10.5523 9 10 9Z"
                    />
                  </svg>
                </div>
                <p className="text-xs-regular ml-2 text-neutral-900">
                  Minimal pembayaran uang muka adalah{' '}
                  {formatCurrency(selectedVariant.netAmount)}/orang
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-3 flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full">
                  <Image
                    src="/images/money-3.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />
                </div>
                <p className="text-m-semibold ml-2 text-neutral-900">
                  Jumlah Bayar
                </p>
              </div>
            </div>

            <p className="text-s-regular mt-2 text-neutral-900">
              Gak perlu bayar full dulu, cukup uang muka aja dulu kamu yang
              atur!
            </p>

            <div className="mt-3">
              <div className="flex items-center space-x-4">
                <label className="text-xs-medium">Jumlah Bayar</label>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                    Rp
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="w-44 rounded-full border border-gray-300 bg-white py-2 pr-4 pl-10 text-left font-medium text-gray-800 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                    value={formatNumber(rawInputValue)}
                    onChange={handleInputChange}
                    disabled={prebookingLoading}
                    onBlur={() => {
                      const value = parseInt(rawInputValue) || 0
                      const minAmount = selectedVariant.netAmount * totalQty
                      const maxAmount = isLinkAja
                        ? 20000000
                        : preBooking?.totalPrice || totalPrice * totalQty

                      if (value >= minAmount && value <= maxAmount) {
                        setSliderValue(value)
                        const perJamaahAmount = Math.ceil(value / totalQty)
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
                        const minAmount = selectedVariant.netAmount * totalQty
                        const maxAmount =
                          preBooking?.totalPrice || totalPrice * totalQty

                        if (value >= minAmount && value <= maxAmount) {
                          setSliderValue(value)
                          const perJamaahAmount = Math.ceil(value / totalQty)
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
              <input
                type="range"
                min={totalQty > 0 ? selectedVariant.netAmount * totalQty : 0}
                max={
                  totalQty > 0
                    ? preBooking?.totalPrice || totalPrice * totalQty
                    : 0
                }
                disabled={prebookingLoading}
                step={1000}
                value={sliderValue}
                onChange={handleSliderChange}
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-yellow-500"
              />

              <div className="mt-3">
                <div className="mt-1 flex items-center gap-3 text-sm">
                  <span className="text-xs-medium text-neutral-900">
                    Sisa Pelunasan
                  </span>
                  {prebookingLoading ? (
                    <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
                  ) : (
                    <span className="text-s-medium text-neutral-900">
                      {formatCurrency(preBooking?.remainingPayment || 0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Points & Referral */}
          {/* <div className="mb-4 rounded-lg border border-neutral-200 p-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 accent-yellow-400"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
              />
              <p className="font-medium">Poin Muslim</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Gunakan 1.200.000 poin Muslim
            </p>
          </div> */}

          {!isHaveRefferalCode && (
            <div className="mb-4 rounded-[16px] border border-neutral-100 p-3">
              <div className="flex items-center">
                <Image
                  src="/images/discount-shape.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                />
                <p className="text-m-semibold ml-2">Kode Referral</p>
              </div>
              <p className="text-s-regular mt-2 mb-3 text-neutral-900">
                Apakah kamu punya kode referral? pakai kode untuk dapatkan
                diskon!
              </p>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan kode referral"
                  className="flex-1 rounded-[100px] border border-gray-300 px-3 py-2 text-sm"
                  value={referralCode}
                  disabled={wukalaSetting}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
                <button
                  className="cursor-pointer rounded-[100px] bg-yellow-400 px-4 py-2 text-sm font-medium"
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
          )}
          {/* 
          <div className="mb-4 flex items-center justify-between rounded-lg border border-neutral-200 p-3">
            <div className="flex items-center">
              <div className="mr-3 text-yellow-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-sm">Kamu memiliki 2 kupon promo</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div> */}
        </div>
        <div className="h-[4px] w-full bg-[#D2D2D1]" />
        {/* Payment Summary */}
        <div className="bg-white px-4 pt-4">
          <div className="rounded-[16px] border border-neutral-200 p-3">
            <h2 className="text-m-semibold mb-3">Rincian Pembayaran</h2>
            <div className="space-y-2 text-sm">
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
              <p
                className={`text-s-regular bg-info-100 text-info-800 mt-3 flex items-center rounded-lg px-3 py-2`}
              >
                <InfoIcon className="text-info-800 mr-2" size={20} />
                Jumlah yang dibayar setelah melakukan pembayaran uang muka.
              </p>
            </div>
          </div>
        </div>
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
                      <LinkAjaSyariah
                        className="h-4 w-4"
                        id="linkajaSyariahIcon"
                      />
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
                      <LinkAja className="h-4 w-4" id="linkajaIcon" />
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
        <div className="bg-white p-4">
          <div className="mb-2 flex rounded-[16px] border border-neutral-200 bg-white p-3">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 accent-yellow-500"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span className="text-s-regular text-neutral-500">
              Dengan memesan, anda menyetujui{' '}
              {/* <Link
                    href="/legal/syarat-ketentuan"
                    className="text-m-regular text-neutral-900"
                  > */}{' '}
              <DrawerSK dataSk={dataSK}>
                <span
                  className="cursor-pointer text-black"
                  // onClick={() => {
                  //   setOpenModal(true)
                  // }}
                >
                  Syarat & Ketentuan
                </span>
              </DrawerSK>
              , dan{' '}
              <DrawerPengembalianDana
                parsedContent={parsedContent}
                dataRefundPolicy={dataRefundPolicy}
              >
                <span
                  className="cursor-pointer text-black"
                  // onClick={() => {
                  //   setOpenModalPengembalian(true)
                  // }}
                >
                  Pengembalian Dana
                </span>
              </DrawerPengembalianDana>{' '}
              yang berlaku.
            </span>
          </div>
          {!termsAccepted && (
            <p className="text-error-500 text-s-regular">
              *Harap setujui syarat & ketentuan
            </p>
          )}
        </div>
      </main>

      {/* Bottom Bar */}
      <div
        className="fixed right-0 bottom-0 left-0 z-10 flex items-center justify-between bg-white p-4"
        style={{ boxShadow: '0px -4px 24px 0px rgba(0, 0, 0, 0.1)' }}
      >
        <div>
          <p className="text-xs-medium text-neutral-500">Total</p>
          {prebookingLoading ? (
            <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
          ) : (
            <p className="text-m-semibold">
              Rp {sliderValue.toLocaleString('id-ID')}
            </p>
          )}
        </div>
        {/* {isEmptyRoomType && !termsAccepted && loading === false
          ? 'cursor-pointer bg-yellow-500 text-[#30302F]'
          : 'cursor-not-allowed bg-gray-300 text-gray-500'} */}
        <Button
          onClick={() => {
            if (!isEmptyRoomType && termsAccepted) {
              handleCheckout({
                linkAja: true,
                linkAjaSyariah: selectedPayment === 'linkAjaSyariah',
              })
            }
          }}
          disabled={disabledButtonCheckout}
          className=" px-6 py-3 "
        >
          <span className="text-m-medium text-neutral-900">Pesan Sekarang</span>
        </Button>
      </div>
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

export default MobileCheckoutPage
