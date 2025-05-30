import { CardData } from '@/constant/types/PackageProps'

export interface Article {
  author_id: any
  category_id: number
  category: Category
  content: string
  created_at: Date | string
  updated_at: Date | string
  description: string
  type: string
  button_link: string
  button_text: string
  id: number
  published_at: string
  read_time: number
  slug: string
  status: string
  tags: string
  thumbnail: string
  title: string
  hashtags: string[]
  otherArticles: Article[]
  promo_tag: string
}

export interface Category {
  id: number
  name: string
  slug: string
  color: string
  description: string
}

export interface ApiResponseList<T> {
  results: T[]
  total: number
}

export interface ApiResponseDetail {
  results: Article
  total: number
}

export interface PackageTagSlug {
  slug: string
  data: CardData[]
}

export interface Comment {
  article_id: number
  content: string
  created_at: Date
  id: number
  is_approve: boolean
  updated_at: string
  user: User
  user_id: string
}

export interface User {
  name: string
  id: number
  email: string
  avatar: string
}
