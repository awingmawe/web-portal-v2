/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import KotaAsalCombobox from '@/components/pages/banking/1-Tabungan/KotaAsal'
import ProvinsiAsalCombobox from '@/components/pages/banking/1-Tabungan/ProvinsiAsal'
import TriggerCalendar from '@/components/pages/manifest/3-FormManifest/TriggerCalendar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/sonner'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/auth/context'
import { useEffect } from 'react'

// Form schema for validation
export const pembiayaanFormSchema = z.object({
  fullName: z.string().min(1, 'Nama sesuai KTP wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  phoneNumber: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Jenis kelamin wajib dipilih',
  }),
  job: z.string().min(1, 'Pekerjaan wajib diisi'),
  born: z.string().min(1, 'Tanggal lahir wajib diisi'),
  provinceId: z.string().min(1, 'Provinsi wajib diisi'),
  cityId: z.string().min(1, 'Kota wajib diisi'),
  provinceName: z.string().min(1, 'Provinsi wajib diisi'),
  cityName: z.string().min(1, 'Kota wajib diisi'),
  address: z.string().min(1, 'Alamat wajib diisi'),
})

type PembiayaanFormValues = z.infer<typeof pembiayaanFormSchema>

// Default form values
const defaultValues: PembiayaanFormValues = {
  fullName: '',
  email: '',
  phoneNumber: '',
  born: '',
  gender: 'male',
  job: '',
  provinceId: '',
  cityId: '',
  provinceName: '',
  cityName: '',
  address: '',
}

// Form ref interface for external control
export interface PembiayaanFormRef {
  submit: () => void
  isValid: () => boolean
  getValues: () => PembiayaanFormValues
}

interface PembiayaanFormProps {
  onSubmit: (values: PembiayaanFormValues) => Promise<void>
  isLoading?: boolean
  screenSize?: any
  onCancel?: any
}

export const PembiayaanForm = forwardRef<
  PembiayaanFormRef,
  PembiayaanFormProps
>(({ onSubmit, isLoading = false, screenSize, onCancel }, ref) => {
  const { profile } = useAuth()

  // Define your form
  const form = useForm<PembiayaanFormValues>({
    resolver: zodResolver(pembiayaanFormSchema),
    defaultValues,
  })

  // Expose form methods to parent component
  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(handleSubmit)()
    },
    isValid: () => form.formState.isValid,
    getValues: () => form.getValues(),
  }))

  // Update form values when profile changes
  useEffect(() => {
    if (profile) {
      const profileValues: PembiayaanFormValues = {
        fullName: profile?.name || '',
        email: profile?.email || '',
        phoneNumber: profile?.persona?.phoneNumber || '',
        gender: (profile?.persona?.gender as 'male' | 'female') || 'male',
        job: profile?.persona?.job || '',
        born: profile?.persona?.born || '',
        provinceId: profile?.persona?.provinceId?.toString() || '',
        cityId: profile?.persona?.cityId?.toString() || '',
        provinceName: profile?.persona?.province?.name.toString() || '',
        cityName: profile?.persona?.city?.name?.toString() || '',
        address: profile?.persona?.address?.toString() || '',
      }

      form.reset(profileValues)
    }
  }, [profile, form])

  // Input validation function for numbers only
  const handleNumberOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    e.target.value = value
    return value
  }

  // Form submit handler
  const handleSubmit = async (values: PembiayaanFormValues) => {
    try {
      await onSubmit(values)
      //   toast.success('Data berhasil dikirim!')
    } catch (error: any) {
      const errorMsg = error?.message || 'Terjadi kesalahan. Silakan coba lagi.'
      toast.error(errorMsg)
    }
  }

  return (
    <Form {...form}>
      <form
        className={`space-y-4 ${screenSize !== 'desktop' ? 'pb-20' : 'pb-2'}`}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {/* Nama Sesuai KTP */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-[12px] font-[400] text-[#414141]">
                Nama Sesuai KTP <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan nama sesuai KTP"
                  className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-[12px] font-[400] text-[#414141]">
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Masukkan Email"
                  className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* No. Telp */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-[12px] font-[400] text-[#414141]">
                No. Telp <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <p className="absolute left-3 flex items-center text-[12px] text-gray-500">
                    +62
                  </p>
                  <Input
                    className="w-full rounded-[20px] border border-[#D2D2D1] p-2 pl-11"
                    placeholder="85867467367"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => {
                      // Remove any existing prefix if user manually types it
                      let value = e.target.value.replace(/^\+?62/, '')
                      // Apply handleNumberOnly to clean the input
                      value = handleNumberOnly({
                        ...e,
                        target: { ...e.target, value },
                      })
                      // Store the value without the prefix in the form
                      field.onChange(value)
                    }}
                    value={field.value.replace(/^\+?62/, '')}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Jenis Kelamin */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-[12px] font-[400] text-[#414141]">
                Jenis Kelamin <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="mt-2 flex gap-6"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="text-[12px] font-[400] text-[#414141]">
                      Pria
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="text-[12px] font-[400] text-[#414141]">
                      Wanita
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Tanggal Lahir */}
        <FormField
          control={form.control}
          name="born"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-[12px] font-[400] text-[#414141]">
                Tanggal Lahir <span className="text-red-500">*</span>
              </FormLabel>
              <TriggerCalendar field={field} />
              {/* <FormControl>
                <Input
                  type="date"
                  className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                  {...field}
                />
              </FormControl> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Pekerjaan */}
        <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-[12px] font-[400] text-[#414141]">
                Pekerjaan
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan Pekerjaan"
                  className="w-full rounded-[20px] border border-[#D2D2D1] p-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Provinsi */}
        <ProvinsiAsalCombobox control={form.control} />

        {/* Kabupaten/Kota */}
        <KotaAsalCombobox control={form.control} />

        {/* Alamat Lengkap */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1 block text-[12px] font-[400] text-[#414141]">
                Alamat Lengkap <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan alamat lengkap"
                  className="min-h-[80px] w-full resize-none rounded-[20px] border border-[#D2D2D1] p-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {screenSize !== 'desktop' && (
          <div className="fixed right-0 bottom-0 left-0 mt-10 border-t border-gray-100 bg-white p-4">
            <Button
              type="submit"
              className="w-full rounded-full bg-yellow-500 py-3 font-medium text-white hover:bg-yellow-600"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Lanjut
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
})
