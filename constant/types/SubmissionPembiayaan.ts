// --- Tipe untuk Tabel-Tabel Baru ---
import { PackageVariant } from '@/constant/types/PackageProps'
import { Provider } from '@/constant/types/Providers'
/**
 * Tipe untuk enum di submission_credit_attachment dan submission_credit_application
 */
type AttachmentType = 'KTP' | 'NPWP'
/**
 * Tipe untuk tabel: submission_credit_package_snapshot
 */
interface SubmissionCreditPackageSnapshot {
  id: number
  submission_id: number
  snapshot: {
    total_price: number
    jumlah_jemaah: number
    package_variant: PackageVariant
  }
}
/**
 * Tipe untuk tabel: submission_credit_attachment
 */
interface SubmissionCreditAttachment {
  id: number
  submission_id: number
  type: AttachmentType // Deskripsi: enum KTP, NPWP
  src: string
}
/**
 * Tipe untuk tabel: submission_credit_application
 */
export interface SubmissionCreditApplication {
  id: number
  submission_id: number
  provider_id: number
  type: AttachmentType // Deskripsi: enum KTP, NPWP
  status: string
  note?: string // 'O' (Optional)
  insentif_fee: number
  admin_fee?: number // 'O' (Optional)
  insurance_fee?: number // 'O' (Optional)
  approved_total_price?: number // 'O' (Optional)
  approved_tenor?: number // 'O' (Optional)
  approved_expired_at?: string // 'O' (Optional) - Tipe Date dipetakan ke string (YYYY-MM-DD)
  request_tenor: number
  total_checkout: number
  must_checkout: boolean
  down_payment_percentage: string
  down_payment_amount: string
  coverage_amount: string
  /**
   * Relasi ke provider
   */
  provider: Provider
}

/**
 * Tipe untuk requested_loan
 */
export interface RequestedLoan {
  admin_fee: number
  down_payment: number
  dpPercentage: number
  loan_amount: number
  monthly_payment: number
  totalAmount: number
  upfront_payment: number
}

/**
 * Tipe untuk tabel: submission_manifest
 */
interface SubmissionManifest {
  id: number
  submission_id: string // Sesuai spesifikasi Anda
  name: string
  phone_number: string
}
// --- Tipe Enum dari Sebelumnya ---
type Gender = 'L' | 'P'
type ViewStatus =
  | 'ongoing'
  | 'not-available'
  | 'available'
  | 'rejected'
  | 'package-booked'
type ViewCta =
  | 'change-package'
  | 'ready-to-checkout'
  | 'waiting-payment'
  | 'view-transaction'
  | null
/**
 * Interface untuk SubmissionCredit (Digabungkan)
 * Ini adalah tipe data utama yang menyertakan relasi-relasinya.
 */
export interface SubmissionCredit {
  id: number
  name: string
  email: string
  phone_number: string
  born: string // Format YYYY-MM-DD
  gender: Gender
  job: string
  province_name: string
  province_id: string
  city_name: string
  city_id: string
  district_name: string
  district_id: string
  room_type_quantity: any
  total_price: number
  jumlah_jemaah: number
  package_name: string
  package_id: string
  package_variant_name: string
  package_variant_id: string
  tenor: number
  address: string
  status: string
  postcode: string
  organization_instance_name: string
  organizationInstanceName: string
  createdAt: string
  submission_id: string
  view_status: ViewStatus
  view_cta: ViewCta
  booking_id: number
  // --- Data yang Digabungkan (Relasi) ---
  /**
   * Relasi ke submission_credit_package_snapshot
   * (Bisa satu atau banyak, tergantung logika bisnis)
   */
  packageSnapshots: SubmissionCreditPackageSnapshot[]
  /**
   * Relasi ke submission_credit_attachment
   */
  attachments: SubmissionCreditAttachment[]
  /**
   * Relasi ke submission_credit_application
   */
  applications: SubmissionCreditApplication[]
  /**
   * Relasi ke submission_manifest
   */
  manifests: SubmissionManifest[]
  /**
   * Relasi ke requested_loan
   */
  requested_loan: RequestedLoan
}

export interface SubmissionListResponse {
  total: number
  page: number
  size: number
  totalPages: number
  data: SubmissionCredit[]
}
