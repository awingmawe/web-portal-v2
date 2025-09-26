import { z } from 'zod'

// Form schema for validation
export const dataDiriSchema = z.object({
  fullName: z.string().min(1, 'Nama sesuai KTP wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  phoneNumber: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  birthDate: z.string().min(1, 'Tanggal lahir wajib diisi'),
  gender: z.enum(['pria', 'wanita'], {
    required_error: 'Jenis kelamin wajib dipilih',
  }),
  job: z.string().optional(),
  cityId: z.string().min(1, 'Kabupaten/Kota wajib diisi'),
  cityName: z.string().min(1, 'Kabupaten/Kota wajib diisi'),
  provinceId: z.string().min(1, 'Provinsi wajib diisi'),
  provinceName: z.string().min(1, 'Provinsi wajib diisi'),
  address: z.string().optional(),
})

export type DataDiriFormValues = z.infer<typeof dataDiriSchema>