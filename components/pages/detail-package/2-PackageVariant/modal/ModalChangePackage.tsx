import { MessageQuestionIcon } from '@/components/icons/message-question'
import { ContentChangePackage } from '@/components/pages/detail-package/2-PackageVariant/component/ContentChangePackage'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { toast } from '@/components/ui/sonner'
import {
  LOCAL_STORAGE_PEMBIAYAAN,
  SESSION_STORAGE_CHANGE_PACKAGE,
} from '@/constant/env'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { useUI } from '@/contexts/ui-context/context'
import { localStorageUtils } from '@/hooks/common/useLocalStorage'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useChangePackagePembiayaan } from '@/services/hooks/banking-service/submission-credits-api'
import { DialogTitle } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface LayoutDrawerDialogProps {
  hideCloseButton?: boolean
  packageId?: number
  packageName?: string
}

const ModalChangePackagePembiayaan: React.FC<LayoutDrawerDialogProps> = ({
  hideCloseButton,
  packageId,
  packageName,
}) => {
  const { lg: isMobile } = useTailwindBreakpoint()
  const { selectedVariantId, getPrice, selectedVariant, selectedRoomType } =
    usePackageVariant()
  const {
    isChangePackageModalOpen,
    setChangePackageModalOpen,
    setPembiayaanDrawerOpen,
  } = useUI()

  // SESSION STORAGE CHANGE PACKAGE
  // 1. id: submission id
  // 2. quantity: jumlah jemaah yang terdaftar sebelumnya
  // 3. totalPrice: harga paket sebelumnya untuk dibandingkan dengan paket yang akan diganti
  const dataOldPembiayaan = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_CHANGE_PACKAGE) || '{}'
  )
  const dataPembiayaan = localStorageUtils.getJSON(
    LOCAL_STORAGE_PEMBIAYAAN
  ) as PembiayaanDataLocalStorage

  const router = useRouter()
  const { pushEvent } = useEventTracker()
  const { create: changePackage, isLoading } = useChangePackagePembiayaan()
  const onClickChangePackage = async () => {
    changePackage({
      id: dataOldPembiayaan.id,
      packageVariantId: Number(selectedVariantId),
      jumlahJemaah: dataOldPembiayaan.quantity,
      totalPrice: getPrice(),
      packageId,
      packageName,
      packageVariantName: selectedVariant?.name,
      roomType: selectedRoomType,
    })
      .then((res) => {
        toast.success(res.message || 'Berhasil mengganti paket pembiayaan')

        pushEvent({
          name: 'click_change_package_banking_credit',
          category: 'banking-credit',
          topic: 'umrah',
          data: {
            packageId: dataPembiayaan?.selectedPackage?.packageId || null,
            newPackageId: packageId || null,
          },
        })
        router.push(`/my/banking/${res.id}`)
      })
      .catch(() => {
        // Toast error sudah di-handle oleh hook `useSubmissionPembiayaan`
      })
  }

  const handleBackDrawer = () => {
    setChangePackageModalOpen(false)
    setPembiayaanDrawerOpen(true)
  }

  if (isMobile) {
    return (
      <Drawer
        open={isChangePackageModalOpen}
        onOpenChange={setChangePackageModalOpen}
      >
        <DrawerContent>
          <DrawerHeader className="scrollbar-hide gap-3 overflow-y-scroll">
            <DrawerTitle className="flex justify-between gap-2 p-0">
              <div className="flex flex-row items-center gap-6">
                <p className="heading-3-semibold max-lg:text-[14px] max-lg:leading-5 max-lg:font-semibold">
                  Apakah kamu yakin ingin mengubah paket pembiayaan ?
                </p>
              </div>
              <DrawerClose>
                <X className="text-neutral-900" />
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>
          <ContentChangePackage dataOldPembiayaan={dataOldPembiayaan} />
          <DrawerFooter>
            <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
              <Button
                onClick={handleBackDrawer}
                size="sm"
                variant="outline"
                className="border-primary-500 w-full border-2 max-lg:p-3"
              >
                Kembali
              </Button>
              <Button
                size="sm"
                className="w-full max-lg:p-3"
                disabled={isLoading}
                onClick={onClickChangePackage}
              >
                Ya, Ubah Paket
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog
      open={isChangePackageModalOpen}
      onOpenChange={setChangePackageModalOpen}
    >
      <DialogContent
        className={`max-w-1/2! rounded-[20px] p-8 ${
          hideCloseButton ? '[&>button]:hidden' : ''
        }`}
      >
        <DialogTitle>
          <div className="flex flex-row items-center gap-6 max-lg:p-4">
            <div className="bg-warning-100 flex rounded-lg p-2.5 max-lg:hidden">
              <MessageQuestionIcon size={36} />
            </div>
            <p className="heading-3-semibold max-lg:text-[14px] max-lg:leading-5 max-lg:font-semibold">
              Apakah kamu yakin ingin mengubah paket pembiayaan ?
            </p>
          </div>
        </DialogTitle>
        <ContentChangePackage dataOldPembiayaan={dataOldPembiayaan} />
        <DialogFooter>
          <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
            <Button
              onClick={() => setChangePackageModalOpen(false)}
              size="sm"
              variant="outline"
              className="border-primary-500 w-full border-2 max-lg:p-3"
            >
              Kembali
            </Button>
            <Button
              size="sm"
              className="w-full max-lg:p-3"
              disabled={isLoading}
              onClick={onClickChangePackage}
            >
              Ya, Ubah Paket
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalChangePackagePembiayaan
