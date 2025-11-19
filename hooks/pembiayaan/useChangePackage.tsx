'use client'

import { SESSION_STORAGE_CHANGE_PACKAGE } from '@/constant/env'
import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'
import { useRouter } from 'next/navigation'

/**
 * Hook untuk menangani logika perubahan paket pembiayaan.
 * @param submission - Data pengajuan kredit yang sedang berjalan.
 * @param targetHref - URL tujuan halaman pencarian paket.
 */
export const useChangePackage = (
  submission: SubmissionCredit,
  targetHref: string
) => {
  const router = useRouter()

  const handleChangePackage = () => {
    if (targetHref) {
      sessionStorage.setItem(
        SESSION_STORAGE_CHANGE_PACKAGE,
        JSON.stringify({
          id: submission.id,
          quantity: submission.jumlah_jemaah,
          totalPrice: submission.total_price,
        })
      )
      router.push(targetHref)
    }
  }

  return { handleChangePackage }
}
