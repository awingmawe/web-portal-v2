import {
  ACTIVITY_TYPES,
  FLIGHT_CLASSES,
  FLIGHT_ROUTES,
  JOURNEY_TYPES,
} from '@/constant/schema/umrah-personal-schema/constant'
import { z } from 'zod'

// Step 1: Journey Information Schema
export const journeyInformationSchema = z
  .object({
    journeyType: z.enum(
      [JOURNEY_TYPES.UMRAH_REGULAR, JOURNEY_TYPES.UMRAH_PLUS_TRIP],
      {
        required_error: 'Jenis perjalanan harus dipilih!',
      }
    ),
    activity: z.enum([ACTIVITY_TYPES.MECCA, ACTIVITY_TYPES.MECCA_MEDINA], {
      required_error: 'Kegiatan umrah harus dipilih!',
    }),
    createVisa: z.boolean(),
    useInsurance: z.boolean(),
    departureDate: z
      .string()
      .min(1, { message: 'Tanggal keberangkatan harus diisi!' })
      .refine(
        (date) => new Date(date).getTime() >= new Date().setHours(0, 0, 0, 0),
        {
          message: 'Tanggal keberangkatan tidak boleh di masa lalu!',
        }
      ),
    arrivalDate: z
      .string()
      .min(1, { message: 'Tanggal kepulangan harus diisi!' }),
    totalManifest: z
      .number()
      .min(1, { message: 'Jumlah jamaah minimal 1 orang!' })
      .max(50, { message: 'Jumlah jamaah maksimal 50 orang!' }),
  })
  .refine(
    (data) => {
      if (data.departureDate && data.arrivalDate) {
        return new Date(data.arrivalDate) > new Date(data.departureDate)
      }
      return true
    },
    {
      message: 'Tanggal kepulangan harus setelah tanggal keberangkatan!',
      path: ['arrivalDate'],
    }
  )

// Step 2: Flight Information Schema
export const flightInformationSchema = z.object({
  departure: z.object({
    from: z.object({
      airport: z
        .object({
          id: z.number(),
          code: z.string(),
          name: z.string(),
          cityName: z.string(),
        })
        .refine((airport) => airport.id > 0, {
          message: 'Bandara keberangkatan harus dipilih!',
        }),
    }),
    to: z.object({
      airport: z
        .object({
          id: z.number(),
          code: z.string(),
          name: z.string(),
          cityName: z.string(),
        })
        .refine((airport) => airport.id > 0, {
          message: 'Bandara kedatangan harus dipilih!',
        }),
    }),
    airline: z
      .object({
        id: z.number(),
        code: z.string(),
        name: z.string(),
        countryName: z.string(),
      })
      .refine((airline) => airline.id > 0, {
        message: 'Maskapai penerbangan harus dipilih',
      }),
    flightClass: z.enum(
      [
        FLIGHT_CLASSES.ECONOMIC,
        FLIGHT_CLASSES.BUSINESS,
        FLIGHT_CLASSES.FIRST_CLASS,
      ],
      {
        required_error: 'Kelas penerbangan harus dipilih!',
      }
    ),
    flightRoute: z.enum([FLIGHT_ROUTES.DIRECT, FLIGHT_ROUTES.TRANSIT], {
      required_error: 'Rute penerbangan harus dipilih!',
    }),
  }),
  arrival: z.object({
    from: z.object({
      airport: z
        .object({
          id: z.number(),
          code: z.string(),
          name: z.string(),
          cityName: z.string(),
        })
        .refine((airport) => airport.id > 0, {
          message: 'Bandara keberangkatan harus dipilih!',
        }),
    }),
    to: z.object({
      airport: z
        .object({
          id: z.number(),
          code: z.string(),
          name: z.string(),
          cityName: z.string(),
        })
        .refine((airport) => airport.id > 0, {
          message: 'Bandara kedatangan harus dipilih!',
        }),
    }),
    airline: z
      .object({
        id: z.number(),
        code: z.string(),
        name: z.string(),
        countryName: z.string(),
      })
      .refine((airline) => airline.id > 0, {
        message: 'Maskapai penerbangan harus dipilih',
      }),
    flightClass: z.enum(
      [
        FLIGHT_CLASSES.ECONOMIC,
        FLIGHT_CLASSES.BUSINESS,
        FLIGHT_CLASSES.FIRST_CLASS,
      ],
      {
        required_error: 'Kelas penerbangan harus dipilih!',
      }
    ),
    flightRoute: z.enum([FLIGHT_ROUTES.DIRECT, FLIGHT_ROUTES.TRANSIT], {
      required_error: 'Rute penerbangan harus dipilih!',
    }),
  }),
})

// Step 3: Hotel Selection Schema (conditional based on activity)
export const createHotelSelectionSchema = (activity?: string) => {
  const baseSchema = z.object({
    meccaHotel: z.object({
      rating: z
        .number()
        .min(1, { message: 'Rating hotel Mekkah harus dipilih!' })
        .max(5, { message: 'Rating hotel maksimal 5 bintang!' }),
      selectedHotel: z
        .object({
          id: z.number(),
          name: z.string(),
          rating: z.number(),
          address: z.string(),
          latitude: z.string(),
          longitude: z.string(),
        })
        .optional(),
    }),
  })

  // Add medinaHotel only if activity includes Medina
  if (activity === ACTIVITY_TYPES.MECCA_MEDINA) {
    return baseSchema.extend({
      medinaHotel: z.object({
        rating: z
          .number()
          .min(1, { message: 'Rating hotel Madinah harus dipilih!' })
          .max(5, { message: 'Rating hotel maksimal 5 bintang!' }),
        selectedHotel: z
          .object({
            id: z.number(),
            name: z.string(),
            rating: z.number(),
            address: z.string(),
            latitude: z.string(),
            longitude: z.string(),
          })
          .optional(),
      }),
    })
  }

  return baseSchema.extend({
    medinaHotel: z
      .object({
        rating: z.number().optional(),
        selectedHotel: z.any().optional(),
      })
      .optional(),
  })
}

// Default hotel selection schema (includes both)
export const hotelSelectionSchema = createHotelSelectionSchema(
  ACTIVITY_TYPES.MECCA_MEDINA
)

// Step 4: Transportation Schema (Optional)
export const transportationSchema = z.object({
  vehicle: z
    .object({
      name: z.string().min(1, { message: 'Nama kendaraan harus diisi!' }),
      code: z.string().min(1, { message: 'Kode kendaraan harus diisi!' }),
      capacity: z
        .number()
        .min(1, { message: 'Kapasitas kendaraan harus lebih dari 0!' }),
    })
    .optional(),
})

// Combined schema for the entire form
export const umrahPersonalFormSchema = z.object({
  journeyInformation: journeyInformationSchema,
  flightInformation: flightInformationSchema,
  hotelSelection: hotelSelectionSchema,
  transportation: transportationSchema,
})

// Updated default values using constants
export const defaultJourneyInformation = {
  journeyType: JOURNEY_TYPES.UMRAH_REGULAR,
  activity: ACTIVITY_TYPES.MECCA,
  createVisa: true,
  useInsurance: true,
  departureDate: '',
  arrivalDate: '',
  totalManifest: 1,
}

export const defaultFlightInformation = {
  departure: {
    from: {
      airport: {
        id: 0,
        code: '',
        name: '',
        cityName: '',
      },
    },
    to: {
      airport: {
        id: 0,
        code: '',
        name: '',
        cityName: '',
      },
    },
    airline: {
      id: 0,
      code: '',
      name: '',
      countryName: '',
    },
    flightClass: FLIGHT_CLASSES.ECONOMIC,
    flightRoute: FLIGHT_ROUTES.DIRECT,
  },
  arrival: {
    from: {
      airport: {
        id: 0,
        code: '',
        name: '',
        cityName: '',
      },
    },
    to: {
      airport: {
        id: 0,
        code: '',
        name: '',
        cityName: '',
      },
    },
    airline: {
      id: 0,
      code: '',
      name: '',
      countryName: '',
    },
    flightClass: FLIGHT_CLASSES.ECONOMIC,
    flightRoute: FLIGHT_ROUTES.DIRECT,
  },
}

export const defaultHotelSelection = {
  meccaHotel: {
    rating: 0,
    selectedHotel: undefined,
  },
  medinaHotel: {
    rating: 0,
    selectedHotel: undefined,
  },
}

export const defaultTransportation = {
  vehicle: undefined,
}

export const defaultUmrahPersonalForm = {
  journeyInformation: defaultJourneyInformation,
  flightInformation: defaultFlightInformation,
  hotelSelection: defaultHotelSelection,
  transportation: defaultTransportation,
}

// Type definitions
export type JourneyInformationType = z.infer<typeof journeyInformationSchema>
export type FlightInformationType = z.infer<typeof flightInformationSchema>
export type HotelSelectionType = z.infer<typeof hotelSelectionSchema>
export type TransportationType = z.infer<typeof transportationSchema>
export type UmrahPersonalFormType = z.infer<typeof umrahPersonalFormSchema>
