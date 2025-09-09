import { PACKAGE_TYPE, STATUS_BOOKING } from '@/constant/env'

interface UseMobileActionStatusProps {
  status: string
  packageType?: string
  isPaidOff: boolean
  isManifestCommitted: boolean
  // Functions from useTransactionStatus hook
  isWaitingForPayment: () => boolean
  shouldShowManifestButton: () => boolean
  isDibatalkan: () => boolean
}

export type MobileActionType =
  | 'refund-status'
  | 'waiting-payment'
  | 'waiting-down-payment-hajj'
  | 'manifest-button'
  | 'umrah-both-completed'
  | 'umrah-manifest-completed'
  | 'umrah-payment-completed'
  | 'umrah-both-incomplete'
  | 'hajj-manifest-completed'
  | 'hajj-manifest-incomplete'
  | 'none'

export const useMobileActionStatus = ({
  status,
  packageType,
  isPaidOff,
  isManifestCommitted,
  isWaitingForPayment,
  shouldShowManifestButton,
  isDibatalkan,
}: UseMobileActionStatusProps) => {
  const getMobileActionType = (): MobileActionType => {
    // Check refund status first (handled by renderRefundStatus in component)
    if (isDibatalkan()) {
      return 'refund-status'
    }

    // Check waiting for payment
    if (isWaitingForPayment()) {
      return 'waiting-payment'
    }

    // Check waiting down payment hajj
    if (status === STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ) {
      return 'waiting-down-payment-hajj'
    }

    // Check manifest button
    if (shouldShowManifestButton()) {
      return 'manifest-button'
    }

    // Handle non-canceled statuses
    if (!isDibatalkan()) {
      // Case: Package Type is UMRAH
      if (packageType === PACKAGE_TYPE.UMRAH) {
        // Case: Manifest completed and Paid Off completed
        if (isPaidOff && isManifestCommitted) {
          return 'umrah-both-completed'
        }
        // Case: Manifest completed but not paid off
        if (isManifestCommitted && !isPaidOff) {
          return 'umrah-manifest-completed'
        }
        // Case: Paid off but manifest not completed
        if (isPaidOff && !isManifestCommitted) {
          return 'umrah-payment-completed'
        }
        // Case: Not paid off and manifest not completed
        if (!isManifestCommitted && !isPaidOff) {
          return 'umrah-both-incomplete'
        }
      }
      // Case: Package Type is HAJJ
      else {
        if (isManifestCommitted) {
          return 'hajj-manifest-completed'
        } else {
          return 'hajj-manifest-incomplete'
        }
      }
    }

    return 'none'
  }

  const shouldShowRefundStatus = (): boolean => {
    return isDibatalkan()
  }

  const shouldShowWaitingPayment = (): boolean => {
    return isWaitingForPayment()
  }

  const shouldShowWaitingDownPaymentHajj = (): boolean => {
    return status === STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ
  }

  const shouldShowManifest = (): boolean => {
    return shouldShowManifestButton()
  }

  const isUmrahBothCompleted = (): boolean => {
    return (
      !isDibatalkan() &&
      packageType === PACKAGE_TYPE.UMRAH &&
      isPaidOff &&
      isManifestCommitted
    )
  }

  const isUmrahManifestCompleted = (): boolean => {
    return (
      !isDibatalkan() &&
      packageType === PACKAGE_TYPE.UMRAH &&
      isManifestCommitted &&
      !isPaidOff
    )
  }

  const isUmrahPaymentCompleted = (): boolean => {
    return (
      !isDibatalkan() &&
      packageType === PACKAGE_TYPE.UMRAH &&
      isPaidOff &&
      !isManifestCommitted
    )
  }

  const isUmrahBothIncomplete = (): boolean => {
    return (
      !isDibatalkan() &&
      packageType === PACKAGE_TYPE.UMRAH &&
      !isManifestCommitted &&
      !isPaidOff
    )
  }

  const isHajjManifestCompleted = (): boolean => {
    return (
      !isDibatalkan() &&
      packageType !== PACKAGE_TYPE.UMRAH &&
      isManifestCommitted
    )
  }

  const isHajjManifestIncomplete = (): boolean => {
    return (
      !isDibatalkan() &&
      packageType !== PACKAGE_TYPE.UMRAH &&
      !isManifestCommitted
    )
  }

  return {
    actionType: getMobileActionType(),
    shouldShowRefundStatus,
    shouldShowWaitingPayment,
    shouldShowWaitingDownPaymentHajj,
    shouldShowManifest,
    isUmrahBothCompleted,
    isUmrahManifestCompleted,
    isUmrahPaymentCompleted,
    isUmrahBothIncomplete,
    isHajjManifestCompleted,
    isHajjManifestIncomplete,
  }
}
