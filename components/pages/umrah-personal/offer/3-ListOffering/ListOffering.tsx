import CardOfferUmrahPersonal from '@/components/pages/umrah-personal/offer/common/CardOfferUmrahPersonal'
import { PackagePersonalData } from '@/constant/types/UmrahPersonalProps'
import React from 'react'

interface ListOfferingProps {
  offers: PackagePersonalData[]
}

const ListOffering: React.FC<ListOfferingProps> = ({ offers }) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-l-semibold max-lg:hidden">Daftar Penawaran</p>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-5">
        {offers.map((offer, index) => (
          <CardOfferUmrahPersonal
            key={offer.id}
            dataOffer={offer}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default ListOffering
