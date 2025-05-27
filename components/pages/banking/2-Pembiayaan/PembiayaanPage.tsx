/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { PembiayaanForm } from '@/components/pages/banking/2-Pembiayaan/PembiayaanForm'
import { PembiayaanFormStep2 } from '@/components/pages/banking/2-Pembiayaan/PembiayaanFormStep2'
import SuccessModal from '@/components/pages/banking/2-Pembiayaan/SuccessModal '
import DrawerAlreadyHave from '@/components/pages/banking/mobile/DrawerAlreadyHave'
import ModalAlreadyHave from '@/components/pages/banking/modal/modalAlreadyHave'
import { Button } from '@/components/ui/button'
import { bankCredit, getbankCredit } from '@/services/banking-service'
import { updateProfile } from '@/services/identity-service'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
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
  const [submissionData, setSubmissionData] = useState()
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

  // const openForm = async () => {
  //   const res = await getSaving()
  //   console.log(res)

  //   // setShowForm(true)
  //   // setStep(1)
  // }

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
      // // Here you would normally submit to your API
      await bankCredit(dataKirim)
      // // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      closeForm()
      setSubmissionData(values)
      setShowSuccessModal(true)
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

  return (
    <div className="mt-10 flex min-h-screen flex-col p-4 pb-20 md:mt-0 md:p-8 md:pb-12">
      {/* Mobile Header - Only visible on mobile */}
      {screenSize === 'mobile' && (
        <div>
          <div className="relative mb-4 justify-items-center rounded-lg">
            <Image
              src="/images/logo-permata-pembiayaan.svg"
              width={342}
              height={250}
              alt="Permata Pembiayaan"
            />
          </div>

          <div className="mb-4">
            <h1 className="text-lg font-bold text-black">
              Program Pendanaan Syariah Umrah
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
      )}

      {/* Desktop Header - Only visible on desktop */}
      {screenSize === 'desktop' && (
        <div className="bg-white p-4">
          <button className="flex items-center text-gray-800">
            <ChevronLeft className="mr-4" size={24} />
            <span className="text-2xl font-semibold text-gray-800">
              Kembali
            </span>
          </button>
        </div>
      )}

      {/* Desktop Banner - Only visible on desktop */}
      {screenSize === 'desktop' && (
        <div className="mb-6">
          <div className="flex h-64 w-full flex-col items-center justify-center rounded-3xl bg-gray-200 p-12">
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
      )}

      {/* Desktop Title - Only visible on desktop */}
      {screenSize === 'desktop' && (
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
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
          <p className="text-xs leading-tight text-gray-800 md:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Cras ornare sagittis erat, sit amet eleifend purus
            hendrerit non. Duis sed dui ante.
          </p>
        </div>

        <ol className="mb-4 list-decimal space-y-3 pl-6 md:mb-6">
          {[...Array(4)].map((_, idx) => (
            <li
              key={idx}
              className="text-xs font-normal text-gray-800 md:text-sm"
            >
              <span className="font-semibold">
                Curabitur tempor quis eros tempus lacinia.
              </span>{' '}
              Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi.
              Integer in felis sed leo vestibulum venenatis.
            </li>
          ))}
        </ol>

        <p className="mb-8 text-xs font-normal text-gray-800 md:text-sm">
          Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque
          quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo
          vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu
          vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus,
          porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna
          non ligula vestibulum eleifend. Nulla varius volutpat turpis sed
          lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum
          sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilibus
          nisi, ac posuere leo.
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

            <div className="flex justify-center pb-6">
              <div className="flex h-auto w-full max-w-4xl rounded-3xl border border-gray-200">
                {/* Sidebar kiri */}
                <div className="w-1/3 border-r border-gray-200">
                  <div className="p-0">
                    <div
                      className={`flex cursor-pointer items-center p-6 transition ${step === 1 ? 'bg-yellow-50' : ''} rounded-tl-3xl`}
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
                      <span className="ml-3 text-sm font-medium text-gray-800">
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
                      <span className="ml-3 text-sm font-medium text-gray-800">
                        Form Pengajuan
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form kanan */}
                <div className="w-2/3 overflow-y-auto ">
                  <div className="p-6">
                    {/* <form onSubmit={handleSubmit}> */}

                    {step === 1 && (
                      <>
                        <PembiayaanForm
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
