'use client'

import { FormMessageErrorLayout } from '@/components/pages/banking/credit/form/step-1/MainForm'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Profile } from '@/contexts/auth/shared/type'
import { Fragment, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface DataManifestFieldsProps {
  form: UseFormReturn<any>
  disabled?: boolean
  size: number
  profile?: Profile | null
}

export function DataManifestFields({
  form,
  disabled = false,
  size,
  profile,
}: DataManifestFieldsProps) {
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    if (checked) {
      form.setValue('manifest.0.name', profile?.name || '')
      form.setValue(
        'manifest.0.phoneNumber',
        profile?.persona?.phoneNumber || ''
      )

      form.clearErrors('manifest.0.name')
      form.clearErrors('manifest.0.phoneNumber')
    } else {
      form.setValue('manifest.0.name', '')
      form.setValue('manifest.0.phoneNumber', '')
    }
  }, [checked, form, profile?.name, profile?.persona?.phoneNumber])

  return (
    <Fragment>
      {Array.from({ length: size }, (_, index) => (
        <div
          key={index}
          className="col-span-1 max-lg:not-last:border-b max-lg:not-last:border-b-neutral-200 lg:rounded-[20px] lg:border lg:border-neutral-200"
        >
          <div className="flex justify-between gap-3 max-lg:flex-col lg:items-center lg:border-b lg:border-neutral-200 lg:px-4 lg:py-3">
            <p className="text-m-semibold">Data Jamaah {index + 1}</p>
            {index === 0 && (
              <Checkbox
                label="Saya sebagai pemohon adalah jemaah"
                checked={checked}
                onCheckedChange={(checked: boolean) => setChecked(checked)}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 max-lg:gap-3 max-lg:py-3 lg:p-4">
            <FormField
              control={form.control}
              name={`manifest.${index}.name`}
              render={({ field }) => (
                <FormItem className="col-span-1 max-lg:col-span-2">
                  <FormLabel>
                    Nama sesuai KTP <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama lengkap"
                      model="normal"
                      {...field}
                      className="rounded-full"
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessageErrorLayout />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`manifest.${index}.phoneNumber`}
              render={({ field }) => (
                <FormItem className="col-span-1 max-lg:col-span-2">
                  <FormLabel>
                    No. Telp <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-full"
                      startIcon={'+62'}
                      type="tel"
                      model="normal"
                      placeholder="Masukan Nomor Telepon"
                      {...field}
                      onChange={(e) => {
                        // Ambil nilai input
                        const value = e.target.value

                        // Hapus semua karakter yang BUKAN angka (0-9)
                        const numericValue = value.replace(/[^0-9]/g, '')

                        // Jika dimulai dengan '62', ganti dengan '0'
                        const formattedValue = numericValue.startsWith('62')
                          ? `${numericValue.substring(2)}`
                          : numericValue

                        // Set nilai yang sudah bersih ke form
                        // Tambahkan kondisi agar tidak bisa input jika dimulai dengan '0'
                        if (!formattedValue.startsWith('0')) {
                          field.onChange(formattedValue)
                        }
                      }}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessageErrorLayout />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
    </Fragment>
  )
}
