export const metadata = (
  title: any,
  description: any,
  image?: any,
  tags?: string[]
) => ({
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
    ...(tags ?? []),
  ],
  openGraph: {
    title: title,
    description: description,
    type: 'website',
    images: image
      ? [{ url: image, height: 405, width: 720 }]
      : ['/thumbnail.png'],
  },
  twitter: {
    title: title,
    description: description,
    card: 'summary_large_image',
    images: image
      ? [{ url: image, height: 405, width: 720 }]
      : ['/thumbnail.png'],
  },
})
