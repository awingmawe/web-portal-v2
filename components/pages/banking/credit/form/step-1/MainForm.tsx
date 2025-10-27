'use client'

import { DataDiriFields } from '@/components/pages/banking/credit/form/step-1/DataDiri/DataDiri'
import { DataManifestFields } from '@/components/pages/banking/credit/form/step-1/DataManifest/DataManifest'
import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'
import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import {
  SubmissionStep1FormValues,
  submissionStep1Schema,
} from '@/constant/schema/pembiayaan-schema/pembiayaan'
import { Facility } from '@/constant/types/FacilityProps'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { useAuth } from '@/contexts/auth/context'
import { localStorageUtils } from '@/hooks/common/useLocalStorage'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const FormMessageErrorLayout = () => {
  return (
    <div className="mt-[-8px] min-h-3">
      <FormMessage />
    </div>
  )
}

export default function SubmissionStep1({
  dataPembiayaan,
  dataPekerjaan,
  loading,
}: {
  dataPembiayaan?: PembiayaanDataLocalStorage | null
  dataPekerjaan: Facility[]
  loading: boolean
}) {
  const router = useRouter()
  const { lg: isMobile } = useTailwindBreakpoint()
  const { profile, isLoadingProfile } = useAuth()

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const totalQty = dataPembiayaan?.totalQty || 1

  const existingManifest = dataPembiayaan?.formData?.manifest

  // Buat array baru dengan panjang yang PASTI SAMA dengan totalQty
  const initialManifest = Array.from({ length: totalQty }, (_, index) => {
    //    Isi array: Gunakan data yang ada JIKA ada,
    //    jika tidak, isi dengan default value
    if (existingManifest && existingManifest[index]) {
      return existingManifest[index]
    }
    // Ini memastikan RHF + Zod punya struktur data yang benar untuk divalidasi
    return { name: '', phoneNumber: '' }
  })

  const form = useForm<SubmissionStep1FormValues>({
    resolver: zodResolver(submissionStep1Schema),
    values: {
      name: profile?.name || '',
      email: profile?.email || '',
      phone_number: profile?.persona?.phoneNumber || '',
      born: dataPembiayaan?.formData?.born || '',
      gender: dataPembiayaan?.formData?.gender || 'L',
      job: dataPembiayaan?.formData?.job || '',
      provinceId: dataPembiayaan?.formData?.provinceId || '',
      provinceName: dataPembiayaan?.formData?.provinceName || '',
      cityId: dataPembiayaan?.formData?.cityId || '',
      cityName: dataPembiayaan?.formData?.cityName || '',
      districtId: dataPembiayaan?.formData?.districtId || '',
      districtName: dataPembiayaan?.formData?.districtName || '',
      postalCode: dataPembiayaan?.formData?.postalCode || '',
      address: dataPembiayaan?.formData?.address || '',
      manifest: initialManifest,
    },
  })

  const handleSubmit = async (values: SubmissionStep1FormValues) => {
    if (!dataPembiayaan) {
      toast.error('Data pembiayaan tidak tersedia')
      return
    }

    setIsLoadingSubmit(true)

    try {
      // Update localStorage dengan data Step 1
      const updatedData: PembiayaanDataLocalStorage = {
        ...dataPembiayaan,
        formData: values,
      }

      localStorageUtils.updateJSON(LOCAL_STORAGE_PEMBIAYAAN, (prev) => ({
        ...(prev as PembiayaanDataLocalStorage),
        formData: updatedData,
      }))

      toast.success('Data berhasil disimpan')

      // Redirect ke Step 2
      router.push('/pembiayaan/submission/step-2')
    } catch (error) {
      console.error('Error saving data:', error)
      toast.error('Gagal menyimpan data')
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  const handleReset = () => {
    // Reset form ke default values
    form.reset({
      name: profile?.name || '',
      email: profile?.email || '',
      phone_number: profile?.persona?.phoneNumber || '',
      born: '',
      gender: 'L',
      job: '',
      provinceId: '',
      provinceName: '',
      cityId: '',
      cityName: '',
      districtId: '',
      districtName: '',
      postalCode: '',
      address: '',
    })
  }

  if (!isMobile) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* --- Bagian Data Diri --- */}
          <div className="container mx-auto flex flex-col gap-4 max-lg:px-4">
            <div className="flex flex-wrap items-end justify-between max-lg:gap-1">
              {/* Reset Button dengan Konfirmasi */}
              <p className="heading-4-semibold max-lg:text-[14px] max-lg:leading-5 max-lg:font-semibold">
                Data Pemohon
              </p>
              <p
                onClick={handleReset}
                className="text-s-medium text-error-500 cursor-pointer text-right"
              >
                Reset
              </p>
              <p className="text-s-regular w-full text-neutral-500">
                Pemohon adalah orang yang akan bertanggung jawab atas pengajuan
                pembiayaan ini.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-4 rounded-2xl border-1 border-neutral-200 p-6 max-lg:grid-cols-1">
              <DataDiriFields
                form={form}
                dataPekerjaan={dataPekerjaan}
                profile={profile}
                disabled={isLoadingSubmit}
                isLoading={loading || isLoadingProfile}
              />
            </div>
          </div>

          {/* --- Bagian Data Manifest --- */}
          <div className="container mx-auto mt-8 flex flex-col gap-4 max-lg:px-4">
            <div className="flex flex-wrap items-end justify-between max-lg:gap-1">
              <p className="heading-4-semibold">Data Manifest</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <DataManifestFields
                form={form}
                disabled={isLoadingSubmit}
                isLoading={loading || isLoadingProfile}
                size={dataPembiayaan?.totalQty || 0}
                profile={profile}
              />
            </div>
          </div>

          {/* --- Tombol Submit Utama --- */}
          <div className="container mx-auto my-6">
            <Button type="submit" disabled={isLoadingSubmit}>
              Simpan dan Lanjut ke Step 2
            </Button>
          </div>
        </form>
      </Form>
    )
  }

  return <p>ini mobile</p>
}
