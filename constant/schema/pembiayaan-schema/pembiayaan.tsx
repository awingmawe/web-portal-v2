// constant/schema/pembiayaan-schema/pembiayaan.ts

import {
  DATE_REGEX,
  PHONE_REGEX,
  POSTAL_CODE_REGEX,
} from '@/constant/schema/pembiayaan-schema/constant'
import { z } from 'zod'

// Regex patterns
// --------------------------------------- STEP 1 SCHEMA ------------------------------------ //
export const submissionStep1Schema = z.object({
  name: z
    .string()
    .min(3, 'Nama minimal 3 karakter')
    .max(100, 'Nama maksimal 100 karakter')
    .trim()
    .refine((val) => val.length > 0, 'Nama sesuai KTP wajib diisi'),

  email: z
    .string()
    .trim()
    .email('Format email tidak valid')
    .optional()
    .or(z.literal('')), // Allow empty string

  phone_number: z
    .string()
    .trim()
    .regex(
      PHONE_REGEX,
      'Format nomor telepon tidak valid (contoh: 081234567890)'
    )
    .min(10, 'Nomor telepon minimal 10 digit')
    .max(15, 'Nomor telepon maksimal 15 digit'),

  born: z
    .string()
    .regex(DATE_REGEX, 'Format tanggal harus YYYY-MM-DD')
    .min(1, 'Tanggal lahir wajib diisi'),

  gender: z.enum(['L', 'P'], {
    required_error: 'Jenis kelamin wajib dipilih',
    invalid_type_error: 'Jenis kelamin harus L (Laki-laki) atau P (Perempuan)',
  }),

  job: z
    .string()
    .min(2, 'Pekerjaan minimal 2 karakter')
    .max(50, 'Pekerjaan maksimal 50 karakter')
    .trim(),

  // Location fields
  provinceId: z.string().min(1, 'Provinsi wajib diisi'),
  provinceName: z.string().min(1, 'Provinsi wajib diisi'),

  cityId: z.string().min(1, 'Kabupaten/Kota wajib diisi'),
  cityName: z.string().min(1, 'Kabupaten/Kota wajib diisi'),

  districtId: z.string().min(1, 'Kecamatan wajib diisi'),
  districtName: z.string().min(1, 'Kecamatan wajib diisi'),

  postalCode: z
    .string()
    .trim()
    .regex(POSTAL_CODE_REGEX, 'Kode pos harus 5 digit angka'),

  address: z
    .string()
    .min(10, 'Alamat minimal 10 karakter')
    .max(200, 'Alamat maksimal 200 karakter')
    .trim(),
})

export type SubmissionStep1FormValues = z.infer<typeof submissionStep1Schema>

// Type untuk data yang akan disimpan di localStorage setelah Step 1 berhasil
export interface SubmissionStep1Data extends SubmissionStep1FormValues {
  // Data dari localStorage PembiayaanDataLocalStorage
  organization_instance_id: string
  total_price: number
  jumlah_jemaah: number
  package_name: string
  package_id: number
  package_variant_id: number
}
