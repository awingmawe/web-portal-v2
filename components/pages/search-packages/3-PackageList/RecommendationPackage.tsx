import { CardPackage } from '@/components/shared/CardPackage'
import { CardData } from '@/constant/types/PackageProps'
import { Fragment } from 'react'

const RecommendationList = ({
  packageReccomendation,
}: {
  packageReccomendation: CardData[]
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-l-semibold">Rekomendasi Paket Lain</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packageReccomendation?.map((packageData, index) => (
          <Fragment key={`packages-${packageData.slugPackage}-${index}`}>
            <CardPackage data={packageData} eventCategory="search" />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default RecommendationList
