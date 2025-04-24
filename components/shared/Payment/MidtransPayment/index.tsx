import { Dialog, DialogContent } from '@/components/ui/dialog'
import { toast } from '@/components/ui/sonner'
import { MIDTRANS_CLIENT_KEY, SNAP_URL } from '@/constant/env'
import Script from 'next/script'
import { Fragment, useEffect, useState } from 'react'

declare global {
  interface Window {
    snap: any
  }
}

type MidtransPaymentProps = {
  paymentToken?: string
  onSuccess: (result: any) => void
  onPending?: (result: any) => void
  onError?: (err: Error) => void
  onClose?: () => void
}

export default function MidtransPayment({
  paymentToken,
  onSuccess,
  onPending = () => {},
  onError = () => {},
  onClose = () => {},
}: MidtransPaymentProps) {
  const [snapIsLoaded, setSnapIsLoaded] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(true)

  function handleShowPayment() {
    if (!snapIsLoaded || !paymentToken) return
    setOpenDialog(true)
    setLoading(false)

    setTimeout(() => {
      window.snap.embed(paymentToken, {
        embedId: 'snap-container',
        onSuccess: (result: any) => {
          setLoading(true)
          onSuccess(result)
        },
        onPending: (result: any) => {
          setLoading(true)
          onPending(result)
        },
        onError: (error: any) => {
          setLoading(true)
          onError(error)
          toast.error('Error during payment')
        },
        onClose: () => {
          setLoading(true)
          onClose()
        },
      })
    }, 1500)
  }

  useEffect(() => {
    if (snapIsLoaded && paymentToken) {
      handleShowPayment()
    }
  }, [snapIsLoaded, paymentToken])

  return (
    <Fragment>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-full max-w-2xl rounded-xl bg-red-500 p-6">
          {loading ? (
            <div className="flex h-60 items-center justify-center">
              <p className="text-lg font-semibold text-white">
                Processing Payment
              </p>
            </div>
          ) : (
            <div id="snap-container" className="w-full rounded-xl" />
          )}
        </DialogContent>
      </Dialog>

      <Script
        src={SNAP_URL}
        data-client-key={MIDTRANS_CLIENT_KEY}
        onLoad={() => {
          setSnapIsLoaded(true)
        }}
      />
    </Fragment>
  )
}
