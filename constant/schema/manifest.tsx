import { z } from 'zod'

export const defaultValueManifest = {
  bookingId: 0,
  name: '',
  phoneNumber: '',
  email: null,
  nik: null,
  born: null,
  placeBorn: null,
  address: null,
  gender: null,
  hometown: null,
  passportNumber: null,
  passportExpiredAt: null,
  medicalHistory: null,
}

export const formSchemaManifest = z.object({
  bookingId: z.number(),
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
      message: 'Phone number must contain only digits!',
    })
    .min(10, {
      message: 'Phone number must be at least 10 characters.',
    }),
  email: z
    .string()
    .email({
      message: 'Invalid email address.',
    })
    .nullable(),
  nik: z
    .string()
    .min(16, {
      message: 'NIK must be 16 characters.',
    })
    .max(16, {
      message: 'NIK must be 16 characters.',
    })
    .nullable()
    .optional(),
  born: z.string().nullable().optional(),
  placeBorn: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  hometown: z.string().nullable().optional(),
  passportNumber: z.string().nullable().optional(),
  passportExpiredAt: z.string().nullable().optional(),
  medicalHistory: z.string().nullable().optional(),
})
