/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import {
  PembiayaanForm,
  PembiayaanFormRef,
} from '@/components/pages/banking/2-Pembiayaan/PembiayaanForm'
import {
  PembiayaanFormStep2,
  PembiayaanFormStep2Ref,
} from '@/components/pages/banking/2-Pembiayaan/PembiayaanFormStep2'
import SuccessModal from '@/components/pages/banking/2-Pembiayaan/SuccessModal '
import DrawerAlreadyHave from '@/components/pages/banking/mobile/DrawerAlreadyHave'
import ModalAlreadyHave from '@/components/pages/banking/modal/modalAlreadyHave'
import { Button } from '@/components/ui/button'
import { bankCredit, getbankCredit } from '@/services/banking-service'
import { updateProfile } from '@/services/identity-service'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

type PembiayaanFormValues = {
  fullName: string
  email: string
  phoneNumber: string
  gender: 'male' | 'female'
  job?: string
  provinceId?: string
  cityId?: string
  born?: string
  provinceName?: string
  cityName?: string
  address?: string
  kamarHotel?: string
  varian?: string
  jumlahJamaah?: string
}
const PembiayaanPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [step, setStep] = useState(1) // 1 = Data Diri, 2 = Form Pengajuan
  const [screenSize, setScreenSize] = useState<'mobile' | 'desktop' | 'tab'>(
    'mobile'
  )
  const [formData, setFormData] = useState<PembiayaanFormValues | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submissionData, setSubmissionData] = useState<any>()
  const [showFormCurrent, setShowFormCurrent] = useState(false)
  const searchParams = useSearchParams()
  // Monitor screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth

      if (width < 768) {
        setScreenSize('mobile')
      } else if (width < 1020) {
        setScreenSize('tab')
      } else {
        setScreenSize('desktop')
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const formRef = useRef<PembiayaanFormRef>(null)
  const formStep2Ref = useRef<PembiayaanFormStep2Ref>(null)
  const openForm = async () => {
    try {
      const res = await getbankCredit()
      if (res.status === 'Diajukan' || res.status === 'Verifikasi') {
        setShowFormCurrent(true)
      } else {
        setShowForm(true)
        setStep(1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (searchParams.get('open') === 'true') {
      openForm()
    }
  }, [searchParams])

  const closeForm = () => {
    setShowForm(false)
    setStep(1)
  }

  // const handleNext = () => {
  //   if (step === 1) setStep(2)
  // }

  const [loading, setLoading] = useState(false)
  const handleFormSubmit = async (values: PembiayaanFormValues) => {
    setLoading(true)
    try {
      // Store form data and move to step 2
      setFormData(values)
      setStep(2)
    } catch (error) {
      console.error('Error submitting form:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }
  const handleFormSubmit2 = async (values: any) => {
    setLoading(true)
    try {
      // Combine data from both steps
      const dataProfile = {
        name: formData?.fullName,
        email: formData?.email,
        persona: {
          address: formData?.address,
          cityId: formData?.cityId,
          cityName: formData?.cityName,
          born: formData?.born,
          gender: formData?.gender,
          job: formData?.job,
          phoneNumber: formData?.phoneNumber,
          provinceId: formData?.provinceId,
          provinceName: formData?.provinceName,
        },
      }
      const dataKirim = {
        packageId: values.packageDetails.id.toString(),
        packageName: values.packageDetails.title,
        packageVariantName: values.varian,
        packageVariantId: values.selectedVariantDetails.id.toString(),
        jumlahJemaah: values.jumlahJamaah,
        roomType: values.kamarHotel,
        totalPrice: values.totalPrice,
        memilikiTagihanLain: false,
        memilikiAngunanLain: false,
        born: formData?.born,
        tenor: Number(values.tenor),
        status: 'Diajukan',
        providerId: 1,
      }

      await updateProfile(dataProfile)
      // // // Here you would normally submit to your API
      await bankCredit(dataKirim)
      // // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      closeForm()
      setShowSuccessModal(true)
      setSubmissionData(values)
    } catch (error) {
      console.error('Error submitting form:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.submit()
    }
  }

  // Handler untuk validasi form
  const isFormValid = () => {
    return formRef.current?.isValid() || false
  }
  // Mobile Form View
  if (showForm && (screenSize === 'mobile' || screenSize === 'tab')) {
    return (
      <div className="min-h-screen w-full bg-yellow-400 ">
        {/* Mobile Form Header */}
        <div className="px-4 pt-12 pb-4 md:px-8">
          <div className="mt-4 flex items-center justify-center">
            {/* Progress Indicator */}
            <div className="flex items-center">
              {/* Step 1 */}
              <div className="flex items-center">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    step === 1
                      ? 'bg-white text-yellow-600'
                      : step > 1
                        ? 'bg-black text-yellow-600'
                        : 'border border-white text-white'
                  }`}
                >
                  1
                </div>
                <span
                  className={`ml-2 text-sm font-medium md:text-base ${step === 1 ? 'text-white' : 'text-black/70'}`}
                >
                  Data Diri
                </span>
              </div>

              {/* Connector Line */}
              <div className="mx-4 flex items-center">
                <div
                  className={`h-0.5 w-8 ${
                    step > 1 ? 'bg-black/50' : 'bg-black/50'
                  }`}
                ></div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    step === 2
                      ? 'bg-white text-yellow-600'
                      : 'border border-black text-black'
                  }`}
                >
                  2
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step === 2 ? 'text-white' : 'text-black/70'
                  }`}
                >
                  Form Pengajuan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Form Content with rounded top */}
        <div className="-mt-2 h-[772px] flex-1 rounded-t-3xl bg-white px-6 py-6 md:h-[820px] md:px-10">
          {step === 1 && (
            <PembiayaanForm
              onSubmit={handleFormSubmit}
              isLoading={loading}
              screenSize={screenSize}
            />
          )}

          {step === 2 && (
            <PembiayaanFormStep2
              onSubmit={handleFormSubmit2}
              onBack={goBack}
              isLoading={loading}
              screenSize={screenSize}
            />
          )}
          <SuccessModal
            open={showSuccessModal}
            onOpenChange={setShowSuccessModal}
            screenSize={screenSize}
            submissionData={submissionData}
          />
        </div>
      </div>
    )
  }
  const handleExternalSubmitStep2 = () => {
    if (formStep2Ref.current) {
      formStep2Ref.current.submit()
    }
  }

  // Handler untuk validasi form step 2
  const isFormStep2Valid = () => {
    return formStep2Ref.current?.isValid() || false
  }
  return (
    <div className=" flex min-h-screen flex-col p-4 pb-20 md:mt-8 md:p-4 md:pb-0">
      {/* Mobile Header - Only visible on mobile */}
      {screenSize === 'mobile' && (
        <div className="mt-14">
          <div className="relative h-70 w-full">
            <Image
              src="/images/icon-pembiayaan-mobile.svg"
              alt="Banner Talangan"
              width={100}
              height={100}
              className="w-full rounded-lg object-contain"
            />
          </div>

          <div className="mb-4">
            <h1 className="text-l-semibold text-neutral-900">
              Program Talangan Umroh
            </h1>
          </div>
        </div>
      )}

      {/* Desktop Header - Only visible on desktop */}
      {screenSize === 'desktop' && (
        <Link href={'/'}>
          <div className="bg-white p-4">
            <button className="flex cursor-pointer items-center text-gray-800">
              <ChevronLeft className="mr-4" size={24} />
              <span className="text-2xl font-semibold text-gray-800">
                Kembali
              </span>
            </button>
          </div>
        </Link>
      )}

      {/* Desktop Banner - Only visible on desktop */}
      {screenSize === 'desktop' && (
        <div className="mb-6">
          <div className="relative mb-5 h-64 w-full px-6">
            <Image
              src="/images/image-landing.svg"
              alt="Banner Talangan"
              width={100}
              height={100}
              className="w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* Tab Banner - Only visible on desktop */}
      {screenSize === 'tab' && (
        <div className="mb-0">
          <div className="relative mt-10 mb-3 h-50 w-full">
            <Image
              src="/images/icon-pembiayan-tab.svg"
              alt="Banner Talangan"
              width={100}
              height={100}
              className="w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* Desktop Title - Only visible on desktop */}
      {screenSize === 'desktop' && (
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="heading-2-semibold">Program Talangan Umroh</h1>
          </div>
        </div>
      )}
      {screenSize === 'tab' && (
        <div className="px-0 pb-6">
          <div className="flex items-center justify-between">
            <h1 className="heading-2-semibold">Program Talangan Umroh</h1>
          </div>
        </div>
      )}

      {/* Content area */}
      <div className={screenSize === 'desktop' ? 'px-6' : ''}>
        <div className="mb-3 md:mb-6">
          <p className="text-m-semibold">
            Ingin Umroh, tapi tabungan belum cukup?
          </p>
          <p className="text-m-regular">
            Bayangkan Anda berdiri di depan Ka’bah...
          </p>
          <p className="text-m-regular">
            Udara sejuk menyapa wajah, dan doa-doa yang selama ini Anda
            panjatkan terasa begitu dekat.
          </p>
        </div>

        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">Tapi niat itu…</p>
          <p className="text-m-regular">
            Masih tertahan karena biaya yang belum terkumpul.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">
            Kini, Anda bisa berangkat lebih cepat.
          </p>
          <p className="text-m-regular">
            Dengan{' '}
            <b className="font-semibold">program Talangan Umroh Muslim101, </b>
            kami hadir membawa solusi syariah yang aman dan terpercaya.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">Program ini cocok untuk:</p>
          <p className="text-m-regular">👨‍💼 Karyawan tetap</p>
          <p className="text-m-regular">🛍️ Pelaku usaha atau UMKM</p>
        </div>

        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">Bayangkan...</p>
          <p className="text-m-regular">
            Ibadah umroh yang selama ini hanya sebatas rencana, kini bisa
            menjadi nyata.
          </p>
          <p className="text-m-regular">Tanpa harus menggadaikan barang.</p>
          <p className="text-m-regular">
            Tanpa harus menunggu bertahun-tahun menabung.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">
            📖 Semua proses dilakukan secara syariah dan transparan, bekerjasama
            dengan mitra pembiayaan resmi dan tersertifikasi.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">
            📲 Klik tombol di bawah untuk mengajukan sekarang.
          </p>
          <p className="text-m-regular">
            Tim kami siap membantu Anda langkah demi langkah.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-m-regular italic">
            🕋 Karena ibadah tidak harus ditunda, jika ada jalan yang halal dan
            mudah.
          </p>
        </div>

        {/* Action button */}
        <div
          className={
            screenSize === 'mobile'
              ? 'fixed right-0 bottom-0 left-0 mt-4 mb-4 flex justify-center px-4'
              : 'mt-32 mb-12 flex justify-center'
          }
        >
          <Button
            className="w-full rounded-full bg-yellow-500 px-6 py-3 font-medium text-gray-800 hover:bg-yellow-600 md:w-auto md:max-w-xs"
            onClick={openForm}
          >
            Ikuti Program Talangan Sekarang
          </Button>
        </div>
      </div>

      {/* Desktop Modal Form */}
      {showForm && screenSize === 'desktop' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative h-auto w-full max-w-4xl rounded-3xl bg-white shadow-lg">
            <div className="flex p-6">
              <h2 className="text-xl font-semibold">
                Form Program Talangan Umroh
              </h2>
            </div>

            <div className="flex justify-center pr-15 pl-15">
              <div className="flex h-auto w-full max-w-4xl rounded-3xl border border-gray-200">
                {/* Sidebar kiri */}
                <div className="w-1/3 border-r border-gray-200">
                  <div className="p-0">
                    <div
                      className={`flex cursor-pointer items-center border-b border-[#E8E8E8] p-6 transition ${step === 1 ? 'bg-yellow-50' : ''} rounded-tl-3xl`}
                      onClick={() => setStep(1)}
                    >
                      <div className="relative flex h-12 w-12 items-center justify-center">
                        <div
                          className={`absolute h-10 w-10 rounded-full border-6 ${
                            step === 1
                              ? 'border-primary-500'
                              : 'border-neutral-200'
                          }`}
                        ></div>
                        <span
                          className={`text-[14px] leading-none font-bold text-neutral-900`}
                        >
                          1
                        </span>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-800">
                        Data Diri
                      </span>
                    </div>
                    <div
                      className={`flex cursor-pointer items-center border-b border-[#E8E8E8] p-6 transition ${step === 2 ? 'bg-yellow-50' : ''}`}
                      onClick={() => setStep(2)}
                    >
                      <div className="relative flex h-12 w-12 items-center justify-center">
                        <div
                          className={`absolute h-10 w-10 rounded-full border-6 ${
                            step === 2
                              ? 'border-primary-500'
                              : 'border-neutral-200'
                          }`}
                        ></div>
                        <span
                          className={`text-[14px] leading-none font-bold text-neutral-900`}
                        >
                          2
                        </span>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-800">
                        Form Pengajuan
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form kanan */}
                <div
                  className="w-2/3 overflow-y-auto "
                  style={{
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE 10+
                  }}
                >
                  <div className="h-[500px] p-6 [&::-webkit-scrollbar]:hidden">
                    {/* <form onSubmit={handleSubmit}> */}

                    {step === 1 && (
                      <>
                        <PembiayaanForm
                          ref={formRef}
                          screenSize={screenSize}
                          onSubmit={handleFormSubmit}
                          isLoading={loading}
                          onCancel={closeForm}
                        />
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <PembiayaanFormStep2
                          ref={formStep2Ref} // Tambahkan ref ini
                          onSubmit={handleFormSubmit2}
                          onBack={goBack}
                          isLoading={loading}
                          screenSize={screenSize}
                          onCancel={closeForm}
                        />
                      </>
                    )}
                  </div>

                  {/* </form> */}
                </div>
              </div>
            </div>
            {step === 1 ? (
              <div className="mt-8 mr-15 mb-8 flex items-center justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => {
                    closeForm()
                  }}
                  className="rounded-full border border-yellow-500 bg-white px-8 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-50"
                  disabled={loading}
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  onClick={handleExternalSubmit}
                  className="rounded-full bg-yellow-500 px-8 py-3 text-sm font-medium text-white hover:bg-yellow-600"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Lanjut'}
                </Button>
              </div>
            ) : (
              <div className="mt-8 mr-15 mb-8 flex items-center justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => {
                    closeForm()
                  }}
                  className="rounded-full border border-yellow-500 bg-white px-8 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-50"
                  disabled={loading}
                >
                  Batal
                </Button>
                <Button
                  type="button" // Ubah ke type="button"
                  onClick={handleExternalSubmitStep2} // Gunakan handler baru
                  className="mr-4 rounded-full bg-yellow-500 px-8 py-3 text-sm font-medium text-white hover:bg-yellow-600"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Kirim Permintaan'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        screenSize={screenSize}
        submissionData={[]}
      />
      {showFormCurrent && screenSize === 'desktop' ? (
        <ModalAlreadyHave
          text={'Pendanaan'}
          open={showFormCurrent}
          onOpenChange={setShowFormCurrent}
        />
      ) : (
        <DrawerAlreadyHave
          text={'Pendanaan'}
          open={showFormCurrent}
          setOpen={setShowFormCurrent}
        />
      )}
    </div>
  )
}

export default PembiayaanPage
