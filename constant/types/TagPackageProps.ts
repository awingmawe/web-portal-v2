export interface TagPackages {
  id: number
  name: string
  slug: string
  level: number
  activePackageCount: string
}

export type Tag = {
  id: number
  slug: string
  name: string
  level: number
  published: boolean
  createdAt: string
  modifiedAt: string
  createdBy: string
  modifiedBy: string
  term: string
  cover: string
  background: string
  description: string | null
}
