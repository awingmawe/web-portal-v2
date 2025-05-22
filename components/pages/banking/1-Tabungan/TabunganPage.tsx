/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const TabunganPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [step, setStep] = useState(1) // 1 = Data Diri, 2 = Form Pengajuan

  const openForm = () => {
    setShowForm(true)
    setStep(1)
  }

  const closeForm = () => {
    setShowForm(false)
    setStep(1)
  }

  const handleNext = () => {
    if (step === 1) setStep(2)
  }

  return (
    <div className="mt-10 flex min-h-screen flex-col p-4 pb-20 md:mt-0 md:p-12 md:pb-12 ">
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="relative mb-4 rounded-lg bg-teal-600 p-4">
          <Image
            src="/images/logo-permata-tabungan.svg"
            width={342}
            height={250}
            alt="Permata Tabungan"
          />
        </div>

        <div className="mb-4">
          <h1 className="text-lg font-bold text-black">
            Program Tabungan Umrah
          </h1>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <span>Didukung oleh</span>
            <Image
              src="/images/logo-permata.svg"
              width={129}
              height={32}
              alt="Permata Bank"
              className="ml-4"
            />
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden bg-white p-4 md:block">
        <button className="flex items-center text-gray-800">
          <ChevronLeft className="mr-4" size={24} />
          <span className="text-[24px] font-[600] text-[#30302F]">Kembali</span>
        </button>
      </div>

      {/* Banner */}
      <div className="hidden md:block">
        <div className="flex h-[250px] w-full flex-col items-center justify-center rounded-[20px] bg-gray-200 p-12">
          <div className="mb-4 rounded-full bg-white p-6">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
              <path d="M12 12v9" />
              <path d="m8 17 4 4 4-4" />
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500">
            Gambar ini bisa diisi banner tsp program Pendanaan
          </p>
        </div>
      </div>

      <div className="hidden p-6 md:block">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[32px] font-[600] text-[#30302F]">
            Program Tabungan Umrah
          </h1>
          <div className="flex items-center">
            <span className="mr-2 text-xs text-gray-500">Didukung oleh</span>
            <Image
              src="/images/logo-permata.svg"
              width={129}
              height={32}
              alt="Permata Bank"
              className="ml-4"
            />
          </div>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="md:px-6">
        <div className="mb-3 md:mb-6">
          <p className="text-[12px] leading-tight text-[#30302F] md:text-[14px]">
            Lorem ipsum dolor sit amet...
          </p>
        </div>

        <ol className="mb-4 list-decimal space-y-3 pl-6 md:mb-6">
          {[...Array(4)].map((_, idx) => (
            <li
              key={idx}
              className="text-[12px] font-[400] text-[#30302F] md:text-[14px]"
            >
              <span className="font-semibold">
                Curabitur tempor quis eros tempus lacinia.
              </span>{' '}
              Nam bibendum pellentesque quam a convallis...
            </li>
          ))}
        </ol>

        <p className="mb-8 text-[12px] font-[400] text-[#30302F] md:text-[14px]">
          Curabitur tempor quis eros...
        </p>

        <div className="fixed right-0 bottom-0 left-0 mt-4 mb-4 flex justify-center px-4 md:relative md:px-0">
          <Button
            className="w-full rounded-full bg-yellow-500 px-6 py-3 font-medium text-gray-800 hover:bg-yellow-600 md:w-auto md:max-w-xs"
            onClick={openForm}
          >
            Ikuti Program Tabungan Sekarang
          </Button>
        </div>
      </div>

      {/* Modal Form */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative h-[657px] w-full max-w-4xl rounded-[20px] bg-white shadow-lg">
            <div className="flex p-6">
              <h2 className="text-xl font-semibold">Form Program Pendanaan</h2>
            </div>

            {/* Center the form container */}
            <div className="flex justify-center">
              <div className="flex h-[499px] w-[800px] rounded-[20px] border border-[#E8E8E8]">
                {/* Sidebar kiri with overflow scrolling */}
                <div className="w-1/2 overflow-y-auto border-r border-[#E8E8E8]">
                  <div className="p-0">
                    <div
                      className={`flex cursor-pointer items-center p-6 transition ${step === 1 ? 'bg-yellow-50' : ''} rounded-tl-[20px]`}
                      onClick={() => setStep(1)}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 1 ? 'bg-yellow-400' : 'bg-gray-200'}`}
                      >
                        <span
                          className={`text-base font-medium ${step === 1 ? 'text-black' : 'text-gray-600'}`}
                        >
                          1
                        </span>
                      </div>
                      <span className="ml-3 text-[14px] font-[500] text-[#30302F]">
                        Data Diri
                      </span>
                    </div>
                    <div
                      className={`flex cursor-pointer items-center p-6 transition ${step === 2 ? 'bg-yellow-50' : ''}`}
                      onClick={() => setStep(2)}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 2 ? 'bg-yellow-400' : 'bg-gray-200'}`}
                      >
                        <span
                          className={`text-base font-medium ${step === 2 ? 'text-black' : 'text-gray-600'}`}
                        >
                          2
                        </span>
                      </div>
                      <span className="ml-3  text-[14px] font-[500] text-[#30302F]">
                        Form Pengajuan
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form kanan with overflow scrolling */}
                <div className="h-[499px] w-3/4 overflow-y-auto">
                  <div className="p-6">
                    <form>
                      <div className="space-y-4">
                        {step === 1 && (
                          <>
                            <div>
                              <label className="mb-1 block text-[12px] font-[400] text-[#414141]">
                                Nama Sesuai KTP
                              </label>
                              <input
                                type="text"
                                placeholder="Masukkan nama sesuai KTP"
                                required
                                className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-[12px] font-[400] text-[#414141]">
                                Email
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="Masukkan Email"
                                className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-[12px] font-[400] text-[#414141]">
                                No. Telp
                              </label>
                              <input
                                type="number"
                                required
                                placeholder="62"
                                className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-[12px] font-[400] text-[#414141]">
                                Jenis Kelamin
                              </label>
                              <div className="mt-2 flex gap-6">
                                <label className="flex items-center text-[12px] font-[400] text-[#414141]">
                                  <input
                                    type="radio"
                                    name="gender"
                                    className="mr-2 text-[12px] font-[400] text-[#414141]"
                                  />{' '}
                                  Pria
                                </label>
                                <label className="flex items-center text-[12px] font-[400] text-[#414141]">
                                  <input
                                    type="radio"
                                    name="gender"
                                    className="mr-2 "
                                  />{' '}
                                  Wanita
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="mb-1 block text-[12px] font-[400] text-[#414141]">
                                Pekerjaan
                              </label>
                              <input
                                type="text"
                                placeholder="Masukkan Pekerjaan"
                                className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-[12px] font-[400] text-[#414141]">
                                Provinsi
                              </label>
                              <select className="w-full rounded-[20px] border border-[#D2D2D1] p-2">
                                <option>Pilih Provinsi</option>
                              </select>
                            </div>
                            <div>
                              <label className="mb-1 block text-[12px] font-[400] text-[#414141]">
                                Kabupaten/Kota
                              </label>
                              <select className="w-full rounded-[20px] border border-[#D2D2D1] p-2">
                                <option>Pilih Kabupaten/Kota</option>
                              </select>
                            </div>

                            <div className="mt-8 flex items-center justify-end space-x-4">
                              <Button
                                type="button"
                                onClick={closeForm}
                                className="rounded-full border border-yellow-500 bg-white px-8 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-50"
                              >
                                Batal
                              </Button>
                              <Button
                                type="submit"
                                className="rounded-full bg-yellow-500 px-8 py-3 text-sm font-medium text-white hover:bg-yellow-600"
                                onClick={handleNext}
                              >
                                Lanjut
                              </Button>
                            </div>
                          </>
                        )}

                        {step === 2 && (
                          <>
                            <div>
                              <label className="mb-1 block text-[12px] font-[400] text-[#414141]">
                                Kamar Hotel
                              </label>
                              <input
                                type="text"
                                required
                                className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-[12px] font-[400] text-[#414141]">
                                Varian
                              </label>
                              <input
                                type="text"
                                required
                                className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-[12px] font-[400] text-[#414141]">
                                Jumlah Jamaah
                              </label>
                              <input
                                type="number"
                                required
                                className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                              />
                            </div>

                            <div className="mt-8 flex items-center justify-end space-x-4">
                              <Button
                                type="button"
                                onClick={() => setStep(1)}
                                className="rounded-full border border-yellow-500 bg-white px-8 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-50"
                              >
                                Kembali
                              </Button>
                              <Button
                                type="submit"
                                className="rounded-full bg-yellow-500 px-8 py-3 text-sm font-medium text-white hover:bg-yellow-600"
                                // onClick={handleNext}
                              >
                                Kirim
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TabunganPage
