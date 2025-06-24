import { ArrowIcon } from '@/components/icons/arrow'
import CheckQuotaModal from '@/components/pages/detail-package/2-PackageVariant/modal/modalCek'
import ModalSuccess from '@/components/pages/detail-package/2-PackageVariant/modal/modalSukses'
import ModalWaitingHasil from '@/components/pages/detail-package/2-PackageVariant/modal/modalTungguHasil'
import DrawerCheckAvailibility from '@/components/pages/detail-package/mobile/DrawerCheckavailibility'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/sonner'
import { ACCOUNT_URL } from '@/constant/env'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { isNullOrEmpty } from '@/lib/utils'
import { checkAvailibility, getStatusStock } from '@/services/umrah-service'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface CheckAvailibilityProps {
  type?: 'normal' | 'footer'
  token: string
  handlePushEvent?: (name: string, withVariant?: boolean) => void
}

export default function CheckAvailibility({
  type = 'normal',
  token,
  handlePushEvent,
}: CheckAvailibilityProps) {
  const path = usePathname()
  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false)
  const [isQuotaModalSuccess, setIsQuotaModalSuccess] = useState(false)
  const [isQuotaModalWating, setIsQuotaModalWaiting] = useState(false)
  const [statusStock, setStatusStock] = useState<boolean>(false)

  const { selectedVariant } = usePackageVariant()

  const handleQuotaCheck = async (quotaAmount: string) => {
    // Handle the quota check logic here
    try {
      const payload = {
        idVariant: selectedVariant?.id,
        value: quotaAmount,
      }
      await checkAvailibility(payload)

      setIsQuotaModalOpen(false)
      setIsQuotaModalSuccess(true)
      statusStockVariable()
    } catch (error) {
      console.log(error)
    }
    // You might want to call an API or update state here
  }
  const handleQuotaCheckDrawer = async (quotaAmount: string) => {
    // Handle the quota check logic here
    try {
      const payload = {
        idVariant: selectedVariant?.id,
        value: quotaAmount,
      }
      await checkAvailibility(payload)
      toast.success('Pengecekan Kuota Berhasil Terkirim')
      statusStockVariable()
    } catch (error) {
      console.log(error)
    }
    // You might want to call an API or update state here
  }

  const statusStockVariable = async () => {
    if (!isNullOrEmpty(selectedVariant) && token) {
      const status = await getStatusStock(selectedVariant?.id, token)
      setStatusStock(status.status)
    }
  }

  useEffect(() => {
    if (token) {
      statusStockVariable()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant, token])
  return (
    <div>
      {token ? (
        <DrawerCheckAvailibility
          statusStock={statusStock}
          onSubmit={handleQuotaCheckDrawer}
        >
          <Button
            className="w-full rounded-full py-2 lg:hidden"
            variant="outline"
            size="lg"
            id="btn-check-quota"
          >
            Cek Kuota
            <ArrowIcon size={12} className="-rotate-45" />
          </Button>
        </DrawerCheckAvailibility>
      ) : (
        <Button
          className="w-full rounded-full py-2 lg:hidden"
          variant="outline"
          size="lg"
          id="btn-check-quota"
          onClick={() => {
            window.location.href = `${ACCOUNT_URL}/auth/login?redirectUri=${URL}/${path}`
          }}
        >
          Cek Kuota
          <ArrowIcon size={12} className="-rotate-45" />
        </Button>
      )}
      <CheckQuotaModal
        open={isQuotaModalOpen}
        onOpenChange={setIsQuotaModalOpen}
        onSubmit={handleQuotaCheck}
      />
      <ModalSuccess
        open={isQuotaModalSuccess}
        onOpenChange={setIsQuotaModalSuccess}
        statusStockVariable={statusStockVariable}
        // onSubmit={handleQuotaCheck}
      />
      <ModalWaitingHasil
        open={isQuotaModalWating}
        onOpenChange={setIsQuotaModalWaiting}
        // onSubmit={handleQuotaCheck}
      />
      {type === 'footer' && (
        <div
          className="flex cursor-pointer items-center gap-1 text-neutral-200 transition-colors"
          onClick={() => {
            if (token) {
              if (statusStock === false) {
                setIsQuotaModalOpen(true)
              } else {
                setIsQuotaModalWaiting(true)
              }
            } else {
              window.location.href =
                `${ACCOUNT_URL}/auth/login?redirectUri=${`${URL}/${path}`} ` ||
                `https://dev.account.moslem101.com/auth/login?redirectUri=${`${URL}/${path}`}`
            }
            handlePushEvent?.('check_availability', true)
          }}
        >
          <span className="text-s-medium">Cek Kuota</span>
          <ArrowIcon size={16} className="-rotate-45 text-neutral-900" />
        </div>
      )}
    </div>
  )
}
