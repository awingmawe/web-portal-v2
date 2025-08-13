// hooks/useBookingCancel.ts
import { getPostCanceled } from '@/services/umrah-service'
import { useState } from 'react'
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'

interface CancelPayload {
  packagePersonalId: string | number
  [key: string]: any
}

export function useBookingCancel() {
  const [cancelError, setCancelError] = useState<string | null>(null)

  const { trigger: cancelBooking, isMutating: isCanceling } = useSWRMutation(
    'cancel-booking',
    async (key, { arg }: { arg: CancelPayload }) => {
      setCancelError(null)
      return await getPostCanceled(arg)
    },
    {
      onSuccess: () => {
        // Refresh all related cache keys
        mutate((key: unknown) => {
          if (Array.isArray(key)) {
            return key.some(
              (k: any) =>
                typeof k === 'string' &&
                (k.includes('offer') ||
                  k.includes('booking') ||
                  k.includes('umrah'))
            )
          }
          if (typeof key === 'string') {
            return (
              key.includes('offer') ||
              key.includes('booking') ||
              key.includes('umrah')
            )
          }
          return false
        })

        setCancelError(null)
      },
      onError: (error) => {
        console.error('Cancel booking failed:', error)
        setCancelError(
          error?.message || 'Gagal membatalkan pembayaran. Silakan coba lagi.'
        )
      },
    }
  )

  const clearError = () => setCancelError(null)

  return {
    cancelBooking,
    isCanceling,
    cancelError,
    clearError,
  }
}
