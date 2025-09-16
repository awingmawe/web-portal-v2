// DEV NOTE REFACTOR: PUT ALL THE CONDITION STATUSES HERE

import { STATUS_BOOKING } from '@/constant/env'

export const shouldBatalkanByUser = (status: string) => {
  return (
    status === STATUS_BOOKING.WAITING_FOR_BILL ||
    status === STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION ||
    status === STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ ||
    status === STATUS_BOOKING.WAITING_DOWN_PAYMENT_UMRAH
  )
}
