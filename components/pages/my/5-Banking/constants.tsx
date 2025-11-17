import { CloseCircle } from '@/components/icons/close-circle'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'
import { ReactNode } from 'react'

export type ViewStatus = SubmissionCredit['view_status']
export type ViewCta = SubmissionCredit['view_cta']

type StatusConfig = {
  [key in ViewStatus]: {
    text: string
    className: string
    classNameWarning?: string
    iconWarning?: ReactNode
    warningText?: (expiredDate?: string | null) => string
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
    classNameWarning: 'bg-warning-100',
    iconWarning: <InfoCircleIcon size={40} className="text-primary-500" />,
    warningText: () =>
      'Kuota paket tidak tersedia, harap mengubah paket untuk melanjutkan proses pengajuan pembiayaan!',
  },
  available: {
    text: 'Kuota Tersedia',
    className: 'bg-info-100 text-info-700',
    iconWarning: <InfoCircleIcon size={40} className="text-primary-500" />,
    classNameWarning: 'bg-warning-100',
    warningText: (expiredDate?: string | null) =>
      `Terima pengajuan ini sebelum ${expiredDate}!`,
  },
  rejected: {
    text: 'Pengajuan Ditolak',
    className: 'bg-error-100 text-error-600',
    classNameWarning: 'bg-error-100 text-neutral-900',
    iconWarning: <CloseCircle size={40} className="text-error-500" />,
    warningText: () =>
      'Penawaran ini sudah berakhir karena melewati batas waktu yang ditentukan!',
  },
  'package-booked': {
    text: 'Pengajuan Dipilih',
    className: 'bg-success-100 text-success-600',
  },
}

interface CtaParams {
  bookingId: string
  providerId: string
}

type CtaConfig = {
  [key in Exclude<ViewCta, null>]?: {
    secondText?: string
    text: string
    href?: (params: CtaParams) => string | null
  }
}

export const CTA_CONFIG: CtaConfig = {
  'ready-to-checkout': {
    text: 'Pilih & Checkout',
  },
  'change-package': {
    text: 'Ubah Paket',
    href: ({ providerId }) => `/search?package=change_package&pV=${providerId}`,
  },
  'waiting-payment': {
    text: 'Lanjutkan Pembayaran',
    secondText: 'Ubah Pembayaran',
  },
  'view-transaction': {
    text: 'Lihat Transaksi',
    href: ({ bookingId }) => `/my/transaction/${bookingId}`,
  },
}
