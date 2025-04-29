import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
import { DateRange } from 'react-day-picker'

// Define the filter state interface
export interface FilterState {
  filterName: any
  hotelStars: number | 0
  dateRange: DateRange | undefined
  departureAirport: Airport | null
  arrivalAirport: Airport | null
  airline: Airline | null
  priceRange:
    | {
        hargaMin: string
        hargaMax: string
      }
    | undefined
  facilityCode: string
  section: string
  tagSlug: string
}

// Initial filter state
export const initialFilterState: FilterState = {
  hotelStars: 0,
  dateRange: undefined,
  departureAirport: null,
  arrivalAirport: null,
  airline: null,
  priceRange: undefined,
  facilityCode: '',
  section: '',
  tagSlug: '',
  filterName: undefined,
}
