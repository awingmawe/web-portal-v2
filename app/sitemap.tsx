import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const websiteBaseUrl = process.env.NEXT_PUBLIC_URL

  // change these value if modify parkee content
  const route = [
    {
      pathname: '',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'about-us',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'wukala',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'umrah',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'travel',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'travel/list',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'list',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'legal/kebijakan-refund',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'legal/kebijakan-privasi',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'legal/syarat-ketentuan',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'search',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'all-packages',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'article',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      pathname: 'article/list',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
  ]

  return route.map((r: any) => {
    return {
      url: `${websiteBaseUrl}/${r.pathname}`,
      priority: r.priority,
      lastModified: r.lastModified,
      changeFrequency: r.changeFrequency,
    }
  })
}
