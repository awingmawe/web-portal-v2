import BatalkanDialogContent from '@/components/pages/umrah-personal/offer/dialog/DialogBatalkan'
import OfferDetailDialogContent from '@/components/pages/umrah-personal/offer/dialog/DialogDetailOffer'
import SuccessBatalkanDialogContent from '@/components/pages/umrah-personal/offer/dialog/DialogSuccessBatalkan'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import {
  LOCAL_STORAGE_DETAIL_VARIANT,
  LOCAL_STORAGE_SELECTED_VARIANT,
} from '@/constant/env'
import { PackagePersonalData } from '@/constant/types/UmrahPersonalProps'
import { useBookingCancel } from '@/hooks/umrah-personal/offer/useCancelBooking'
import { useOfferUmrahPersonalById } from '@/hooks/umrah-personal/offer/useGetDetailOffer'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const OfferButton: React.FC<{
  isExpired: boolean
  offerId: number
  index: number
  dataOffer?: PackagePersonalData
  isBook?: boolean
}> = ({ isExpired, isBook, offerId, dataOffer, index }) => {
  const router = useRouter()
  // --------------------------- Modal state for booking -----------------------------
  const [openBatalkan, setOpenBatalkan] = useState(false)
  const [openSuccessBatalkan, setOpenSuccessBatalkan] = useState(false)
  const { cancelBooking } = useBookingCancel()
  const handleExitBatalkan = () => {
    setOpenBatalkan(false)
  }

  const handleConfirmBatalkan = async () => {
    if (!dataOffer) return

    const cancelPayload = {
      packagePersonalId: dataOffer.id,
    }

    try {
      await cancelBooking(cancelPayload)
      setOpenBatalkan(false)
      setTimeout(() => {
        setOpenSuccessBatalkan(true)
      }, 100)
    } catch (error) {
      console.error('Error cancel booking:', error)
    }
  }

  const handleExitSuccessBatalkan = () => {
    setOpenSuccessBatalkan(false)
    router.refresh()
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
  const handleCheckout = () => {
    if (dataOffer) {
      const dataDetailVariant = {
        isUmrahPersonal: true,
        arrivalDate: dataOffer.JourneyInformation.arrivalDate,
        departureDate: dataOffer.JourneyInformation.departureDate,
        totalManifest: dataOffer.JourneyInformation.totalManifest,
        package: {
          departure: {
            from: {
              airport: {
                cityName: dataOffer.departure.from.cityName,
                code: dataOffer.departure.from.code,
              },
            },
            to: {
              airport: {
                cityName: dataOffer.departure.to.cityName,
                code: dataOffer.departure.to.code,
              },
            },
          },
          arrival: {
            from: {
              airport: {
                cityName: dataOffer.departure.from.cityName,
                code: dataOffer.departure.from.code,
              },
            },
            to: {
              airport: {
                cityName: dataOffer.departure.to.cityName,
                code: dataOffer.departure.to.code,
              },
            },
          },
          thumbnail: dataOffer.image,
          title: dataOffer.JourneyInformation.name,
          organizationInstance: {
            thumbnail: dataOffer.orgThumbnail,
            city: {
              name: dataOffer.orgCity.name,
            },
          },
          organizationInstanceName: dataOffer.orgName,
        },
      }

      const dataSelectedVariant = {
        roomType: {
          double: 0,
          triple: 0,
          quad: 0,
        },
        variantId: dataOffer.id,
        netAmount: dataOffer.dpAmount,
        name: dataOffer.JourneyInformation.name,
        variant: {
          priceDouble: dataOffer.priceDouble,
          priceTriple: dataOffer.priceTriple,
          priceQuad: dataOffer.priceQuad,
          originalPriceDouble: dataOffer.originalPriceDouble,
          originalPriceTriple: dataOffer.originalPriceTriple,
          originalPriceQuad: dataOffer.originalPriceQuad,
          discountType: 'fixed',
          discountAmount: 0,
        },
        currency: dataOffer.currency,
      }

      localStorage.setItem(
        LOCAL_STORAGE_DETAIL_VARIANT,
        JSON.stringify(dataDetailVariant)
      )

      localStorage.setItem(
        LOCAL_STORAGE_SELECTED_VARIANT,
        JSON.stringify(dataSelectedVariant)
      )

      window.location.href = `/checkout`
    }
  }
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
      <div className="flex items-center gap-3 max-lg:flex-col">
        {isBook ? (
          <>
            <LayoutDrawerDialog
              trigger={
                <Button
                  className="border-error-500 w-full flex-1 py-4 max-lg:px-5 lg:px-10"
                  variant="outline"
                  disabled={isExpired}
                >
                  <p className="text-error-500">Batalkan Pembayaran</p>
                </Button>
              }
              title={<></>}
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
                  className="w-full flex-1 py-4 max-lg:px-5 lg:px-10"
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
              title={
                <div className="flex items-center justify-between max-lg:p-4">
                  <p className="text-m-semibold">
                    Detail Penawaran {index + 1}
                  </p>
                  <X
                    size={24}
                    onClick={handleExitDetailOffer}
                    className="cursor-pointer"
                  />
                </div>
              }
              content={renderDetailContent()}
              isOpen={openDetailOffer}
              setIsOpen={setOpenDetailOffer}
              footerContent={
                <Button
                  className="w-full flex-1 px-10 py-3"
                  onClick={handleCheckout}
                >
                  Checkout{' '}
                  <Image
                    src="/images/arrow-circle-right.svg"
                    width={14}
                    height={14}
                    alt="arrow"
                  />
                </Button>
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
            title={
              <div className="flex items-center justify-between max-lg:p-4">
                <p className="text-m-semibold">Detail Penawaran {index + 1}</p>
                <X
                  size={24}
                  onClick={handleExitDetailOffer}
                  className="cursor-pointer"
                />
              </div>
            }
            content={renderDetailContent()}
            isOpen={openDetailOffer}
            setIsOpen={setOpenDetailOffer}
            footerContent={
              <Button
                className="w-full flex-1 px-10 py-3"
                onClick={handleCheckout}
              >
                Checkout{' '}
                <Image
                  src="/images/arrow-circle-right.svg"
                  width={14}
                  height={14}
                  alt="arrow"
                />
              </Button>
            }
          />
        )}
      </div>

      {/* Success Batalkan Dialog */}
      <LayoutDrawerDialog
        trigger={<div style={{ display: 'none' }} />}
        content={<SuccessBatalkanDialogContent />}
        isOpen={openSuccessBatalkan}
        title={<></>}
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
