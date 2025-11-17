import { toast } from '@/components/ui/sonner'
import { PaymentTransaction } from '@/constant/types/PaymentTransaction'
import { apiWithAuth } from '@/services/common/http'
import {
  changePaymentMethodBookingBanking,
  createBookingBanking,
} from '@/services/umrah-service'
import {
  useSWRFetcher,
  useSWRMutationFetcher,
} from '@/services/use-swr-fetcher'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { mutate, SWRConfiguration } from 'swr'

const getOrderPayment = ({
  bookingId,
}: {
  bookingId: string
}): Promise<AxiosResponse<PaymentTransaction>> => {
  return apiWithAuth.get(`/umrah/v1/booking/${bookingId}/order-payment`)
}

export function useGetOrderPayment(
  bookingId: string,
  config?: Partial<SWRConfiguration> & {
    showErrorToast?: boolean // Custom option
  }
) {
  const { showErrorToast = true, ...swrConfig } = config || {}
  const fetcher = async () => {
    return await getOrderPayment({ bookingId })
  }
  const swrKey = bookingId ? ['get-order-payment', bookingId] : null
  const {
    data,
    error,
    isLoading,
    mutate: boundMutate,
  } = useSWRFetcher(swrKey, () => fetcher(), swrConfig)

  useEffect(() => {
    if (error && showErrorToast) {
      toast.error(error.message, {
        description: error.code,
        action: {
          label: 'Coba Lagi',
          onClick: () => boundMutate(),
        },
      })
    }
  }, [error, showErrorToast, boundMutate])

  return {
    data: data,
    isLoading,
    error,
    refresh: boundMutate,
  }
}

export function useCreateBanking(config?: {
  showSuccessToast?: boolean
  showErrorToast?: boolean
}) {
  const { showErrorToast = true } = config || {}

  const { trigger, data, error, isMutating } = useSWRMutationFetcher(
    'create-banking-booking',
    (data) => createBookingBanking(data),
    {
      onSuccess: () => {
        mutate(
          (key) => typeof key === 'string' && key.includes('get-order-payment')
        )
      },
      onError: (err) => {
        if (showErrorToast) {
          toast.error('Gagal membuat transaksi', {
            description: err?.message || 'Terjadi kesalahan',
          })
        }
      },
    }
  )

  return {
    create: trigger, // Trigger function
    data,
    error,
    isLoading: isMutating,
  }
}

export function useChangePaymentMethodBanking(config?: {
  showSuccessToast?: boolean
  showErrorToast?: boolean
}) {
  const { showErrorToast = true } = config || {}

  const { trigger, data, error, isMutating } = useSWRMutationFetcher(
    'change-payment-method-banking-booking',
    (data) => changePaymentMethodBookingBanking(data),
    {
      onSuccess: () => {
        mutate(
          (key) => typeof key === 'string' && key.includes('get-order-payment')
        )
      },
      onError: (err) => {
        if (showErrorToast) {
          toast.error('Gagal membuat transaksi', {
            description: err?.message || 'Terjadi kesalahan',
          })
        }
      },
    }
  )

  return {
    create: trigger, // Trigger function
    data,
    error,
    isLoading: isMutating,
  }
}
