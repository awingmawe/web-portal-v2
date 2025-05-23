'use client'

import {
  ApiResponseList,
  Article,
  Category,
} from '@/constant/types/ArticleProps'

// dummy-article-data.ts

// Categories
const categories: Category[] = [
  {
    id: 1,
    name: 'Fiqih',
    slug: 'fiqih',
    color: '#3B82F6', // blue
    description:
      'Pembahasan ilmu fiqih dan hukum-hukum Islam dalam kehidupan sehari-hari',
  },
  {
    id: 2,
    name: 'Quran & Hadist',
    slug: 'quran-hadist',
    color: '#10B981', // green
    description:
      'Kajian ayat-ayat Al-Quran dan hadits-hadits Nabi Muhammad SAW',
  },
  {
    id: 3,
    name: 'Adab & Akhlak',
    slug: 'adab-akhlak',
    color: '#8B5CF6', // purple
    description: 'Pembentukan karakter dan etika dalam kehidupan muslim',
  },
  {
    id: 4,
    name: 'Kisah Inspiratif',
    slug: 'kisah-inspiratif',
    color: '#F59E0B', // amber
    description:
      'Kisah-kisah inspiratif dari tokoh Islam dan kejadian yang memotivasi',
  },
]

// Articles
const dummyArticles: Article[] = [
  {
    id: 1,
    title: 'Memahami Makna Zakat Fitrah dan Cara Menghitungnya',
    slug: 'memahami-makna-zakat-fitrah-dan-cara-menghitungnya',
    description:
      'Pembahasan lengkap tentang keutamaan zakat fitrah, waktu pembayaran, dan cara menghitungnya sesuai dengan kondisi saat ini.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis. Proin ut semper purus. Aenean gravida elit nec viverra ultricies. Donec imperdiet pulvinar enim, vitae porttitor urna commodo non. Donec in mi eget sapien malesuada vehicula ac ut diam. Nullam in lorem a ex molestie faucibus.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user123',
    category_id: 1,
    category: categories[0],
    created_at: '2023-05-10T08:30:00Z',
    published_at: '2023-05-12T10:00:00Z',
    read_time: 5,
    status: 'published',
    tags: 'zakat,ramadhan,fiqih,ibadah',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
  {
    id: 2,
    title: 'Tafsir Surah Al-Fatihah: Makna dan Keutamaan',
    slug: 'tafsir-surah-al-fatihah-makna-dan-keutamaan',
    description:
      'Penjelasan mendalam tentang makna dan hikmah dalam Surah Al-Fatihah yang dibaca pada setiap rakaat shalat.',
    content:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user456',
    category_id: 2,
    category: categories[1],
    created_at: '2023-06-15T14:45:00Z',
    published_at: '2023-06-16T09:30:00Z',
    read_time: 8,
    status: 'published',
    tags: 'al-quran,tafsir,surah al-fatihah,shalat',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
  {
    id: 3,
    title: 'Adab Berbicara dalam Islam: Menjaga Lisan dari Perkataan Buruk',
    slug: 'adab-berbicara-dalam-islam-menjaga-lisan-dari-perkataan-buruk',
    description:
      'Pentingnya menjaga lisan dan etika berbicara dalam ajaran Islam untuk menciptakan keharmonisan dalam bermasyarakat.',
    content:
      'Curabitur aliquet quam id dui posuere blandit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user789',
    category_id: 3,
    category: categories[2],
    created_at: '2023-07-21T11:20:00Z',
    published_at: '2023-07-22T13:15:00Z',
    read_time: 6,
    status: 'published',
    tags: 'adab,akhlak,lisan,komunikasi',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
  {
    id: 4,
    title: 'Kisah Umar bin Khattab: Dari Musuh Islam Menjadi Khalifah Terbaik',
    slug: 'kisah-umar-bin-khattab-dari-musuh-islam-menjadi-khalifah-terbaik',
    description:
      'Perjalanan hidup Umar bin Khattab yang menegakkan keadilan dan membawa perubahan besar dalam sejarah Islam.',
    content:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user321',
    category_id: 4,
    category: categories[3],
    created_at: '2023-08-05T16:10:00Z',
    published_at: '2023-08-07T08:45:00Z',
    read_time: 10,
    status: 'published',
    tags: 'sahabat,umar bin khattab,khalifah,sejarah islam',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
  {
    id: 5,
    title: 'Kisah Umar bin Khattab: Dari Musuh Islam Menjadi Khalifah Terbaik',
    slug: 'kisah-umar-bin-khattab-dari-musuh-islam-menjadi-khalifah-terbaik',
    description:
      'Perjalanan hidup Umar bin Khattab yang menegakkan keadilan dan membawa perubahan besar dalam sejarah Islam.',
    content:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user321',
    category_id: 4,
    category: categories[3],
    created_at: '2023-08-05T16:10:00Z',
    published_at: '2023-08-07T08:45:00Z',
    read_time: 10,
    status: 'published',
    tags: 'sahabat,umar bin khattab,khalifah,sejarah islam',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
  {
    id: 6,
    title: 'Kisah Umar bin Khattab: Dari Musuh Islam Menjadi Khalifah Terbaik',
    slug: 'kisah-umar-bin-khattab-dari-musuh-islam-menjadi-khalifah-terbaik',
    description:
      'Perjalanan hidup Umar bin Khattab yang menegakkan keadilan dan membawa perubahan besar dalam sejarah Islam.',
    content:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user321',
    category_id: 4,
    category: categories[3],
    created_at: '2023-08-05T16:10:00Z',
    published_at: '2023-08-07T08:45:00Z',
    read_time: 10,
    status: 'published',
    tags: 'sahabat,umar bin khattab,khalifah,sejarah islam',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
  {
    id: 7,
    title: 'Kisah Umar bin Khattab: Dari Musuh Islam Menjadi Khalifah Terbaik',
    slug: 'kisah-umar-bin-khattab-dari-musuh-islam-menjadi-khalifah-terbaik',
    description:
      'Perjalanan hidup Umar bin Khattab yang menegakkan keadilan dan membawa perubahan besar dalam sejarah Islam.',
    content:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user321',
    category_id: 4,
    category: categories[3],
    created_at: '2023-08-05T16:10:00Z',
    published_at: '2023-08-07T08:45:00Z',
    read_time: 10,
    status: 'published',
    tags: 'sahabat,umar bin khattab,khalifah,sejarah islam',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
  {
    id: 8,
    title: 'Kisah Umar bin Khattab: Dari Musuh Islam Menjadi Khalifah Terbaik',
    slug: 'kisah-umar-bin-khattab-dari-musuh-islam-menjadi-khalifah-terbaik',
    description:
      'Perjalanan hidup Umar bin Khattab yang menegakkan keadilan dan membawa perubahan besar dalam sejarah Islam.',
    content:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user321',
    category_id: 4,
    category: categories[3],
    created_at: '2023-08-05T16:10:00Z',
    published_at: '2023-08-07T08:45:00Z',
    read_time: 10,
    status: 'published',
    tags: 'sahabat,umar bin khattab,khalifah,sejarah islam',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
  {
    id: 9,
    title: 'Kisah Umar bin Khattab: Dari Musuh Islam Menjadi Khalifah Terbaik',
    slug: 'kisah-umar-bin-khattab-dari-musuh-islam-menjadi-khalifah-terbaik',
    description:
      'Perjalanan hidup Umar bin Khattab yang menegakkan keadilan dan membawa perubahan besar dalam sejarah Islam.',
    content:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user321',
    category_id: 4,
    category: categories[3],
    created_at: '2023-08-05T16:10:00Z',
    published_at: '2023-08-07T08:45:00Z',
    read_time: 10,
    status: 'published',
    tags: 'sahabat,umar bin khattab,khalifah,sejarah islam',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
  {
    id: 10,
    title: 'Kisah Umar bin Khattab: Dari Musuh Islam Menjadi Khalifah Terbaik',
    slug: 'kisah-umar-bin-khattab-dari-musuh-islam-menjadi-khalifah-terbaik',
    description:
      'Perjalanan hidup Umar bin Khattab yang menegakkan keadilan dan membawa perubahan besar dalam sejarah Islam.',
    content:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user321',
    category_id: 4,
    category: categories[3],
    created_at: '2023-08-05T16:10:00Z',
    published_at: '2023-08-07T08:45:00Z',
    read_time: 10,
    status: 'published',
    tags: 'sahabat,umar bin khattab,khalifah,sejarah islam',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
  {
    id: 11,
    title: 'Kisah Umar bin Khattab: Dari Musuh Islam Menjadi Khalifah Terbaik',
    slug: 'kisah-umar-bin-khattab-dari-musuh-islam-menjadi-khalifah-terbaik',
    description:
      'Perjalanan hidup Umar bin Khattab yang menegakkan keadilan dan membawa perubahan besar dalam sejarah Islam.',
    content:
      'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
    thumbnail_url: '/images/no-image-placeholder.png',
    author_id: 'user321',
    category_id: 4,
    category: categories[3],
    created_at: '2023-08-05T16:10:00Z',
    published_at: '2023-08-07T08:45:00Z',
    read_time: 10,
    status: 'published',
    tags: 'sahabat,umar bin khattab,khalifah,sejarah islam',
    updated_at: '',
    type: '',
    button_link: '',
    button_text: '',
    hashtags: [],
    other_articles: [],
  },
]

// API Response
export const dummyApiResponse: ApiResponseList = {
  data: dummyArticles,
  message: 'Operasi berhasil diselesaikan',
  success: true,
}

// For individual access
export const articles = dummyArticles
export const articleCategories = categories

// Helper function to get single article
export const getArticleById = (id: number): Article | undefined => {
  return dummyArticles.find((article) => article.id === id)
}

// Helper function to get articles by category
export const getArticlesByCategory = (categoryId: number): Article[] => {
  return dummyArticles.filter((article) => article.category_id === categoryId)
}
