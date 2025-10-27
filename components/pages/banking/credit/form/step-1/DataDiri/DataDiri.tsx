'use client'

import FormLokasi from '@/components/pages/banking/credit/form/step-1/DataDiri/DataLokasi'
import TriggerCalendar from '@/components/pages/manifest/3-FormManifest/TriggerCalendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface DataDiriFieldsProps {
  form: UseFormReturn<any>
  disabled?: boolean
}

export function DataDiriFields({
  form,
  disabled = false,
}: DataDiriFieldsProps) {
  return (
    <Fragment>
      {/* Row 1: Nama and No Telp */}
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>Nama Sesuai KTP *</FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkan nama sesuai KTP"
                {...field}
                className="rounded-full"
                error={fieldState.error?.message}
                disabled={disabled}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone_number"
        render={({ field }) => (
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>No. Telp *</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="+62"
                {...field}
                className="rounded-full"
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Row 2: Email and Tgl Lahir */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>Email *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Masukkan email"
                {...field}
                className="rounded-full"
                disabled={disabled}
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
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>Tanggal Lahir *</FormLabel>
            <FormControl>
              <TriggerCalendar field={field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Row 3: Jenis Kelamin and Pekerjaan */}
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>Jenis Kelamin *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === 'L')}
                value={field.value ? 'L' : 'P'}
                className="flex gap-3"
                disabled={disabled}
              >
                <label
                  className={cn(
                    'flex flex-1 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 transition-colors',
                    field.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  )}
                >
                  <RadioGroupItem value="L" />
                  <span className="text-sm">Pria</span>
                </label>
                <label
                  className={cn(
                    'flex flex-1 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 transition-colors',
                    !field.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  )}
                >
                  <RadioGroupItem value="P" />
                  <span className="text-sm">Wanita</span>
                </label>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="job"
        render={({ field }) => (
          <FormItem className="col-span-2 max-lg:col-span-1">
            <FormLabel>Pekerjaan *</FormLabel>
            <FormControl>
              <Input
                placeholder="Pilih pekerjaan"
                {...field}
                className="rounded-full"
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Row 4: Provinsi, Kabupaten/Kota, Kecamatan, Kode Pos */}
      <FormLokasi form={form} disabled={disabled} />

      {/* Row 5: Alamat Lengkap */}
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="col-span-4 max-lg:col-span-1">
            <FormLabel>Alamat Lengkap *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Masukkan alamat lengkap"
                className="resize-none rounded-lg"
                rows={3}
                {...field}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Fragment>
  )
}
