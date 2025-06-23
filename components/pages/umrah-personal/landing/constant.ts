const STORAGE_LINK =
  'https://storage.googleapis.com/m101-prods/umroh-personal/bg-umrah-personal-'

const LEARN_MORE_DESCRIPTION = [
  {
    title: 'Flexibilitas',
    description:
      'Seluruh kendali dan rencana perjalanan Anda dapat dikontrol penuh sesuai dengan keinginan Anda.',
    items: ['Tanggal Keberangkatan', 'Lokasi Embarkasi', 'Jumlah Jemaah'],
  },
  {
    title: 'Beragam Pilihan Maskapai',
    description:
      'Sesuaikan anggaran perjalanan anda dengan memilih maskapai sesuai kebutuhan Anda.',
  },
  {
    title: 'Beragam Pilihan Hotel',
    description:
      'Plihan hotel mulai dari bintang 3 hingga bintang 5. Pilih dan sesuaikan hotel yang Anda butuhkan untuk perjalanan Umroh Anda',
  },
  {
    title: 'Beragam Moda Transportasi',
    description:
      'Banyaknya pilihan moda transportasi yang dapat anda pilih sesuai kebutuhan Anda untuk menemani perjalanan Umroh Anda.',
  },
  {
    title: 'Muthowif Berpengalaman',
    description:
      'Seluruh kendali dan rencana perjalanan Anda dapat dikontrol penuh sesuai dengan keinginan Anda.',
  },
]

export const STEP_LEARN = LEARN_MORE_DESCRIPTION.map((item, index) => {
  return {
    id: item,
    image: `${STORAGE_LINK}${index + 1}.jpg`,
    slideshow: `/images/slideshow-umrah-personal-${index + 1}.png`,
    ...item,
  }
})
