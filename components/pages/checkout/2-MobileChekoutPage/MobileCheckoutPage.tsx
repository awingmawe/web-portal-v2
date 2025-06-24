/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import ModalCheckout from '@/components/pages/checkout/modal/modalCheckout'
import ModalPengembalianDana from '@/components/pages/checkout/modal/modalPengembalianDana'
import CheckoutDrawerAddJamaah from '@/components/pages/detail-package/mobile/DrawerAddJamaah'
import CheckoutDrawerFormJamaah from '@/components/pages/detail-package/mobile/DrawerFormAddJamaah'
import DrawerPengembalianDana from '@/components/pages/detail-package/mobile/DrawerPengemalianDana'
import DrawerSK from '@/components/pages/detail-package/mobile/DrawerSK'
import { useCheckout } from '@/contexts/checkout-context'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { Plus, Trash2, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const MobileCheckoutPage = ({}) => {
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenModalPengembalian, setOpenModalPengembalian] = useState(false)
  const [isHaveRefferalCode, setIsHaveReferralCode] = useState(false)
  const searchParams = useSearchParams()

  const {
    token,
    detailVariant,
    selectedVariant,
    preBooking,
    prebookingLoading,
    setPreBooking,
    paymentDetails,
    setPaymentDetails,
    referralCode,
    setReferralCode,
    useMyData,
    setUseMyData,
    jamaahList,
    setJamaahList,
    paymentAmount,
    setPaymentAmount,
    totalPrice,
    handleAddJamaah,
    handleJamaahNameChange,
    handleJamaahPhoneChange,
    handleRemoveJamaah,
    sliderValue,
    setSliderValue,
    handleUseMyDataChange,
    handleCheckout,
    termsAccepted,
    setTermsAccepted,
    isJamaahDataValid,
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
    handleUseMyDataChangeMobile,
    setNoTlpn,
    setNama,
    nama,
    noTlpn,
    handleSimpanMobile,
    handleEditMobile,
  } = useCheckout()
  const router = useRouter()

  useEffect(() => {
    const referralCodeFromParams = searchParams.get('referralCode')
    const currentReferralCodeFromStorage =
      sessionStorage.getItem('referralCode')
    if (referralCodeFromParams) {
      sessionStorage.setItem('referralCode', referralCodeFromParams)
      setReferralCode(referralCodeFromParams)
      setIsHaveReferralCode(true)
    } else if (currentReferralCodeFromStorage) {
      setReferralCode(currentReferralCodeFromStorage)
      setIsHaveReferralCode(true)
    }
  }, [searchParams, setReferralCode])

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
        <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-medium">
          Checkout
        </h1>
      </header>

      {/* Main content */}
      <main className="pb-36">
        {/* Package Info */}
        <div className="m-[20px] rounded-[20px] bg-white p-2 shadow-sm">
          <h2 className="mb-4 text-[14px] font-medium text-gray-800">
            Detail Pembelian
          </h2>

          <div className="mb-4 flex">
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
              <h3 className="text-[12px] font-medium text-gray-800">
                {detailVariant?.package?.title}
              </h3>

              <div className="mt-1 flex items-center">
                <p className="text-[14px] font-bold">
                  {' '}
                  Rp
                  {Number(selectedVariant?.price).toLocaleString('id-ID')}
                </p>
                <span className="ml-1 text-[10px] text-gray-500">/orang</span>
              </div>

              {/* <div className="mt-1 flex items-center">
                <p className="text-sm text-gray-500 line-through">
                  Rp56.000.000
                </p>
                <span className="ml-2 rounded bg-red-500 px-2 py-0.5 text-xs text-white">
                  -5%
                </span>
              </div> */}
            </div>
          </div>

          <div className="flex border-b border-gray-200 py-2">
            <div className="w-1/2 text-center">
              <p className="mb-1 text-[10px] text-gray-500">Varian</p>
              <p className="text-[12px] font-medium">
                {' '}
                {selectedVariant?.name}
              </p>
            </div>
            <div className="w-1/2 text-center">
              <p className="mb-1 text-[10px] text-gray-500">Tipe Kamar</p>
              <p className="text-[12px] font-medium capitalize">
                {' '}
                {selectedVariant?.roomType}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 py-3">
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

          <div className="ml-[4px] flex justify-between py-3">
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
                <p className="mb-1 text-[12px] text-gray-500">Keberangkatan</p>
                <p className="text-[14px] font-medium">
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
                <p className="mb-1 text-[12px] text-gray-500">Kedatangan</p>
                <p className="text-[14px] font-medium">
                  {detailVariant?.package?.arrival?.from?.airport?.code} →
                  {detailVariant?.package?.arrival?.to?.airport?.code}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[4px] w-full bg-[#D2D2D1]" />
        {/* Jamaah Section */}
        <div className="bg-white p-4">
          {jamaahList.map((jamaah: any, index: any) => (
            <div
              className="mt-4 h-[121px] space-y-3 rounded-[20px] border border-gray-200"
              key={index}
            >
              <div key={jamaah.id} className="mb-4 overflow-hidden rounded-xl ">
                <div className="flex h-[52px] w-full overflow-hidden rounded-xl border border-gray-200">
                  {/* Bagian kiri - ditimpa ke bagian kanan */}
                  <div className="z-10 -mr-[15px] flex flex-1 items-center justify-between rounded-tr-[20px] rounded-br-[20px] bg-white px-3">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">
                        Data Jemaah {index + 1}
                      </span>
                    </div>
                    <CheckoutDrawerFormJamaah
                      setNoTlpn={setNoTlpn}
                      text={'Edit'}
                      setNama={setNama}
                      data={jamaah}
                      nama={nama}
                      noTlpn={noTlpn}
                      handleSimpanMobile={() => {
                        handleEditMobile(jamaah)
                        setNama('')
                        setNoTlpn('')
                      }}
                    >
                      <Image
                        src={'/images/edit.svg'}
                        width={20}
                        height={20}
                        alt="arrow"
                      />
                    </CheckoutDrawerFormJamaah>
                  </div>

                  {/* Tombol hapus */}
                  <div
                    className="relative z-0 flex w-[60px] items-center justify-center rounded-tr-xl rounded-br-xl bg-red-500 text-white"
                    onClick={() => handleRemoveJamaah(jamaah.id)}
                  >
                    <Trash2 size={24} className="ml-4" />
                  </div>
                </div>

                <div className="mt-2 bg-gray-50 p-2">
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="text-sm text-gray-500">Nama Jemaah</div>
                    <div className="text-right text-sm font-medium">
                      {jamaah.name}
                    </div>
                    <div className="text-sm text-gray-500">Nomor Telepon</div>
                    <div className="text-right text-sm font-medium">
                      {jamaah.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 rounded-[16px] border border-gray-200 bg-white p-3">
            <CheckoutDrawerAddJamaah
              handleUseMyDataChangeMobile={handleUseMyDataChangeMobile}
              setNoTlpn={setNoTlpn}
              setNama={setNama}
              nama={nama}
              noTlpn={noTlpn}
              handleSimpanMobile={handleSimpanMobile}
            >
              {/* <button
              // onClick={handleAddJamaah}
              > */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium">Tambah Jamaah</h2>
                <Plus size={16} />
              </div>
              {/* </button> */}
            </CheckoutDrawerAddJamaah>
          </div>
        </div>
        <div className="h-[4px] w-full bg-[#D2D2D1]" />
        {/* Payment section */}
        <div className=" bg-white p-4">
          {/* Payment method */}
          <div className="mb-4 rounded-[16px] border border-gray-200 bg-white p-3">
            {/* <div className="mb-3 rounded-lg bg-yellow-50 p-3">
              <p className="text-xs font-medium text-yellow-800">
                Minimal pembayaran untuk saat ini: Rp{' '}
                {(selectedVariant.netAmount * jamaahList.length).toLocaleString(
                  'id-ID'
                )}
              </p>
            </div> */}
            <div className="mb-4 rounded-[12px] border border-yellow-100 bg-yellow-50 p-3">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-yellow-500">
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
                <p className="ml-2 text-sm font-medium text-yellow-800">
                  Minimal pembayaran uang muka adalah Rp
                  {(
                    selectedVariant.netAmount * jamaahList.length
                  ).toLocaleString('id-ID')}
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
                <p className="ml-2 font-medium">Jumlah Bayar</p>
              </div>
            </div>

            <p className="mt-2 text-[12px] text-[#30302F]">
              Gak perlu bayar full dulu, cukup uang muka aja dulu kamu yang
              atur!
            </p>

            <div className="mt-3">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium whitespace-nowrap text-gray-700">
                  Jumlah Bayar
                </label>
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
                      const minAmount =
                        selectedVariant.netAmount * jamaahList.length
                      const maxAmount =
                        preBooking?.totalPrice || totalPrice * jamaahList.length

                      if (value >= minAmount && value <= maxAmount) {
                        setSliderValue(value)
                        const perJamaahAmount = Math.ceil(
                          value / jamaahList.length
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
                          selectedVariant.netAmount * jamaahList.length
                        const maxAmount =
                          preBooking?.totalPrice ||
                          totalPrice * jamaahList.length

                        if (value >= minAmount && value <= maxAmount) {
                          setSliderValue(value)
                          const perJamaahAmount = Math.ceil(
                            value / jamaahList.length
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
              <input
                type="range"
                min={selectedVariant.netAmount * jamaahList.length} // Min is net amount × number of jamaah
                max={preBooking?.totalPrice || totalPrice * jamaahList.length}
                step={1000}
                value={sliderValue} // Use the dedicated slider state
                onChange={handleSliderChange}
                disabled={prebookingLoading}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-yellow-500"
              />

              <div className="mt-3">
                <div className="mt-1 flex justify-between text-sm">
                  <span>Sisa Pelunasan</span>
                  {prebookingLoading ? (
                    <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
                  ) : (
                    <span className="font-medium">
                      Rp
                      {Number(preBooking?.remainingPayment || 0).toLocaleString(
                        'id-ID'
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Points & Referral */}
          {/* <div className="mb-4 rounded-lg border border-gray-200 p-3">
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

          {isHaveRefferalCode && (
            <div className="mb-4 rounded-[16px] border border-gray-200 p-3">
              <div className="flex items-center">
                <Image
                  src="/images/discount-shape.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                />
                <p className="ml-2 font-medium">Kode Referral</p>
              </div>
              <p className="mt-1 text-xs text-gray-500">
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
          <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-200 p-3">
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
        <div className="bg-white p-4">
          <div className="rounded-[16px] border border-gray-200 p-3">
            <h2 className="mb-3 text-sm font-medium">Ringkasan Pembayaran</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Total Harga Paket ({jamaahList.length} Jamaah)
                </span>
                <span className="flex">
                  Rp{' '}
                  {prebookingLoading ? (
                    <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
                  ) : Number(preBooking?.subtotalPrice) ? (
                    Number(preBooking.subtotalPrice).toLocaleString('id-ID')
                  ) : (
                    '0'
                  )}
                </span>
              </div>
              {paymentDetails?.map((detail: any, index: any) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-500">{detail.label}</span>
                  <span className="text-red-500">
                    Rp{Number(detail?.amount).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}

              <div className="my-2 h-px bg-gray-200" />
              <div className="flex justify-between font-medium">
                <span>Total Pelunasan</span>
                <span>
                  Rp{' '}
                  {Number(preBooking?.remainingPayment || 0).toLocaleString(
                    'id-ID'
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4">
          <div className="mb-4 rounded-[16px] border border-gray-200 bg-white p-2">
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
              <DrawerSK dataSk={dataSK}>
                <span
                  className="cursor-pointer text-black underline"
                  // onClick={() => {
                  //   setOpenModal(true)
                  // }}
                >
                  Syarat & Ketentuan
                </span>
              </DrawerSK>
              , {/* </Link> */}
              <DrawerPengembalianDana
                parsedContent={parsedContent}
                dataRefundPolicy={dataRefundPolicy}
              >
                <span
                  className="cursor-pointer text-black underline"
                  // onClick={() => {
                  //   setOpenModalPengembalian(true)
                  // }}
                >
                  Pengembalian Dana
                </span>
              </DrawerPengembalianDana>
              , dan{' '}
              <span className="cursor-pointer text-black underline">
                Persetujuan Pengguna
              </span>{' '}
              yang berlaku.
            </span>
          </div>
        </div>
      </main>
      {!isJamaahDataValid() && (
        <p className="mb-2 text-sm text-red-500">
          *Harap lengkapi data Jamaah terlebih dahulu
        </p>
      )}

      {isJamaahDataValid() && !termsAccepted && (
        <p className="mb-2 text-sm text-red-500">
          *Harap setujui syarat & ketentuan
        </p>
      )}
      {/* Bottom Bar */}
      <div className="fixed right-0 bottom-0 left-0 z-10 flex items-center justify-between border border-t border-neutral-200 bg-white p-4">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          {prebookingLoading ? (
            <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
          ) : (
            <p className="text-lg font-bold">
              Rp {sliderValue.toLocaleString('id-ID')}
            </p>
          )}
        </div>
        <button
          className={`${
            isJamaahDataValid() && termsAccepted && loading === false
              ? 'cursor-pointer bg-yellow-500 text-[#30302F]'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          } rounded-[100px]  px-6 py-3 text-sm font-semibold text-white shadow`}
          disabled={loading || !isJamaahDataValid() || !termsAccepted}
          onClick={
            isJamaahDataValid() && termsAccepted ? handleCheckout : undefined
          }
        >
          Pesan Sekarang
        </button>
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
