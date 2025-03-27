export interface GalleryImage {
  id?: number
  src: string
  alt: string
  title?: string
  source?: 'package' | 'mecca' | 'medina' // To track image source
}

export interface PackageGalleryImage {
  id: number
  packageId: number
  image: string
  title: string
  description: string | null
  order: number
  createdAt: string
  modifiedAt: string
  createdBy: string
  modifiedBy: string | null
}

export interface HotelGalleryImage {
  id: number
  hotelId: number
  imageUrl: string
  title: string
  caption: string
  order: number
  createdAt: string
  modifiedAt: string
  createdBy: string
  modifiedBy: string | null
}
