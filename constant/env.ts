export const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV || 'development'
export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const URL = process.env.NEXT_PUBLIC_URL
export const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
export const SNAP_URL = process.env.NEXT_PUBLIC_SNAP_URL
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
export const ACCOUNT_URL = process.env.NEXT_PUBLIC_ACCOUNT_URL
export const HMAC_SECRET = process.env.NEXT_PUBLIC_HMAC_SECRET
export const CALL_CENTER = process.env.NEXT_PUBLIC_CALL_CENTER
export const CHAT_BOT_SOURCE = process.env.NEXT_PUBLIC_CHAT_BOT_SOURCE
export const CHAT_BOT_CLIENT_ID = process.env.NEXT_PUBLIC_CHAT_BOT_CLIENT_ID
export const HIDE_QONTAK = Boolean(process.env.NEXT_PUBLIC_HIDE_QONTAK)
export const QONTAK_WIDGET_CHAT_ID =
  process.env.NEXT_PUBLIC_QONTAK_WIDGET_CHAT_ID
export const QONTAK_WIDGET_CHAT_SCRIPT =
  process.env.NEXT_PUBLIC_QONTAK_WIDGET_CHAT_SCRIPT
export const QONTAK_WIDGET_CHAT_CODE =
  process.env.NEXT_PUBLIC_QONTAK_WIDGET_CHAT_CODE
export const LINKAJA_REFERRAL = String(process.env.NEXT_PUBLIC_LINKAJA_REFERRAL)
export const LINKAJA_MAX_LIMIT = Number(
  process.env.NEXT_PUBLIC_LINKAJA_MAX_LIMIT
)
export const IS_NOT_TRANSIT = ['GA', 'SV', 'JT']
export const LOCAL_STORAGE_DETAIL_VARIANT = 'detailVariant'
export const LOCAL_STORAGE_SELECTED_VARIANT = 'selectedVariant'
export const FACEBOOK_DOMAIN_VERIFICATION =
  process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION
export const LOCAL_STORAGE_KURS_OPEN_IDR = 'isKursIDRShowAgain'
export const LOCAL_STORAGE_KURS_OPEN_USD = 'isKursUSDShowAgain'
export const LOCAL_STORAGE_UTM = 'utm'
export const LOCAL_STORAGE_UTM_EXPIRED = 'utmExpired'
export const LOCAL_STORAGE_USERID = 'userId'
export const QRCODE_APPS = 'https://muslim101.id'
export const LINK_PLAYSTORE = 'https://muslim101.id'
export const LINK_APPSTORE = 'https://muslim101.id'
export const LOCAL_STORAGE_PEMBIAYAAN = 'pembiayaan'

export const PACKAGE_TYPE = {
  HAJJ_SPECIAL: 'hajj-special',
  HAJJ_FURODA: 'hajj-furoda',
  HAJJ_DAKHILI: 'hajj-dakhili',
  HAJJ: 'hajj',
  UMRAH: 'umrah',
  UMRAH_PERSONAL: 'umrah-personal',
}

export const STATUS_BOOKING = {
  WAITING_HAJJ_CONFIRMATION: 'waiting-hajj-confirmation',
  WAITING_FOR_BILL: 'waiting-for-bill',
  WAITING_DOWN_PAYMENT_HAJJ: 'waiting-down-payment-hajj',
  WAITING_DOWN_PAYMENT_UMRAH: 'waiting-down-payment',
}

export const CATEGORIES_FILTER_SEARCH = [
  { name: 'Umroh', slug: 'umrah' },
  { name: 'Haji', slug: 'hajj' },
]

export const LOCATION_STORAGE_KEY = 'user_location'

export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL
