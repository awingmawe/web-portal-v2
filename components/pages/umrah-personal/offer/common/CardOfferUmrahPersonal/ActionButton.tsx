import LayoutDrawerDialog from '@/components/pages/umrah-personal/common/LayoutDrawerDialog'
import BatalkanDialogContent from '@/components/pages/umrah-personal/offer/dialog/DialogBatalkan'
import OfferDetailDialogContent from '@/components/pages/umrah-personal/offer/dialog/DialogDetailOffer'
import SuccessBatalkanDialogContent from '@/components/pages/umrah-personal/offer/dialog/DialogSuccessBatalkan'
import { Button } from '@/components/ui/button'
import { PackagePersonalData } from '@/constant/types/UmrahPersonalProps'
import { useOfferUmrahPersonalById } from '@/hooks/umrah-personal/offer/useGetDetailOffer'
import Image from 'next/image'
import { useState } from 'react'

const OfferButton: React.FC<{
  isExpired: boolean
  offerId: number
  index: number
  dataOffer?: PackagePersonalData
  isBook?: boolean
}> = ({ isExpired, isBook, offerId, dataOffer, index }) => {
  // --------------------------- Modal state for booking -----------------------------
  const [openBatalkan, setOpenBatalkan] = useState(false)
  const [openSuccessBatalkan, setOpenSuccessBatalkan] = useState(false)

  const handleExitBatalkan = () => {
    setOpenBatalkan(false)
  }

  const handleConfirmBatalkan = () => {
    setOpenBatalkan(false)
    setTimeout(() => {
      setOpenSuccessBatalkan(true)
    }, 100)
  }

  const handleExitSuccessBatalkan = () => {
    setOpenSuccessBatalkan(false)
  }

  // --------------------- Modal state for detail offer ----------------------------
  const [openDetailOffer, setOpenDetailOffer] = useState(false)
  const { error, isLoading, refresh } = useOfferUmrahPersonalById(
    offerId,
    openDetailOffer,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: Infinity,
    }
  )
  const handleExitDetailOffer = () => {
    setOpenDetailOffer(false)
  }
  // Function to render dialog content with loading state
  const renderDetailContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="border-primary-500 mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="text-neutral-500">Memuat detail penawaran...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-error-500 mb-4">Gagal memuat detail penawaran</p>
            <Button
              onClick={() => refresh()}
              variant="outline"
              className="px-10 py-4"
            >
              Coba Lagi
            </Button>
          </div>
        </div>
      )
    }

    if (!dataOffer) {
      return (
        <div className="flex items-center justify-center p-8">
          <p className="text-neutral-500">Data tidak ditemukan</p>
        </div>
      )
    }

    return (
      <OfferDetailDialogContent
        data={dataOffer}
        index={index}
        isOpen={openDetailOffer}
        onCancel={handleExitDetailOffer}
      />
    )
  }

  return (
    <>
      <div className="flex items-center gap-3">
        {isBook ? (
          <>
            <LayoutDrawerDialog
              trigger={
                <Button
                  className="border-error-500 w-full flex-1 px-10 py-4"
                  variant="outline"
                  disabled={isExpired}
                >
                  <p className="text-error-500">Batalkan Pembayaran</p>
                </Button>
              }
              content={<BatalkanDialogContent />}
              isOpen={openBatalkan}
              setIsOpen={setOpenBatalkan}
              footerContent={
                <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
                  <Button
                    variant="outline"
                    intent="none"
                    className="border-primary-500 flex-1 border-2 px-10 py-3 max-lg:w-full"
                    onClick={handleExitBatalkan}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="outline"
                    className="border-error-500 flex-1 px-10 py-3 max-lg:w-full"
                    onClick={handleConfirmBatalkan}
                  >
                    Ya, batalkan
                  </Button>
                </div>
              }
            />
            <LayoutDrawerDialog
              trigger={
                <Button
                  className="w-full flex-1 px-10 py-4"
                  disabled={isExpired}
                >
                  Lanjut Bayar{' '}
                  <Image
                    src="/images/arrow-circle-right.svg"
                    width={14}
                    height={14}
                    alt="arrow"
                  />
                </Button>
              }
              content={renderDetailContent()}
              isOpen={openDetailOffer}
              setIsOpen={setOpenDetailOffer}
              footerContent={
                <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
                  <Button
                    variant="outline"
                    intent="none"
                    className="border-primary-500 flex-1 border-2 px-10 py-3 max-lg:w-full"
                    onClick={handleExitBatalkan}
                  >
                    Batal
                  </Button>
                </div>
              }
            />
          </>
        ) : (
          <LayoutDrawerDialog
            trigger={
              <Button className="w-full px-10 py-4" disabled={isExpired}>
                Detail Penawaran{' '}
                <Image
                  src="/images/arrow-circle-right.svg"
                  width={14}
                  height={14}
                  alt="arrow"
                />
              </Button>
            }
            content={renderDetailContent()}
            isOpen={openDetailOffer}
            setIsOpen={setOpenDetailOffer}
            footerContent={
              <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
                <Button
                  variant="outline"
                  intent="none"
                  className="border-primary-500 flex-1 border-2 px-10 py-3 max-lg:w-full"
                  onClick={handleExitBatalkan}
                >
                  Batal
                </Button>
                <Button
                  variant="outline"
                  className="border-error-500 flex-1 px-10 py-3 max-lg:w-full"
                  onClick={handleConfirmBatalkan}
                >
                  Ya, batalkan
                </Button>
              </div>
            }
          />
        )}
      </div>

      {/* Success Batalkan Dialog */}
      <LayoutDrawerDialog
        trigger={<div style={{ display: 'none' }} />}
        content={<SuccessBatalkanDialogContent />}
        isOpen={openSuccessBatalkan}
        setIsOpen={setOpenSuccessBatalkan}
        footerContent={
          <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
            <Button
              variant="outline"
              intent="none"
              className="border-primary-500 border-2 px-10 py-3 max-lg:w-full"
              onClick={handleExitSuccessBatalkan}
            >
              Tutup
            </Button>
          </div>
        }
      />
    </>
  )
}

export default OfferButton
