import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { mockArticles, mockCategories, mockComments } from './data/articles'
import { mockBanners } from './data/banners'
import {
  mockAirlines,
  mockAirports,
  mockCities,
  mockCreditTenors,
  mockDistricts,
  mockFacilities,
  mockFaqs,
  mockHotelGalleries,
  mockHotels,
  mockLegals,
  mockProvinces,
  mockProviders,
} from './data/general'
import { mockGalleriesHomepage, mockPackageGalleries } from './data/galleries'
import {
  mockMinMaxPrice,
  mockPackages,
  mockPackageVariants,
  mockSectionEnum,
  mockTagPackages,
} from './data/packages'
import { mockBadge, mockPermissions, mockProfile } from './data/profile'
import { mockTravels } from './data/travels'

export async function mockAdapter(
  config: InternalAxiosRequestConfig
): Promise<AxiosResponse> {
  const rawUrl = config.url || ''
  const method = (config.method || 'get').toLowerCase()

  // Clean URL: remove origin/protocol if present to get path
  let path = rawUrl
  let queryString = ''

  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    try {
      const parsedUrl = new URL(rawUrl)
      path = parsedUrl.pathname
      queryString = parsedUrl.search.replace(/^\?/, '')
    } catch {
      // Fallback string slicing
      const match = rawUrl.match(/https?:\/\/[^/]+(\/[^?]*)(?:\?(.*))?/)
      if (match) {
        path = match[1] || '/'
        queryString = match[2] || ''
      }
    }
  } else {
    const parts = rawUrl.split('?')
    path = parts[0]
    queryString = parts[1] || ''
  }

  // Parse query params into a key-value record
  const queryParams: Record<string, string> = {}
  if (queryString) {
    const searchParams = new URLSearchParams(queryString)
    searchParams.forEach((val, key) => {
      queryParams[key] = val
    })
  }

  // Merge config.params if provided by axios
  if (config.params && typeof config.params === 'object') {
    Object.entries(config.params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        queryParams[key] = String(val)
      }
    })
  }

  console.log(`[Mock API] ${method.toUpperCase()} ${path}`, queryParams)

  // ROUTING LOGIC
  let responseData: any = null

  // 1. Banners
  if (path.includes('/public/umrah/v1/banner')) {
    responseData = {
      results: mockBanners,
      total: mockBanners.length,
    }
  }

  // 2. Travels (Organization Instances)
  else if (
    path.includes('/public/identity/v1/organization-instance-selected/published') ||
    path.includes('/public/identity/v1/organization-instance')
  ) {
    if (path.match(/\/organization-instance\/(\d+)/)) {
      const match = path.match(/\/organization-instance\/(\d+)/)
      const id = match ? parseInt(match[1], 10) : 1
      const found = mockTravels.find((t) => t.id === id) || mockTravels[0]
      responseData = found.organizationInstance
    } else {
      responseData = {
        results: mockTravels,
        total: mockTravels.length,
      }
    }
  }

  // 3. Product Packages (V2)
  else if (path.includes('/public/product/packages/cities')) {
    responseData = {
      success: true,
      statusCode: 200,
      message: 'Success',
      total: mockCities.length,
      responseObject: mockCities,
    }
  } else if (path.includes('/public/product/packages')) {
    let filtered = [...mockPackages]

    if (queryParams.section === 'promo') {
      filtered = mockPackages.filter(
        (p) =>
          Number(p.packageVariant?.discountAmount || 0) > 0 &&
          p.packageType === 'umrah'
      )
    } else if (queryParams.section === 'plus') {
      filtered = mockPackages.filter((p) => p.isPlus)
    } else if (queryParams.section === 'regular') {
      filtered = mockPackages.filter((p) => !p.isPlus && p.packageType === 'umrah')
    } else if (queryParams.packageType === 'hajj') {
      filtered = mockPackages.filter((p) => p.packageType === 'hajj')
    } else if (queryParams.packageType === 'umrah') {
      filtered = mockPackages.filter((p) => p.packageType === 'umrah')
    }

    if (filtered.length === 0) {
      filtered = mockPackages
    }

    responseData = {
      success: true,
      statusCode: 200,
      message: 'Success',
      total: filtered.length,
      responseObject: filtered,
    }
  }

  // 4. Umrah Package V2.1
  else if (path.includes('/public/umrah/v2.1/package')) {
    responseData = {
      results: mockPackages,
      total: mockPackages.length,
    }
  }

  // 5. Package Detail by slug
  else if (path.match(/\/public\/umrah\/v1\/package\/slug\/([^/?]+)/)) {
    const match = path.match(/\/public\/umrah\/v1\/package\/slug\/([^/?]+)/)
    const slug = match ? decodeURIComponent(match[1]) : ''
    const found =
      mockPackages.find((p) => p.slug === slug) ||
      mockPackages[0]
    responseData = found
  }

  // 6. Package Detail by id
  else if (path.match(/\/public\/umrah\/v1\/package\/(\d+)/)) {
    const match = path.match(/\/public\/umrah\/v1\/package\/(\d+)/)
    const id = match ? parseInt(match[1], 10) : 1
    const found = mockPackages.find((p) => p.id === id) || mockPackages[0]
    responseData = found
  }

  // 7. Package Variants
  else if (path.includes('/public/umrah/v1/package-variant/opt/price')) {
    responseData = mockMinMaxPrice
  } else if (path.includes('/public/umrah/v1/package-variant')) {
    responseData = {
      results: mockPackageVariants,
      total: mockPackageVariants.length,
    }
  }

  // 8. Package Gallery
  else if (path.includes('/public/umrah/v1/package-gallery')) {
    responseData = mockPackageGalleries
  }

  // 9. Tags and Sections Count
  else if (path.includes('/public/umrah/v1/tag/stats/count')) {
    responseData = mockTagPackages
  } else if (path.includes('/public/umrah/v2/section/stats/count')) {
    responseData = mockSectionEnum
  }

  // 10. General Gallery (Homepage: way_us, testi_landing)
  else if (path.includes('/public/general/v1/gallery')) {
    const categoryQuery =
      queryParams['category:likeLower'] || queryParams.category || ''

    let results = mockGalleriesHomepage
    if (categoryQuery.includes('way_us')) {
      results = mockGalleriesHomepage.filter((g) => g.category === 'way_us')
    } else if (categoryQuery.includes('testi')) {
      results = mockGalleriesHomepage.filter((g) => g.category === 'testi_landing')
    }

    responseData = {
      results,
      total: results.length,
    }
  }

  // 11. Hotel Gallery
  else if (path.match(/\/public\/general\/v1\/hotel-gallery\/hotel\/(\d+)/)) {
    const match = path.match(/\/public\/general\/v1\/hotel-gallery\/hotel\/(\d+)/)
    const hotelId = match ? parseInt(match[1], 10) : 101
    const images = mockHotelGalleries[hotelId] || mockHotelGalleries[101]
    responseData = {
      results: images,
      total: images.length,
    }
  }

  // 12. Hotel List
  else if (path.includes('/public/general/v1/hotel')) {
    responseData = {
      results: mockHotels,
      total: mockHotels.length,
    }
  }

  // 13. Airlines
  else if (
    path.includes('/public/general/v1/airline') ||
    path.includes('/public/umrah/v2/package/airline-package')
  ) {
    responseData = {
      results: mockAirlines,
      total: mockAirlines.length,
    }
  }

  // 14. Airports
  else if (
    path.includes('/public/general/v1/airport') ||
    path.includes('/public/umrah/v2/package/airport-package')
  ) {
    responseData = {
      results: mockAirports,
      total: mockAirports.length,
    }
  }

  // 15. Reference & Facilities (credit_tenor, umrah-facility, etc.)
  else if (path.includes('/public/general/v1/reference')) {
    const refType = queryParams.type
    if (refType === 'credit_tenor') {
      responseData = {
        results: mockCreditTenors,
        total: mockCreditTenors.length,
      }
    } else {
      responseData = {
        results: mockFacilities,
        total: mockFacilities.length,
      }
    }
  }

  // 16. FAQs
  else if (path.includes('/public/general/v1/faq')) {
    responseData = {
      results: mockFaqs,
      total: mockFaqs.length,
    }
  }

  // 17. Legal documents
  else if (path.includes('/public/general/v1/legal')) {
    const slugQuery = queryParams['slug:likeLower'] || queryParams.slug || ''
    const doc =
      mockLegals[slugQuery] ||
      (slugQuery.includes('privasi')
        ? mockLegals['kebijakan-privasi']
        : mockLegals['syarat-dan-ketentuan'])

    responseData = {
      results: [doc],
      total: 1,
    }
  }

  // 18. Popup Active
  else if (path.includes('/public/general/v1/popup/active')) {
    responseData = {
      isActive: false,
      imageUrl: '',
      actionUrlWeb: '',
      webApp: false,
      updateAt: '2025-01-01',
    }
  }

  // 19. Disabled Date
  else if (path.includes('/public/general/v1/disabled-date')) {
    responseData = {
      results: [],
      total: 0,
    }
  }

  // 20. Locations (city, province, district, postal code)
  else if (path.includes('/public/identity/location/subdistrict/postal-codes')) {
    responseData = {
      results: [
        { id: 1, subdistrictName: 'Kebayoran Baru', postalCode: '12160' },
        { id: 2, subdistrictName: 'Tebet Barat', postalCode: '12810' },
      ],
      total: 2,
    }
  } else if (path.includes('/public/identity/location/district')) {
    responseData = {
      results: mockDistricts,
      total: mockDistricts.length,
    }
  } else if (path.includes('/public/identity/location/city')) {
    responseData = {
      results: mockCities,
      total: mockCities.length,
    }
  } else if (path.includes('/public/identity/location/province')) {
    responseData = {
      results: mockProvinces,
      total: mockProvinces.length,
    }
  }

  // 21. Articles
  else if (path.match(/\/public\/articles\/v1\/article\/slug\/([^/?]+)/)) {
    const match = path.match(/\/public\/articles\/v1\/article\/slug\/([^/?]+)/)
    const slug = match ? decodeURIComponent(match[1]) : ''
    const found =
      mockArticles.find((a) => a.slug === slug) || mockArticles[0]
    responseData = {
      results: found,
      total: 1,
    }
  } else if (path.includes('/public/articles/v1/highlights/')) {
    responseData = {
      results: {
        articles: mockArticles.slice(0, 3),
      },
      total: 3,
    }
  } else if (path.includes('/public/articles/v1/categories')) {
    responseData = {
      results: mockCategories,
      total: mockCategories.length,
    }
  } else if (path.includes('/public/articles/v1/comments')) {
    responseData = {
      results: mockComments,
      total: mockComments.length,
    }
  } else if (path.includes('/public/articles/v1/article')) {
    responseData = {
      results: mockArticles,
      total: mockArticles.length,
    }
  }

  // 22. Banking & Credit
  else if (path.includes('/public/banking/v2/credit/providers')) {
    responseData = {
      data: mockProviders,
      total: mockProviders.length,
    }
  } else if (path.includes('/banking/v2/credit/providers')) {
    responseData = {
      data: mockProviders,
      total: mockProviders.length,
    }
  }

  // 23. User Profile & Auth
  else if (path.includes('/identity/my-profile/permissions')) {
    responseData = mockPermissions
  } else if (path.includes('/identity/my-profile')) {
    responseData = mockProfile
  } else if (path.includes('/umrah/v2/notification-badge')) {
    responseData = mockBadge
  }

  // 24. Wukala Referral Setting
  else if (path.includes('/umrah/v1/wukala-setting')) {
    responseData = {
      id: 1,
      referralCode: 'LINKAJA',
      discountAmount: 1000000,
      discountType: 'fixed',
      feeAmount: 0,
      feeType: 'fixed',
      createdAt: '2025-01-01',
      modifiedAt: '2025-01-01',
    }
  }

  // 25. Event Tracker
  else if (path.includes('/public/event/v1')) {
    responseData = { success: true }
  }

  // 26. Smart Fallback for any other endpoint
  else {
    console.warn(`[Mock API] Fallback handled for unmatched route: ${method.toUpperCase()} ${path}`)
    if (path.includes('/list') || path.endsWith('s')) {
      responseData = {
        results: [],
        responseObject: [],
        total: 0,
        success: true,
      }
    } else {
      responseData = {
        success: true,
        data: {},
        results: [],
        responseObject: [],
        total: 0,
      }
    }
  }

  return {
    data: responseData,
    status: 200,
    statusText: 'OK',
    headers: {
      'content-type': 'application/json',
      'x-mock-response': 'true',
    },
    config,
    request: {},
  }
}
