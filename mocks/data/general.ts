import { Airline } from '@/constant/types/AirlineProps'
import { Airport } from '@/constant/types/AirportProps'
import { Facility } from '@/constant/types/FacilityProps'
import { Faq } from '@/constant/types/FaqProps'
import { HotelGalleryImage } from '@/constant/types/GalleryProps'
import { Hotel } from '@/constant/types/HotelProps'
import { Legal } from '@/constant/types/LegalProps'
import { City, District, Province } from '@/constant/types/LocationProps'
import { Provider } from '@/constant/types/Providers'

export const mockCities: City[] = [
  { id: '1', name: 'Jakarta', altName: 'DKI Jakarta', latitude: -6.2088, longitude: 106.8456, provinceId: '31' },
  { id: '2', name: 'Surabaya', altName: 'Kota Surabaya', latitude: -7.2575, longitude: 112.7521, provinceId: '35' },
  { id: '3', name: 'Bandung', altName: 'Kota Bandung', latitude: -6.9175, longitude: 107.6191, provinceId: '32' },
  { id: '4', name: 'Medan', altName: 'Kota Medan', latitude: 3.5952, longitude: 98.6722, provinceId: '12' },
  { id: '5', name: 'Makassar', altName: 'Kota Makassar', latitude: -5.1477, longitude: 119.4327, provinceId: '73' },
  { id: '6', name: 'Semarang', altName: 'Kota Semarang', latitude: -6.9667, longitude: 110.4167, provinceId: '33' },
  { id: '7', name: 'Solo', altName: 'Surakarta', latitude: -7.5755, longitude: 110.8243, provinceId: '33' },
  { id: '8', name: 'Yogyakarta', altName: 'Kota Yogyakarta', latitude: -7.7956, longitude: 110.3695, provinceId: '34' },
]

export const mockProvinces: Province[] = [
  { id: '31', name: 'DKI Jakarta', altName: 'Jakarta', latitude: -6.2, longitude: 106.8, countryId: 'ID' },
  { id: '32', name: 'Jawa Barat', altName: 'West Java', latitude: -6.9, longitude: 107.6, countryId: 'ID' },
  { id: '33', name: 'Jawa Tengah', altName: 'Central Java', latitude: -7.0, longitude: 110.4, countryId: 'ID' },
  { id: '34', name: 'DI Yogyakarta', altName: 'Yogyakarta', latitude: -7.8, longitude: 110.4, countryId: 'ID' },
  { id: '35', name: 'Jawa Timur', altName: 'East Java', latitude: -7.5, longitude: 112.5, countryId: 'ID' },
  { id: '12', name: 'Sumatera Utara', altName: 'North Sumatra', latitude: 2.1, longitude: 99.5, countryId: 'ID' },
  { id: '73', name: 'Sulawesi Selatan', altName: 'South Sulawesi', latitude: -4.0, longitude: 120.0, countryId: 'ID' },
]

export const mockDistricts: District[] = [
  {
    id: '101',
    cityId: '1',
    name: 'Kebayoran Baru',
    altName: 'Kebayoran Baru',
    cityName: 'Jakarta',
    provinceId: '31',
    provinceName: 'DKI Jakarta',
    countryId: 'ID',
    latitude: -6.24,
    longitude: 106.8,
  },
  {
    id: '102',
    cityId: '1',
    name: 'Tebet',
    altName: 'Tebet',
    cityName: 'Jakarta',
    provinceId: '31',
    provinceName: 'DKI Jakarta',
    countryId: 'ID',
    latitude: -6.23,
    longitude: 106.85,
  },
]

export const mockAirlines: Airline[] = [
  {
    id: 1,
    name: 'Garuda Indonesia',
    code: 'GA',
    countryId: 1,
    countryName: 'Indonesia',
    logo: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Saudia Airlines',
    code: 'SV',
    countryId: 2,
    countryName: 'Saudi Arabia',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Emirates',
    code: 'EK',
    countryId: 3,
    countryName: 'United Arab Emirates',
    logo: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Qatar Airways',
    code: 'QR',
    countryId: 4,
    countryName: 'Qatar',
    logo: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Lion Air',
    code: 'JT',
    countryId: 1,
    countryName: 'Indonesia',
    logo: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=200&auto=format&fit=crop',
  },
]

export const mockAirports: Airport[] = [
  {
    id: 1,
    name: 'Soekarno-Hatta International Airport',
    code: 'CGK',
    cityId: '1',
    cityName: 'Jakarta',
    countryId: 1,
    countryName: 'Indonesia',
  },
  {
    id: 2,
    name: 'Juanda International Airport',
    code: 'SUB',
    cityId: '2',
    cityName: 'Surabaya',
    countryId: 1,
    countryName: 'Indonesia',
  },
  {
    id: 3,
    name: 'King Abdulaziz International Airport',
    code: 'JED',
    cityId: '10',
    cityName: 'Jeddah',
    countryId: 2,
    countryName: 'Arab Saudi',
  },
  {
    id: 4,
    name: 'Prince Mohammad Bin Abdulaziz Airport',
    code: 'MED',
    cityId: '11',
    cityName: 'Madinah',
    countryId: 2,
    countryName: 'Arab Saudi',
  },
]

export const mockHotels: Hotel[] = [
  {
    id: 101,
    name: 'Pullman Zamzam Makkah',
    logo: '',
    rating: 5,
    cityId: 10,
    cityName: 'Makkah',
    address: 'Abraj Al Bait Complex, King Abdul Aziz Endowment, Makkah',
    latitude: '21.4187',
    longitude: '39.8256',
    hotelDestination: [
      {
        id: 1,
        hotelId: 101,
        distance: 50,
        priority: true,
        destinationName: 'Masjidil Haram',
        createdAt: '2025-01-01',
        createdBy: 'admin',
        modifiedAt: '2025-01-01',
        modifiedBy: null,
      },
    ],
  },
  {
    id: 102,
    name: 'Anwar Al Madinah Mövenpick',
    logo: '',
    rating: 5,
    cityId: 11,
    cityName: 'Madinah',
    address: 'Central Area, Madinah',
    latitude: '24.4712',
    longitude: '39.6111',
    hotelDestination: [
      {
        id: 2,
        hotelId: 102,
        distance: 100,
        priority: true,
        destinationName: 'Masjid Nabawi',
        createdAt: '2025-01-01',
        createdBy: 'admin',
        modifiedAt: '2025-01-01',
        modifiedBy: null,
      },
    ],
  },
  {
    id: 103,
    name: 'Fairmont Makkah Clock Royal Tower',
    logo: '',
    rating: 5,
    cityId: 10,
    cityName: 'Makkah',
    address: 'King Abdul Aziz Endowment, Makkah',
    latitude: '21.4190',
    longitude: '39.8260',
    hotelDestination: [
      {
        id: 3,
        hotelId: 103,
        distance: 0,
        priority: true,
        destinationName: 'Masjidil Haram',
        createdAt: '2025-01-01',
        createdBy: 'admin',
        modifiedAt: '2025-01-01',
        modifiedBy: null,
      },
    ],
  },
  {
    id: 104,
    name: 'Dar Al Taqwa Hotel Madinah',
    logo: '',
    rating: 5,
    cityId: 11,
    cityName: 'Madinah',
    address: 'Opposite to Prophet Mosque Holy Courtyard, Madinah',
    latitude: '24.4680',
    longitude: '39.6120',
    hotelDestination: [
      {
        id: 4,
        hotelId: 104,
        distance: 50,
        priority: true,
        destinationName: 'Masjid Nabawi',
        createdAt: '2025-01-01',
        createdBy: 'admin',
        modifiedAt: '2025-01-01',
        modifiedBy: null,
      },
    ],
  },
]

export const mockHotelGalleries: Record<number, HotelGalleryImage[]> = {
  101: [
    {
      id: 1,
      hotelId: 101,
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      title: 'Lobby Pullman Zamzam',
      caption: 'Lobby mewah Pullman Zamzam Makkah',
      order: 1,
      createdAt: '2025-01-01',
      modifiedAt: '2025-01-01',
      createdBy: 'admin',
      modifiedBy: null,
    },
    {
      id: 2,
      hotelId: 101,
      imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
      title: 'Kamar Pullman Zamzam',
      caption: 'Kamar tidur nyaman dengan pemandangan kota suci',
      order: 2,
      createdAt: '2025-01-01',
      modifiedAt: '2025-01-01',
      createdBy: 'admin',
      modifiedBy: null,
    },
  ],
  102: [
    {
      id: 3,
      hotelId: 102,
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
      title: 'Lobby Anwar Al Madinah',
      caption: 'Lobby luas dengan akses langsung Masjid Nabawi',
      order: 1,
      createdAt: '2025-01-01',
      modifiedAt: '2025-01-01',
      createdBy: 'admin',
      modifiedBy: null,
    },
    {
      id: 4,
      hotelId: 102,
      imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop',
      title: 'Kamar Anwar Al Madinah',
      caption: 'Kenyamanan kamar hotel bintang 5 Madinah',
      order: 2,
      createdAt: '2025-01-01',
      modifiedAt: '2025-01-01',
      createdBy: 'admin',
      modifiedBy: null,
    },
  ],
}

export const mockFacilities: Facility[] = [
  {
    id: 1,
    name: 'Tiket Pesawat PP',
    code: 'flight_ticket',
    type: 'umrah-facility',
    level: 1,
    image: '',
  },
  {
    id: 2,
    name: 'Visa Umrah Resmi',
    code: 'umrah_visa',
    type: 'umrah-facility',
    level: 2,
    image: '',
  },
  {
    id: 3,
    name: 'Hotel Bintang 5',
    code: 'hotel_star_5',
    type: 'umrah-facility',
    level: 3,
    image: '',
  },
  {
    id: 4,
    name: 'Makan 3x Sehari (Fullboard)',
    code: 'fullboard_meal',
    type: 'umrah-facility',
    level: 4,
    image: '',
  },
  {
    id: 5,
    name: 'Mutawwif Berpengalaman',
    code: 'tour_guide',
    type: 'umrah-facility',
    level: 5,
    image: '',
  },
  {
    id: 6,
    name: 'Handling & Perlengkapan Umrah',
    code: 'handling_equipment',
    type: 'umrah-facility',
    level: 6,
    image: '',
  },
  {
    id: 7,
    name: 'Asuransi Perjalanan',
    code: 'travel_insurance',
    type: 'umrah-facility',
    level: 7,
    image: '',
  },
  {
    id: 8,
    name: 'Kereta Cepat Haramain (High Speed Train)',
    code: 'bullet_train',
    type: 'umrah-facility',
    level: 8,
    image: '',
  },
]

export const mockCreditTenors: Facility[] = [
  { id: 10, name: '12 Bulan', code: '12', type: 'credit_tenor', level: 1, image: '' },
  { id: 11, name: '24 Bulan', code: '24', type: 'credit_tenor', level: 2, image: '' },
  { id: 12, name: '36 Bulan', code: '36', type: 'credit_tenor', level: 3, image: '' },
]

export const mockFaqs: Faq[] = [
  {
    id: 1,
    title: 'Bagaimana cara mendaftar paket umrah di Muslim101?',
    slug: 'cara-mendaftar-paket-umrah',
    body: 'Pilih paket umrah yang Anda inginkan dari katalog, cek detail jadwal, hotel, dan maskapai, kemudian klik tombol "Pilih Paket" untuk mengisi formulir pemesanan.',
    highlight: true,
    tag: 'Pendaftaran',
    level: 1,
    publishedAt: '2025-01-01',
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
    modifiedBy: 'admin',
  },
  {
    id: 2,
    title: 'Apakah semua travel agent di Muslim101 terdaftar resmi?',
    slug: 'legalitas-travel-rekanan',
    body: 'Ya, seluruh mitra travel agent yang tergabung di Muslim101 telah melewati verifikasi izin PPIU (Penyelenggara Perjalanan Ibadah Umrah) dan PIHK dari Kementerian Agama RI.',
    highlight: true,
    tag: 'Legalitas',
    level: 2,
    publishedAt: '2025-01-01',
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
    modifiedBy: 'admin',
  },
  {
    id: 3,
    title: 'Apakah tersedia opsi pembayaran cicilan / pembiayaan syariah?',
    slug: 'pembiayaan-umrah-syariah',
    body: 'Muslim101 bekerja sama dengan lembaga keuangan syariah terpercaya (seperti BSI dan Permata Bank Syariah) untuk memfasilitasi pembiayaan umrah tanpa riba dengan tenor hingga 36 bulan.',
    highlight: true,
    tag: 'Pembayaran',
    level: 3,
    publishedAt: '2025-01-01',
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
    modifiedBy: 'admin',
  },
  {
    id: 4,
    title: 'Dokumen apa saja yang diperlukan untuk pendaftaran umrah?',
    slug: 'dokumen-persyaratan-umrah',
    body: 'Dokumen yang dibutuhkan antara lain: Paspor yang masih berlaku minimal 7 bulan, KTP & Kartu Keluarga, Buku Nikah (bagi suami-istri), serta bukti vaksin meningitis.',
    highlight: true,
    tag: 'Persyaratan',
    level: 4,
    publishedAt: '2025-01-01',
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
    modifiedBy: 'admin',
  },
  {
    id: 5,
    title: 'Bagaimana jika saya ingin mengajukan pembatalan (refund)?',
    slug: 'kebijakan-pembatalan-dan-refund',
    body: 'Ketentuan pembatalan dan refund mengacu pada syarat & ketentuan masing-masing travel agent mitra yang tercantum secara transparan pada rincian paket.',
    highlight: false,
    tag: 'Refund',
    level: 5,
    publishedAt: '2025-01-01',
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
    modifiedBy: 'admin',
  },
]

export const mockLegals: Record<string, Legal> = {
  'syarat-dan-ketentuan': {
    id: 1,
    title: 'Syarat dan Ketentuan Layanan Muslim101',
    slug: 'syarat-dan-ketentuan',
    body: `
      <h2>1. Ketentuan Umum</h2>
      <p>Muslim101 merupakan platform agregator dan fasilitator perjalanan ibadah Umrah dan Haji yang menghubungkan calon jamaah dengan mitra travel agent berizin resmi Kemenag RI.</p>
      <h2>2. Pemesanan dan Pembayaran</h2>
      <p>Pemesanan paket ibadah sah setelah calon jamaah melakukan pembayaran uang muka (DP) atau pelunasan sesuai metode pembayaran yang dipilih.</p>
      <h2>3. Tanggung Jawab Penyelenggara</h2>
      <p>Penyelenggaraan teknis perjalanan ibadah, akomodasi, dan bimbingan ibadah sepenuhnya merupakan tanggung jawab mitra travel agent berizin resmi.</p>
    `,
    publishedAt: '2025-01-01',
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
  },
  'kebijakan-privasi': {
    id: 2,
    title: 'Kebijakan Privasi',
    slug: 'kebijakan-privasi',
    body: `
      <h2>1. Pengumpulan Data</h2>
      <p>Kami menjaga kerahasiaan data pribadi calon jamaah dan hanya menggunakannya untuk keperluan pemesanan paket, verifikasi dokumen, dan proses penerbitan visa ibadah.</p>
    `,
    publishedAt: '2025-01-01',
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
  },
}

export const mockProviders: Provider[] = [
  {
    id: 1,
    name: 'BSI Umrah Syariah',
    slug: 'bsi',
    logo: '/images/bank-bsi.svg',
    description: 'Pembiayaan Umrah Tanpa Riba dengan Akad Syariah Murabahah / Ijarah.',
    supported_organizations: [1, 2, 3, 4, 5],
  } as any,
  {
    id: 2,
    name: 'Permata Bank Syariah',
    slug: 'permata-syariah',
    logo: '/images/logo-permata.svg',
    description: 'Pembiayaan Ibadah Umrah dengan cicilan ringan hingga 36 bulan.',
    supported_organizations: [1, 2, 3, 4, 5],
  } as any,
]
