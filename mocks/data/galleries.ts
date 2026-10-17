import { GalleryHomepage, PackageGalleryImage } from '@/constant/types/GalleryProps'

export const mockGalleriesHomepage: GalleryHomepage[] = [
  // way_us
  {
    id: 1,
    category: 'way_us',
    imageUrl: '/images/slideshow-umrah-personal-1.png',
    title: 'Terpercaya & Berizin Kemenag',
    caption: 'Semua travel agent mitra memiliki izin resmi PPIU & PIHK dengan akreditasi teruji.',
  },
  {
    id: 2,
    category: 'way_us',
    imageUrl: '/images/slideshow-umrah-personal-2.png',
    title: 'Transparansi Biaya',
    caption: 'Tidak ada biaya tersembunyi, semua rincian fasilitas dan harga tertera jelas sejak awal.',
  },
  {
    id: 3,
    category: 'way_us',
    imageUrl: '/images/slideshow-umrah-personal-3.png',
    title: 'Fasilitas Hotel Bintang 5',
    caption: 'Pilihan hotel terbaik di pelataran Masjidil Haram dan Masjid Nabawi.',
  },
  {
    id: 4,
    category: 'way_us',
    imageUrl: '/images/slideshow-umrah-personal-4.png',
    title: 'Bimbingan Ibadah Sesuai Sunnah',
    caption: 'Didampingi Muthawwif berpengalaman dan asatidz terpercaya selama di Tanah Suci.',
  },
  {
    id: 5,
    category: 'way_us',
    imageUrl: '/images/slideshow-umrah-personal-5.png',
    title: 'Solusi Pembiayaan Syariah',
    caption: 'Wujudkan niat ibadah Anda lebih awal dengan cicilan ringan syariah tanpa riba.',
  },
  {
    id: 6,
    category: 'way_us',
    imageUrl: '/images/Kaabah.png',
    title: 'Kemudahan Konsultasi',
    caption: 'Customer support kami siap membantu menjawab pertanyaan Anda 24/7.',
  },

  // testi_landing
  {
    id: 101,
    category: 'testi_landing',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    title: 'H. Bambang & Ibu Nurhayati (Jakarta)',
    caption:
      'Alhamdulillah, pengalaman umrah bersama keluarga melalui Muslim101 sangat memuaskan. Hotelnya sangat dekat dengan Masjidil Haram, pembimbingnya sabar, dan makanannya cocok dengan lidah Indonesia.',
  },
  {
    id: 102,
    category: 'testi_landing',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    title: 'dr. Muhammad Rizky (Surabaya)',
    caption:
      'Aplikasi Muslim101 sangat memudahkan memilih travel agent terpercaya. Transparansi fasilitas dan jadwal penerbangan direct membuat perjalanan kami tenang tanpa khawatir terlantar.',
  },
  {
    id: 103,
    category: 'testi_landing',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    title: 'Siti Rahmawati (Bandung)',
    caption:
      'Program Umrah Plus Turki sangat berkesan! City tour Istanbul dan Cappadocia tertata rapi, hotel bintang 5 nyaman, dan jadwal ibadah tetap terjaga dengan sangat baik.',
  },
  {
    id: 104,
    category: 'testi_landing',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    title: 'H. Ahmad Syukri (Medan)',
    caption:
      'Pelayanan dari pendaftaran sampai kepulangan kembali ke tanah air sangat profesional. Kereta Cepat Haramain Makkah-Madinah membuat perjalanan jauh lebih nyaman untuk orang tua.',
  },
]

export const mockPackageGalleries: PackageGalleryImage[] = [
  {
    id: 1,
    packageId: 1,
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop',
    title: 'Pelataran Masjidil Haram',
    description: 'Suasana ibadah thawaf di depan Ka\'bah Al-Musyarrafah',
    order: 1,
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
    modifiedBy: null,
  },
  {
    id: 2,
    packageId: 1,
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1200&auto=format&fit=crop',
    title: 'Masjid Nabawi Madinah',
    description: 'Kubah Hijau dan pelataran payung Masjid Nabawi',
    order: 2,
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
    modifiedBy: null,
  },
  {
    id: 3,
    packageId: 1,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    title: 'Hotel Pullman Zamzam Makkah',
    description: 'Kamar hotel bintang 5 dekat pelataran masjid',
    order: 3,
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
    modifiedBy: null,
  },
  {
    id: 4,
    packageId: 1,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
    title: 'Anwar Al Madinah Hotel',
    description: 'Fasilitas kamar dan lobby Anwar Al Madinah',
    order: 4,
    createdAt: '2025-01-01',
    modifiedAt: '2025-01-01',
    createdBy: 'admin',
    modifiedBy: null,
  },
]
