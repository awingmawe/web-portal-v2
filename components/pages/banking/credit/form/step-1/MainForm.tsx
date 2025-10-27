'use client'

import { DataDiriFields } from '@/components/pages/banking/credit/form/step-1/DataDiri/DataDiri'
import { Form } from '@/components/ui/form'
import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import {
  SubmissionStep1FormValues,
  submissionStep1Schema,
} from '@/constant/schema/pembiayaan-schema/pembiayaan'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { useAuth } from '@/contexts/auth/context'
import { localStorageUtils } from '@/hooks/common/useLocalStorage'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function SubmissionStep1({
  dataPembiayaan,
}: {
  dataPembiayaan?: PembiayaanDataLocalStorage | null
}) {
  const router = useRouter()
  const { lg: isMobile } = useTailwindBreakpoint()
  const { profile } = useAuth()

  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<SubmissionStep1FormValues>({
    resolver: zodResolver(submissionStep1Schema),
    values: {
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
      manifest: [{ name: '', phoneNumber: '' }],
    },
  })

  // Load data dari localStorage saat component mount
  useEffect(() => {
    try {
      // Jika sudah ada formData dari Step 1 sebelumnya, populate form
      if (dataPembiayaan?.formData) {
        form.reset({
          name: dataPembiayaan.formData.name,
          email: dataPembiayaan.formData.email || '',
          phone_number: dataPembiayaan.formData.phone_number,
          born: dataPembiayaan.formData.born,
          gender: dataPembiayaan.formData.gender,
          job: dataPembiayaan.formData.job,
          provinceId: dataPembiayaan.formData.provinceId,
          provinceName: dataPembiayaan.formData.provinceName,
          cityId: dataPembiayaan.formData.cityId,
          cityName: dataPembiayaan.formData.cityName,
          districtId: dataPembiayaan.formData.districtId,
          districtName: dataPembiayaan.formData.districtName,
          postalCode: dataPembiayaan.formData.postalCode,
          address: dataPembiayaan.formData.address,
        })
      }
    } catch (error) {
      console.error('Error parsing localStorage data:', error)
      toast.error('Data pembiayaan tidak valid')
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (values: SubmissionStep1FormValues) => {
    if (!dataPembiayaan) {
      toast.error('Data pembiayaan tidak tersedia')
      return
    }

    setIsLoading(true)

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
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    // Reset form ke default values
    form.reset({
      name: '',
      email: '',
      phone_number: '',
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
      <div className="container mx-auto flex flex-col gap-4 max-lg:px-4">
        <div className="flex flex-wrap items-end justify-between max-lg:gap-1">
          {/* Reset Button dengan Konfirmasi */}
          <p className="heading-4-semibold max-lg:text-[14px] max-lg:leading-5 max-lg:font-semibold">
            Data Pemohon
          </p>
          <p
            onClick={handleReset}
            className="text-s-medium text-error-500 text-right"
          >
            Reset
          </p>
          <p className="text-s-regular w-full text-neutral-500">
            Pemohon adalah orang yang akan bertanggung jawab atas pengajuan
            pembiayaan ini.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-4 gap-4 rounded-2xl border-1 border-neutral-200 px-6 py-4 max-lg:gap-2 max-lg:border-none max-lg:p-0"
          >
            <DataDiriFields form={form} disabled={isLoading} />
          </form>
        </Form>
      </div>
    )
  }

  return <p>ini mobile</p>
}
