export interface RequestFormUmrahPersonal {
  journeyType: string
  activity: string
  createVisa: boolean
  useInsurance: boolean
  departureDate: string
  arrivalDate: string
  totalManifest: number
  departure: {
    from: number
    to: number
    airline: number
    flightClass: string | 'economic' | 'business' | 'first-class'
    flightRoute: string | 'direct' | 'transit'
  }
  arrival: {
    from: number
    to: number
    airline: number
    flightClass: string | 'economic' | 'business' | 'first-class'
    flightRoute: string | 'direct' | 'transit'
  }
  meccaHotel: number
  medinaHotel: number
  transportation: number
}
