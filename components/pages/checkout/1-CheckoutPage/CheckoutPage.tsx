'use client'

import ModalCheckout from '@/components/pages/checkout/modal/modalCheckout'
import ModalPengembalianDana from '@/components/pages/checkout/modal/modalPengembalianDana'
import { useCheckout } from '@/contexts/checkout-context'
import { PlaneLanding, PlaneTakeoff } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CheckoutPage = () => {
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenModalPengembalian, setOpenModalPengembalian] = useState(false)
  const {
    detailVariant,
    selectedVariant,
    prebookingLoading,
    preBooking,
    paymentDetails,
    referralCode,
    setReferralCode,
    useMyData,
    handleCheckReferral,
    jamaahList,
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
    handleInputChange,
    formatNumber,
    rawInputValue,
    setRawInputValue,
    handleSliderChange,
    dataSK,
    parsedContent,
    dataRefundPolicy,
  } = useCheckout()
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Back button */}
        <div className="mb-4">
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

            <span className="font-medium">Konfirmasi Pembelian Paket</span>
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left section */}
          <div className="w-full space-y-6 lg:w-2/3">
            {/* Flight details */}
            <div className="flex flex-col justify-between rounded-[20px] border border-gray-200 bg-white p-4 md:flex-row md:items-center md:space-x-6">
              <div className="mb-4 flex items-center md:mb-0 md:w-1/2">
                <div className="mr-4 flex flex-col items-center">
                  <PlaneTakeoff size={24} color="#FFC100" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {detailVariant?.package?.departure?.from?.airport?.cityName}{' '}
                    ({detailVariant?.package?.departure?.from?.airport?.code}) →
                    {detailVariant?.package?.departure?.to?.airport?.cityName} (
                    {detailVariant?.package?.departure?.to?.airport?.code})
                  </p>
                  <p className="text-sm text-gray-400">
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
                  <PlaneLanding size={24} color="#FFC100" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {detailVariant?.package?.arrival?.from?.airport?.cityName} (
                    {detailVariant?.package?.arrival?.from?.airport?.code}) →
                    {detailVariant?.package?.arrival?.to?.airport?.cityName} (
                    {detailVariant?.package?.arrival?.to?.airport?.code})
                  </p>
                  <p className="text-sm text-gray-400">
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
            <div className="rounded-[20px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center  gap-[12px]">
                  <Image
                    src="/images/people.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />

                  <span className="font-bold text-gray-800">Data Jemaah</span>
                </div>
                {jamaahList.length !== 0 && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 accent-yellow-500"
                      checked={useMyData}
                      onChange={(e) => handleUseMyDataChange(e.target.checked)}
                    />
                    <span className="text-sm text-gray-700">
                      Tambahkan data saya sebagai data Jemaah
                    </span>
                  </div>
                )}
              </div>

              {jamaahList.map((jamaah: any) => (
                <div
                  key={jamaah.id}
                  className="mb-4 border-t border-gray-100 pt-4"
                >
                  <div className="mb-2 flex items-center">
                    <p className="text-gray-800">
                      Jemaah {jamaah.id}
                      <span className="ml-1 text-red-500">*</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <input
                      type="text"
                      placeholder="Masukkan nama Jemaah"
                      className={`w-full flex-1 rounded-full border ${
                        !jamaah.name || jamaah.name.trim() === ''
                          ? 'border-red-300'
                          : 'border-gray-300'
                      } px-4 py-2 placeholder-gray-400`}
                      value={jamaah.name || ''}
                      onChange={(e) =>
                        handleJamaahNameChange(jamaah.id, e.target.value)
                      }
                    />
                    <div className="flex w-full flex-1 gap-2">
                      <input
                        type="text"
                        placeholder="+62"
                        className={`w-full rounded-full border ${
                          !jamaah.phone || jamaah.phone.trim() === ''
                            ? 'border-red-300'
                            : 'border-gray-300'
                        } px-4 py-2 placeholder-gray-400`}
                        value={jamaah.phone || ''}
                        onChange={(e) =>
                          handleJamaahPhoneChange(jamaah.id, e.target.value)
                        }
                      />

                      <button
                        className="cursor-pointer text-gray-400 hover:text-red-500"
                        onClick={() => handleRemoveJamaah(jamaah.id)}
                      >
                        {/* Icon trash */}
                        <Image
                          src="/images/trash-omponent.svg"
                          width={24}
                          height={24}
                          alt="arrow"
                        />
                      </button>
                    </div>
                  </div>
                  {(!jamaah.name ||
                    jamaah.name.trim() === '' ||
                    !jamaah.phone ||
                    jamaah.phone.trim() === '') && (
                    <p className="mt-1 text-xs text-red-500">
                      *Data Jemaah wajib diisi
                    </p>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-center gap-4">
                {/* Garis kiri */}
                <div className="h-px max-w-[120px] flex-1 bg-gray-300" />

                {/* Tombol */}
                <button
                  onClick={handleAddJamaah}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-[#FFC100] px-4 py-1 text-sm font-semibold text-black hover:bg-[#e5e5e5]"
                >
                  <span className="text-[#1A1A1A]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" fill="black" />
                      <path
                        d="M12 8v8M8 12h8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  Tambah Jamaah
                </button>

                {/* Garis kanan */}
                <div className="h-px max-w-[120px] flex-1 bg-gray-300" />
              </div>
            </div>

            {/* Payment section */}
            <div className=" rounded-[20px] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-[12px]">
                <Image
                  src="/images/money-3.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                />

                <span className="font-bold">Jumlah Bayar</span>
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-[#D2D2D1]" />

              {/* Description */}
              <div className="mt-3 flex justify-between">
                <p className="font-medium text-gray-700">
                  Gak perlu bayar full dulu, cukup uang muka aja dulu kamu yang
                  atur!
                </p>
                <span className="text-xs whitespace-nowrap text-gray-400">
                  *uang muka minimal Rp{' '}
                  {(
                    selectedVariant.netAmount * jamaahList.length
                  ).toLocaleString('id-ID')}
                </span>
              </div>

              {/* Input & slider */}
              <div className="mt-4">
                {/* Jumlah Bayar + Sisa Pelunasan */}
                <div className="mb-4 flex items-center justify-between">
                  {/* Label + Input */}
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
                        className="w-44 rounded-full border border-gray-300 bg-white py-2 pr-4 pl-10 text-right font-medium text-gray-800 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                        value={formatNumber(rawInputValue)}
                        onChange={handleInputChange}
                        disabled={prebookingLoading}
                        onBlur={() => {
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

                  {/* Sisa Pelunasan */}
                  <span className="mt-10 flex text-sm whitespace-nowrap text-gray-600">
                    Sisa Pelunasan{' '}
                    {prebookingLoading ? (
                      <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    ) : (
                      <strong className="ml-2 text-black">
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
                    jamaahList.length > 0
                      ? selectedVariant.netAmount * jamaahList.length
                      : 0
                  }
                  max={
                    jamaahList.length > 0
                      ? preBooking?.totalPrice || totalPrice * jamaahList.length
                      : 0
                  }
                  disabled={prebookingLoading}
                  step={1000}
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-yellow-500 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:shadow"
                />
              </div>
            </div>

            {/* Referral code */}
            <div className="rounded-[20px] bg-white p-6 shadow-sm">
              <div>
                <div className="mb-4 flex items-center  gap-[12px]">
                  <Image
                    src="/images/discount-shape.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />

                  <span className="font-bold text-gray-800">Kode Referral</span>
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
                    className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 shadow-sm placeholder:text-gray-400"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    disabled={wukalaSetting}
                  />
                  <button
                    className="cursor-pointer rounded-full bg-[#FFC100] px-6 py-2 text-sm font-semibold text-[#30302F] shadow-sm transition hover:opacity-90"
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

            {/* Terms and conditions */}
            <div className="rounded-[20px] bg-white p-6 shadow-sm">
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
                  , {/* </Link> */}
                  <span
                    className="cursor-pointer text-black underline"
                    onClick={() => {
                      setOpenModalPengembalian(true)
                    }}
                  >
                    Pengembalian Dana
                  </span>
                  , dan{' '}
                  <span className="cursor-pointer text-black underline">
                    Persetujuan Pengguna
                  </span>{' '}
                  yang berlaku.
                </span>
              </div>

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

              <button
                className={`w-full rounded-[100px] py-3 font-medium ${
                  isJamaahDataValid() && termsAccepted && loading === false
                    ? 'cursor-pointer bg-yellow-500 text-[#30302F]'
                    : 'cursor-not-allowed bg-gray-300 text-gray-500'
                }`}
                disabled={loading}
                onClick={
                  isJamaahDataValid() && termsAccepted
                    ? handleCheckout
                    : undefined
                }
              >
                Lanjut Bayar Sekarang!
              </button>
            </div>
          </div>

          {/* Right section - Package details */}
          <div className="w-full lg:w-1/3">
            <div className="rounded-[20px] bg-white p-6 shadow-sm lg:sticky lg:top-20">
              <div className="mb-4 flex">
                {/* Kiri: Gambar dan info bawahnya */}
                <div className="mr-4 flex flex-col items-center">
                  <Image
                    src={detailVariant?.package?.thumbnail || ''}
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
                  <h3 className="text-[16px] font-semibold text-[#30302F]">
                    {detailVariant?.package?.title}
                  </h3>
                  <div className="mt-1 flex items-start gap-2">
                    <Image
                      src={
                        detailVariant?.package?.organizationInstance
                          ?.thumbnail || ''
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
                      <span className="text-[12px] font-medium text-[#30302F]">
                        {detailVariant?.package?.organizationInstanceName}
                      </span>
                      <p className="text-[10px] font-normal text-gray-500">
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

              <div className="mt-2 flex w-full justify-between px-10 text-center">
                <div>
                  <p className="text-[12px] text-gray-400">Varian</p>
                  <p className="text-center text-[14px] font-semibold">
                    {selectedVariant?.name}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-400">Tipe Kamar</p>
                  <p className="text-[14px] font-semibold capitalize">
                    {selectedVariant?.roomType}
                  </p>
                </div>
              </div>
              <div className="my-3 h-px bg-gray-200"></div>
              {/* Price breakdown */}
              <div>
                <h4 className="mb-3 font-medium">Rincian Harga</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Harga Paket</span>

                    <span className="font-medium">
                      Rp
                      {Number(preBooking?.subtotalPrice).toLocaleString(
                        'id-ID'
                      )}
                    </span>
                  </div>
                  {paymentDetails?.map((detail: any, index: any) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{detail.label}</span>
                      <span className="text-red-500">
                        Rp {Number(detail?.amount).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}

                  <div className="my-3 h-px bg-gray-200"></div>
                  <div className="flex justify-between font-medium">
                    <span>Sisa Pelunasan</span>
                    <span>
                      {prebookingLoading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-gray-900"></div>
                      ) : (
                        `Rp ${Number(
                          preBooking?.remainingPayment || 0
                        ).toLocaleString('id-ID')}`
                      )}
                    </span>
                  </div>
                </div>
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
