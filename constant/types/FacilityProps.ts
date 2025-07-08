export interface Facility {
  id: number
  name: string
  code: string
  type: string
  level: number
  image: string
  customValue?: { value: string; label: string }[]
}

export interface OthersFacilities {
  items: string[]
  label: string
}
