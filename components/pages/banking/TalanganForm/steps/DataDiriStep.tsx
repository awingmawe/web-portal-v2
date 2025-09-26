'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { FileUpload } from '@/components/pages/manifest/3-FormManifest/UploadDokumen'
import KotaAsalCombobox from '@/components/pages/banking/1-Tabungan/KotaAsal'
import ProvinsiAsalCombobox from '@/components/pages/banking/1-Tabungan/ProvinsiAsal'
import TriggerCalendar from '@/components/pages/manifest/3-FormManifest/TriggerCalendar'
import { TalanganFormData } from '../TalanganFormPage'
import { dataDiriSchema, DataDiriFormValues } from '@/constant/schema/talangan-schema'

interface DataDiriStepProps {
  formData: TalanganFormData
  updateFormData: (data: Partial<TalanganFormData>) => void
  onNext: () => void
}

export default function DataDiriStep({
  formData,
  updateFormData,
  onNext,
}: DataDiriStepProps) {
  const form = useForm<DataDiriFormValues>({
    resolver: zodResolver(dataDiriSchema),
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      birthDate: formData.birthDate,
      gender: formData.gender || 'pria',
      job: formData.job,
      cityId: formData.cityId,
      cityName: formData.cityName,
      provinceId: formData.provinceId,
      provinceName: formData.provinceName,
      address: formData.address,
    },
  })

  const handleSubmit = (values: DataDiriFormValues) => {
    updateFormData(values)
    onNext()
  }

  const handleKtpUpload = (file: File | null) => {
    updateFormData({ ktpFile: file })
  }

  const handleNpwpUpload = (file: File | null) => {
    updateFormData({ npwpFile: file })
  }

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-lg p-6 lg:p-8 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Row 1: Nama and Email */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
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
                    Email *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan email"
                      {...field}
                      className="rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Phone, Birth Date, Gender */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    No. Telp *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="62"
                      {...field}
                      className="rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
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
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pria" id="pria" />
                        <label htmlFor="pria" className="text-sm font-medium">
                          Pria
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wanita" id="wanita" />
                        <label htmlFor="wanita" className="text-sm font-medium">
                          Wanita
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 3: Job, City, Province */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Pekerjaan
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan pekerjaan"
                      {...field}
                      className="rounded-full"
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
                    <KotaAsalCombobox
                      selectedCityId={field.value}
                      onCityChange={(cityId, cityName) => {
                        field.onChange(cityId)
                        form.setValue('cityName', cityName)
                      }}
                      provinceId={form.watch('provinceId')}
                      placeholder="Pilih kabupaten/kota"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="provinceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Provinsi *
                  </FormLabel>
                  <FormControl>
                    <ProvinsiAsalCombobox
                      selectedProvinceId={field.value}
                      onProvinceChange={(provinceId, provinceName) => {
                        field.onChange(provinceId)
                        form.setValue('provinceName', provinceName)
                        // Reset city when province changes
                        form.setValue('cityId', '')
                        form.setValue('cityName', '')
                      }}
                      placeholder="Pilih provinsi"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 4: Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Alamat Lengkap
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan alamat lengkap"
                    className="rounded-lg resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File Uploads */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <FormLabel className="text-sm font-medium text-gray-700 mb-4 block">
                KTP
              </FormLabel>
              <FileUpload
                label=""
                description="Tarik dokumen ke area ini untuk mengunggah dokumen"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                onChange={handleKtpUpload}
                value={formData.ktpFile}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6"
              />
              <p className="text-xs text-gray-500 mt-2">
                mendukung tipe file: jpeg, jpg, png, pdf
              </p>
            </div>

            <div>
              <FormLabel className="text-sm font-medium text-gray-700 mb-4 block">
                NPWP
              </FormLabel>
              <FileUpload
                label=""
                description="Tarik dokumen ke area ini untuk mengunggah dokumen"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                onChange={handleNpwpUpload}
                value={formData.npwpFile}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6"
              />
              <p className="text-xs text-gray-500 mt-2">
                mendukung tipe file: jpeg, jpg, png, pdf
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="px-8 py-2 rounded-full"
              onClick={() => window.history.back()}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="px-8 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Lanjut
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}