import { z } from 'zod'

export const defaultValueManifest = {
  name: '',
  phoneNumber: '',
  email: '',
  nik: '',
  born: '',
  placeBorn: '',
  address: '',
  gender: 'male',
  hometown: '',
  passportNumber: '',
  passportExpiredAt: '',
  medicalHistory: '',
  roomtype: '',
}

export const formSchemaManifest = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'Nama tidak boleh berisi simbol atau angka!',
    })
    .min(1, {
      message: 'Nama harus diisi!',
    }),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, {
      message: 'Nomor telepon hanya boleh berisi angka!',
    })
    .min(1, {
      message: 'Nomor telepon harus diisi!',
    })
    .min(10, {
      message: 'Nomor telepon minimal 10 digit!',
    }),
  email: z.string().min(1, { message: 'Email harus diisi!' }).email({
    message: 'Format email tidak valid!',
  }),
  nik: z
    .string()
    .min(1, {
      message: 'NIK harus diisi!',
    })
    .max(16, {
      message: 'NIK harus 16 digit!',
    })
    .regex(/^\d+$/, {
      message: 'NIK hanya boleh berisi angka!',
    }),
  born: z.string().min(1, { message: 'Tanggal lahir harus diisi!' }),
  placeBorn: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  roomtype: z.string().min(1, { message: 'Tipe Kamar harus diisi!' }),
  gender: z.string().min(1, { message: 'Jenis kelamin harus diisi!' }),
  hometown: z.string().min(1, { message: 'Kota asal harus diisi!' }),
  passportNumber: z.string().min(1, { message: 'Nomor paspor harus diisi!' }),
  passportExpiredAt: z
    .string()
    .min(1, { message: 'Masa berlaku paspor harus diisi!' }),
})
