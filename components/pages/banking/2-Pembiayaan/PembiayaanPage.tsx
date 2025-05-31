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
import React, { useEffect, useRef, useState } from 'react'

type PembiayaanFormValues = {
  fullName: string
  email: string
  phoneNumber: string
  gender: 'male' | 'female'
  job?: string
  provinceId?: string
  cityId?: string
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
  const [screenSize, setScreenSize] = useState<'mobile' | 'desktop'>('mobile')
  const [formData, setFormData] = useState<PembiayaanFormValues | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submissionData, setSubmissionData] = useState<any>()
  const [showFormCurrent, setShowFormCurrent] = useState(false)
  // Monitor screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 768
      setScreenSize(isMobile ? 'mobile' : 'desktop')
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
      if (res) {
        setShowFormCurrent(true)
      } else {
        setShowForm(true)
        setStep(1)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
        tenor: Number(values.tenor),
        status: 'Diajukan',
        providerId: 1,
      }

      await updateProfile(dataProfile)
      // // // Here you would normally submit to your API
      await bankCredit(dataKirim)
      // // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // closeForm()
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
  if (showForm && screenSize === 'mobile') {
    return (
      <div className="min-h-screen bg-yellow-400 ">
        {/* Mobile Form Header */}
        <div className="px-4 pt-12 pb-4">
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
                  className={`ml-2 text-sm font-medium ${
                    step === 1 ? 'text-white' : 'text-black/70'
                  }`}
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
        <div className="-mt-2 h-[772px] flex-1 rounded-t-3xl bg-white px-6 py-6">
          {/* <form onSubmit={handleSubmit}> */}
          {/* <div className="space-y-4"> */}
          {step === 1 && (
            <>
              <PembiayaanForm
                onSubmit={handleFormSubmit}
                isLoading={loading}
                screenSize={screenSize}
              />
            </>
          )}

          {step === 2 && (
            <>
              <PembiayaanFormStep2
                onSubmit={handleFormSubmit2}
                onBack={goBack}
                isLoading={loading}
                screenSize={screenSize}
              />
            </>
          )}
          <SuccessModal
            open={showSuccessModal}
            onOpenChange={setShowSuccessModal}
            screenSize={screenSize}
            submissionData={submissionData}
          />
          {/* </div> */}
          {/* </form> */}
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
    <div className="mt-10 flex min-h-screen flex-col p-4 pb-20 md:mt-0 md:p-8 md:pb-12">
      {/* Mobile Header - Only visible on mobile */}
      {screenSize === 'mobile' && (
        <div>
          <div className="relative mb-4 justify-items-center rounded-lg">
            <Image
              src="/images/logo-permata-pembiayaan.svg"
              width={400}
              height={250}
              alt="Permata Pembiayaan"
            />
          </div>

          <div className="mb-4">
            <h1 className="text-[14px] font-[600] text-neutral-900">
              Program Pendanaan Syariah Umrah
            </h1>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <span className="text-[12px] font-[400] text-neutral-500">
                Didukung oleh
              </span>
              <Image
                src="/images/logo-permata.svg"
                width={129}
                height={32}
                alt="Permata Bank"
                className="ml-6"
              />
            </div>
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
          <div className="relative h-64 w-full">
            <Image
              src="/images/image-landing.svg"
              alt="Permata Bank"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Desktop Title - Only visible on desktop */}
      {screenSize === 'desktop' && (
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-800">
              Program Pendanaan Syariah Umrah
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
      )}

      {/* Content area */}
      <div className={screenSize === 'desktop' ? 'px-6' : ''}>
        <div className="mb-3 md:mb-6">
          <p className="text-[12px] font-[400] text-[black] md:text-sm">
            Mau ibadah ke Tanah Suci, tapi kantong lagi tipis?
          </p>
          <p className="text-[12px] font-[400] text-[black] md:text-sm">
            Tenang aja! Solusi manis lewat pendanaan syariah
          </p>
          <p className="text-[12px] font-[400] text-[black] md:text-sm">
            InsyaAllah jadi langkah mudah sampai ke Baitullah
          </p>
        </div>

        <div className="mb-3 md:mb-6">
          <p className="text-[12px] font-[400] text-[black] md:text-sm">
            Bersama KTA iB Multiguna PermataBank, kami hadir untuk mempermudah
            umat Muslim mewujudkan impiannya dalam melaksanakan ibadah ke Tanah
            Suci. Kamu bisa mengajukan pendanaan syariah untuk ibadah Umroh dan
            Haji dengan paket apa pun melalui akad Ijarah Multijasa.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-[12px] font-[400] text-[black] md:text-sm">
            Berikut rincian proses pengajuan yang dapat dilakukan:
          </p>
          <ol className="list-decimal  text-[12px] font-[400] text-black md:text-sm">
            <li>
              Pilih paket Umroh atau Haji yang diinginkan, check out dengan
              pilihan pembayaran <strong>Bayar Nanti</strong>.
            </li>
            <li>Masukkan data diri secara lengkap.</li>
            <li>
              Cek kembali paket yang dipilih, kamar hotel, jumlah jemaah, serta
              nominal angsuran pembayaran sesuai tenor yang kamu pilih.
            </li>
            <li>Klik ajukan pendanaan.</li>
          </ol>
        </div>

        <p className="text-[12px] font-[400] text-[black] md:text-sm">
          Perlu diingat bahwa jumlah jemaah memengaruhi besarnya biaya angsuran
          dan seluruhnya akan ditanggung oleh pemohon. Masa pengajuan pendanaan
          akan berlangsung selama maksimal 14 hari kerja. Harap untuk selalu
          memantau notifikasi secara berkala untuk melihat hasil status
          pengajuan.
        </p>

        {/* Action button */}
        <div
          className={
            screenSize === 'mobile'
              ? 'fixed right-0 bottom-0 left-0 mt-4 mb-4 flex justify-center px-4'
              : 'mt-4 mb-4 flex justify-center'
          }
        >
          <Button
            className="w-full rounded-full bg-yellow-500 px-6 py-3 font-medium text-gray-800 hover:bg-yellow-600 md:w-auto md:max-w-xs"
            onClick={openForm}
          >
            Ikuti Program Pendanaan Sekarang
          </Button>
        </div>
      </div>

      {/* Desktop Modal Form */}
      {showForm && screenSize === 'desktop' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative h-auto w-full max-w-4xl rounded-3xl bg-white shadow-lg">
            <div className="flex p-6">
              <h2 className="text-xl font-semibold">Form Program Pendanaan</h2>
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
