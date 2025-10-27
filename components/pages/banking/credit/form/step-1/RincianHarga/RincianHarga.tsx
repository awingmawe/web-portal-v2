import RincianHargaSkeleton from '@/components/pages/banking/credit/form/step-1/RincianHarga/SkeletonRincianHarga'
import { Separator } from '@/components/ui/separator'
import { SelectedPackage } from '@/constant/types/Pembiayaan'
import { RoomType } from '@/contexts/package-variant-context'
import { usePreCreatePembiayaan } from '@/services/hooks/banking-service/credits-api'
import { useEffect } from 'react'
import renderHTML from 'react-render-html'

const RincianHarga = ({
  selectedPackage,
  selectedRoomType,
}: {
  selectedPackage?: SelectedPackage | null
  selectedRoomType?: RoomType | null
}) => {
  const {
    create,
    data: paymentDetails,
    isLoading: isLoadingPreCreate,
  } = usePreCreatePembiayaan()

  useEffect(() => {
    if (selectedPackage && selectedRoomType) {
      create({
        packageVariantId: selectedPackage.packageVariantId,
        double: selectedRoomType.double,
        triple: selectedRoomType.triple,
        quad: selectedRoomType.quad,
      })
    }
  }, [create, selectedPackage, selectedRoomType])

  if (isLoadingPreCreate) return <RincianHargaSkeleton />

  return (
    <div className="space-y-2">
      <h4 className="text-l-semibold max-lg:text-sm max-lg:leading-5 max-lg:font-semibold">
        Rincian Pembayaran
      </h4>
      {paymentDetails?.paymentDetails?.map((detail, index: number) => (
        <div key={index}>
          {detail.label === 'divider' ? (
            <Separator />
          ) : (
            <div className="flex justify-between">
              <span className="text-s-regular text-neutral-500">
                {renderHTML(detail.label.replace(/\n/g, '<br/>'))}
              </span>
              <div className="flex flex-col items-end">
                {detail?.amount?.map((item, index2: number) => (
                  <span
                    style={{
                      color: item.color,
                      fontSize:
                        item.style == 'small'
                          ? '12px'
                          : item.style == 'medium'
                            ? '14px'
                            : '16px',
                      fontWeight: item.style == 'small' ? 400 : 600,
                    }}
                    key={'amount-' + index2}
                  >
                    {item.amountLabel}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default RincianHarga
