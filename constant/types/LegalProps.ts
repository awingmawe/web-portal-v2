export type Legal = {
  id: number
  title: string
  slug: string
  body: string
  publishedAt: string
  createdAt: string
  modifiedAt: string
  createdBy: string
}

export interface GetLegalParams {
  page?: number
  size?: number
  order?: string
  orderBy?: string
  'slug:likelower'?: string
}
