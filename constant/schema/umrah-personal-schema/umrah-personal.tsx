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
      .min(1, { message: 'Jumlah jamaah minimal 1 orang!' }),
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
        logo: z.string().optional(),
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
        logo: z.string().optional(),
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
export const hotelMeccaSchema = z.object({
  hotelMecca: z.object({
    id: z.number(),
    name: z.string(),
    rating: z.number(),
    hotelDestination: z.array(
      z.object({
        id: z.number(),
        distance: z.number(),
        priority: z.boolean(),
        destinationName: z.string(),
      })
    ),
    hotelGallery: z.array(
      z.object({
        id: z.number(),
        hotelId: z.number(),
        imageUrl: z.string(),
      })
    ),
  }),
})

export const hotelMedinaSchema = z.object({
  hotelMedina: z.object({
    id: z.number(),
    name: z.string(),
    rating: z.number(),
    hotelDestination: z.array(
      z.object({
        id: z.number(),
        distance: z.number(),
        priority: z.boolean(),
        destinationName: z.string(),
      })
    ),
    hotelGallery: z.array(
      z.object({
        id: z.number(),
        hotelId: z.number(),
        imageUrl: z.string(),
      })
    ),
  }),
})

// Step 4: Transportation Schema (Optional)
export const transportationSchema = z.object({
  transportation: z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    customValue: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    ),
  }),
})

// Combined schema for the entire form
export const umrahPersonalFormSchema = z.object({
  journeyInformation: journeyInformationSchema,
  flightInformation: flightInformationSchema,
  hotelMecca: hotelMeccaSchema,
  hotelMedina: hotelMedinaSchema,
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

export const defaultHotelMecca = {
  hotelMecca: {
    id: 0,
    name: '',
    hotelDestination: [],
    hotelGallery: [],
  },
}

export const defaultHotelMedina = {
  hotelMedina: {
    id: 0,
    name: '',
    hotelDestination: [],
    hotelGallery: [],
  },
}

export const defaultTransportation = {
  transportation: {
    id: 0,
    name: '',
    code: '',
    customValue: [],
  },
}

export const defaultUmrahPersonalForm = {
  journeyInformation: defaultJourneyInformation,
  flightInformation: defaultFlightInformation,
  hotelMecca: defaultHotelMecca,
  hotelMedina: defaultHotelMedina,
  transportation: defaultTransportation,
}

// Type definitions
export type JourneyInformationType = z.infer<typeof journeyInformationSchema>
export type FlightInformationType = z.infer<typeof flightInformationSchema>
export type MeccaHotelType = z.infer<typeof hotelMeccaSchema>
export type MedinaHotelType = z.infer<typeof hotelMedinaSchema>
export type TransportationType = z.infer<typeof transportationSchema>
export type UmrahPersonalFormType = z.infer<typeof umrahPersonalFormSchema>
