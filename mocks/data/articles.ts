import { Article, Category, Comment } from '@/constant/types/ArticleProps'

export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Tips Umrah',
    slug: 'tips-umrah',
    color: '#10B981',
    description: 'Panduan dan persiapan teknis perjalanan ibadah umrah',
  },
  {
    id: 2,
    name: 'Manasik & Ibadah',
    slug: 'manasik-ibadah',
    color: '#3B82F6',
    description: 'Tata cara, rukun, dan wajib umrah serta haji sesuai tuntunan sunnah',
  },
  {
    id: 3,
    name: 'Doa & Dzikir',
    slug: 'doa-dzikir',
    color: '#F59E0B',
    description: 'Kumpulan doa mustajab di tempat-tempat bersejarah di Tanah Suci',
  },
  {
    id: 4,
    name: 'Wisata Halal',
    slug: 'wisata-halal',
    color: '#8B5CF6',
    description: 'Destinasi wisata muslim dunia seperti Turki, Dubai, dan Mesir',
  },
]

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Panduan Lengkap Tata Cara Umrah Sesuai Sunnah Rasulullah ﷺ',
    slug: 'panduan-lengkap-tata-cara-umrah-sesuai-sunnah',
    description:
      'Pelajari urutan rukun umrah mulai dari niat ihram di miqat, thawaf, sa\'i, hingga tahallul dengan penjelasan yang jelas dan mudah dipahami.',
    content: `
      <h2>1. Ihram dan Niat di Miqat</h2>
      <p>Ibadah umrah dimulai dengan mengambil niat ihram di miqat yang telah ditentukan. Jamaah pria mengenakan dua helai kain ihram tidak berjahit, sedangkan jamaah wanita mengenakan pakaian muslimah yang menutup aurat kecuali wajah dan telapak tangan.</p>
      <h2>2. Thawaf 7 Putaran di Ka'bah</h2>
      <p>Memasuki Masjidil Haram dengan mendahulukan kaki kanan seraya berdoa. Thawaf dimulai dan diakhiri di garis Hajar Aswad berlawanan arah jarum jam sebanyak tujuh putaran.</p>
      <h2>3. Sholat 2 Rakaat di Belakang Maqam Ibrahim</h2>
      <p>Setelah thawaf selesai, disunnahkan melaksanakan sholat sunnah dua rakaat di belakang Maqam Ibrahim jika memungkinkan, atau di bagian masjid lainnya.</p>
      <h2>4. Sa'i Antara Shafa dan Marwah</h2>
      <p>Berjalan dan berlari-lari kecil antara bukit Shafa dan bukit Marwah sebanyak tujuh kali, dimulai dari Shafa dan berakhir di Marwah.</p>
      <h2>5. Tahallul (Bercukur)</h2>
      <p>Mengakhiri rangkaian ibadah umrah dengan memotong rambut (mencukur gundul lebih afdhal bagi pria, atau memotong sepanjang ujung jari bagi wanita).</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop',
    published_at: '2025-02-15T08:00:00Z',
    created_at: '2025-02-15T08:00:00Z',
    updated_at: '2025-02-15T08:00:00Z',
    read_time: 6,
    category_id: 2,
    category: mockCategories[1],
    type: 'article',
    button_link: '',
    button_text: '',
    status: 'published',
    tags: 'umrah,manasik,sunnah,ibadah',
    hashtags: ['#umrah', '#manasik', '#ibadahsunnah'],
    promo_tag: '',
    author_id: 1,
    created_by: 'Tim Redaksi Muslim101',
    otherArticles: [],
  },
  {
    id: 2,
    title: '7 Tips Memilih Travel Umrah Berizin Resmi Kemenag Agar Terhindar dari Penipuan',
    slug: 'tips-memilih-travel-umrah-berizin-resmi-kemenag',
    description:
      'Kenali prinsip 5 Pasti Umrah Kementerian Agama RI agar perjalanan ibadah Anda dan keluarga aman, nyaman, dan terjamin kepastiannya.',
    content: `
      <h2>Prinsip 5 Pasti Umrah:</h2>
      <ol>
        <li><strong>Pasti Travelnya Berizin:</strong> Pastikan biro travel memiliki izin resmi PPIU.</li>
        <li><strong>Pasti Jadwalnya:</strong> Memiliki kepastian tanggal keberangkatan dan kepulangan.</li>
        <li><strong>Pasti Terbangnya:</strong> Memiliki tiket penerbangan pergi-pulang berjadwal jelas.</li>
        <li><strong>Pasti Hotelnya:</strong> Nama hotel dan jarak ke pelataran masjid tertera transparan.</li>
        <li><strong>Pasti Visanya:</strong> Memastikan visa umrah terbit sebelum keberangkatan.</li>
      </ol>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=800&auto=format&fit=crop',
    published_at: '2025-02-10T10:30:00Z',
    created_at: '2025-02-10T10:30:00Z',
    updated_at: '2025-02-10T10:30:00Z',
    read_time: 4,
    category_id: 1,
    category: mockCategories[0],
    type: 'article',
    button_link: '',
    button_text: '',
    status: 'published',
    tags: 'tips,kemenag,travel,legalitas',
    hashtags: ['#5pastiumrah', '#tipsumrah', '#muslim101'],
    promo_tag: '',
    author_id: 1,
    created_by: 'Tim Redaksi Muslim101',
    otherArticles: [],
  },
  {
    id: 3,
    title: 'Doa-Doa Penting yang Dianjurkan Saat Melakukan Thawaf dan Sa\'i',
    slug: 'doa-doa-penting-saat-thawaf-dan-sai',
    description:
      'Kumpulan bacaan doa, dzikir, dan talbiyah yang dapat diamalkan saat berada di hadapan Ka\'bah dan lintasan Shafa-Marwah.',
    content: `
      <p>Tidak ada doa wajib yang mengikat saat thawaf selain memperbanyak dzikir, membaca Al-Qur'an, dan berdoa kebaikan dunia akhirat, khususnya doa sapu jagat antara Rukun Yamani dan Hajar Aswad.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop',
    published_at: '2025-02-05T09:15:00Z',
    created_at: '2025-02-05T09:15:00Z',
    updated_at: '2025-02-05T09:15:00Z',
    read_time: 5,
    category_id: 3,
    category: mockCategories[2],
    type: 'article',
    button_link: '',
    button_text: '',
    status: 'published',
    tags: 'doa,dzikir,thawaf,sai',
    hashtags: ['#doahaji', '#doathawaf', '#dzikir'],
    promo_tag: '',
    author_id: 1,
    created_by: 'Tim Redaksi Muslim101',
    otherArticles: [],
  },
  {
    id: 4,
    title: 'Menikmati Keindahan Sejarah Islam di Istanbul dan Cappadocia dalam Umrah Plus Turki',
    slug: 'keindahan-sejarah-islam-umrah-plus-turki',
    description:
      'Mengenal napak tilas kejayaan Kesultanan Utsmaniyah di Hagia Sophia, Blue Mosque, dan panorama balon udara Cappadocia.',
    content: `
      <p>Paket Umrah Plus Turki menjadi salah satu pilihan favorit keluarga muslim yang ingin memadukan ibadah tanah suci dengan wawasan peradaban Islam dunia.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=800&auto=format&fit=crop',
    published_at: '2025-01-28T14:00:00Z',
    created_at: '2025-01-28T14:00:00Z',
    updated_at: '2025-01-28T14:00:00Z',
    read_time: 7,
    category_id: 4,
    category: mockCategories[3],
    type: 'article',
    button_link: '',
    button_text: '',
    status: 'published',
    tags: 'turki,wisatahalal,cappadocia,istanbul',
    hashtags: ['#umrahplusturki', '#wisatahalal'],
    promo_tag: '',
    author_id: 1,
    created_by: 'Tim Redaksi Muslim101',
    otherArticles: [],
  },
]

export const mockComments: Comment[] = [
  {
    id: 1,
    article_id: 1,
    content: 'Masya Allah artikelnya sangat jelas dan membantu persiapan keberangkatan kami.',
    created_at: new Date('2025-02-16T10:00:00Z'),
    updated_at: '2025-02-16T10:00:00Z',
    is_approve: true,
    user_id: 'user-1',
    user: {
      name: 'Fauzan Hakim',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    } as any,
  },
]
