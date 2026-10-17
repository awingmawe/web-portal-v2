import { Travel } from '@/constant/types/TravelProps'

export const mockTravels: Travel[] = [
  {
    id: 1,
    organizationInstance: {
      id: 1,
      name: 'Al-Shafa Tour & Travel',
      thumbnail: '/images/mitra-travel.png',
      city: {
        name: 'Jakarta Selatan',
      },
      legalInformation: {
        pihk: 'PIHK No. 128/2021',
        ppiu: 'PPIU No. 492/2019',
      },
      tagline: 'Melayani Tamu Allah dengan Amanah & Sepenuh Hati',
      directContact: false,
      bdm: null,
      phoneNumber: '081288881101',
      slug: 'al-shafa-tour',
      description:
        'Penyelenggara Perjalanan Ibadah Umrah (PPIU) dan Ibadah Haji Khusus (PIHK) resmi Kementerian Agama Republik Indonesia.',
    },
  },
  {
    id: 2,
    organizationInstance: {
      id: 2,
      name: 'Noor Al-Haramain Wisata',
      thumbnail: '/images/mitra-travel.png',
      city: {
        name: 'Surabaya',
      },
      legalInformation: {
        pihk: 'PIHK No. 345/2020',
        ppiu: 'PPIU No. 812/2018',
      },
      tagline: 'Kenyamanan dan Kekhusyukan Ibadah Anda',
      directContact: false,
      bdm: null,
      phoneNumber: '081299992202',
      slug: 'noor-al-haramain',
      description:
        'Berpengalaman lebih dari 15 tahun mendampingi jamaah umrah dan haji ke Tanah Suci.',
    },
  },
  {
    id: 3,
    organizationInstance: {
      id: 3,
      name: 'Madinah Berkah Mandiri',
      thumbnail: '/images/mitra-travel.png',
      city: {
        name: 'Bandung',
      },
      legalInformation: {
        pihk: 'PIHK No. 210/2022',
        ppiu: 'PPIU No. 630/2020',
      },
      tagline: 'Raih Umrah Maqbullah Bersama Bimbingan Sesuai Sunnah',
      directContact: false,
      bdm: null,
      phoneNumber: '081277773303',
      slug: 'madinah-berkah-mandiri',
      description:
        'Fasilitas hotel bintang 5 dekat pelataran Masjidil Haram dan Masjid Nabawi.',
    },
  },
  {
    id: 4,
    organizationInstance: {
      id: 4,
      name: 'Makkatul Mukarramah Tour',
      thumbnail: '/images/mitra-travel.png',
      city: {
        name: 'Jakarta Timur',
      },
      legalInformation: {
        pihk: 'PIHK No. 562/2019',
        ppiu: 'PPIU No. 719/2017',
      },
      tagline: 'Sahabat Setia Ibadah Tanah Suci',
      directContact: false,
      bdm: null,
      phoneNumber: '081266664404',
      slug: 'makkatul-mukarramah-tour',
      description:
        'Paket umrah hemat, reguler, hingga VIP dengan jadwal penerbangan direct tanpa transit.',
    },
  },
  {
    id: 5,
    organizationInstance: {
      id: 5,
      name: 'Al-Hijaz Indowisata Mandiri',
      thumbnail: '/images/mitra-travel.png',
      city: {
        name: 'Jakarta Pusat',
      },
      legalInformation: {
        pihk: 'PIHK No. 119/2020',
        ppiu: 'PPIU No. 340/2018',
      },
      tagline: 'Pilihan Utama Keluarga Muslim Indonesia',
      directContact: false,
      bdm: null,
      phoneNumber: '081255555505',
      slug: 'al-hijaz-indowisata',
      description:
        'Paket umrah plus wisata halal internasional (Turki, Dubai, Mesir, Aqsha).',
    },
  },
]
