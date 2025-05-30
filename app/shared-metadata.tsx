export const metadata = (title: any, description: any, image?: any) => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
  title: title,
  description: description,
  keywords: [
    'umrah',
    'umroh',
    'travel umrah',
    'ibadah haji',
    'haji',
    'travel haji',
    'muslim',
    'umat muslim',
  ],
  openGraph: {
    title: title,
    description: description,
    type: 'website',
    images: image ?? ['/thumbnail.png'],
  },
  twitter: {
    title: title,
    description: description,
    card: 'summary_large_image',
    images: image ?? ['/thumbnail.png'],
  },
})
