'use client'

import { ArrowLeft, Check, ChevronRight, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const MobileCheckoutPage = () => {
  const minPayment = 5000000
  const totalPrice = 113000000
  const [paymentAmount, setPaymentAmount] = useState(minPayment)
  const [referralCode, setReferralCode] = useState('')
  //   const [useMyData, setUseMyData] = useState(false)
  const [jamaahList, setJamaahList] = useState([{ id: 1, name: '', phone: '' }])
  const [usePoints, setUsePoints] = useState(false)

  const handleAddJamaah = () => {
    const newId = jamaahList.length + 1
    setJamaahList([...jamaahList, { id: newId, name: '', phone: '' }])
  }

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, '')) || 0
    if (value >= minPayment && value <= totalPrice) {
      setPaymentAmount(value)
    }
  }

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
      <main className="pb-20">
        {/* Package Info */}
        <div className="bg-white p-4">
          <h2 className="mb-2 text-sm font-medium">Detail Pembelian</h2>
          <div className="flex items-start">
            <div className="mr-3 h-16 w-16 overflow-hidden rounded-md bg-gray-200">
              <Image
                src="/api/placeholder/64/64"
                alt="Package"
                width={64}
                height={64}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-medium">
                UMROH SYAWAL PLUS DUBAI (9 HARI BINTANG 5 | 07 APRIL 2025)
              </h3>
              <div className="mb-1 flex items-center">
                <p className="mr-1 text-sm font-bold text-black">
                  Rp33.000.000
                </p>
                <span className="rounded bg-red-500 px-1 py-0.5 text-[10px] text-white">
                  -10%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500">Travel</p>
                  <p className="text-xs font-medium">Shusha</p>
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

        {/* Jamaah section */}
        <div className="mt-4 bg-white p-4">
          <div className="flex items-center justify-between">
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
              Minimal pembayaran untuk saat ini: Rp5.000.000
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
                  value={paymentAmount.toLocaleString('id-ID')}
                  onChange={handlePaymentInputChange}
                />
              </div>

              <input
                type="range"
                min={minPayment}
                max={totalPrice}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-yellow-500"
              />

              <div className="mt-2 flex justify-between text-xs">
                <span>Rp5.000.000</span>
                <span>Rp113.000.000</span>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>Jumlah Bayar</span>
                  <span className="font-medium">
                    Rp {paymentAmount.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                  <span>Sisa Pelunasan</span>
                  <span className="font-medium">
                    Rp {(totalPrice - paymentAmount).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Points section */}
          <div className="mb-4 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center">
              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-yellow-400"
                  checked={usePoints}
                  onChange={(e) => setUsePoints(e.target.checked)}
                />
              </div>
              <p className="font-medium">Poin Muslim</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Gunakan 1.200.000 poin Muslim
            </p>
          </div>

          {/* Referral code */}
          <div className="mb-4 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center">
              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200">
                <input type="checkbox" className="h-4 w-4 accent-yellow-400" />
              </div>
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

          {/* Coupons */}
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
          </div>
        </div>

        {/* Price summary */}
        <div className="mt-4 bg-white p-4">
          <h2 className="mb-3 text-sm font-medium">Ringkasan Pembayaran</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">
                Total Harga Paket (4 Jamaah)
              </span>
              <span>Rp120.000.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Diskon</span>
              <span className="text-red-500">-Rp1.000.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Diskon Agen (10%)</span>
              <span className="text-red-500">-Rp6.000.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Uang muka</span>
              <span className="text-red-500">-Rp5.000.000</span>
            </div>
            <div className="my-2 h-px bg-gray-200"></div>
            <div className="flex justify-between font-medium">
              <span>Total Pelunasan</span>
              <span>Rp113.000.000</span>
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

      {/* Fixed bottom bar */}
      <div className="fixed right-0 bottom-0 left-0 flex items-center justify-between border-t bg-white p-4">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-bold">
            Rp{paymentAmount.toLocaleString('id-ID')}
          </p>
        </div>
        <button className="rounded-md bg-yellow-400 px-6 py-3 font-medium">
          Bayar Sekarang
        </button>
      </div>
    </div>
  )
}

export default MobileCheckoutPage
