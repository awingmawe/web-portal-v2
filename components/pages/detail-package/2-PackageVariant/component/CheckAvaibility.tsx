import { ArrowIcon } from '@/components/icons/arrow'
import { EmailIcon } from '@/components/icons/email'
import CheckQuotaModal from '@/components/pages/detail-package/2-PackageVariant/modal/ModalCek'
import ModalSuccess from '@/components/pages/detail-package/2-PackageVariant/modal/ModalSukses'
import ModalWaitingHasil from '@/components/pages/detail-package/2-PackageVariant/modal/ModalTungguHasil'
import DrawerCheckAvailibility from '@/components/pages/detail-package/mobile/DrawerCheckavailibility'
import VerificationDialog from '@/components/pages/my/4-Profile/Card/VerificationDialog'
import PhoneNumberNotVerified from '@/components/pages/umrah-personal/landing/dialog/PhoneNumberNotVerified'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/sonner'
import { ACCOUNT_URL } from '@/constant/env'
import { useAuth } from '@/contexts/auth/context'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { usePhoneVerification } from '@/hooks/umrah-personal/landing/usePhoneNumberVerification'
import { isNullOrEmpty } from '@/lib/utils'
import { checkAvailibility, getStatusStock } from '@/services/umrah-service'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

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
  const { profile } = useAuth()

  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false)
  const [isQuotaDrawerOpen, setIsQuotaDrawerOpen] = useState(false)
  const [isPhoneNumberModal, setIsPhoneNumberModal] = useState(false)
  const [isQuotaModalSuccess, setIsQuotaModalSuccess] = useState(false)
  const [isQuotaModalWating, setIsQuotaModalWaiting] = useState(false)
  const [statusStock, setStatusStock] = useState<boolean>(false)

  const { selectedVariant } = usePackageVariant()

  const {
    setPhoneNumber,
    isLoading,
    openOtp,
    setOpenOtp,
    verificationPurpose,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
    phoneNumber,
  } = usePhoneVerification({
    initialPhoneNumber: profile?.persona?.phoneNumber,
  })

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

  const handleSavePhoneNumber = async () => {
    await handleSendOtp(setIsPhoneNumberModal)
  }
  return (
    <Fragment>
      {token ? (
        <Fragment>
          <DrawerCheckAvailibility
            open={isQuotaDrawerOpen}
            setOpen={setIsQuotaDrawerOpen}
            statusStock={statusStock}
            onSubmit={handleQuotaCheckDrawer}
          />
          <Button
            className="w-full rounded-full py-2 lg:hidden"
            variant="outline"
            size="lg"
            id="btn-check-quota"
            onClick={() => {
              if (!profile?.phonenumberVerified) {
                setIsPhoneNumberModal(true)
                return
              }
              if (statusStock === false) {
                setIsQuotaDrawerOpen(true)
              }
            }}
          >
            Cek Kuota
            <ArrowIcon size={12} className="-rotate-45" />
          </Button>
        </Fragment>
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
      <VerificationDialog
        open={openOtp}
        onOpenChange={setOpenOtp}
        onVerify={handleVerifyOtp}
        onResendOtp={handleResendOtp}
        icon={<EmailIcon className="text-primary-500 h-7 w-7" />}
        purpose={verificationPurpose}
        isLoading={isLoading}
      />
      <LayoutDrawerDialog
        isOpen={isPhoneNumberModal}
        setIsOpen={setIsPhoneNumberModal}
        trigger={<div className="hidden" />}
        title={<></>}
        content={
          <PhoneNumberNotVerified
            name={profile?.name || ''}
            phoneNumber={phoneNumber || ''}
            setPhoneNumber={setPhoneNumber}
          />
        }
        footerContent={
          <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
            <Button
              variant="default"
              className="px-10 py-3"
              onClick={handleSavePhoneNumber}
              isLoading={isLoading}
            >
              Simpan Nomor Telepon
            </Button>
          </div>
        }
      />

      {type === 'footer' && (
        <div
          className="flex cursor-pointer items-center gap-1 text-neutral-200 transition-colors"
          onClick={() => {
            if (token) {
              if (!profile?.phonenumberVerified) {
                setIsPhoneNumberModal(true)
                return
              }
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
    </Fragment>
  )
}
