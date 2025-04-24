/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useCheckout } from '@/contexts/checkout-context'
import { ArrowLeft, Check, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const MobileCheckoutPage = ({}) => {
  const [usePoints, setUsePoints] = useState(false)

  const {
    token,
    detailVariant,
    selectedVariant,
    preBooking,
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
  } = useCheckout()

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-white px-4">
        <button className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-base font-medium">Checkout</h1>
      </header>

      {/* Main content */}
      <main className="pb-36">
        {/* Package Info */}
        <div className="bg-white p-4">
          <h2 className="mb-2 text-sm font-medium">Detail Pembelian</h2>
          <div className="flex items-start">
            <div className="mr-3 h-16 w-16 overflow-hidden rounded-md bg-gray-200">
              <Image
                src={
                  detailVariant?.package?.organizationInstance?.thumbnail || ''
                }
                alt="Package"
                width={64}
                height={64}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-medium">
                {detailVariant?.package?.title}
              </h3>
              <div className="mb-1 flex items-center">
                <p className="mr-1 text-sm font-bold text-black">
                  Rp{Number(selectedVariant?.price).toLocaleString('id-ID')}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500">Travel</p>
                  <p className="text-xs font-medium">
                    {' '}
                    {detailVariant?.package?.organizationInstanceName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500">
                    Tanggal Perjalanan
                  </p>
                  <p className="text-xs font-medium">19 Januari 2025</p>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-[11px]">
                <div className="flex items-center">
                  <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 9.5L12 16.5L5 9.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  CGK → JED
                </div>
                <div className="flex items-center">
                  <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 14.5L12 7.5L19 14.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  JED → CGK
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jamaah Section */}
        <div className="mt-4 bg-white p-4">
          <div className="mt-4 space-y-3">
            {jamaahList.map((jamaah: any, index: any) => (
              <div
                key={jamaah.id}
                className="rounded-xl border border-gray-200 bg-white"
              >
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-green-100 p-1">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      Jamaah {index + 1}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setJamaahList(
                        jamaahList.filter((_: any, i: any) => i !== index)
                      )
                    }
                    className="rounded-full bg-red-500 p-1"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2 border-t px-4 py-3 text-sm">
                  <div className="flex flex-col">
                    <label
                      htmlFor={`name-${jamaah.id}`}
                      className="mb-1 text-xs text-gray-500"
                    >
                      Nama Jamaah
                    </label>
                    <input
                      type="text"
                      id={`name-${jamaah.id}`}
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Nama Jamaah"
                      value={jamaah.name}
                      onChange={(e) => {
                        const newList = [...jamaahList]
                        newList[index].name = e.target.value
                        setJamaahList(newList)
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`phone-${jamaah.id}`}
                      className="mb-1 text-xs text-gray-500"
                    >
                      No Telepon
                    </label>
                    <input
                      type="text"
                      id={`phone-${jamaah.id}`}
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                      placeholder="08xxxxxxxxxx"
                      value={jamaah.phone}
                      onChange={(e) => {
                        const newList = [...jamaahList]
                        newList[index].phone = e.target.value
                        setJamaahList(newList)
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-sm font-medium">Tambah Jamaah</h2>
            <button
              onClick={handleAddJamaah}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Payment section */}
        <div className="mt-4 bg-white p-4">
          <div className="mb-3 rounded-lg bg-yellow-50 p-3">
            <p className="text-xs font-medium text-yellow-800">
              Minimal pembayaran untuk saat ini: Rp{' '}
              {(selectedVariant.netAmount * jamaahList.length).toLocaleString(
                'id-ID'
              )}
            </p>
          </div>
          {/* Payment method */}
          <div className="mb-4 rounded-lg border border-yellow-400 bg-white p-3">
            <div className="flex items-center">
              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400">
                <Check size={14} className="text-white" />
              </div>
              <div>
                <p className="font-medium">Jumlah Bayar</p>
                <p className="text-xs text-gray-500">
                  Pilih jumlah yang ingin dibayar, minimal uang muka dulu.
                </p>
              </div>
            </div>
            <div className="mt-3">
              <p className="mb-1 text-sm font-medium">Jumlah Bayar</p>
              <div className="mb-3 flex h-10 items-center rounded-lg border border-gray-300 px-3">
                <span className="mr-2 text-gray-500">Rp</span>
                <input
                  type="text"
                  className="flex-1 bg-transparent text-right outline-none"
                  value={sliderValue.toLocaleString('id-ID')} // Display the total amount from slider
                  onChange={(e) => {
                    const value =
                      parseInt(e.target.value.replace(/\D/g, '')) || 0
                    const minAmount =
                      selectedVariant.netAmount * jamaahList.length
                    const maxAmount =
                      preBooking?.totalPrice || totalPrice * jamaahList.length

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
              <input
                type="range"
                min={selectedVariant.netAmount * jamaahList.length} // Min is net amount × number of jamaah
                max={preBooking?.totalPrice || totalPrice * jamaahList.length}
                value={sliderValue} // Use the dedicated slider state
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  setSliderValue(value) // Update slider position

                  // Calculate per-jamaah amount
                  const perJamaahAmount = Math.ceil(value / jamaahList.length)
                  setPaymentAmount(perJamaahAmount) // Update payment amount per jamaah
                }}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-yellow-500"
              />
              <div className="mt-2 flex justify-between text-xs">
                <span>
                  Rp
                  {(
                    selectedVariant.netAmount * jamaahList.length
                  ).toLocaleString('id-ID')}
                </span>
                <span>
                  Rp
                  {(
                    preBooking?.totalPrice || totalPrice * jamaahList.length
                  ).toLocaleString('id-ID')}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>Jumlah Bayar</span>
                  <span className="font-medium">
                    Rp {sliderValue.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                  <span>Sisa Pelunasan</span>
                  <span className="font-medium">
                    {Number(preBooking?.remainingPayment || 0).toLocaleString(
                      'id-ID'
                    )}
                  </span>
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

          <div className="mb-4 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 accent-yellow-400"
              />
              <p className="font-medium">Kode Referral</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Apakah kamu punya kode referral? pakai kode untuk dapatkan diskon!
            </p>
            <div className="mt-2 flex">
              <input
                type="text"
                placeholder="Masukkan kode referral"
                className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 text-sm"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              <button className="rounded-r-lg bg-yellow-400 px-4 py-2 text-sm font-medium">
                Cek
              </button>
            </div>
          </div>
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

        {/* Payment Summary */}
        <div className="mt-4 bg-white p-4">
          <h2 className="mb-3 text-sm font-medium">Ringkasan Pembayaran</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">
                Total Harga Paket ({jamaahList.length} Jamaah)
              </span>
              <span>
                Rp {Number(preBooking?.subtotalPrice).toLocaleString('id-ID')}
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
          <div className="mt-4 text-xs text-gray-500">
            <p>
              Dengan meneruskan, saya menyetujui{' '}
              <span className="text-blue-500">
                Syarat & Ketentuan Pengembangan Dana
              </span>
              , dan{' '}
              <span className="text-blue-500">
                Persetujuan Pengguna yang berlaku.
              </span>
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed right-0 bottom-0 left-0 z-10 flex items-center justify-between border-t bg-white p-4">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-bold">
            Rp{paymentAmount.toLocaleString('id-ID')}
          </p>
        </div>
        <button className="rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold text-white shadow">
          Lanjutkan Pembayaran
        </button>
      </div>
    </div>
  )
}

export default MobileCheckoutPage
