'use client'

import { useCheckout } from '@/contexts/checkout-context'
import { ArrowLeft, CreditCard, PlaneLanding, PlaneTakeoff } from 'lucide-react'
import Image from 'next/image'

const CheckoutPage = () => {
  const {
    detailVariant,
    selectedVariant,
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
  } = useCheckout()

  // Add state for terms and conditions checkbox

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Back button */}
        <div className="mb-4">
          <button className="flex items-center text-gray-800">
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Konfirmasi Pembelian Paket</span>
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left section */}
          <div className="w-full space-y-6 lg:w-2/3">
            {/* Flight details */}
            <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:space-x-6">
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
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 rounded bg-gray-200 p-1">
                    <svg
                      className="h-4 w-4 text-black"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="font-bold text-gray-800">Data Jemaah</span>
                </div>
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
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => handleRemoveJamaah(jamaah.id)}
                        disabled={jamaahList.length <= 1} // Prevent removing if there's only one jamaah
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 11v6M14 11v6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
                  className="flex items-center gap-2 rounded-full border border-[#FFC100] px-4 py-1 text-sm font-semibold text-black"
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
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <div className="mr-2 rounded bg-gray-200 p-1">
                  <CreditCard size={16} />
                </div>
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
                <div className="mb-4 flex items-center space-x-4">
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
                      className="w-44 rounded-full border border-gray-300 bg-white py-2 pr-4 pl-10 text-right font-medium text-gray-800 shadow-sm"
                      value={sliderValue.toLocaleString('id-ID')} // Display the total amount from slider
                      onChange={(e) => {
                        const value =
                          parseInt(e.target.value.replace(/\D/g, '')) || 0
                        const minAmount =
                          selectedVariant.netAmount * jamaahList.length
                        const maxAmount =
                          preBooking?.totalPrice ||
                          totalPrice * jamaahList.length

                        if (value >= minAmount && value <= maxAmount) {
                          setSliderValue(value) // Update slider position

                          // Calculate per-jamaah amount
                          const perJamaahAmount = Math.ceil(
                            value / jamaahList.length
                          )
                          setPaymentAmount(perJamaahAmount) // Update payment amount per jamaah
                        }
                      }}
                    />
                  </div>
                </div>

                <input
                  type="range"
                  min={selectedVariant.netAmount * jamaahList.length} // Min is net amount × number of jamaah
                  max={preBooking?.totalPrice || totalPrice * jamaahList.length}
                  // step={2000000}
                  value={sliderValue} // Use the dedicated slider state
                  onChange={(e) => {
                    const value = parseInt(e.target.value)
                    setSliderValue(value) // Update slider position

                    // Calculate per-jamaah amount
                    const perJamaahAmount = Math.ceil(value / jamaahList.length)
                    setPaymentAmount(perJamaahAmount) // Update payment amount per jamaah
                  }}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-yellow-500 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:shadow"
                />

                <div className="mt-2 flex justify-end">
                  <span className="text-sm text-gray-600">
                    Sisa Pelunasan{' '}
                    <strong className="text-black">
                      Rp{' '}
                      {Number(preBooking?.remainingPayment || 0).toLocaleString(
                        'id-ID'
                      )}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Referral code */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div>
                <div className="mb-4 flex items-center">
                  <div className="mr-2 rounded bg-gray-200 p-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
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
                    className="rounded-full bg-[#FFC100] px-6 py-2 text-sm font-semibold text-[#30302F] shadow-sm transition hover:opacity-90"
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
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 accent-yellow-500"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span className="text-sm text-gray-600">
                  Dengan memesan, anda menyetujui{' '}
                  <span className="text-blue-500">Syarat & Ketentuan</span>,{' '}
                  <span className="text-blue-500">Pengembalian Dana</span>, dan{' '}
                  <span className="text-blue-500">Persetujuan Pengguna</span>{' '}
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
                className={`w-full rounded-md py-3 font-medium ${
                  isJamaahDataValid() && termsAccepted
                    ? 'cursor-pointer bg-yellow-500 text-[#30302F]'
                    : 'cursor-not-allowed bg-gray-300 text-gray-500'
                }`}
                disabled={!isJamaahDataValid() || !termsAccepted}
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
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex">
                <div className="mr-4">
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
                <div>
                  <h3 className="font-bold">{detailVariant?.package?.title}</h3>
                  <div className="flex items-start gap-2">
                    <Image
                      src={
                        detailVariant?.package?.organizationInstance
                          ?.thumbnail || ''
                      }
                      alt="Umrah Package"
                      width={30}
                      height={30}
                      className="rounded-lg"
                      style={{
                        borderRadius: '20px',
                        objectFit: 'cover',
                        marginTop: '5px',
                      }}
                    />

                    <div>
                      <div className="mt-1 flex items-center">
                        <span className="text-xs">
                          {detailVariant?.package?.organizationInstanceName}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {
                          detailVariant?.package?.organizationInstance?.city
                            ?.name
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                      Rp{' '}
                      {Number(preBooking?.remainingPayment || 0).toLocaleString(
                        'id-ID'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CheckoutPage
