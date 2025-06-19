export const JOURNEY_TYPES = {
  UMRAH_REGULAR: 'umrah-regular',
  UMRAH_PLUS_TRIP: 'umrah-plus-trip',
} as const

export const ACTIVITY_TYPES = {
  MECCA: 'mecca',
  MECCA_MEDINA: 'mecca-medina',
} as const

export const FLIGHT_CLASSES = {
  ECONOMIC: 'economic',
  BUSINESS: 'business',
  FIRST_CLASS: 'first-class',
} as const

export const FLIGHT_ROUTES = {
  DIRECT: 'direct',
  TRANSIT: 'transit',
} as const

// Labels for UI display
export const JOURNEY_TYPE_LABELS = {
  [JOURNEY_TYPES.UMRAH_REGULAR]: 'Umroh Reguler',
  [JOURNEY_TYPES.UMRAH_PLUS_TRIP]: 'Umroh Plus Liburan',
} as const

export const ACTIVITY_TYPE_LABELS = {
  [ACTIVITY_TYPES.MECCA]: 'Makkah Saja',
  [ACTIVITY_TYPES.MECCA_MEDINA]: 'Makkah + Madinah',
} as const

export const FLIGHT_CLASS_LABELS = {
  [FLIGHT_CLASSES.ECONOMIC]: 'Ekonomi',
  [FLIGHT_CLASSES.BUSINESS]: 'Bisnis',
  [FLIGHT_CLASSES.FIRST_CLASS]: 'First Class',
} as const

export const FLIGHT_ROUTE_LABELS = {
  [FLIGHT_ROUTES.DIRECT]: 'Penerbangan Langsung',
  [FLIGHT_ROUTES.TRANSIT]: 'Transit',
} as const
