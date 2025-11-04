export interface ApiFaqResponse<T> {
  results: T[]
  total: number
}

export interface Faq {
  id: number
  title: string
  slug: string
  body: string
  publishedAt: string
  createdAt: string
  modifiedAt: string
  createdBy: string
  modifiedBy: string
  highlight: boolean
  tag: string
  level: number
}
