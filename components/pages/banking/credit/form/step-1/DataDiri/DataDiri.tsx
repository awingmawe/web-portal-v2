'use client'

import FormLokasi from '@/components/pages/banking/credit/form/step-1/DataDiri/DataLokasi'
import FormPekerjaan from '@/components/pages/banking/credit/form/step-1/DataDiri/DataPekerjaan'
import { FormMessageErrorLayout } from '@/components/pages/banking/credit/form/step-1/MainForm'
import TriggerCalendar from '@/components/pages/manifest/3-FormManifest/TriggerCalendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Facility } from '@/constant/types/FacilityProps'
import { Profile } from '@/contexts/auth/shared/type'
import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface DataDiriFieldsProps {
  form: UseFormReturn<any>
  disabled?: boolean
  dataPekerjaan: Facility[]
  profile?: Profile | null
}

export function DataDiriFields({
  form,
  disabled = false,
  dataPekerjaan,
  profile,
}: DataDiriFieldsProps) {
  return (
    <Fragment>
      {/* Row 1: Nama and No Telp */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>
              Nama Sesuai KTP <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkan nama sesuai KTP"
                {...field}
                model="normal"
                className="rounded-full"
                disabled={disabled || !!profile?.name}
              />
            </FormControl>
            <FormMessageErrorLayout />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone_number"
        render={({ field }) => (
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>
              No. Telp <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type="tel"
                model="normal"
                placeholder="+62"
                {...field}
                className="rounded-full"
                disabled={disabled || !!profile?.persona?.phoneNumber}
              />
            </FormControl>
            <FormMessageErrorLayout />
          </FormItem>
        )}
      />

      {/* Row 2: Email and Tgl Lahir */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>
              Email <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                model="normal"
                placeholder="Masukkan email"
                {...field}
                className="rounded-full"
                disabled={disabled || !!profile?.email}
              />
            </FormControl>
            <FormMessageErrorLayout />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="born"
        render={({ field }) => (
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>
              Tanggal Lahir <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <TriggerCalendar className="py-3.5" field={field} />
            </FormControl>
            <FormMessageErrorLayout />
          </FormItem>
        )}
      />

      {/* Row 3: Jenis Kelamin and Pekerjaan */}
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>
              Jenis Kelamin <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
                className="flex gap-3"
                disabled={disabled}
              >
                {/* ... (label Pria) ... */}
                <label
                  className={cn(
                    'flex flex-1 cursor-pointer items-center gap-2 rounded-full border px-4 py-3.5 transition-colors',
                    field.value === 'L'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  )}
                >
                  <RadioGroupItem value="L" />
                  <span className="text-m-regular">Pria</span>
                </label>
                {/* ... (label Wanita) ... */}
                <label
                  className={cn(
                    'flex flex-1 cursor-pointer items-center gap-2 rounded-full border px-4 py-3.5 transition-colors',
                    field.value === 'P'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  )}
                >
                  <RadioGroupItem value="P" />
                  <span className="text-m-regular">Wanita</span>
                </label>
              </RadioGroup>
            </FormControl>
            <FormMessageErrorLayout />
          </FormItem>
        )}
      />

      <FormPekerjaan
        dataPekerjaan={dataPekerjaan}
        form={form}
        disabled={disabled}
      />

      {/* Row 4: Provinsi, Kabupaten/Kota, Kecamatan, Kode Pos */}
      <FormLokasi form={form} disabled={disabled} />

      {/* Row 5: Alamat Lengkap */}
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="col-span-4 max-lg:col-span-1">
            <FormLabel>
              Alamat Lengkap <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Masukkan alamat lengkap"
                className="h-[90px] resize-none rounded-[20px] px-4 py-2.5"
                {...field}
                disabled={disabled}
              />
            </FormControl>
            <FormMessageErrorLayout />
          </FormItem>
        )}
      />
    </Fragment>
  )
}
