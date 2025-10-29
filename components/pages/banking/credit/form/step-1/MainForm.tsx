'use client'

import { DataDiriFields } from '@/components/pages/banking/credit/form/step-1/DataDiri/DataDiri'
import { DataManifestFields } from '@/components/pages/banking/credit/form/step-1/DataManifest/DataManifest'
import DrawerDataDiri from '@/components/pages/banking/credit/form/step-1/mobile/DrawerDataDiri'
import DrawerDataManifest from '@/components/pages/banking/credit/form/step-1/mobile/DrawerDataManifest'
import { SubmissionStep1Skeleton } from '@/components/pages/banking/credit/form/step-1/mobile/SkeletonDrawerMobile'
import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'
import { toast } from '@/components/ui/sonner'
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

export const FormMessageErrorLayout = () => {
  return (
    <div className="mt-[-8px] min-h-3">
      <FormMessage />
    </div>
  )
}

export const dataDiriFields = [
  'name',
  'phone_number',
  'email',
  'born',
  'gender',
  'job',
  'provinceId',
  'cityId',
  'districtId',
  'postalCode',
  'address',
] as const

export default function SubmissionStep1({
  dataPembiayaan,
  dataPekerjaan,
  loading,
}: {
  dataPembiayaan?: PembiayaanDataLocalStorage | null
  dataPekerjaan: Facility[]
  loading: boolean
}) {
  const [isPemohonOpen, setIsPemohonOpen] = useState(false)
  const [isJemaahOpen, setIsJemaahOpen] = useState(false)

  const router = useRouter()
  const { lg: isMobile } = useTailwindBreakpoint()
  const { profile, isLoadingProfile } = useAuth()

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const totalQty = dataPembiayaan?.totalQty || 1

  const isLoading = loading || isLoadingProfile

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

  const onValidSubmit = async (values: SubmissionStep1FormValues) => {
    if (!dataPembiayaan) {
      toast.error('Data pembiayaan tidak tersedia')
      return
    }

    setIsLoadingSubmit(true)
    try {
      localStorageUtils.updateJSON(LOCAL_STORAGE_PEMBIAYAAN, (prev) => ({
        ...(prev as PembiayaanDataLocalStorage),
        formData: values,
      }))
      toast.success('Data berhasil disimpan')
      router.push('/banking/credit/form/step-2')
    } catch (error) {
      console.error('Error saving data:', error)
      toast.error('Gagal menyimpan data')
    } finally {
      setIsLoadingSubmit(false)
    }
  }

  const onInvalidSubmit = (errors: any) => {
    // Jika bukan mobile, biarkan perilaku default browser (fokus otomatis)
    if (!isMobile) return

    // Cek apakah ada error yang termasuk dalam 'dataDiriFields'
    const hasDataDiriError = dataDiriFields.some((field) => errors[field])

    if (hasDataDiriError) {
      // Jika ya, buka drawer Data Pemohon
      setIsPemohonOpen(true)
      // Selesai! Sisanya akan ditangani oleh drawer itu sendiri.
      return
    }

    // Jika error dari manifest maka buka drawer manifest
    if (errors.manifest) {
      setIsJemaahOpen(true)
      return
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
      manifest: form.getValues('manifest'),
    })
  }

  // Skeleton loading
  if (isLoading) {
    return <SubmissionStep1Skeleton totalQty={totalQty} />
  }

  if (isMobile) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)}
          className="flex flex-col gap-6 lg:hidden"
          noValidate
        >
          <div className="h-1.5 w-full self-stretch bg-neutral-100" />
          <DrawerDataDiri
            form={form}
            handleResetAction={handleReset}
            dataPekerjaan={dataPekerjaan}
            profile={profile}
            isLoadingSubmit={isLoadingSubmit}
            isPemohonOpen={isPemohonOpen}
            setIsPemohonOpen={setIsPemohonOpen}
          />
          <div className="h-1.5 w-full self-stretch bg-neutral-100" />
          <DrawerDataManifest
            isJemaahOpen={isJemaahOpen}
            setIsJemaahOpen={setIsJemaahOpen}
            form={form}
            profile={profile}
            isLoadingSubmit={isLoadingSubmit}
            totalQty={totalQty}
          />
          <div className="h-1.5 w-full self-stretch bg-neutral-100" />
          <div className="fixed right-0 bottom-0 left-0 z-10 w-full bg-white p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
            <Button
              type="submit"
              size="md"
              className="w-full"
              disabled={isLoadingSubmit}
            >
              Lanjut
            </Button>
          </div>
        </form>
      </Form>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)}
        className="max-lg:hidden"
      >
        {/* --- Bagian Data Diri --- */}
        <div className="container mx-auto flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between">
            {/* Reset Button dengan Konfirmasi */}
            <p className="heading-4-semibold">Data Pemohon</p>
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
          <div className="grid grid-cols-4 gap-4 rounded-2xl border-1 border-neutral-200 p-6">
            <DataDiriFields
              form={form}
              dataPekerjaan={dataPekerjaan}
              profile={profile}
              disabled={isLoadingSubmit}
            />
          </div>
        </div>

        {/* --- Bagian Data Manifest --- */}
        <div className="container mx-auto mt-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between">
            <p className="heading-4-semibold">Data Manifest</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <DataManifestFields
              form={form}
              disabled={isLoadingSubmit}
              size={totalQty}
              profile={profile}
            />
          </div>
        </div>

        {/* --- Tombol Submit Utama --- */}
        <div className="container mx-auto mt-6 w-full">
          <div className="flex items-center justify-end gap-4">
            <Button
              variant="outline"
              size="md"
              className="border-primary-500 border-2 px-10"
              disabled={isLoadingSubmit}
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="md"
              className="px-10"
              disabled={isLoadingSubmit}
            >
              Lanjut
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
