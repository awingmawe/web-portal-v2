'use client'

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
import { Textarea } from '@/components/ui/textarea'
import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import {
  SubmissionStep1Data,
  SubmissionStep1FormValues,
  submissionStep1Schema,
} from '@/constant/schema/pembiayaan-schema/pembiayaan'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { useAuth } from '@/contexts/auth/context'
import { localStorageUtils } from '@/hooks/common/useLocalStorage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function SubmissionStep1() {
  const router = useRouter()
  const { profile } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [pembiayaanData, setPembiayaanData] =
    useState<PembiayaanDataLocalStorage | null>(null)

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
    },
  })

  // Load data dari localStorage saat component mount
  useEffect(() => {
    try {
      const parsedData = localStorageUtils.getJSON(
        LOCAL_STORAGE_PEMBIAYAAN
      ) as PembiayaanDataLocalStorage

      setPembiayaanData(parsedData)

      // Jika sudah ada formData dari Step 1 sebelumnya, populate form
      if (parsedData.formData) {
        form.reset({
          name: parsedData.formData.name,
          email: parsedData.formData.email || '',
          phone_number: parsedData.formData.phone_number,
          born: parsedData.formData.born,
          gender: parsedData.formData.gender,
          job: parsedData.formData.job,
          provinceId: parsedData.formData.provinceId,
          provinceName: parsedData.formData.provinceName,
          cityId: parsedData.formData.cityId,
          cityName: parsedData.formData.cityName,
          districtId: parsedData.formData.districtId,
          districtName: parsedData.formData.districtName,
          postalCode: parsedData.formData.postalCode,
          address: parsedData.formData.address,
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
    if (!pembiayaanData) {
      toast.error('Data pembiayaan tidak tersedia')
      return
    }

    setIsLoading(true)

    try {
      // Gabungkan data form dengan data dari localStorage
      const completeStep1Data: SubmissionStep1Data = {
        ...values,
        organization_instance_id:
          pembiayaanData.selectedPackage.organizationName,
        total_price: pembiayaanData.price,
        jumlah_jemaah: pembiayaanData.totalQty,
        package_name: pembiayaanData.selectedPackage.packageName,
        package_id: pembiayaanData.selectedPackage.packageId,
        package_variant_id: pembiayaanData.selectedPackage.packageVariantId,
      }

      // Update localStorage dengan data Step 1
      const updatedData: PembiayaanDataLocalStorage = {
        ...pembiayaanData,
        formData: completeStep1Data,
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

  if (!pembiayaanData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-sm lg:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Step 1: Data Pemohon
              </h2>
              <p className="text-sm text-gray-600">
                Lengkapi data diri Anda dengan benar
              </p>
            </div>

            {/* Reset Button dengan Konfirmasi */}
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Reset
            </button>
          </div>

          {/* Row 1: Nama and Email */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Nama Sesuai KTP *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama sesuai KTP"
                      {...field}
                      className="rounded-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email (Opsional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contoh@email.com"
                      {...field}
                      className="rounded-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Phone, Birth Date, Gender */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    No. Telepon *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="081234567890"
                      {...field}
                      className="rounded-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="born"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Tanggal Lahir *
                  </FormLabel>
                  <FormControl>
                    <TriggerCalendar field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Jenis Kelamin *
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-6"
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="L" id="laki-laki" />
                        <label
                          htmlFor="laki-laki"
                          className="text-sm font-medium"
                        >
                          Laki-laki
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="P" id="perempuan" />
                        <label
                          htmlFor="perempuan"
                          className="text-sm font-medium"
                        >
                          Perempuan
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 3: Job */}
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Pekerjaan *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan pekerjaan"
                      {...field}
                      className="rounded-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 4: Province, City, District */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="provinceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Provinsi *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan provinsi"
                      {...field}
                      className="rounded-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Kabupaten/Kota *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan kabupaten/kota"
                      {...field}
                      className="rounded-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="districtId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Kecamatan *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan kecamatan"
                      {...field}
                      className="rounded-full"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 5: Postal Code */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Kode Pos *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan kode pos (5 digit)"
                      {...field}
                      className="rounded-full"
                      disabled={isLoading}
                      maxLength={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 6: Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Alamat Lengkap *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan alamat lengkap"
                    className="resize-none rounded-lg"
                    rows={3}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-8 py-2"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-yellow-500 px-8 py-2 text-white hover:bg-yellow-600"
              disabled={isLoading}
            >
              {isLoading ? 'Menyimpan...' : 'Lanjut ke Step 2'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
