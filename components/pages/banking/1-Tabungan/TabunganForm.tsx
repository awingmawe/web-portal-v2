'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import KotaAsalCombobox from '@/components/pages/banking/1-Tabungan/KotaAsal'
import ProvinsiAsalCombobox from '@/components/pages/banking/1-Tabungan/ProvinsiAsal'
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
export const tabunganFormSchema = z.object({
  fullName: z.string().min(1, 'Nama sesuai KTP wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  phoneNumber: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Jenis kelamin wajib dipilih',
  }),
  job: z.string().optional(),
  provinceId: z.string().optional(),
  cityId: z.string().optional(),
  provinceName: z.string().optional(),
  cityName: z.string().optional(),
  address: z.string().optional(),
})

type TabunganFormValues = z.infer<typeof tabunganFormSchema>

// Default form values
const defaultValues: TabunganFormValues = {
  fullName: '',
  email: '',
  phoneNumber: '',
  gender: 'male',
  job: '',
  provinceId: '',
  cityId: '',
  provinceName: '',
  cityName: '',
  address: '',
}

interface TabunganFormProps {
  onSubmit: (values: TabunganFormValues) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function TabunganForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: TabunganFormProps) {
  const { profile } = useAuth()

  // Define your form
  const form = useForm<TabunganFormValues>({
    resolver: zodResolver(tabunganFormSchema),
    defaultValues,
  })

  // Update form values when profile changes
  useEffect(() => {
    if (profile) {
      const profileValues: TabunganFormValues = {
        fullName: profile?.name || '',
        email: profile?.email || '',
        phoneNumber: profile?.persona?.phoneNumber || '',
        gender: (profile?.persona?.gender as 'male' | 'female') || 'male',
        job: profile?.persona?.job || '',
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
  const handleSubmit = async (values: TabunganFormValues) => {
    try {
      await onSubmit(values)
      toast.success('Data berhasil dikirim!')
    } catch (error: any) {
      const errorMsg = error?.message || 'Terjadi kesalahan. Silakan coba lagi.'
      toast.error(errorMsg)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
        {/* Form Actions */}
        <div className="mt-8 flex items-center justify-end space-x-4">
          <Button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-yellow-500 bg-white px-8 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-50"
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="rounded-full bg-yellow-500 px-8 py-3 text-sm font-medium text-white hover:bg-yellow-600"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
