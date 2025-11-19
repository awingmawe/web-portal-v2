import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'

export type ViewStatus = SubmissionCredit['view_status']
export type ViewCta = SubmissionCredit['view_cta']

export interface StatusConfigItem {
  text: string
  className: string
  classNameWarning?: string
  warningText?: (expiredDate?: string | null) => string
  showTable?: boolean
  // Kita ganti icon component dengan string identifier agar file constants murni data
  iconType?: 'info' | 'close' | 'none'
}

export const STATUS_CONFIG: Record<ViewStatus, StatusConfigItem> = {
  ongoing: {
    text: 'Dalam Proses',
    className: 'bg-warning-100 text-warning-700',
    showTable: false,
    iconType: 'none',
  },
  'not-available': {
    text: 'Kuota Paket Tidak Tersedia',
    className: 'bg-error-100 text-error-600',
    classNameWarning: 'bg-warning-100',
    warningText: () =>
      'Kuota paket tidak tersedia, harap mengubah paket untuk melanjutkan proses pengajuan pembiayaan!',
    showTable: false,
    iconType: 'info',
  },
  available: {
    text: 'Kuota Tersedia',
    className: 'bg-info-100 text-info-700',
    classNameWarning: 'bg-warning-100',
    warningText: (expiredDate?: string | null) =>
      `Terima pengajuan ini sebelum ${expiredDate || ''}!`,
    showTable: true,
    iconType: 'info',
  },
  rejected: {
    text: 'Pengajuan Ditolak',
    className: 'bg-error-100 text-error-600',
    classNameWarning: 'bg-error-100 text-neutral-900',
    warningText: () =>
      'Penawaran ini sudah berakhir karena melewati batas waktu yang ditentukan!',
    showTable: false,
    iconType: 'close',
  },
  'package-booked': {
    text: 'Pengajuan Dipilih',
    className: 'bg-success-100 text-success-600',
    showTable: true,
    iconType: 'none',
  },
}
export interface CtaParams {
  bookingId: string
  providerId: string
}

export interface CtaStaticConfig {
  text: string
  secondText?: string
  href?: (params: CtaParams) => string | null
  requiresDialog?: boolean // Flag untuk memicu logic dialog
}

export const CTA_STATIC_CONFIG: Record<
  Exclude<ViewCta, null>,
  CtaStaticConfig
> = {
  'ready-to-checkout': {
    text: 'Pilih & Checkout',
    requiresDialog: true,
  },
  'change-package': {
    text: 'Ubah Paket',
    href: ({ providerId }) => `/search?package=change_package&pV=${providerId}`,
    requiresDialog: true,
  },
  'waiting-payment': {
    text: 'Lanjutkan Pembayaran',
    secondText: 'Ubah Pembayaran',
    requiresDialog: true,
  },
  'view-transaction': {
    text: 'Lihat Transaksi',
    href: ({ bookingId }) => `/my/transaction/${bookingId}`,
    requiresDialog: false,
  },
}
