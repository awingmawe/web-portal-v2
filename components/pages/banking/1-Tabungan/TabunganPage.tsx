// Tambahkan debugging dan perbaikan untuk desktop view
'use client'
import DrawerAlreadyHave from '@/components/pages/banking/mobile/DrawerAlreadyHave'
import ModalAlreadyHave from '@/components/pages/banking/modal/modalAlreadyHave'
import { Button } from '@/components/ui/button'
import { getSaving, postSaving } from '@/services/banking-service'
import { updateProfile } from '@/services/identity-service'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TabunganForm } from './TabunganForm'

type TabunganFormValues = {
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
}

const TabunganPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [showFormCurrent, setShowFormCurrent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [screenSize, setScreenSize] = useState<'mobile' | 'desktop'>('mobile')

  // Debug: Monitor screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 768
      setScreenSize(isMobile ? 'mobile' : 'desktop')
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const openForm = async () => {
    try {
      const res = await getSaving()
      if (res) {
        setShowFormCurrent(true)
      } else {
        setShowForm(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const closeForm = () => {
    setShowForm(false)
  }

  const handleFormSubmit = async (values: TabunganFormValues) => {
    setLoading(true)
    try {
      const { cityName, provinceName, fullName, email, ...payload } = values

      await updateProfile({
        name: fullName,
        persona: payload,
      })

      const Allpayload = {
        ...payload,
        name: fullName,
        phoneNumber: `+62${values.phoneNumber}`,
        email,
        provinceName,
        cityName,
        providerId: 1,
        address: values.address,
        status: 'Diajukan',
      }

      await postSaving(Allpayload)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      closeForm()
    } catch (error) {
      console.error('Error submitting form:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Mobile Form View
  if (showForm && screenSize === 'mobile') {
    return (
      <div className="min-h-screen bg-yellow-400">
        <div className="bg-yellow-400 px-4 py-4 pt-12">
          <div className="flex items-center justify-center">
            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <span className="text-xs font-medium text-yellow-600">1</span>
            </div>
            <span className="text-sm text-white">Data Diri</span>
          </div>
        </div>

        <div className="-mt-2 flex-1 rounded-t-3xl bg-white px-6 py-6">
          <TabunganForm
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            isLoading={loading}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="mt-10 flex min-h-screen flex-col p-4 pb-20 md:mt-0 md:p-8 md:pb-12">
      {/* Debug Info - hapus di production */}
      {/* <div className="mb-4 rounded bg-blue-100 p-2 text-xs">
        Debug: {screenSize} mode, Screen:{' '}
        {typeof window !== 'undefined' ? window.innerWidth : 'unknown'}px
      </div> */}

      {/* Mobile Header - hanya tampil di mobile */}
      {screenSize === 'mobile' && (
        <div>
          <div className="relative mb-4 justify-items-center rounded-lg">
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
      )}

      {/* Desktop Header - hanya tampil di desktop */}
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

      {/* Desktop Banner - hanya tampil di desktop */}
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

      {/* Desktop Title - hanya tampil di desktop */}
      {screenSize === 'desktop' && (
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-800">
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
      )}

      {/* Content - tampil di kedua mode */}
      <div className={screenSize === 'desktop' ? 'px-6' : ''}>
        <div className="mb-3 md:mb-6">
          <p className="text-xs leading-tight text-gray-800 md:text-sm">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
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
              Nam bibendum pellentesque quam a convallis. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium.
            </li>
          ))}
        </ol>

        <p className="mb-8 text-xs font-normal text-gray-800 md:text-sm">
          Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque
          quam a convallis. Sed ut perspiciatis unde omnis iste natus error sit
          voluptatem accusantium doloremque laudantium, totam rem aperiam.
        </p>

        {/* Button - responsive positioning */}
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
            Ikuti Program Tabungan Sekarang
          </Button>
        </div>
      </div>

      {/* Desktop Modal Form */}
      {showForm && screenSize === 'desktop' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative h-auto w-full max-w-4xl rounded-3xl bg-white shadow-lg">
            <div className="flex p-6">
              <h2 className="text-xl font-semibold">Form Program Tabungan</h2>
            </div>

            <div className="flex justify-center pb-6">
              <div className="flex h-auto w-full max-w-4xl rounded-3xl border border-gray-200">
                {/* Sidebar kiri */}
                <div className="w-1/3 border-r border-gray-200">
                  <div className="p-0">
                    <div className="flex cursor-pointer items-center rounded-tl-3xl bg-yellow-50 p-6 transition">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
                        <span className="text-base font-medium text-black">
                          1
                        </span>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-800">
                        Data Diri
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form kanan */}
                <div className="w-2/3 overflow-y-auto">
                  <div className="p-6">
                    <TabunganForm
                      onSubmit={handleFormSubmit}
                      onCancel={closeForm}
                      isLoading={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showFormCurrent && screenSize === 'desktop' ? (
        <ModalAlreadyHave
          text={'Tabungan'}
          open={showFormCurrent}
          onOpenChange={setShowFormCurrent}
        />
      ) : (
        <DrawerAlreadyHave
          text={'Tabungan'}
          open={showFormCurrent}
          setOpen={setShowFormCurrent}
        />
      )}
    </div>
  )
}

export default TabunganPage
