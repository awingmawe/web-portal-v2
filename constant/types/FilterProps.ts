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
  type: string | 'umrah' | 'hajj'
  priceRange:
    | {
        hargaMin: string
        hargaMax: string
      }
    | undefined
  dpRange:
    | {
        dpMin: string
        dpMax: string
      }
    | undefined
  facilityCode: string
  section: string
  tagSlug: string
  query: string | ''
  organizationInstanceCity: string
  providerId: string
}

// Initial filter state
export const initialFilterState: FilterState = {
  hotelStars: 0,
  dateRange: undefined,
  departureAirport: null,
  arrivalAirport: null,
  airline: null,
  priceRange: undefined,
  dpRange: undefined,
  type: 'umrah',
  facilityCode: '',
  section: '',
  tagSlug: '',
  query: '',
  filterName: undefined,
  organizationInstanceCity: '',
  providerId: '',
}
