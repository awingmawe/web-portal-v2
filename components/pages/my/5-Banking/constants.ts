import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'

export type ViewStatus = SubmissionCredit['view_status']
export type ViewCta = SubmissionCredit['view_cta']

type StatusConfig = {
  [key in ViewStatus]: {
    text: string
    className: string
  }
}
export const STATUS_CONFIG: StatusConfig = {
  ongoing: {
    text: 'Dalam Proses',
    className: 'bg-warning-100 text-warning-700',
  },
  'not-available': {
    text: 'Kuota Paket Tidak Tersedia',
    className: 'bg-error-100 text-error-600',
  },
  available: {
    text: 'Kuota Tersedia',
    className: 'bg-info-100 text-info-600',
  },
  rejected: {
    text: 'Pengajuan Ditolak',
    className: 'bg-error-100 text-error-600',
  },
  'package-booked': {
    text: 'Pengajuan Dipilih',
    className: 'bg-success-100 text-success-600',
  },
}

interface CtaParams {
  submissionId: number
  packageId: string
  organizationSlug: string
}

type CtaConfig = {
  [key in Exclude<ViewCta, null>]?: {
    detail?: {
      text: string
      mobile: boolean
      desktop: boolean
      href: (params: CtaParams) => string
    } | null
    list: {
      text: string
      desktop: boolean
      mobile: boolean
      href: (params: CtaParams) => string
    }
  }
}

export const CTA_CONFIG: CtaConfig = {
  'ready-to-checkout': {
    detail: {
      text: 'Pilih & Checkout',
      desktop: true,
      mobile: false,
      href: ({ submissionId }) =>
        `/checkout?submission_id=${submissionId}&type=banking`,
    },
    list: {
      text: 'Pilih & Checkout',
      desktop: true,
      mobile: false,
      href: ({ submissionId }) =>
        `/checkout?submission_id=${submissionId}&type=banking`,
    },
  },
  'change-package': {
    detail: {
      text: 'Ubah Paket',
      desktop: true,
      mobile: false,
      href: ({ organizationSlug, packageId, submissionId }) =>
        `/umrah/${organizationSlug}/${packageId}?change_submission=${submissionId}`,
    },
    list: {
      text: 'Ubah Paket',
      desktop: true,
      mobile: false,
      href: ({ organizationSlug, packageId, submissionId }) =>
        `/umrah/${organizationSlug}/${packageId}?change_submission=${submissionId}`,
    },
  },
  'waiting-payment': {
    detail: null,
    list: {
      text: 'Lanjutkan Pembayaran',
      desktop: true,
      mobile: false,
      href: ({ organizationSlug, packageId, submissionId }) =>
        `/umrah/${organizationSlug}/${packageId}?change_submission=${submissionId}`,
    },
  },
  'view-transaction': {
    detail: null,
    list: {
      text: 'Lihat Transaksi',
      desktop: false,
      mobile: true,
      href: ({ organizationSlug, packageId, submissionId }) =>
        `/umrah/${organizationSlug}/${packageId}?change_submission=${submissionId}`,
    },
  },
}
