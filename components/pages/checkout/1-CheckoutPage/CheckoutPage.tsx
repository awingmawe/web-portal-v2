'use client'

import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  PlaneLanding,
  PlaneTakeoff,
} from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

interface CheckoutProps {
  token?: string
}

const CheckoutPage: React.FC<CheckoutProps> = ({}) => {
  const minPayment = 5000000
  const totalPrice = 118000000
  const [paymentAmount, setPaymentAmount] = useState(minPayment)
  const [referralCode, setReferralCode] = useState('')
  const [useMyData, setUseMyData] = useState(false)
  const [jamaahList, setJamaahList] = useState([{ id: 1, name: '', phone: '' }])

  const handleAddJamaah = () => {
    const newId = jamaahList.length + 1
    setJamaahList([...jamaahList, { id: newId, name: '', phone: '' }])
  }

  const handleJamaahNameChange = (id: any, value: any) => {
    const updatedList = jamaahList.map((jamaah) =>
      jamaah.id === id ? { ...jamaah, name: value } : jamaah
    )
    setJamaahList(updatedList)
  }

  const handleJamaahPhoneChange = (id: any, value: any) => {
    const updatedList = jamaahList.map((jamaah) =>
      jamaah.id === id ? { ...jamaah, phone: value } : jamaah
    )
    setJamaahList(updatedList)
  }

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, '')) || 0
    if (value >= minPayment && value <= totalPrice) {
      setPaymentAmount(value)
    }
  }
  const handleRemoveJamaah = (id: number) => {
    setJamaahList((prev) => prev.filter((j) => j.id !== id))
  }
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
                    Jakarta (CGK) → Jeddah (JED)
                  </p>
                  <p className="text-sm text-gray-400">Rabu, 03 Januari 2025</p>
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
                    Jeddah (JED) → Jakarta (CGK)
                  </p>
                  <p className="text-sm text-gray-400">Rabu, 10 Januari 2025</p>
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
                    onChange={(e) => setUseMyData(e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">
                    Tambahkan data saya sebagai data Jemaah
                  </span>
                </div>
              </div>

              {jamaahList.map((jamaah) => (
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
                      className="w-full flex-1 rounded-full border border-gray-300 px-4 py-2 placeholder-gray-400"
                      value={jamaah.name}
                      onChange={(e) =>
                        handleJamaahNameChange(jamaah.id, e.target.value)
                      }
                    />
                    <div className="flex w-full flex-1 gap-2">
                      <input
                        type="text"
                        placeholder="+62"
                        className="w-full rounded-full border border-gray-300 px-4 py-2 placeholder-gray-400"
                        value={jamaah.phone}
                        onChange={(e) =>
                          handleJamaahPhoneChange(jamaah.id, e.target.value)
                        }
                      />
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => handleRemoveJamaah(jamaah.id)}
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
                  *uang muka minimal Rp{minPayment.toLocaleString('id-ID')}
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
                      value={paymentAmount.toLocaleString('id-ID')}
                      onChange={handlePaymentInputChange}
                    />
                  </div>
                </div>

                <input
                  type="range"
                  min={minPayment}
                  max={totalPrice}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-yellow-500 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:shadow"
                />

                <div className="mt-2 flex justify-end">
                  <span className="text-sm text-gray-600">
                    Sisa Pelunasan{' '}
                    <strong className="text-black">
                      Rp{(totalPrice - paymentAmount).toLocaleString('id-ID')}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Point section */}
            {/* <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 accent-yellow-500"
                  />
                  <span className="font-medium">Poin Muslim</span>
                </div>
                <p className="mt-2 text-gray-600">
                  Gunakan 1.200.000 poin Muslim
                </p>
              </div>
            </div> */}

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
                  />
                  <button
                    className="rounded-full bg-[#FFC100] px-6 py-2 text-sm font-semibold text-[#30302F] shadow-sm transition hover:opacity-90"
                    // onClick={handleCheckReferral}
                  >
                    Cek
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 accent-yellow-500"
                />
                <span className="text-sm text-gray-600">
                  Dengan memesan, anda menyetujui{' '}
                  <span className="text-blue-500">Syarat & Ketentuan</span>,{' '}
                  <span className="text-blue-500">Pengembalian Dana</span>, dan{' '}
                  <span className="text-blue-500">Persetujuan Pengguna</span>{' '}
                  yang berlaku.
                </span>
              </div>

              <button className="w-full rounded-md bg-yellow-500 py-3 font-medium text-[#30302F]">
                Lanjut Bayar Sekarang!
              </button>
            </div>
          </div>

          {/* Right section - Package details */}
          <div className="w-full lg:w-1/3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex">
                <div className="mr-4 h-24 w-24 rounded-lg bg-gray-200">
                  <Image
                    src="/api/placeholder/100/100"
                    alt="Umrah Package"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Umrah SYAWAL PLUS DUBAI</h3>
                  <p className="text-gray-600">
                    PAKET 12 HARI BINTANG 5 SPESIAL
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs">The Haramain Project</span>
                  </div>
                  <p className="text-xs text-gray-500">Jakarta Pusat</p>
                </div>
              </div>

              {/* Promo coupon */}
              <div className="mb-6">
                <h4 className="mb-2 font-medium">Kupon Promo</h4>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center">
                    <div className="mr-2 rounded bg-yellow-100 p-1">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.5 9C15.5 9.82843 14.8284 10.5 14 10.5C13.1716 10.5 12.5 9.82843 12.5 9C12.5 8.17157 13.1716 7.5 14 7.5C14.8284 7.5 15.5 8.17157 15.5 9Z"
                          fill="#F59E0B"
                        />
                        <path
                          d="M9.5 15C9.5 15.8284 8.82843 16.5 8 16.5C7.17157 16.5 6.5 15.8284 6.5 15C6.5 14.1716 7.17157 13.5 8 13.5C8.82843 13.5 9.5 14.1716 9.5 15Z"
                          fill="#F59E0B"
                        />
                        <path
                          d="M22 8.2C22 9.286 21.187 10.182 20.137 10.302L20.1293 10.3038C19.9051 10.3395 19.6701 10.3581 19.429 10.3686L19.4268 10.3687C19.3175 10.3741 19.2066 10.3768 19.096 10.3768L6.6517 10.3768C6.55301 10.3768 6.45397 10.3744 6.35465 10.3701C6.16231 10.3612 5.97155 10.3448 5.7866 10.3204C4.8324 10.1984 4 9.2921 4 8.2C4 7.0777 4.9004 6.1535 6.0027 6.0194C6.0027 6.0194 6.00645 6.0188 6.01265 6.01766L19.429 6.03142C19.6389 6.04116 19.8444 6.05772 20.05 6.0818C21.1348 6.1993 22 7.0997 22 8.2Z"
                          fill="#F59E0B"
                        />
                        <path
                          d="M22 15.8C22 16.9003 21.1348 17.8007 20.05 17.9182C19.8444 17.9423 19.6389 17.9588 19.429 17.9686L6.0127 17.9823L6.0027 17.9806C4.9004 17.8465 4 16.9223 4 15.8C4 14.7079 4.8324 13.8016 5.7866 13.6796C5.97155 13.6552 6.16231 13.6388 6.35465 13.6299C6.45397 13.6256 6.55301 13.6232 6.6517 13.6232L19.096 13.6232C19.2066 13.6232 19.3175 13.6259 19.4268 13.6313L19.429 13.6314C19.6701 13.6419 19.9051 13.6605 20.1293 13.6962L20.137 13.698C21.187 13.818 22 14.714 22 15.8Z"
                          fill="#F59E0B"
                        />
                      </svg>
                    </div>
                    <span className="text-sm">Kamu memiliki 2 kupon promo</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>

              {/* Price breakdown */}
              <div>
                <h4 className="mb-3 font-medium">Rincian Harga</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Total Harga Paket (4 Jemaah)
                    </span>
                    <span className="font-medium">Rp120.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diskon</span>
                    <span className="text-red-500">- Rp1.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diskon Agen (10%)</span>
                    <span className="text-red-500">- Rp1.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uang muka</span>
                    <span className="text-red-500">- Rp5.000.000</span>
                  </div>
                  <div className="my-3 h-px bg-gray-200"></div>
                  <div className="flex justify-between font-medium">
                    <span>Sisa Pelunasan</span>
                    <span>Rp113.000.000</span>
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
