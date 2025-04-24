import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
import { DateRange } from 'react-day-picker'

// Define the filter state interface
export interface FilterState {
  hotelStars: number | 0
  dateRange: DateRange | undefined
  departureAirport: Airport | null
  arrivalAirport: Airport | null
  airline: Airline | null
  hargaMin: string
  hargaMax: string
  facilityCode: string
  section: string
  tagSlug: string
  filterName: string
}
