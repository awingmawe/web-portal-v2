'use client'
import { CashReceiptIcon } from '@/components/icons/cash-receipt'
import { LinkAja, LinkAjaSyariah } from '@/components/icons/linkaja'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { getPaymentStatement, postNextPayment } from '@/services/umrah-service'
import { memo, useCallback, useState } from 'react'

const DrawerPaymentLinkAja = memo(
  ({
    open,
    onOpenChange,
    bookingId,
  }: {
    open: boolean
    onOpenChange: (val: boolean) => void
    bookingId: string
  }) => {
    const [selectedPayment, setSelectedPayment] = useState('')

    const handlePaymentSelection = (paymentType: string) => {
      setSelectedPayment(paymentType)
    }
    const [loadingPayment, setLoadingPayment] = useState(false)

    const fetchPaymentStatement = useCallback(
      async (id: any) => {
        setLoadingPayment(true)
        try {
          // Build query parameters
          const response = await getPaymentStatement(id)
          const payload = {
            amount: response.remainingPayment,
            paymentPath: selectedPayment || 'payment-gateway',
          }
          const responseNext = await postNextPayment(id, payload)
          if (
            selectedPayment == 'link-aja' ||
            selectedPayment == 'link-aja-syariah'
          ) {
            window.location.href = responseNext?.paymentLink
          } else {
            window.snap.pay(responseNext?.paymentToken, {
              onSuccess: async (result: any) => {
                console.log(result)
                // router.replace('/my/transaction') // replace & refresh
                window.location.reload()
              },
              onPending: async (result: any) => {
                console.log('Payment pending', result)
                // router.push(`/my/need-payment`)
                // Add expiration check logic
              },
              onError: (error: any) => {
                console.log(error)
              },
              onClose: () => {
                // router.push(`/my/need-payment`)
                // Additional logic on close
              },
            })
          }
          // console.log(responseNext)
        } catch (err) {
          console.error('Error fetching transactions:', err)
        } finally {
          setLoadingPayment(false)
        }
      },
      [selectedPayment]
    )

    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-white p-4">
          <DrawerHeader className="px-4 py-3">
            <DrawerTitle>Pelunasan Pembayaran</DrawerTitle>
          </DrawerHeader>
          <div className="bg-white px-4 pt-4">
            <div className="rounded-[16px] border border-b border-neutral-200">
              <div className="flex items-center border-b border-neutral-200 p-4">
                <CashReceiptIcon className="text-neutral-900" size={20} />
                <h2 className="text-m-semibold ml-2.5 text-neutral-900">
                  Metode Pembayaran
                </h2>
              </div>
              <RadioGroup
                value={selectedPayment}
                onValueChange={handlePaymentSelection}
                className="p-4"
              >
                {/* LinkAja Syariah */}
                <div
                  className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3"
                  onClick={() => handlePaymentSelection('link-aja-syariah')}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem
                      value="link-aja-syariah"
                      id="linkAjaSyariah"
                      className="h-4 w-4"
                    />
                    <div className="flex items-center gap-2">
                      <LinkAjaSyariah className="h-4 w-4" />
                      <Label
                        htmlFor="linkAjaSyariah"
                        className="text-l-medium cursor-pointer"
                      >
                        LinkAja Syariah
                      </Label>
                    </div>
                  </div>
                </div>

                {/* LinkAja */}
                <div
                  className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3"
                  onClick={() => handlePaymentSelection('link-aja')}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem
                      value="link-aja"
                      id="linkaja"
                      className="h-4 w-4"
                    />
                    <div className="flex items-center gap-2">
                      <LinkAja className="h-4 w-4" />
                      <Label
                        htmlFor="linkaja"
                        className="text-l-medium cursor-pointer"
                      >
                        LinkAja
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button
            className="mx-4 mt-4 py-2"
            disabled={!selectedPayment || loadingPayment}
            onClick={() => {
              fetchPaymentStatement(bookingId)
            }}
          >
            Bayar Sekarang
          </Button>
          <Button
            className="border-primary-500 mx-4 mt-4 border border-2 py-2"
            variant={'outline'}
            disabled={loadingPayment}
            onClick={() => {
              setSelectedPayment('payment-gateway')
              setTimeout(() => {
                fetchPaymentStatement(bookingId)
              }, 100)
            }}
          >
            Metode Pembayaran Lain
          </Button>
        </DrawerContent>
      </Drawer>
    )
  }
)

DrawerPaymentLinkAja.displayName = 'DrawerPaymentLinkAja'

export default DrawerPaymentLinkAja
