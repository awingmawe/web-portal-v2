import { ArrowLongIcon } from '@/components/icons/arrow'
import { MessageQuestionIcon } from '@/components/icons/message-question'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PACKAGE_TYPE } from '@/constant/env'
import { PackageVariant } from '@/constant/types/PackageProps'
import { addYears, format } from 'date-fns'
import { id } from 'date-fns/locale'
import React, { Fragment } from 'react'

export const TEXT_TOOLTIP = {
  HAJJ_TITLE: 'Waktu Keberangkatan',
  HAJJ_SPECIAL: (
    <>
      Haji Khusus memiliki masa waktu keberangkatan mulai dari 5 sampai 10 tahun
      tergantung pada ketentuan travel masing-masing.
      <br />
      <br />
      Di Muslim101, kamu hanya perlu membayar uang muka dan pengisian data
      jemaah. Setelah itu, Muslim101 akan menyerahterimakan data jemaah dengan
      pihak travel terkait.
    </>
  ),
  HAJJ_REGULAR: (
    <>
      Walaupun Haji Furoda memiliki estimasi keberangkatan yang lebih cepat,
      tidak menutup kemungkinan terdapat pergantian jadwal. Hal ini dikarekan
      adanya kebutuhan yang banyak dengan jumlah visa yang terbatas.
      <br />
      <br />
      Di Muslim101, kamu hanya perlu membayar uang muka dan pengisian data
      jemaah. Setelah itu, Muslim101 akan menyerahterimakan data jemaah dengan
      pihak travel terkait.
    </>
  ),
  PRICE: (
    <>
      Perlu diperhatikan bahwa uang muka yang kamu bayar saat ini berdasar pada
      harga tahun 2025.
      <br />
      <br />
      Sisa pelunasan yang harus kamu bayar dapat mengalami penyesuaian sesuai
      dengan perkembangan biaya akomodasi, tiket, atau regulasi Haji.
      <br />
      <br />
      Pihak yang bertanggung jawab atas penyesuaian harga adalah pihak travel.
    </>
  ),
}

const TooltipHajj = ({
  title,
  description,
}: {
  title: string
  description: React.ReactNode
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-m-medium text-[#484848]">{title}</p>
      <p className="text-s-regular text-[#333]">{description}</p>
    </div>
  )
}

interface TravelDatesProps {
  variants: PackageVariant[]
  selectedVariant: PackageVariant | null
  packageType: string
  formattedDeparture: string
  formattedArrival: string
  numberOfDays: number
  variantType: string
  waitingPeriod: string | null | undefined
  context: 'main' | 'drawer'
}

const TravelDates: React.FC<TravelDatesProps> = ({
  variants,
  selectedVariant,
  packageType,
  formattedDeparture,
  formattedArrival,
  numberOfDays,
  variantType,
  waitingPeriod,
  context,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  // Format departure date based on variant type - matching CardPackage logic
  const getFormattedDepartureDate = () => {
    try {
      if (variantType === PACKAGE_TYPE.HAJJ_SPECIAL) {
        return (
          selectedVariant?.departureDate &&
          format(selectedVariant.departureDate, 'yyyy', { locale: id })
        )
      } else if (
        variantType === PACKAGE_TYPE.HAJJ_DAKHILI ||
        variantType === PACKAGE_TYPE.HAJJ_FURODA
      ) {
        return (
          selectedVariant?.departureDate &&
          `Tahun ${format(selectedVariant.departureDate, 'yyyy', { locale: id })}`
        )
      } else {
        return formattedDeparture
      }
    } catch (error) {
      console.error('Error formatting departureDate:', error)
      return formattedDeparture
    }
  }

  // Format arrival date based on variant type - matching CardPackage logic
  const getFormattedArrivalDate = () => {
    try {
      if (packageType === PACKAGE_TYPE.UMRAH) {
        return formattedArrival
      } else if (variantType === PACKAGE_TYPE.HAJJ_SPECIAL) {
        return (
          waitingPeriod &&
          `- ${format(
            selectedVariant?.departureDate
              ? addYears(selectedVariant.departureDate, Number(waitingPeriod))
              : new Date(),
            'yyyy',
            { locale: id }
          )}`
        )
      } else {
        return ''
      }
    } catch (error) {
      console.error('Error formatting arrivalDate:', error)
      return formattedArrival
    }
  }

  const displayDeparture = getFormattedDepartureDate()
  const displayArrival = getFormattedArrivalDate()

  if (variants.length === 0 || !selectedVariant) {
    return null
  }

  if (packageType === PACKAGE_TYPE.UMRAH) {
    return (
      <div className="flex items-center justify-between max-lg:gap-2">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-s-medium text-neutral-500">
            Tanggal Berangkat
          </div>
          <span className="text-m-regular text-neutral-900">
            {displayDeparture}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-s-regular -mb-2 text-neutral-300">
            {numberOfDays} Hari
          </div>
          <ArrowLongIcon />
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-s-medium text-neutral-500">Tanggal Pulang</div>
          <span className="text-m-regular text-neutral-900">
            {displayArrival}
          </span>
        </div>
      </div>
    )
  }

  if (packageType === PACKAGE_TYPE.HAJJ) {
    return (
      <Fragment>
        <div className="h-[0.5px] bg-[#D2D2D1] max-lg:hidden" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <p className="text-s-medium text-neutral-500">
              Estimasi Keberangkatan
            </p>
            {/* it divide by 2 because to prevent conflict for tooltip content */}
            {context === 'drawer' ? (
              <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                <TooltipTrigger onClick={() => setIsOpen(true)}>
                  <MessageQuestionIcon size={16} />
                </TooltipTrigger>
                <TooltipContent
                  className="z-[9999] max-w-[250px] bg-white p-4"
                  arrowColor="bg-white fill-white"
                >
                  <TooltipHajj
                    title={TEXT_TOOLTIP.HAJJ_TITLE}
                    description={
                      variantType === PACKAGE_TYPE.HAJJ_SPECIAL
                        ? TEXT_TOOLTIP.HAJJ_SPECIAL
                        : TEXT_TOOLTIP.HAJJ_REGULAR
                    }
                  />
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger>
                  <MessageQuestionIcon size={16} />
                </TooltipTrigger>
                <TooltipContent
                  className="z-99 max-w-[250px] bg-white p-4"
                  arrowColor="bg-white fill-white"
                >
                  <TooltipHajj
                    title={TEXT_TOOLTIP.HAJJ_TITLE}
                    description={
                      variantType === PACKAGE_TYPE.HAJJ_SPECIAL
                        ? TEXT_TOOLTIP.HAJJ_SPECIAL
                        : TEXT_TOOLTIP.HAJJ_REGULAR
                    }
                  />
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <p className="text-m-regular text-neutral-900">
            {displayDeparture} {displayArrival}
          </p>
        </div>
      </Fragment>
    )
  }
}

export default TravelDates
