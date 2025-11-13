export interface SortOption {
  value: string
  label: string
}
export const SORT_OPTIONS: SortOption[] = [
  { value: 'organization.location', label: 'Lokasi Terdekat' },
  { value: 'package.createdAt', label: 'Terbaru' },
  { value: 'recommendation', label: 'Rekomendasi' },
  { value: 'price-low', label: 'Harga Terendah' },
  { value: 'price-high', label: 'Harga Tertinggi' },
  { value: 'depart-early', label: 'Berangkat paling cepat (Awal Bulan)' },
  { value: 'depart-late', label: 'Berangkat paling lama (Akhir Bulan)' },
]
